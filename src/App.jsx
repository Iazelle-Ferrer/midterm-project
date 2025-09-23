import { useState } from 'react';
import { GameProvider } from './contexts/gameContext';
import Game from './components/game';
import './App.css';

export default function App() {
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");

  // Prevents player from proceeding to the game without a name
  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name first!");
      return;
    }

    setStarted(true);
  }

  if (started) {
    // Starts the game after player submits their name
    return (
      <GameProvider playerName={name}>
        <Game/>
      </GameProvider>
    )
  }

  return (
    <>
    {/* Start Screen: */}
      {/* Title */}
      <div className='bg-image' style={{minHeight: '100vh'}}>
        <h1 className='title'>
          <span className='line'>Aswang</span>
          <span className='line'>(Hunters)</span>
        </h1>

        {/* Name Input */}
        <div className="form-container">
          <form className="my-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="playerName">Name</label>
              <input type="text" maxLength="10" className="form-control my-input" id="playerName" required value={name} onChange={(e) => setName(e.target.value.toUpperCase())} style={{textTransform: "uppercase"}}/>
            </div>

            <div className="btn-wrapper">
              <button type="submit" className="btn btn-primary mb-3">Start</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}