import { client, categories } from "../queries";

export const setCategory = (cat) => (dispatch) => {
  dispatch({
    type: "SET_CAT",
    payload: cat,
  });
};

export const fetchCategories = () => (dispatch) => {
  const query = categories();
  client
    .query({
      query: query,
    })
    .then((res) => {
      dispatch({
        type: "FETCH_CATS",
        payload: res.data.categories,
      });
    });
};
