import React, { Component } from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productsAction";
import "./Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.fetchProducts(this.props.currentCategory);
  }

  componentDidUpdate() {
    this.props.fetchProducts(this.props.currentCategory);
  }

  capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join("");

  render() {
    return (
      <div className="home">
        <Header />
        <div className="home__inner" id="home">
          <h1>
            {this.props.currentCategory &&
              this.capitalizeFirstLetter(this.props.currentCategory)}
          </h1>
          <div className="products">
            {this.props.products &&
              this.props.products.map((e) => (
                <Link className="text-link" to={"/product/" + e.id} key={e.id}>
                  <ProductCard
                    title={e.name}
                    img={e.gallery[0]}
                    price={
                      e.prices[
                        this.props.currencies.indexOf(this.props.currency)
                      ]?.amount
                    }
                    symb={this.props.currency.symbol}
                    brand={e.brand}
                    id={e.id}
                    instock={e.inStock}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.categoryReducer.category,
  products: state.productsReducer.products,
  currencies: state.currencyReducer.currencies,
  currency: state.currencyReducer.currency,
});

export default connect(mapStateToProps, { fetchProducts })(Home);
