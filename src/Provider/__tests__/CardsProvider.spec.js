// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import { useCards } from '../../hooks/useCards';
import { server } from '../../mocks/server';
import { getCards } from '../../mocks/handlers';
import { CardsProvider } from '../CardsProvider';

describe('CardsProvider', () => {
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
});
