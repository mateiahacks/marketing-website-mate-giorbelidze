// decreasing specific product quantity
export const decrease = (prod) => (dispatch) => {
  dispatch({
    type: "DECREASE",
    payload: { ...prod, quantity: prod.quantity - 1 },
  });
};

// increasing specific product quantity
export const increase = (prod) => (dispatch) => {
  dispatch({
    type: "INCREASE",
    payload: { ...prod, quantity: prod.quantity + 1 },
  });
};

// adding product to cart
export const addToCart = (prod) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: prod,
  });
};

// Reseting cart when ordering
export const resetCart = () => (dispatch) => {
  dispatch({
    type: "RESET_CART",
  });
};
