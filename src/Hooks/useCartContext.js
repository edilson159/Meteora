import { useContext, useEffect, useMemo } from "react";
import { CartContext } from "../Context/CartContext";
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_AMOUNT,
} from "../reducers/CartReducer";

const addProductAction = (newProduct) => ({
  type: ADD_PRODUCT,
  payload: newProduct,
});

const removeProductAction = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

const updateAmountAction = (productId, quantidade) => ({
  type: UPDATE_AMOUNT,
  payload: { productId, quantidade },
});

export const useCartContext = () => {
  const { cart, dispatch, totalValue, amount } = useContext(CartContext);

  function adicionarProduto(newProduct) {
    dispatch(addProductAction(newProduct));
  }

  function removerProduto(id) {
    const product = cart.find((item) => item.id === id);

    if (product && product.quantidade > 1) {
      dispatch(updateAmountAction(id, product.quantidade - 1));
    } else {
      dispatch(removeProductAction(id));
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProductAction(id));
  }

  return {
    cart,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    totalValue,
    amount,
  };
};
