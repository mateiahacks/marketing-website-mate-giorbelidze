import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import CartPageProduct from "./CartPageProduct";

class Cart extends Component {
  render() {
    const { cart, totalQauntity, currency, currencies } = this.props;
    return (
      <div className="d-flex">
        <Header />
        <div className="cart-products">
          <h1>CART</h1>
          {cart.map((product) => (
            <CartPageProduct key={cart.indexOf(product)} prod={product} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  totalQauntity: state.cartReducer.totalQauntity,
  currency: state.currencyReducer.currency,
  currencies: state.currencyReducer.currencies,
});

export default connect(mapStateToProps)(Cart);
