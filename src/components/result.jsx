import React from "react";

function DisplayResult(props) {
  return (
    <div className="resultBlock">
      Your Equated Monthly Installment (EMI) is{" "}
      <span className="resultDisplay">
        {props.currency}
        {props.emi}
      </span>{" "}
      at an Interest Rate of{" "}
      <span className="resultDisplay">{props.interest} % </span>
    </div>
  );
}
export default DisplayResult;
