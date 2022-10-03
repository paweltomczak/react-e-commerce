import { useContext } from 'react';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((product) => (
          <CartItem cartItem={product} key={product.id} />
        ))}
      </div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
