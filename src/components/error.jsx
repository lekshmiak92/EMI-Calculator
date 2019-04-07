import React from "react";

function ErrorMsg(props) {
  if (props.errorMsgStatus) {
    return (
      <div className="errorMsg">
        Invalid Values, Please enter amount from 500 to 5000 and duration from 6
        to 24
      </div>
    );
  } else {
    return null;
  }
}
export default ErrorMsg;
