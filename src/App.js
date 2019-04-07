import React, { Component } from "react";
import Header from "./components/header";
import "./App.css";
import UserInputBlock from "./components/userInputBlock";
import DisplayResult from "./components/result";
import ErrorMsg from "./components/error";

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

  // EMI and Interest rate is calculated for default values on page load
  componentDidMount() {
    this.calculateEMI();
  }

  // Check whether user given value for Principal amount is valid
  isValidAmount = amount => {
    if (amount <= MAX_AMOUNT && amount >= MIN_AMOUNT) {
      return true;
    } else {
      return false;
    }
  };

  // Check whether user given value for Loan duration is valid
  isValidDuration = duration => {
    if (duration <= MAX_DURATION && duration >= MIN_DURATION) {
      return true;
    } else {
      return false;
    }
  };

  // To calculate EMI and Interest rate using API call if there is no error message
  calculateEMI = () => {
    if (!this.state.showErrorMessage) {
      fetch(
        `https://ftl-frontend-test.herokuapp.com/interest?amount=${
          this.state.amount
        }&numMonths=${this.state.duration}`
      )
        .then(res => res.json())
        .then(
          result => {
            let interestRate =
              Math.round(result.interestRate * 100 * 100) / 100;
            this.setState({
              interest: interestRate,
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

  // Display error message if the user given Amount values on input field are not valid, else calls function for emi calculation
  handleAmountChange = e => {
    let inputAmount = Number(e.target.value);
    if (this.isValidAmount(inputAmount)) {
      this.setState({ amount: inputAmount, showErrorMessage: false });
      this.calculateEMI();
    } else {
      this.setState({ amount: inputAmount, showErrorMessage: true });
    }
  };

  // Calls function for emi calculation for the user given Amount values on input slider
  handleAmountChangeInSlider = value => {
    this.setState({ amount: value });
    this.calculateEMI();
  };

  // Display error message if the user given Loan duration values on input field are not valid, else calls function for emi calculation
  handleDurationChange = e => {
    let inputDuration = Number(e.target.value);
    if (this.isValidDuration(inputDuration)) {
      this.setState({ duration: inputDuration, showErrorMessage: false });
      this.calculateEMI();
    } else {
      this.setState({ duration: inputDuration, showErrorMessage: true });
    }
  };

  // Calls function for emi calculation for the user given Loan duration values on input slider
  handleDurationChangeInSlider = value => {
    this.setState({ duration: value });
    this.calculateEMI();
  };

  render() {
    return (
      <div>
        <Header />
        <div className="App">
          <div>
            <ErrorMsg errorMsgStatus={this.state.showErrorMessage} />
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
