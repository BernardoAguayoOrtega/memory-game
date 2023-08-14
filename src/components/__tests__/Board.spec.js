import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { server } from '../../mocks/server';
import { CardsProvider } from '../../Provider/CardsProvider';
import Board from '../Board';
import { GameProvider } from '../../Provider/GameProvider';
import userEvent from '@testing-library/user-event';
import { getCards } from '../../mocks/handlers';
import { rest } from 'msw';
import { IMAGES_URL } from '../../constants/api';

const TestComponent = () => (
  <CardsProvider>
    <GameProvider>
      <Board />
    </GameProvider>
  </CardsProvider>
);

async function startNewGame() {
  userEvent.clear(screen.getByLabelText('Player Name'));
  const playerNameInput = screen.getByLabelText('Player Name');
  userEvent.type(playerNameInput, 'test');

  await waitFor(() => {
    expect(playerNameInput.value).toBe('test');
  });

  const startGameButton = screen.getByRole('button', { name: /start game/i });
  userEvent.click(startGameButton);

  await waitForElementToBeRemoved(() => screen.getByLabelText('Player Name'));
  await waitForElementToBeRemoved(() => screen.getByLabelText('loader'));
}

describe('Board component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render cards', async () => {
    const cards = getCards();

    render(<TestComponent />);

    await startNewGame();

    waitFor(() => {
      cards.forEach(card => {
        expect(screen.getAllByText(card.fields.image.title)).toHaveLength(2);
      });
    });
  });
});

describe('Panel component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('if user get wrong answer should update errors panel', async () => {
    render(<TestComponent />);

    await startNewGame();

    const firstCard = screen.getAllByRole('listitem')[0];
    userEvent.click(firstCard);

    const secondCard = screen.getAllByRole('listitem')[1];
    userEvent.click(secondCard);

    waitFor(() => {
      expect(screen.getByText('Errors: 1')).toBeInTheDocument();
    });
  });

  it('if user gets correct answer should update asserts panel', async () => {
    const [card] = getCards();

    server.use(
      rest.get(IMAGES_URL, (req, res, ctx) => {
        return res(
          ctx.json({
            entries: [card],
          })
        );
      })
    );

    render(<TestComponent />);

    await startNewGame();

    const firstCard = screen.getAllByRole('listitem')[0];
    userEvent.click(firstCard);

    const secondCard = screen.getAllByRole('listitem')[1];
    userEvent.click(secondCard);

    waitFor(() => {
      expect(screen.getByText('Asserts: 1')).toBeInTheDocument();
    });
  });
});
