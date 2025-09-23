import {createContext, useContext, useState, useEffect} from "react";
import story from "../story.json";

const GameContext = createContext();

export function GameProvider({children, playerName}) {
    // Locks playerName to uppercase
    const normalizedName = (playerName ?? "").trim().toUpperCase();
  
    // Story Node
    const [currentNode, setCurrentNode] = useState("start");

    // Player Inventory
    const [inventory, setInventory] = useState([]);

    // Player Health
    const [hp, setHp] = useState(100);

    // Shake Effect
    const [shake, setShake] = useState(false);

    // Track game state loaded from localStorage
    const [loaded, setLoaded] = useState(false);

      // Stateful Consequences:
      // Function that moves to next node, items add to inventory, and health gets damage
      function goTo(nextNode) {
        const node = story[nextNode];

        if (node.onArrive) {
          if (node.onArrive.addItem) {
            setInventory((prev) => [...prev, node.onArrive.addItem]);
          }
          if (node.onArrive.takeDamage) {
            const newHp = hp - node.onArrive.takeDamage;
            setHp(newHp);

            // Choice Logic:
            // Applying effects.
            setShake(true);
            setTimeout(() => setShake(false), 400);

            // HP-Loss Condition:
            if (newHp <= 0) {
              setCurrentNode("gameOver_hp");
              return;
            }
          }
        }
        setCurrentNode(nextNode);
      }

    // Data Persistence
      // load game progress on startup
      useEffect(() => {
        const savedGame = localStorage.getItem(`aswangGame_${normalizedName}_latest`);
        if (savedGame) {
          const {currentNode, hp, inventory} = JSON.parse(savedGame);
          setCurrentNode(currentNode);
          setHp(hp);
          setInventory(inventory);
        }
        setLoaded(true);
      }, [normalizedName]);

      // saves game progress automatically
      useEffect(() => {
        if (!loaded) return;
        const gameState = {playernormalizedName: normalizedName, currentNode, hp, inventory};
        localStorage.setItem(`aswangGame_${normalizedName}_latest`, JSON.stringify(gameState));
      }, [normalizedName, currentNode, hp, inventory]);

      // Function that resets the player's game
      function resetGame() {
        setInventory([]);
        setHp(100);
        setCurrentNode("start");
        localStorage.setItem(`aswangGame_${normalizedName}_latest`, JSON.stringify({
            playerName: normalizedName, currentNode: "start", hp: 100, inventory: [],
        }));
      }
    
    // Global Game State (Context API):
    return (
      <GameContext.Provider value={{playerName: normalizedName, currentNode, inventory, hp, goTo, shake, resetGame}}>
        {children}
      </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}