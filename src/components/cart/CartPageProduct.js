import React, { Component } from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../../actions/cartAction";
import arrow from "../../images/right-arrow.png";

class CartPageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.prod.gallery,
      counter: 2,
    };
  }

  // function for slide to next photo in gallery
  next() {
    const el =
      document.querySelectorAll(".cart-prod-img")[
        this.props.cart.indexOf(this.props.prod)
      ];
    if (this.state.counter === this.state.images.length + 1) {
      el.style.transform = "translateX(" + -300 * this.state.counter + "px)";
      setTimeout(() => {
        el.style.transition = "none";
        el.style.transform =
          "translateX(" +
          -300 * (this.state.counter - this.state.images.length) +
          "px)";
        this.setState({ counter: 2 });
      }, 400);
    } else {
      //console.log(this.state.counter);
      el.style.transition = "transform 0.4s ease-in-out";
      this.setState({ counter: this.state.counter + 1 });
      el.style.transform = "translateX(" + -300 * this.state.counter + "px)";
    }
  }

  // function for slide to previous photo in gallery
  prev() {
    const el =
      document.querySelectorAll(".cart-prod-img")[
        this.props.cart.indexOf(this.props.prod)
      ];
    if (this.state.counter === 2) {
      el.style.transition = "transform 0.4s ease-in-out";
      el.style.transform =
        "translateX(" + -300 * (this.state.counter - 2) + "px)";
      setTimeout(() => {
        el.style.transition = "none";
        el.style.transform =
          "translateX(" +
          -300 * (this.state.counter + this.state.images.length - 2) +
          "px)";
        this.setState({ counter: this.state.images.length + 1 });
      }, 400);
    } else {
      el.style.transition = "transform 0.4s ease-in-out";
      this.setState({ counter: this.state.counter - 1 });
      el.style.transform =
        "translateX(" + -300 * (this.state.counter - 2) + "px)";
    }
  }

  render() {
    const { currency, currencies } = this.props;
    const prod = this.props.prod;
    return (
      <div className="cart-page-prod">
        <div className="cart-product">
          <div className="info page-info">
            <div className="info-header page-info-header">
              <h1 id="brand">{prod.brand}</h1>
              <h1 id="name">{prod.name}</h1>
              <h2 id="cart-prod-price">
                {currency.symbol}
                {prod.prices[currencies.indexOf(currency)].amount}
              </h2>
            </div>
            <div className="attributes">
              {prod.attributes.map((a) => (
                <div key={a.id} className="attribute">
                  <h3>{a.name.toUpperCase()}:</h3>
                  <div className="items">
                    {a.items.map((i) => (
                      <div
                        key={i.id}
                        style={{
                          background: a.type === "swatch" ? i.value : "",
                          border: i.id === "White" ? "1px solid black" : "",
                        }}
                        className={
                          a.type === "swatch"
                            ? i.selected
                              ? "item-swatch swatch-selected"
                              : "item-swatch"
                            : i.selected
                            ? "item-text text-selected"
                            : "item-text"
                        }
                      >
                        {a.type === "swatch" ? "" : i.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-prod-gallery">
            <div className="cart-prod-quantity">
              <div className="quantity cart-page-quantity">
                <div
                  className="pm cart-page-pm"
                  onClick={() => this.props.increase(prod)}
                >
                  +
                </div>
                <div id="quantity">{prod.quantity}</div>
                <div
                  className="pm cart-page-pm"
                  onClick={() => this.props.decrease(prod)}
                >
                  -
                </div>
              </div>
              <div className="cart-gallery-container">
                <div className="cart-prod-img">
                  <img
                    src={prod.gallery[prod.gallery.length - 1]}
                    id="lastClone"
                    alt=""
                  />
                  {prod.gallery.map((url) => (
                    <img key={url} src={url} alt="prod" />
                  ))}
                  <img src={prod.gallery[0]} id="fistClone" alt="" />
                </div>
                <div className="cart-prod-arrows">
                  <img
                    id="left-arrow"
                    src={arrow}
                    onClick={() => this.prev()}
                    alt="arrow"
                  />
                  <img
                    id="right-arrow"
                    src={arrow}
                    onClick={() => this.next()}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
  currencies: state.currencyReducer.currencies,
  cart: state.cartReducer.cart,
});

const mapDispatchToProps = {
  increase,
  decrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPageProduct);
