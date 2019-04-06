import React, { Component } from "react";
import InputRange from "react-input-range";

class AmountSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 10 };
  }
  render() {
    return (
      <InputRange
        minValue={500}
        maxValue={5000}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

export default AmountSlider;
