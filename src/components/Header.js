import React, { Component } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCategory } from "../actions/categoryAction";
import { setCurrency, fetchCurrencies } from "../actions/currencyAction";
import { resetCart } from "../actions/cartAction";
import CartWindowProduct from "./cart/CartWindowProduct";
import logo from "../images/logo.png";
import "./Header.css";
import "./cart/CartWindowProduct.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false,
    };
  }

  toggleCurrencies() {
    const el = document.getElementById("currs");
    el.style.display === "block"
      ? (el.style.display = "none")
      : (el.style.display = "block");
  }

  componentDidMount() {
    window.addEventListener("mouseup", (event) => {
      const el = document.getElementById("currs");
      if (event.target !== el && event.target.parentNode !== el) {
        el.style.display = "none";
      }
    });
  }

  totalSum() {
    const cart = this.props.cart;
    const currs = this.props.currencies;
    const curr = this.props.currency;
    return cart
      .map((p) => p.quantity * p.prices[currs.indexOf(curr)].amount)
      .reduce((first, second) => first + second, 0);
  }

  selectCategory(cat) {
    this.props.setCategory(cat.name);
  }

  onCheckout() {
    const err_msg = document.getElementById("empty-cart-header");
    if (this.props.cart.length > 0) {
      this.setState({ showCart: false });
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
    return (
      <div>
        <div className="header" id="header">
          {this.state.showCart && (
            <div className="cart-window">
              <h3>My Bag, {this.props.totalQuantity} items</h3>
              <div className="window-products">
                {this.props.cart.map((p) => (
                  <CartWindowProduct
                    key={this.props.cart.indexOf(p)}
                    product={p}
                  />
                ))}
              </div>
              <div id="window-total">
                <h3>Total</h3>
                <h3>
                  {this.props.currency.symbol} {this.totalSum().toFixed(2)}
                </h3>
              </div>
              <div className="window-buttons">
                <Link to="/cart" className="text-link">
                  <div id="cart-link">VIEW BAG</div>
                </Link>
                <div id="checkout" onClick={() => this.onCheckout()}>
                  CHECKOUT
                </div>
              </div>
              <p className="error" id="empty-cart-header">
                *can't checkout with an empty cart
              </p>
            </div>
          )}
          <div className="header__left">
            {this.props.categories?.map((c) => (
              <Link to="/" className="text-link">
                <div
                  key={c.name}
                  onClick={() => this.selectCategory(c)}
                  className={
                    c.name === this.props.currentCategory
                      ? "category category-selected"
                      : "category"
                  }
                >
                  {c.name?.toUpperCase()}
                </div>
              </Link>
            ))}
          </div>

          <Link to="/">
            <img src={logo} alt="logo" id="logo"></img>
          </Link>
          <div className="header__right flex-centered">
            <div
              className="currency flex-centered"
              onClick={this.toggleCurrencies}
            >
              <p id="curr-symbol">{this.props.currency.symbol}</p>
              <p>
                <MdKeyboardArrowDown size={15} />
              </p>
              <ul id="currs">
                {this.props.currencies.map((e) => (
                  <li key={e.label} onClick={() => this.props.setCurrency(e)}>
                    {e.symbol} {e.label}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="cart"
              onClick={() => this.setState({ showCart: !this.state.showCart })}
            >
              <BsCart2 id="cart-icon" size={25} />
              {this.props.totalQuantity !== 0 && (
                <div className="cart-num">{this.props.totalQuantity}</div>
              )}
            </div>
          </div>
        </div>
        {this.state.showCart && (
          <div
            className="bg"
            onClick={() => this.setState({ showCart: false })}
          ></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.categoryReducer.category,
  categories: state.categoryReducer.categories,
  currencies: state.currencyReducer.currencies,
  currency: state.currencyReducer.currency,
  cart: state.cartReducer.cart,
  totalQuantity: state.cartReducer.totalQuantity,
});

const mapDispatchToProps = {
  setCategory,
  setCurrency,
  fetchCurrencies,
  resetCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
