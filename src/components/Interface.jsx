import { useKeyboardControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { addEffect } from '@react-three/fiber';
import useGame from '../stores/useGame';

const Interface = () => {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  const timeRef = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    }
  }, [])

  return (
    <div className="interface">
      <div ref={timeRef} className="time">0.00</div>
      {phase === 'ended' ? <div className="restart" onClick={restart}>Restart</div> : null}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${backward ? 'active' : ''}`}></div>
          <div className={`key ${left ? 'active' : ''}`}></div>
          <div className={`key ${right ? 'active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;