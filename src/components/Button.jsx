import React, { useContext } from "react";
import { GlobalInfo } from "./MainContainer";
const Button = () => {
  const { tenzies, handleRoll } = useContext(GlobalInfo);
  return (
    <div>
      <button className="role-btn" onClick={handleRoll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
};

export default Button;
