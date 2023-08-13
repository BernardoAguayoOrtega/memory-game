import { useGame } from '../hooks/useGame';

function WinnerPopup() {
  const { name, handleNewGame } = useGame();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="congrats-dialog-title"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        role="presentation"
      ></div>

      <div className="flex flex-col items-center justify-center bg-white p-12 w-1/2 rounded-lg shadow-2xl z-10 max-w-xl">
        <h2
          className="text-3xl font-bold text-green-700 mb-4"
          id="congrats-dialog-title"
        >
          Congratulations!
        </h2>

        <p className="text-xl text-green-600 mb-8" aria-live="polite">
          You are the winner! {name}
        </p>

        <div>
          <button
            onClick={handleNewGame}
            className="px-6 py-2 rounded text-white bg-green-500 hover:bg-green-600 mr-4"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinnerPopup;
