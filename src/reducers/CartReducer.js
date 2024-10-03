export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_AMOUNT = "UPDATE_AMOUNT";

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const newProduct = action.payload;
      const product = state.findIndex((item) => item.id === newProduct.id);
      if (product === -1) {
        newProduct.quantidade = 1;
        return [...state, newProduct];
      } else {
        return state.map((item, index) =>
          index === product
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

    case REMOVE_PRODUCT:
      const produCTId = action.payload;
      return state.filter((item) => item.id !== produCTId);

    case UPDATE_AMOUNT:
      const { productId: id, quantidade } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      );

    default:
      return state;
  }
};
