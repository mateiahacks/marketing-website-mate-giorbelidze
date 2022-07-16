const initialState = {
  category: "",
  categories: [],
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CAT":
      return {
        ...state,
        category: action.payload,
      };
    case "FETCH_CATS":
      return {
        ...state,
        categories: action.payload,
        category: action.payload[0].name,
      };
    default:
      return state;
  }
}
