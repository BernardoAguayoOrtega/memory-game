import { getRandomInt, shuffleArray, swap, transformCards } from '../cards';

describe('Utility functions', () => {
  describe('getRandomInt', () => {
    it('should return a number between min and max', () => {
      const result = getRandomInt(1, 5);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
    });
  });

  describe('swap', () => {
    it('should swap the elements at the given indices', () => {
      const array = [1, 2, 3];
      const swappedArray = swap(array, 0, 2);
      expect(swappedArray).toEqual([3, 2, 1]);
    });
  });

  describe('shuffleArray', () => {
    it('should shuffle the array elements', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffledArray = shuffleArray(array);
      expect(shuffledArray.length).toBe(array.length);
      expect(shuffledArray).toContain(1);
      expect(shuffledArray).toContain(2);
      expect(shuffledArray).toContain(3);
      expect(shuffledArray).toContain(4);
      expect(shuffledArray).toContain(5);
    });
  });

  describe('transformCards', () => {
    it('should transform and format the cards', () => {
      const cards = [
        { fields: { image: { title: 'Card1', url: 'url1' } } },
        { fields: { image: { title: 'Card2', url: 'url2' } } },
      ];
      const result = transformCards(cards);
      expect(result.length).toBe(cards.length * 2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('image');
      expect(result[0]).toHaveProperty('isToggle', false);
      expect(result[0]).toHaveProperty('isDisabled', false);
    });
  });
});
