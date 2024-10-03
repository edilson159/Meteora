import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

export const useCartContext = () => {
  const { cart, setCart, totalValue, setTotalValue, amount, setAmount } =
    useContext(CartContext);

  function mudarQuantidade(id, quantidade) {
    return cart.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temProduto = cart.some((itemNoCarrinho) => {
      return itemNoCarrinho.id === novoProduto.id;
    });

    if (!temProduto) {
      novoProduto.quantidade = 1;
      return setCart((carrinhoAnterior) => [...carrinhoAnterior, novoProduto]);
    }

    const cartUpdate = mudarQuantidade(novoProduto.id, 1);

    setCart([...cartUpdate]);
  }

  function removerProduto(id) {
    const produto = cart.find((itemNoCarrinho) => itemNoCarrinho.id === id);

    const ultimoProduto = produto.quantidade === 1;

    if (ultimoProduto) {
      return setCart((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }

    const cartUpdate = mudarQuantidade(id, -1);

    setCart([...cartUpdate]);
  }

  function removerProdutoCarrinho(id) {
    const produto = cart.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
    setCart(produto);
  }

  useEffect(() => {
    const { totalTem, amountTemp } = cart.reduce(
      (accumulator, product) => ({
        amountTemp: accumulator.amountTemp + product.quantidade,
        totalTem: accumulator.totalTem + product.preco * product.quantidade,
      }),
      {
        amountTemp: 0,
        totalTem: 0,
      }
    );

    setAmount(amountTemp);
    setTotalValue(totalTem);
  }, [cart]);

  return {
    cart,
    setCart,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    totalValue,
    amount,
  };
};
