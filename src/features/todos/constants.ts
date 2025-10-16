/* eslint-disable no-magic-numbers */
// Audio configuration constants
export const AUDIO_VOLUME = {
  TYPEWRITER: 0.3,
  BELL: 0.4,
} as const;

// Timing constants
export const TIMING = {
  FOCUS_DELAY_MS: 100,
  API_DELAY_MS: 500,
  MUTATION_DELAY_MS: 300, // Used for both update and delete operations
} as const;

// ID generation constants
export const ID_GENERATION = {
  MIN_ID: 200,
  MAX_RANDOM: 10_000,
} as const;

// Query constants
export const QUERY_LIMIT = 10;
