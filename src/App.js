import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchCurrencies } from "./actions/currencyAction";
import { fetchCategories } from "./actions/categoryAction";
import Detailed from "./components/Detailed";
import Cart from "./components/cart/Cart";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  componentWillUnmount() {
    localStorage.setItem("cart", this.props.cart);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Detailed />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencyReducer.currencies,
  cart: state.cartReducer.cart,
});

const mapDispatchToProps = {
  fetchCurrencies,
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
