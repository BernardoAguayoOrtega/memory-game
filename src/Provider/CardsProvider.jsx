import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { IMAGES_URL } from '../constants/api';

/**
 * React context for cards data.
 * @type {React.Context}
 */
export const CardsContext = React.createContext();

/**
 * CardsProvider component.
 * Provides cards data to child components.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.Element} Provider component.
 */
const CardsProvider = ({ children }) => {
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(IMAGES_URL);
        setCards(response.data.entries);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const value = React.useMemo(
    () => ({ cards, loading, error }),
    [cards, loading, error]
  );

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};

CardsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardsProvider;
