import { useCards } from '../hooks/useCards';
import { useGame } from '../hooks/useGame';
import CardList from './CardList';
import GameSettingsPopup from './GameSettingsPopup';
import Panel from './Panel';
import WinnerPopup from './WinnerPopup';

function Loader() {
  return (
    <div
      aria-label="loader"
      className="flex justify-center pt-16 w-full h-screen"
    >
      <div className="w-32 h-32 border-t-8 border-indigo-600 rounded-full animate-spin transition-transform duration-500"></div>
    </div>
  );
}

function Board() {
  const { cards, loading } = useCards();
  const { isWinner, isNewGame } = useGame();

  return (
    <>
      {isNewGame && <GameSettingsPopup />}
      {isWinner && cards.length > 0 && <WinnerPopup />}
      <Panel />
      {loading && <Loader />}
      {!loading && (
        <div
          className="min-h-screen bg-gray-100 p-4"
          aria-label="Main Container"
        >
          <div className="max-w-8xl mx-auto">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              role="list"
              aria-label="List of Cards"
            >
              <CardList />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Board;
