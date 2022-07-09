import { client, productsByCategory } from "../queries";

export const fetchProducts = (name) => (dispatch) => {
  const query = productsByCategory(name);
  client
    .query({
      query: query,
    })
    .then((res) => {
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: res.data.category.products,
      });
    });
};
