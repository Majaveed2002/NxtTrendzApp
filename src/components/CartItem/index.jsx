import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import CartContext from "../../context/CartContext";

import "./index.css";

const CartItem = (props) => (
  <>
    <CartContext.Consumer>
      {(value) => {
        const {
          removeFromCart,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value;
        console.log(value);
        const { cartItemDetails } = props;
        let { id, title, brand, quantity, price, imageUrl } = cartItemDetails;
        const onDeleteCartItem = () => {
          removeFromCart(id);
        };
        const onClickDecrement = () => {
          decrementCartItemQuantity(id);
        };
        const onClickIncrement = () => {
          incrementCartItemQuantity(id);
        };
        return (
          <li className="cart-item">
            <img className="cart-product-image" src={imageUrl} alt={title} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{title}</p>
                <p className="cart-product-brand">by {brand}</p>
              </div>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare color="#52606D" size={12} />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare color="#52606D" size={12} />
                </button>
              </div>
              <div className="total-price-delete-container">
                <p className="cart-total-price">Rs {price * quantity}/-</p>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onDeleteCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onDeleteCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </li>
        );
      }}
    </CartContext.Consumer>
  </>
);

export default CartItem;
