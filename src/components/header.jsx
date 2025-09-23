import { useGame } from "../contexts/gameContext";

export default function Header() {
    const {playerName, hp, inventory} = useGame();

    return (
        // HEADER
        <div className='my-header'>
          {/* Name */}
          <div className='header-item'>
            <h1 className='player-name'>{playerName}</h1>
          </div>

          {/* Health */}
          <div className='header-item'>
            <h1>HP: {hp}/100</h1>
          </div>

          {/* Inventory */}
            <div className='header-item inventory'>
              <h1>Inventory:</h1>
              <div>
                <h1 className='player-inventory'>🔪{inventory}</h1>
              </div>
            </div>
        </div>
    );
}