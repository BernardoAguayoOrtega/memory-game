import { useGame } from '../hooks/useGame';

function GameSettingsPopup() {
  const { setName, name, difficulty, setDifficulty, handleStartGame } =
    useGame();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="settings-dialog-title"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        role="presentation"
      ></div>
      <div className="flex flex-col items-center justify-center bg-white p-12 w-1/2 rounded-lg shadow-2xl z-10 max-w-xl">
        <h2
          className="text-3xl font-bold text-indigo-600 mb-4"
          id="settings-dialog-title"
        >
          Game Settings
        </h2>
        <div className="mb-4 w-full">
          <label className="block text-indigo-600 mb-2" htmlFor="playerName">
            Player Name
          </label>
          <input
            type="text"
            id="playerName"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 border rounded border-indigo-600"
            aria-required="true"
          />
        </div>
        <div className="mb-8 w-full">
          <label className="block text-indigo-600 mb-2" htmlFor="difficulty">
            Select Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={e => {
              const { value } = e.target;
              setDifficulty(value);
            }}
            className="w-full p-2 border rounded border-indigo-600"
            aria-required="true"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          className={`px-6 py-2 rounded ${
            name.trim()
              ? 'text-white bg-indigo-500 hover:bg-indigo-600'
              : 'text-indigo-400 bg-indigo-200 cursor-not-allowed'
          }`}
          onClick={handleStartGame}
          disabled={!name.trim()}
          aria-disabled={!name.trim()}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default GameSettingsPopup;
