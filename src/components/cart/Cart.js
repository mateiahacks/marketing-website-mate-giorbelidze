import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetCart } from "../../actions/cartAction";
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

  onCheckout() {
    const err_msg = document.getElementById("order-err");
    if (this.props.cart.length > 0) {
      this.props.resetCart();
      this.setState({ redirect: "/" });
      err_msg.style.display = "none";
    } else {
      err_msg.style.display = "block";
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    const { cart, totalQuantity, currency } = this.props;
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
          <div id="order" onClick={() => this.onCheckout()}>
            ORDER
          </div>
          <p className="error" id="order-err">
            *can't checkout with an empty cart
          </p>
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

export default connect(mapStateToProps, { resetCart })(Cart);
