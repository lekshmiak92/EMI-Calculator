import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
// import AmountSlider from "./components/amountSlider";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class App extends Component {
  constructor() {
    super();
    this.state = { amount: 1000, duration: 6, interest: "", emi: "" };
  }

  handleAmountChange = value => {
    fetch(
      "https://ftl-frontend-test.herokuapp.com/interest?amount=2000&numMonths=12"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            interest: result.interestRate,
            emi: result.monthlyPayment.amount
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            interest: "",
            emi: ""
          });
        }
      );
    this.setState({ amount: value });
  };
  render() {
    return (
      <div className="App">
        <div>
          <InputRange
            minValue={500}
            maxValue={5000}
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
        </div>
        <div>
          <input
            type="number"
            min="6"
            max="24"
            step="2"
            value={this.state.duration}
          />
        </div>
        <div>
          EMI = {this.state.emi} and interest rate = {this.state.interest}
        </div>
      </div>
    );
  }
}

export default App;
