import React from 'react';
import PropTypes from 'prop-types';
import { useCards } from '../hooks/useCards';
import useLocalStorage from '../hooks/useLocalStorage';
import { DIFFICULTIES } from '../constants/api';

/**
 * React context for game data.
 * @type {React.Context}
 * */
export const GameContext = React.createContext();

/**
 * GameProvider component.
 * Provides game info to child components.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.Element} Provider component.
 */
export function GameProvider({ children }) {
  const [name, setName] = useLocalStorage('name', '');
  const [asserts, setAsserts] = React.useState(0);
  const [errors, setErrors] = React.useState(0);
  const [isNewGame, setIsNewGame] = React.useState(true);
  const [difficulty, setDifficulty] = useLocalStorage(
    'difficulty',
    DIFFICULTIES.easy
  );
  const [paused, setPaused] = React.useState(false);

  const { current: successSound } = React.useRef(
    new Audio('../../public/audio/success.mp3')
  );
  const { current: errorSound } = React.useRef(
    new Audio('../../public/audio/wrong-answer.mp3')
  );

  const {
    cards,
    toggleSelectedCard,
    toggleDisabledCard,
    handlePageChange,
    setRestart,
  } = useCards();

  const isWinner = React.useMemo(
    () => asserts === cards.length / 2,
    [asserts, cards.length]
  );

  const handleError = React.useCallback(
    (firstCard, secondCard) => {
      setPaused(true);
      errorSound.play();
      const timeout = setTimeout(() => {
        toggleSelectedCard(firstCard.id);
        toggleSelectedCard(secondCard.id);
        setErrors(prevErrors => prevErrors + 1);
        setPaused(false);
      }, 500);

      return () => clearTimeout(timeout);
    },
    [errorSound, toggleSelectedCard]
  );

  const handleSuccess = React.useCallback(
    (firstCard, secondCard) => {
      successSound.play();
      toggleDisabledCard(firstCard.id);
      toggleDisabledCard(secondCard.id);
      setAsserts(prevAsserts => prevAsserts + 1);
    },
    [successSound, toggleDisabledCard]
  );

  const handleNewGame = React.useCallback(() => {
    setIsNewGame(true);
    setAsserts(0);
    setErrors(0);
    setPaused(false);
  }, []);

  const handleStartGame = React.useCallback(() => {
    setRestart(prevState => !prevState);
    setIsNewGame(false);
    handlePageChange(difficulty);
  }, [difficulty, handlePageChange, setRestart]);

  React.useEffect(() => {
    const firstCard = cards.find(card => card.isToggle && !card.isDisabled);
    const secondCard = cards.find(
      card => card.isToggle && card.id !== firstCard?.id && !card.isDisabled
    );

    if (!firstCard || !secondCard) return;

    const bothCardsAreValid = !firstCard.isDisabled && !secondCard.isDisabled;
    if (!bothCardsAreValid) return;

    if (firstCard.title === secondCard.title) {
      handleSuccess(firstCard, secondCard);
      return;
    }

    if (firstCard.title !== secondCard.title) {
      handleError(firstCard, secondCard);
    }
  }, [cards, handleError, handleSuccess]);

  const value = React.useMemo(
    () => ({
      asserts,
      difficulty,
      errors,
      handleNewGame,
      isNewGame,
      isWinner,
      name,
      paused,
      setAsserts,
      setDifficulty,
      setErrors,
      setIsNewGame,
      setName,
      setPaused,
      handleStartGame,
    }),
    [
      asserts,
      difficulty,
      errors,
      handleNewGame,
      handleStartGame,
      isNewGame,
      isWinner,
      name,
      paused,
      setDifficulty,
      setName,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
