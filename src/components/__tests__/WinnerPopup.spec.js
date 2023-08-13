import { render, screen } from '@testing-library/react';

import { GameProvider } from '../../Provider/GameProvider';
import WinnerPopup from '../WinnerPopup';
import { CardsProvider } from '../../Provider/CardsProvider';

const TestComponent = () => (
  <CardsProvider>
    <GameProvider>
      <WinnerPopup />
    </GameProvider>
  </CardsProvider>
);

describe('winner pop up component', () => {
  it('should render the winner pop up', () => {
    render(<TestComponent />);
    const winnerPopup = screen.getByRole('dialog');
    expect(winnerPopup).toBeInTheDocument();
  });

  it('should render the winner pop up with the correct title', () => {
    render(<TestComponent />);
    const winnerPopup = screen.getByRole('dialog');
    expect(winnerPopup).toHaveTextContent('Congratulations!');
  });

  it('should render rest game button', () => {
    render(<TestComponent />);
    const resetGameButton = screen.getByRole('button', { name: /reset game/i });
    expect(resetGameButton).toBeInTheDocument();
  });
});
