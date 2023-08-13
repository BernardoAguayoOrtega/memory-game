// mocks/handlers.js
import { rest } from 'msw';
import { IMAGES_URL } from '../constants/api';

const cardFactory = () => ({
  fields: {
    image: {
      id: Math.floor(Math.random() * 1000),
      title: 'Card ' + Math.floor(Math.random() * 1000),
      image: 'https://picsum.photos/200/300',
      isToggle: false,
    },
  },
});

export const generateCards = (count = 10) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(cardFactory());
  }
  return cards;
};

const cards = generateCards();

export const getCards = () => [...cards];

const handlers = [
  rest.get(IMAGES_URL, (req, res, ctx) => {
    return res(
      ctx.json({
        entries: cards,
      })
    );
  }),
];

export default handlers;
