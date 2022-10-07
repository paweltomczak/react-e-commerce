import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const clearItemFromCart = () =>
    removeItemFromCart({ ...cartItem, quantity: 0 });

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={clearItemFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
