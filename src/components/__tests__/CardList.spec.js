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

describe('Card List', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render empty card', async () => {
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

    const emptyCards = screen.getAllByLabelText('Empty card');

    expect(emptyCards).toHaveLength(2);
  });

  it('if the user click over empty card should toggle to content card', async () => {
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

    const [firstEmptyCard] = screen.getAllByLabelText('Empty card');
    userEvent.click(firstEmptyCard);

    await waitFor(() => {
      expect(
        screen.getByLabelText(`Card for ${card.fields.image.title}`)
      ).toBeInTheDocument();
    });
  });
});
