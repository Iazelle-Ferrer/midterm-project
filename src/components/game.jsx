import { useEffect } from 'react';
import { useGame } from '../contexts/gameContext.jsx';
import '../App.css';
import story from '../story.json';
import Header from './header.jsx';
import Choices from './choices.jsx';

export default function Game() {
  // Prevents player from accidentally reloading the page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

      const {currentNode, shake, resetGame} = useGame();
      const node = story[currentNode];

      // Game Over and Victory States:
      if (node.isEnding) {
        return(
          <div className={`bg-asset ${shake ? "shake" : ""}`} style={{"--bg-url": `url(${node.background})`}}>
            {shake && <div className='flash'></div>}
            <h2>{node.text}</h2>

            <div className='ending-details'>
              <Header/>
            </div>

            <div className='reset-button'>
              <button className='btn-primary' onClick={resetGame}>Play Again</button>
            </div>
          </div>
        );
      }
  
  return (
    <>
      <div className={`bg-asset ${shake ? "shake" : ""}`} style={{"--bg-url": `url(${node.background})`}}>
        {shake && <div className='flash'></div>}
        {/* Game Screen */}
        <Header/>
        {/* Game Text */}
        <h2>{node.text}</h2>
        <Choices/>
      </div>
    </>
  );
}