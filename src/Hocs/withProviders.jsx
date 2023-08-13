import { CardsProvider } from '../Provider/CardsProvider';
import { GameProvider } from '../Provider/GameProvider';

function withProviders(Component) {
  return function WrappedComponent(props) {
    return (
      <CardsProvider>
        <GameProvider>
          <Component {...props} />
        </GameProvider>
      </CardsProvider>
    );
  };
}

export default withProviders;
