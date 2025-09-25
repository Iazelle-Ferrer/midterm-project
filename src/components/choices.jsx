import {useGame} from "../contexts/gameContext";
import story from "../story.json";

export default function Choices() {
    const {currentNode, goTo, inventory} = useGame();
    const node = story[currentNode];

    return (
      <div className="my-group">
        <div className='my-choices'>
          {node.choices?.map((choice, i) => {
            // Choice Logic:
            // Hiding/showing choices based on item requirements.
            if (choice.requires && !inventory.includes(choice.requires)) return null;
            if (choice.hideIf && inventory.includes(choice.hideIf)) return null;

            return (
            // Buttons that lead to next node
              <div key={i}>
                  <button className='my-button' onClick={() => goTo(choice.to)}>{choice.text}</button>
              </div>
            );
          })}
        </div>
      </div>
    );
}