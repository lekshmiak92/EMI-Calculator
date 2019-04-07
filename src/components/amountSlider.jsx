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

// parent.js

// <Result
//     emi={this.state.emi}
//     interest={this.state.interest}
//     husband="krishna kumar"
//     callApi={this.calculateEmi}
// />

// result.js

// handleAmtChange() => {
//     //manipulations......
//     this.props.callApi()
// }
// render(){
//     <h2>EMI = {this.props.emi}</h2>
//     <h2>interest = {this.props.interest}</h2>
//     <h2>My Love = {this.props.husband}</h2>
//     slider onChange{this.handleAmtChange}
// }
