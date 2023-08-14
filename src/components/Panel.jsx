import { useGame } from '../hooks/useGame';

function Panel() {
  const { asserts, errors } = useGame();
  return (
    <div
      className="bg-white p-4 rounded shadow-lg mb-6 flex justify-center items-center mx-auto w-2/3"
      role="region"
      aria-label="Score Panel"
    >
      <div className="mr-8 flex items-center">
        <span className="font-bold text-xl text-indigo-600">Asserts:</span>
        <span className="text-xl text-indigo-600 ml-2">{asserts}</span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-xl text-red-600">Errors:</span>
        <span className="text-xl text-red-600 ml-2">{errors}</span>
      </div>
    </div>
  );
}

export default Panel;
