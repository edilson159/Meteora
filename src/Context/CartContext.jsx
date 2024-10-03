import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { CartReducer } from "../reducers/CartReducer";

export const CartContext = createContext();
CartContext.displayName = "Cart";

const stateInitial = [];

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, stateInitial);
  const [amount, setAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const { totalTem, amountTemp } = useMemo(() => {
    return cart.reduce(
      (accumulator, product) => ({
        amountTemp: accumulator.amountTemp + product.quantidade,
        totalTem: accumulator.totalTem + product.preco * product.quantidade,
      }),
      {
        amountTemp: 0,
        totalTem: 0,
      }
    );
  }, [cart]);

  useEffect(() => {
    setAmount(amountTemp);
    setTotalValue(totalTem);
  });
  return (
    <CartContext.Provider value={{ cart, dispatch, amount, totalValue }}>
      {children}
    </CartContext.Provider>
  );
};
