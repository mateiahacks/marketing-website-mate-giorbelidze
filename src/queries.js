import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

export const productsByCategory = (category) => {
  return gql`
      {
        category(input: { title: "${category}" }) {
          name
          products {
            id
            gallery
            name
            brand
            inStock
            prices {
              amount
            }
          }
        }
      }
    `;
};

export const categories = () => {
  return gql`
    {
      categories {
        name
      }
    }
  `;
};

export const currencies = () => {
  return gql`
    {
      currencies {
        label
        symbol
      }
    }
  `;
};

export const product = (id) => {
  return gql`
    {
      product(id: "${id}") {
        id
        name
        gallery
        brand
        description
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  `;
};
