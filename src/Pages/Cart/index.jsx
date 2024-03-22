import Header from "../../components/Header";
import CartListView from "../../components/CartListView";
import CartSummary from "../../components/CartSummary";
import CartContext from "../../context/CartContext";
import EmptyCartView from "../../components/EmptyCartView";

import "./index.css";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList, removeAllCartItems } = value;
      const showEmptyView = cartList.length === 0;
      const onClickRemoveAllBtn = () => {
        removeAllCartItems();
      };
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  onClick={onClickRemoveAllBtn}
                  type="button"
                  className="remove-all-btn"
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);
export default Cart;
