import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaCopy, FaCheck } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  score: {
    correct: number;
    incorrect: number;
  };
}

export default function ShareModal({
  isOpen,
  onClose,
  username,
  score,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && username) {
      const baseUrl = window.location.origin;
      const encodedUsername = encodeURIComponent(username);
      setInviteLink(`${baseUrl}?inviter=${encodedUsername}`);
      console.log(
        `Generated invite link for ${username}: ${baseUrl}?inviter=${encodedUsername}`
      );
    }
  }, [username]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `🌍 Join me in The Globetrotter Challenge!\n\nI've scored ${
        score.correct
      } out of ${
        score.correct + score.incorrect
      } cities correctly. Can you beat my score?\n\n${inviteLink}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg w-full max-w-md mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">
              Challenge Your Friends
            </h2>
            <div className="mb-6">
              <p className="text-white/80 mb-4">
                Share your score and challenge your friends to beat it!
              </p>
              <div className="bg-white/5 p-4 rounded-lg mb-4">
                <p className="text-white text-sm mb-2">Your Score:</p>
                <p className="text-2xl font-bold text-white">
                  {score.correct} / {score.correct + score.incorrect}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                Share on WhatsApp
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <FaCheck className="text-xl" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="text-xl" />
                    Copy Invite Link
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="mt-2 w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
