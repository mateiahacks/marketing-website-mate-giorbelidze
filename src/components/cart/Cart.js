import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import CartPageProduct from "./CartPageProduct";
import "./CartWindowProduct.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 21,
    };
  }

  totalSum() {
    const cart = this.props.cart;
    const currs = this.props.currencies;
    const curr = this.props.currency;
    return cart
      .map((p) => p?.quantity * p?.prices[currs.indexOf(curr)]?.amount)
      .reduce((first, second) => first + second, 0);
  }

  render() {
    const { cart, totalQuantity, currency, currencies } = this.props;
    return (
      <div className="d-flex">
        <Header />
        <div className="cart-products">
          <h1>CART</h1>
          {cart.map((product) => (
            <CartPageProduct key={cart.indexOf(product)} prod={product} />
          ))}
        </div>
        <div className="cart-sum">
          <p>
            Tax {this.state.tax}%:
            <span>
              {" " + currency.symbol}
              {((this.state.tax / 100) * this.totalSum()).toFixed(2)}
            </span>
          </p>
          <p>
            Quantity: <span>{totalQuantity}</span>
          </p>
          <p>
            Total:{" "}
            <span>
              {currency.symbol}
              {this.totalSum().toFixed(2)}
            </span>
          </p>
          <div id="order">ORDER</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  totalQuantity: state.cartReducer.totalQuantity,
  currency: state.currencyReducer.currency,
  currencies: state.currencyReducer.currencies,
});

export default connect(mapStateToProps)(Cart);
