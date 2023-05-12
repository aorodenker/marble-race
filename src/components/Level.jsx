import { useMemo } from 'react';
import { BlockStart, BlockEnd, Spinner, Limbo, Axe, Bounds } from './Blocks';

const Level = ({ count = 5, types = [Spinner, Axe, Limbo], seed = 0 }) => {

  const blocks = useMemo(() => {
    const blocksArray = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocksArray.push(type);
    }
    return blocksArray;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, idx) => <Block key={idx} position={[0, 0, -(idx + 1) * 4]} />)}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
};

export default Level;