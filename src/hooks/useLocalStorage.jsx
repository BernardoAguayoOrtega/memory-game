import React from 'react';

/**
 * A custom React hook that provides a way to use local storage with useState.
 *
 * @function
 * @param {string} key - The local storage key.
 * @param {*} defaultValue - The default value if the key does not exist in local storage.
 * @returns {[*, React.Dispatch<React.SetStateAction<*>>]} An array where the first item is the stored value and the second is a setter function.
 */
function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = React.useState(initial);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
