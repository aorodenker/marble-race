import { Physics } from '@react-three/rapier';
import Lights from './components/Lights';
import Level from './components/Level';
import Player from './components/Player';
import Effects from './components/Effects';
import useGame from './stores/useGame';

const App = () => {
    const blocksCount = useGame((state) => state.blocksCount);
    const blocksSeed = useGame((state) => state.blocksSeed);

    return (
        <>
            <color args={['#252731']} attach="background" />
            <Lights />
            <Physics>
                <Level count={blocksCount} seed={blocksSeed} />
                <Player />
            </Physics>
            <Effects />
        </>
    );
};

export default App;

//? TODO:
// fix mobile controls
// change player model
// change obstacle models
// add turn