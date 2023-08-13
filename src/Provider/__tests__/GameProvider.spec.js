import { render, waitFor, screen } from '@testing-library/react';

import { useGame } from '../../hooks/useGame';
import { GameProvider } from '../GameProvider';
import userEvent from '@testing-library/user-event';
import { CardsProvider } from '../CardsProvider';

describe('CardsProvider', () => {
  const TestComponent = () => {
    const {
      name,
      setName,
      asserts,
      setAsserts,
      errors,
      setErrors,
      isWinner,
      setIsWinner,
    } = useGame();

    return (
      <>
        <p>{name}</p>
        <p>{asserts}</p>
        <p>{errors}</p>
        <p>{isWinner}</p>
        <label htmlFor="name">Enter your username:</label>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          aria-label="name"
        />
        <label htmlFor="asserts">Asserts</label>
        <input
          type="text"
          onChange={e => setAsserts(e.target.value)}
          aria-label="asserts"
        />
        <label htmlFor="errors">Errors</label>
        <input
          type="text"
          onChange={e => setErrors(e.target.value)}
          aria-label="errors"
        />
        <label htmlFor="isWinner">Is Winner</label>
        <input
          type="checkbox"
          onChange={e => setIsWinner(e.target.value)}
          aria-label="isWinner"
        />
      </>
    );
  };

  it('should show expected name', async () => {
    const name = 'John Doe';

    render(
      <CardsProvider>
        <GameProvider>
          <TestComponent />
        </GameProvider>
      </CardsProvider>
    );

    const nameInput = screen.getByLabelText('name');
    userEvent.type(nameInput, name);

    await waitFor(() => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should show expected asserts', async () => {
    const asserts = '10';

    render(
      <CardsProvider>
        <GameProvider>
          <TestComponent />
        </GameProvider>
      </CardsProvider>
    );

    const assertsInput = screen.getByLabelText('asserts');
    userEvent.clear(assertsInput);
    userEvent.type(assertsInput, asserts);

    await waitFor(() => {
      expect(screen.getByText(asserts)).toBeInTheDocument();
    });
  });

  it('should show expected errors', async () => {
    const errors = '10';

    render(
      <CardsProvider>
        <GameProvider>
          <TestComponent />
        </GameProvider>
      </CardsProvider>
    );

    const errorsInput = screen.getByLabelText('errors');
    userEvent.clear(errorsInput);
    userEvent.type(errorsInput, errors);

    await waitFor(() => {
      expect(screen.getByText(errors)).toBeInTheDocument();
    });
  });
});
