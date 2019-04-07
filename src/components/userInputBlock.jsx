import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./userInputBlock.css";

function UserInputBlock(props) {
  return (
    <div className="userInputWrap">
      <h3>
        {props.title} (<span className="inputUnit">{props.unit}</span>) :
      </h3>
      <span>
        <input
          className="userValueInput"
          type="number"
          min={props.minimum}
          max={props.maximum}
          value={props.userValue}
          onChange={props.inputChangeHandler}
        />
      </span>
      <span className="inputRange">
        <InputRange
          minValue={props.minimum}
          maxValue={props.maximum}
          value={props.userValue}
          onChange={props.sliderChangeHandler}
        />
      </span>
    </div>
  );
}

export default UserInputBlock;
