import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetailView from "./Pages/ProductDetailView";
import Cart from "./Pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import CartContext from "./context/CartContext";

import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (product) => {
    const index = cartList.findIndex((item) => item.title === product.title);
    console.log(index);
    if (index === -1) {
      setCartList((prevState) => [...prevState, product]);
    } else {
      const updatedCartList = [...cartList];
      updatedCartList[index].quantity++;
      setCartList(updatedCartList);
    }
  };

  const deleteCartItem = (id) => {
    setCartList((prevState) => prevState.filter((item) => item.id !== id));
  };

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    const updatedCartList = cartList.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else {
        return cartItem;
      }
    });
    setCartList(updatedCartList);
  };

  const decrementCartItemQuantity = (id) => {
    const productObject = cartList.find(
      (eachCartItem) => eachCartItem.id === id
    );
    if (productObject.quantity > 1) {
      const updatedCartList = cartList.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return cartItem;
        }
      });
      setCartList(updatedCartList);
    } else {
      deleteCartItem(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem: addCartItem,
        removeCartItem: deleteCartItem,
        incrementCartItemQuantity: incrementCartItemQuantity,
        decrementCartItemQuantity: decrementCartItemQuantity,
        removeAllCartItems: removeAllCartItems,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
