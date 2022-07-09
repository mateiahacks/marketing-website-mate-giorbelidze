import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productsReducer from "./productsReducer";
import currencyReducer from "./currencyReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  categoryReducer,
  productsReducer,
  currencyReducer,
  cartReducer,
});
