import React from 'react';

import { CardsContext } from '../Provider/CardsProvider';

/**
 * Custom hook to access cards data.
 *
 * @throws {Error} If the hook is not used within a CardsProvider.
 * @returns {Object} Cards data context with the following structure:
 * @returns {Array} context.cards - Array of card data.
 * @returns {boolean} context.loading - Loading state of the card data fetch.
 * @returns {Error|null} context.error - Any error that occurred during fetch.
 */
export const useCards = () => {
  const context = React.useContext(CardsContext);
  if (!context) {
    throw new Error('useCard must be used within a CardsProvider');
  }
  return context;
};
