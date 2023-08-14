import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { DIFFICULTIES, IMAGES_URL } from '../constants/api';
import { transformCards } from '../utils/cards';

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
export const CardsProvider = ({ children }) => {
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(DIFFICULTIES.easy);
  const [restart, setRestart] = React.useState(false);

  const toggleSelectedCard = React.useCallback(
    id => {
      const selectedCard = cards[id];
      const newCard = { ...selectedCard, isToggle: !selectedCard.isToggle };
      setCards(prevCards => {
        const newCards = [...prevCards];
        newCards[id] = newCard;
        return newCards;
      });
    },
    [cards]
  );

  const toggleDisabledCard = React.useCallback(
    id => {
      const selectedCard = cards[id];
      const newCard = {
        ...selectedCard,
        isDisabled: !selectedCard.isDisabled,
        isToggle: true,
      };
      setCards(prevCards => {
        const newCards = [...prevCards];
        newCards[id] = newCard;
        return newCards;
      });
    },
    [cards]
  );

  const handlePageChange = React.useCallback(
    value => {
      setLoading(true);
      const pageSize = DIFFICULTIES[value] || DIFFICULTIES.easy;
      setPageSize(pageSize);
      setLoading(false);
    },
    [setPageSize]
  );

  React.useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(IMAGES_URL, {
          params: {
            per_page: pageSize,
          },
        });
        const cards = transformCards(response?.data?.entries);
        setCards(cards);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [pageSize, restart]);

  const value = React.useMemo(
    () => ({
      cards,
      loading,
      error,
      toggleSelectedCard,
      toggleDisabledCard,
      handlePageChange,
      setRestart,
    }),
    [
      cards,
      loading,
      error,
      toggleSelectedCard,
      toggleDisabledCard,
      handlePageChange,
    ]
  );

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};

CardsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
