import React, { useEffect, useState, createContext } from "react";
import Box from "./Box";
import Button from "./Button";
import { nanoid } from "nanoid";
import confetti from "canvas-confetti";
export const GlobalInfo = createContext();
const MainContainer = () => {
  const allNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 10),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  };
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const allVal = dice.every((val) => val.isHeld);
    const firstVal = dice[0].value;
    const sameVal = dice.every((val) => val.value === firstVal);
    if (allVal && sameVal) {
      setTenzies(true);
      console.log("you won");
      var end = Date.now() + 15 * 1000;

      // go Buckeyes!
      var colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [dice]);
  const handleRoll = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 10),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <GlobalInfo.Provider value={{tenzies, handleRoll}}>
      <div className="main-conatiner">
        <div className="inner-container">
          <h3>Tenzies</h3>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="tenzies-box">
            {dice.map((num, id) => (
              <Box
                value={num.value}
                isHeld={num.isHeld}
                key={id}
                holdDice={() => holdDice(num.id)}
              />
            ))}
          </div>
          <Button />
        </div>
      </div>
    </GlobalInfo.Provider>
  );
};

export default MainContainer;
