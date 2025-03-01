export interface Destination {
  _id: string;
  alias: string;
  name: string;
  clues: string[];
  funFacts: string[];
}

export interface GameDestination {
  id: string;
  alias: string;
  name: string;
  clues: string[];
  funFacts: string[];
}

export interface GameState {
  destination: GameDestination | null;
  options: string[];
}
