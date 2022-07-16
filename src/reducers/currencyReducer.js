const initialState = {
  currencies: [],
  currency: "",
};

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CURRENCIES":
      return {
        ...state,
        currencies: action.payload,
        currency: action.payload[0],
      };
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
}
