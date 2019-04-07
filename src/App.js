import React, { Component } from "react";
// import logo from './logo.svg';
// import AmountSlider from "./components/amountSlider";
import Header from "./components/header";

// import InputRange from "react-input-range";
// import "react-input-range/lib/css/index.css";
import "./App.css";
import UserInputBlock from "./components/userInputBlock";
import DisplayResult from "./components/result";

const MAX_AMOUNT = 5000;
const MIN_AMOUNT = 500;
const MAX_DURATION = 24;
const MIN_DURATION = 6;
const CURRENCY = "$";
const DURATION_UNIT = "In Months";

class App extends Component {
  constructor() {
    super();
    this.state = {
      amount: 500,
      duration: 6,
      interest: 0,
      emi: 0,
      showErrorMessage: false
    };
  }

  componentDidMount() {
    this.calculateEMI();
  }

  isValidAmount = amount => {
    if (amount <= MAX_AMOUNT && amount >= MIN_AMOUNT) {
      return true;
    } else {
      return false;
    }
  };

  isValidDuration = duration => {
    if (duration <= MAX_DURATION && duration >= MIN_DURATION) {
      return true;
    } else {
      return false;
    }
  };

  calculateEMI = () => {
    if (!this.state.showErrorMessage) {
      this.setState({ showErrorMessage: false });
      fetch(
        `https://ftl-frontend-test.herokuapp.com/interest?amount=${
          this.state.amount
        }&numMonths=${this.state.duration}`
      )
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              interest: result.interestRate,
              emi: result.monthlyPayment.amount
            });
          },

          error => {
            this.setState({
              interest: "",
              emi: ""
            });
          }
        );
    }
  };

  handleAmountChange = e => {
    let inputAmount = Number(e.target.value);
    if (this.isValidAmount(inputAmount)) {
      this.setState({ amount: inputAmount, showErrorMessage: false });
      this.calculateEMI();
    } else {
      this.setState({ amount: inputAmount, showErrorMessage: true });
    }
  };
  handleAmountChangeInSlider = value => {
    this.setState({ amount: value });
    this.calculateEMI();
  };

  handleDurationChange = e => {
    let inputDuration = Number(e.target.value);
    if (this.isValidDuration(inputDuration)) {
      this.setState({ duration: inputDuration, showErrorMessage: false });
      this.calculateEMI();
    } else {
      this.setState({ duration: inputDuration, showErrorMessage: true });
    }
  };
  handleDurationChangeInSlider = value => {
    this.setState({ duration: value });
    this.calculateEMI();
  };

  showValidationMessage = () => {
    if (this.state.showErrorMessage) {
      return (
        <div className="errorMsg">
          Invalid Values, Please enter amount from 500 to 5000 and duration from
          6 to 24
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className="App">
          <div>
            {this.showValidationMessage()}
            <UserInputBlock
              title="Amount"
              unit={CURRENCY}
              maximum={MAX_AMOUNT}
              minimum={MIN_AMOUNT}
              userValue={this.state.amount}
              inputChangeHandler={this.handleAmountChange}
              sliderChangeHandler={this.handleAmountChangeInSlider}
            />

            <UserInputBlock
              title="Loan Duration"
              unit={DURATION_UNIT}
              maximum={MAX_DURATION}
              minimum={MIN_DURATION}
              userValue={this.state.duration}
              inputChangeHandler={this.handleDurationChange}
              sliderChangeHandler={this.handleDurationChangeInSlider}
            />
          </div>
          <DisplayResult
            emi={this.state.emi}
            interest={this.state.interest}
            currency={CURRENCY}
          />
        </div>
      </div>
    );
  }
}

export default App;
