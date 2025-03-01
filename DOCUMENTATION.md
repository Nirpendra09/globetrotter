# Globetrotter Challenge - Technical Documentation

## Overview

Globetrotter Challenge is an interactive geography quiz game built with Next.js, React, and MongoDB. The application challenges users to guess global destinations based on a series of clues, tracks their scores, and allows them to challenge friends by sharing their results.

## Architecture

The application follows a modern web architecture with:

- **Frontend**: Next.js with React 19, using client-side components for interactive elements
- **Backend**: Next.js API routes for serverless functions
- **Database**: MongoDB with Mongoose ODM for data persistence
- **Styling**: Tailwind CSS with custom animations via Framer Motion

## Core Components

### Game Component (`app/components/Game.tsx`)

The central component that orchestrates the game experience:

- Manages game state (current destination, score, user interactions)
- Handles API interactions for fetching destinations and updating scores
- Coordinates sub-components (UsernameModal, ShareModal)
- Implements game logic (guessing, scoring, feedback)

### UsernameModal Component (`app/components/UsernameModal.tsx`)

Modal for user registration:

- Collects username input
- Validates and creates user accounts
- Stores initial score data
- Provides error handling and loading states

### ShareModal Component (`app/components/ShareModal.tsx`)

Modal for sharing game results:

- Generates shareable links with the user's username
- Provides options to copy links or share directly to WhatsApp
- Displays current score information

## API Endpoints

### Destinations API (`app/api/destinations/route.ts`)

- **GET**: Fetches a random destination with multiple-choice options

### Users API (`app/api/users/route.ts`)

- **POST**: Creates a new user with username and initial score
- **GET**: Retrieves user data by username

### Score API (`app/api/users/[username]/score/route.ts`)

- **PUT**: Updates a user's score, games played count, and last played timestamp

## Data Models

### User Model

```typescript
{
  username: string;           // Unique identifier for the user
  score: {                    // User's cumulative score
    correct: number;          // Number of correct guesses
    incorrect: number;        // Number of incorrect guesses
  };
  gamesPlayed: number;        // Total number of games played
  lastPlayed: Date;           // Timestamp of last game
  challenges: string[];       // List of usernames challenged
  createdAt: Date;            // Account creation timestamp
  updatedAt: Date;            // Last update timestamp
}
```

### Destination Model

```typescript
{
  _id: ObjectId;              // MongoDB document ID
  name: string;               // Full name of the destination
  alias: string;              // Short identifier for the destination
  clues: string[];            // Array of hints about the destination
  funFacts: string[];         // Interesting facts shown after correct guesses
}
```

## Key Features

### Score Tracking

The application tracks:

- Correct and incorrect guesses
- Games played
- Last played timestamp

Scores are:

1. Updated in real-time in the UI
2. Persisted to the database for logged-in users
3. Retrievable when sharing or viewing challenges

### User Registration

Users can:

- Play anonymously
- Register a username to track scores
- Challenge friends with their username

The registration process:

1. Validates username availability
2. Creates a user record with current score
3. Enables social sharing features

### Social Sharing

The application allows users to:

- Generate unique challenge links with their username
- Share their current score via WhatsApp
- View the score of users who challenged them

## Technical Implementation Details

### State Management

The application uses React's useState and useEffect hooks for state management:

- Local state for UI interactions and game flow
- API calls for data persistence
- URL parameters for sharing functionality

### Animation and UI

The UI leverages:

- Framer Motion for fluid animations and transitions
- Tailwind CSS for responsive design
- React Icons for consistent iconography

### Error Handling

The application implements comprehensive error handling:

- Form validation for user input
- API error responses with appropriate status codes
- Client-side error states with user feedback
- Console logging for debugging

## Performance Considerations

- API routes use connection pooling for MongoDB
- Animations are optimized for performance
- Error boundaries prevent cascading failures
- Responsive design works across device sizes

## Security Considerations

- Input validation on both client and server
- No sensitive user data is collected
- API routes include appropriate error handling
- Database queries are properly structured to prevent injection

## Future Enhancements

Potential areas for expansion:

- User authentication with OAuth providers
- Leaderboards for competitive play
- Additional game modes (timed challenges, themed quizzes)
- Progressive Web App capabilities for offline play
- Localization for multiple languages
