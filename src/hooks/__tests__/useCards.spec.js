import { render, waitFor, screen } from '@testing-library/react';

import { server } from '../../mocks/server';
import { useCards } from '../useCards';
import { getCards } from '../../mocks/handlers';
import { renderHook } from '@testing-library/react-hooks';
import { CardsProvider } from '../../Provider/CardsProvider';

describe('use cards', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const TestComponent = () => {
    const { cards, loading } = useCards();

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {cards.map(card => (
          <div key={card.id}>{card.title}</div>
        ))}
      </div>
    );
  };

  it('should return cards', async () => {
    const cards = getCards();

    render(
      <CardsProvider>
        <TestComponent />
      </CardsProvider>
    );

    screen.getByText('Loading...');

    await waitFor(() => {
      cards.forEach(card => {
        expect(screen.getAllByText(card.fields.image.title)).toHaveLength(2);
      });
    });
  });

  it('should throw an error if not used within a CardsProvider', () => {
    const { result } = renderHook(() => useCards());
    expect(result.error).toEqual(
      Error('useCard must be used within a CardsProvider')
    );
  });
});
