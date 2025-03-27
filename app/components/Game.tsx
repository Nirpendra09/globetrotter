"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";
import {
  FaGlobeAmericas,
  FaTimesCircle,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import type { GameDestination } from "../types";
import ShareModal from "./ShareModal";
import UsernameModal from "./UsernameModal";


const TIMER_DURATION = 15; // sec

export default function Game() {
  const [currentDestination, setCurrentDestination] =
    useState<GameDestination | null>(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [inviterScore, setInviterScore] = useState<{
    correct: number;
    incorrect: number;
  } | null>(null);

  const timerRef = useRef(0);
  const [timerPercentage, setTimerPercentage] = useState(0);
  const intervalRef = useRef({});

  const [timer, setTimer] = useState(0)


  const [consecutiveCorrect, setCosecutiveCorrect] = useState(0);


  useEffect(() => {
    fetchNewDestination();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check for inviter in URL
    const params = new URLSearchParams(window.location.search);
    const inviter = params.get("inviter");

    if (inviter) {
      fetchInviterScore(inviter);
    }
  }, []);

  useEffect(() => {
    const percenetage = (timerRef.current / TIMER_DURATION) * 100
    console.log("percenetage: ", percenetage)
    if (percenetage > 99) {
      handleGuess("skip", true)
    }

    setTimerPercentage(percenetage)
  }, [timer])

  const startTimer = () => {
    stopTimer()
    timerRef.current = 0;
    intervalRef.current = setInterval(() => {
      timerRef.current += 1;

      const percenetage = (timerRef.current / TIMER_DURATION) * 100
      setTimer(timerRef.current);
      // calculate percentage
      console.log("timerref: ", timerRef.current)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(intervalRef.current);
      timerRef.current = 0;
    }
  }

  const fetchInviterScore = async (inviterUsername: string) => {
    try {
      console.log(`Fetching score for inviter: ${inviterUsername}`);
      const response = await fetch(`/api/users?username=${inviterUsername}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch inviter score: ${errorData.error || response.statusText
          }`
        );
      }

      const data = await response.json();
      console.log(`Inviter ${inviterUsername} score:`, data.score);
      setInviterScore(data.score);
    } catch (error) {
      console.error("Error fetching inviter score:", error);
    }
  };

  // Fetch new destination from API
  const fetchNewDestination = async () => {
    try {

      setIsLoading(true);
      setError(null);
      console.log("Fetching new destination...");

      const response = await fetch("/api/destinations");
      console.log("API Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data?.destination?.name);

      if (!data.destination) {
        throw new Error("No destination received from API");
      }

      const gameDestination: GameDestination = {
        id: data.destination._id,
        alias: data.destination.alias,
        name: data.destination.name,
        clues: data.destination.clues,
        funFacts: data.destination.funFacts,
      };

      console.log("Setting new destination:", gameDestination.alias);
      setCurrentDestination(gameDestination);
      setOptions(data.options || []);
      setCurrentClueIndex(0);
      setShowFeedback(false);
      setIsCorrect(false);
      setHasGuessed(false);
      setIsLoading(false);

      // TODO: reset timer and call start timer
      startTimer();
    } catch (error) {
      console.error("Error fetching destination:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load destination. Please try again."
      );
      setIsLoading(false);
    }
  };

  const optionsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const optionVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
    hover: {
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      y: 0,
      scale: 0.98,
    },
    correct: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    incorrect: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const showNextClue = () => {
    if (
      currentDestination &&
      currentClueIndex < currentDestination.clues.length - 1
    ) {
      setCurrentClueIndex((prev) => prev + 1);
    }
  };

  const getNewTotal = (time: number, preScore: number) => {
    if (time < 5) {
      return preScore + 50;
    } else if (time < 10) {
      return preScore + 25;
    }
    return preScore
  }

  const handleGuess = async (guessedName: string, timeout?: boolean) => {
    if ((!currentDestination || hasGuessed) && !timeout) return;


    const isGuessCorrect = !timeout &&
      guessedName.toLowerCase() === (currentDestination?.name || "").toLowerCase();
    setIsCorrect(isGuessCorrect);
    setShowFeedback(true);

    let reward = 0
    if (!timeout && isGuessCorrect) {
      if (consecutiveCorrect + 1 >= 3) reward = 10
      setCosecutiveCorrect(prev => {
        return prev + 1
      })
    } else {
      setCosecutiveCorrect(0)
    }

    if (!timeout) setHasGuessed(true);

    /* if guessed right then 
      0 - 5 sec -> 50
      5-10 sec -> 25
      otherwise -> 0
    */
    let newTotal = getNewTotal(timerRef.current, score.total) + reward;

    const newScore = {
      correct: score.correct + (isGuessCorrect ? 1 : 0),
      incorrect: score.incorrect + (isGuessCorrect ? 0 : 1),
      total: newTotal
    };
    setScore(newScore);
    stopTimer();
    // Update score in database if user is logged in
    if (username) {
      try {
        console.log(`Updating score for user ${username}:`, newScore);
        const response = await fetch(`/api/users/${username}/score`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: newScore }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to update score: ${errorData.error || response.statusText}`
          );
        }

        const updatedUser = await response.json();
        console.log("Score updated successfully:", updatedUser.score);
      } catch (error) {
        console.error("Error updating score:", error);
      }
    }

    if (isGuessCorrect) {

      setWindowSize({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
      });
    }
    if (timeout) {
      fetchNewDestination()
    }
  };

  const renderClues = () => {
    if (!currentDestination) return null;
    return currentDestination.clues
      .slice(0, currentClueIndex + 1)
      .map((clue, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-4 rounded-lg mb-4 backdrop-blur-sm"
        >
          {clue}
        </motion.div>
      ));
  };

  const renderOptions = () => {
    if (!currentDestination || hasGuessed || !options.length) return null;
    return (
      <motion.div
        variants={optionsContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4 mt-6"
      >
        {options.map((option, index) => (
          <motion.button
            key={index}
            variants={optionVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleGuess(option)}
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-colors text-lg font-medium"
          >
            {option}
          </motion.button>
        ))}
      </motion.div>
    );
  };

  const renderFeedback = () => {
    if (!showFeedback || !currentDestination) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-500/20" : "bg-red-500/20"
          } backdrop-blur-sm`}
      >
        <div className="flex items-center justify-center mb-2">
          {isCorrect ? (
            <FaTrophy className="text-yellow-400 text-2xl mr-2" />
          ) : (
            <FaTimesCircle className="text-red-400 text-2xl mr-2" />
          )}
          <span className="text-lg">
            {isCorrect
              ? "Congratulations! You guessed correctly!"
              : `Sorry, the correct answer was ${currentDestination.name}`}
          </span>
        </div>
        {isCorrect && currentDestination.funFacts.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Fun Facts:</h3>
            <ul className="list-disc list-inside">
              {currentDestination.funFacts.map((fact, index) => (
                <li key={index} className="mb-2">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={fetchNewDestination}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Next Destination
        </button>
      </motion.div>
    );
  };

  const handleUsernameSubmit = async (newUsername: string) => {
    setUsername(newUsername);
    console.log(`Username set to: ${newUsername}`);

    // If the user clicked "Challenge a Fri end", show the share modal now
    if (showUsernameModal) {
      setShowUsernameModal(false);
      setShowShareModal(true);
    }
  };

  const handleShareClick = async () => {
    if (!username) {
      setShowUsernameModal(true);
    } else {
      // Fetch the latest score from the database before sharing
      try {
        const response = await fetch(`/api/users?username=${username}`);
        if (response.ok) {
          const userData = await response.json();
          // Update the local score state with the latest from the database
          setScore(userData.score);
          console.log(
            "Updated score from database before sharing:",
            userData.score
          );
        }
      } catch (error) {
        console.error("Error fetching latest score before sharing:", error);
      }

      setShowShareModal(true);
    }
  };

  const getBorderColor = () => {
    if (timerPercentage <= 33) return 'green'
    else if (timerPercentage <= 66) return 'orange'
    else return 'red'
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl text-red-600">{error}</div>
        <button
          onClick={fetchNewDestination}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentDestination) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8">
      {isCorrect && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <FaGlobeAmericas className="mr-2" />
            The Globetrotter Challenge
          </h1>
          <div className="flex items-center gap-4">
            <div
              className="text-lg bg-white shadow rounded text-black p-2 w-[134px]"
            >

              <div className="text-lg">
                Score: {score.correct}/{score.correct + score.incorrect}
              </div>
              <div>
                Total: {score.total}
              </div>
            </div>
            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
            >
              <FaUserFriends />
              Challenge a Friend
            </button>
          </div>
        </div>
        <div
          className="w-full border-2 border-black rounded mb-2 ease-linear"
          style={{
            width: `${timerPercentage}%`,
            borderColor: getBorderColor()
          }}
        >
        </div>

        {inviterScore && (
          <div className="mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-lg">
              Try to beat the score: {inviterScore.correct} /{" "}
              {inviterScore.correct + inviterScore.incorrect}
            </p>
          </div>
        )}

        <div>
          {renderClues()}
          {!hasGuessed && (
            <button
              onClick={showNextClue}
              disabled={
                !currentDestination ||
                currentClueIndex >= (currentDestination?.clues.length || 0) - 1
              }
              className="mt-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
            >
              Next Clue
            </button>
          )}

          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
            </div>
          )}
          {renderOptions()}
          {renderFeedback()}
        </div>
      </div>

      {showUsernameModal && (
        <UsernameModal
          isOpen={showUsernameModal}
          onClose={() => setShowUsernameModal(false)}
          onSubmit={handleUsernameSubmit}
          currentScore={score}
        />
      )}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        username={username || ""}
        score={score}
      />


      {(consecutiveCorrect >= 5 || true) ?
        <motion.div
          className="fixed bottom-5 right-5 bg-white rounded p-2"
          onClick={handleShareClick}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
        >
          <p className="text-black cursor-pointer">Challenge a  firend 👆</p>
        </motion.div>
        :
        consecutiveCorrect >= 3 && <motion.div
          className="fixed bottom-5 right-5 bg-white rounded p-2"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          <p className="text-black">🔥 Hot Streak</p>
        </motion.div>
      }
    </div>
  );
}
