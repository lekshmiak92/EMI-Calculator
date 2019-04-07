import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./userInputBlock.css";

class UserInputBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="userInputWrap">
        <h3>
          {this.props.title} (
          <span className="inputUnit">{this.props.unit}</span>) :
        </h3>
        <span>
          <input
            className="userValueInput"
            type="number"
            min={this.props.minimum}
            max={this.props.maximum}
            value={this.props.userValue}
            onChange={this.props.inputChangeHandler}
          />
        </span>
        <span className="inputRange">
          <InputRange
            minValue={this.props.minimum}
            maxValue={this.props.maximum}
            value={this.props.userValue}
            onChange={this.props.sliderChangeHandler}
          />
        </span>
      </div>
    );
  }
}

export default UserInputBlock;
