import React from 'react';

import { GameContext } from '../Provider/GameProvider';

/**
 * Custom hook to access the game context.
 * It provides the current game state and functions to update it.
 *
 * @hook
 * @returns {Object} Game context value
 * @returns {string} Game context value.name - The name of the game player.
 * @returns {Function} Game context value.setName - Function to set the name of the game player.
 * @returns {number} Game context value.asserts - Number of assertions made in the game.
 * @returns {Function} Game context value.setAsserts - Function to set the number of assertions.
 * @returns {Array} Game context value.errors - List of errors occurred in the game.
 * @returns {Function} Game context value.setErrors - Function to set the list of errors.
 * @returns {boolean} Game context value.isWinner - Indicates if the player is a winner.
 * @returns {Function} Game context value.setIsWinner - Function to set the winner status.
 *
 * @throws Will throw an error if the hook is not used inside a Game Provider.
 */
export const useGame = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a Game Provider');
  }
  return context;
};
