import React, { Component } from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../../actions/cartAction";
import "./CartWindowProduct.css";

class CartWindowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  render() {
    const { product, currency, currencies } = this.props;

    return (
      <div className="window-product">
        <div className="window-info">
          <p>{product.brand}</p>
          <p>{product.name}</p>
          <h3>
            {currency.symbol}{" "}
            {product.prices[currencies.indexOf(currency)].amount}
          </h3>
          <div className="window-attributes">
            {product.attributes.map((a) => (
              <div key={a.id} className="window-attribute">
                <p>{a.name}:</p>
                <div className="window-items">
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
                            ? "window-item-swatch swatch-selected"
                            : "window-item-swatch"
                          : i.selected
                          ? "window-item-text text-selected"
                          : "window-item-text"
                      }
                    >
                      {a.type !== "swatch" ? i.value : ""}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="window-gallery">
          <div className="quantity">
            <div className="pm" onClick={() => this.props.increase(product)}>
              +
            </div>
            <div id="quantity">{product.quantity}</div>
            <div className="pm" onClick={() => this.props.decrease(product)}>
              -
            </div>
          </div>
          <img
            src={product.gallery[0]}
            alt="main-img"
            className="window-img"
          ></img>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencyReducer.currency,
  currencies: state.currencyReducer.currencies,
});

const mapDispatchToProps = {
  increase,
  decrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartWindowItem);
