import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Train } from "./components/Train/Train";

function App() {
  const BOARD_LENGTH = 10;
  const [train, setTrain] = useState([
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const pressKeyHandler = useCallback(
    (e: KeyboardEvent) => {
      const newTrain = [...train];
      const trainHead = { ...newTrain[0] };

      if (e.key === "ArrowRight") {
        trainHead.x += 1;
      } else if (e.key === "ArrowLeft") {
        trainHead.x -= 1;
      } else if (e.key === "ArrowUp") {
        trainHead.y -= 1;
      } else if (e.key === "ArrowDown") {
        trainHead.y += 1;
      } else {
        return;
      }

      newTrain.unshift(trainHead);
      if (newTrain.length > 1) {
        newTrain.pop();
      }
      setTrain(newTrain);
    },
    [train]
  );

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHandler);
    return () => {
      document.removeEventListener("keydown", pressKeyHandler);
    };
  }, [pressKeyHandler]);

  return (
    <div className='game'>
      <h1>Train game</h1>
      <div className='gameBoard'>
        {Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
          <div className='item' key={i}>
            {train.some(
              (element) =>
                element.x === i % BOARD_LENGTH &&
                element.y === Math.floor(i / BOARD_LENGTH)
            ) && <Train />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
