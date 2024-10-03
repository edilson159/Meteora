import { createContext, useState } from "react";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  return (
    <CartContext.Provider
      value={{ cart, setCart, amount, setAmount, totalValue, setTotalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
