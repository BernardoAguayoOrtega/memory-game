import PropTypes from 'prop-types';

import { useCards } from '../hooks/useCards';
import { useGame } from '../hooks/useGame';

function EmptyCard({ card }) {
  const { toggleSelectedCard } = useCards();
  const { paused } = useGame();

  const onToggle = () => toggleSelectedCard(card.id);

  return (
    <div
      className="bg-white p-4 rounded shadow-lg h-64 flex items-center justify-center transition-transform transform hover:bg-indigo-100 hover:scale-105"
      role="listitem"
      aria-label="Empty card"
      onClick={!card.isToggle && !paused && onToggle}
    >
      <span className="text-5xl font-bold text-indigo-600">?</span>
    </div>
  );
}

EmptyCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isToggle: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
};

function ContentCard({ card }) {
  return (
    <div
      className="bg-white p-4 rounded shadow-lg h-64 transition-transform transform hover:bg-indigo-100 hover:scale-105"
      role="listitem"
      aria-label={`Card for ${card.title}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="text-xl font-bold text-indigo-600">{card.title}</h2>
    </div>
  );
}

ContentCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isToggle: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
};

function Card({ card }) {
  return card?.isToggle ? (
    <ContentCard card={card} />
  ) : (
    <EmptyCard card={card} />
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isToggle: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  }).isRequired,
};

function CardList() {
  const { cards } = useCards();

  return cards.map((card, index) => (
    <Card key={`${card.id}-${index}`} card={card} />
  ));
}

export default CardList;
