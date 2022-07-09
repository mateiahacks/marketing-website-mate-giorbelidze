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
          <div id="overlay">
            <div id="text">OUT OF STOCK</div>
          </div>
        )}
        <img src={this.props.img} alt="" />
        <p>
          {this.props.brand} {this.props.title}
        </p>
        <p style={{ fontWeight: "500" }}>
          {this.props.symb} {this.props.price}
        </p>
      </div>
    );
  }
}
