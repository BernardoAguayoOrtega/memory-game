/**
 * Returns a random integer between the specified values.
 *
 * @param {number} min - The smallest integer result, inclusive.
 * @param {number} max - The largest integer result, inclusive.
 * @returns {number} A random integer between the min and max values.
 */
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Swaps the elements at the specified indices in the array.
 *
 * @param {Array} arr - The array with items to swap.
 * @param {number} i - The index of the first item.
 * @param {number} j - The index of the second item.
 * @returns {Array} A new array with the elements swapped.
 */
export const swap = (arr, i, j) => {
  const newArr = [...arr];
  [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  return newArr;
};

/**
 * Shuffles the elements of an array.
 *
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} A new array with the elements shuffled.
 */
export const shuffleArray = arr =>
  arr.reduceRight((acc, _, i) => swap(acc, i, getRandomInt(0, i)), [...arr]);

/**
 * Transforms and formats a list of cards by duplicating each card,
 * shuffling the order, and mapping to a desired format.
 *
 * @param {Array} cards - The array of cards to transform.
 * @returns {Array} A new array with formatted cards.
 */
export function transformCards(cards) {
  const duplicatedCards = cards.flatMap(item => [item, item]);

  const shuffleCards = shuffleArray(duplicatedCards);

  const formattedCards = shuffleCards.map(({ fields }, index) => ({
    id: index,
    title: fields.image.title,
    image: fields.image.url,
    isToggle: false,
    isDisabled: false,
  }));

  return formattedCards;
}
