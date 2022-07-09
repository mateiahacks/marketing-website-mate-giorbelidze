import { client, currencies } from "../queries";

export const fetchCurrencies = () => (dispatch) => {
  const query = currencies();
  client
    .query({
      query: query,
    })
    .then((res) => {
      dispatch({
        type: "FETCH_CURRENCIES",
        payload: res.data.currencies,
      });
    });
};

export const setCurrency = (curr) => (dispatch) => {
  dispatch({
    type: "SET_CURRENCY",
    payload: curr,
  });
};
