import CardsProvider from './Provider/CardsProvider';
import Board from './components/Board';

function App() {
  return (
    <CardsProvider>
      <Board />
    </CardsProvider>
  );
}

export default App;
