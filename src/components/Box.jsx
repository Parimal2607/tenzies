import React from "react";

const Box = (props) => {
  return (
    <>
        <div onClick={props.holdDice} className={props.isHeld ? "box green" : "box "}>{props.value}</div>
    </>
  );
};

export default Box;
