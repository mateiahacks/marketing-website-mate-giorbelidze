import React, { Component } from "react";
import "./ProductCard.css";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
    };
  }

  render() {
    return (
      <div className="card">
        {!this.props.instock && (
          <div id="overlay" className="pdp-overlay">
            <div id="text">OUT OF STOCK</div>
          </div>
        )}
        <img src={this.props.img} alt="" />
        <p>
          {this.props.brand} {this.props.title}
        </p>
        <p id="price">
          {this.props.symb} {this.props.price?.toFixed(2)}
        </p>
      </div>
    );
  }
}
