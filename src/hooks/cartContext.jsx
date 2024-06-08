import {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
  const [dataCart, setDataCart] = useState([]);

  const addItemToCart = item => {
    setDataCart([...dataCart, item]);
  };

  const removeItemFromCart = (itemId) => {
    console.log(itemId);
    const updatedCartItems = dataCart.filter(
      item =>
        item._id !== itemId 
    );

    setDataCart(updatedCartItems);
  };

  const removeFromCart = (itemIds) => {
    console.log('Chạy tới đây rồi');
  
    console.log(itemIds, "hhhhh");
  
    console.log(dataCart._id , "kkkjjjjjj");
  
    console.log(dataCart, "ppppppppppp");
  
    const updatedCartItems = dataCart.filter(
      item => !itemIds.includes(item._id) // Lọc ra các mục không có trong danh sách ID cần xóa
    );
    console.log(updatedCartItems , "updateCartItem");
  
    setDataCart(updatedCartItems);
  };


  return (
    <CartContext.Provider
      value={{ dataCart, setDataCart, addItemToCart, removeItemFromCart , removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function Cart() {
  return useContext(CartContext);
}
