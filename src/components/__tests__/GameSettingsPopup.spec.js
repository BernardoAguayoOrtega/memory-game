import { render, waitFor, screen } from '@testing-library/react';

import { CardsProvider } from '../../Provider/CardsProvider';
import Board from '../Board';
import { GameProvider } from '../../Provider/GameProvider';
import userEvent from '@testing-library/user-event';

const TestComponent = () => (
  <CardsProvider>
    <GameProvider>
      <Board />
    </GameProvider>
  </CardsProvider>
);

describe('GameSettingsPopup component', () => {
  it('should render the Game Settings Popup', () => {
    render(<TestComponent />);

    const gameSettingsPopup = screen.getByRole('dialog');

    expect(gameSettingsPopup).toBeInTheDocument();
  });

  it('should change name input', async () => {
    render(<TestComponent />);

    const playerNameInput = screen.getByLabelText('Player Name');
    userEvent.type(playerNameInput, 'test');

    await waitFor(() => {
      expect(playerNameInput.value).toBe('test');
    });
  });

  it('start game button should be disabled if name input is empty', async () => {
    render(<TestComponent />);

    const startGameButton = screen.getByRole('button', { name: 'Start Game' });
    const playerNameInput = screen.getByLabelText('Player Name');
    userEvent.type(playerNameInput, 'test');
    userEvent.clear(playerNameInput);

    await waitFor(() => {
      expect(startGameButton).toBeDisabled();
    });
  });

  it('start game button should be enabled if name input is not empty', async () => {
    render(<TestComponent />);

    const startGameButton = screen.getByRole('button', { name: 'Start Game' });
    const playerNameInput = screen.getByLabelText('Player Name');
    userEvent.type(playerNameInput, 'test');

    await waitFor(() => {
      expect(startGameButton).toBeEnabled();
    });
  });

  it('should change difficulty select', async () => {
    render(<TestComponent />);

    const difficultySelect = screen.getByLabelText('Select Difficulty');
    userEvent.selectOptions(difficultySelect, 'medium');

    await waitFor(() => {
      expect(difficultySelect.value).toBe('medium');
    });
  });
});
