import React from 'react';
import PropTypes from 'prop-types';

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
  const [name, setName] = React.useState('');
  const [asserts, setAsserts] = React.useState(0);
  const [errors, setErrors] = React.useState(0);
  const [isWinner, setIsWinner] = React.useState(false);

  const value = React.useMemo(
    () => ({
      name,
      setName,
      asserts,
      setAsserts,
      errors,
      setErrors,
      isWinner,
      setIsWinner,
    }),
    [asserts, errors, isWinner, name]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
