import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuthContext } from './AuthContext';
import axios from '../config/axios';

const CartContext = createContext();

const INIT_STATE = {
  carts: [],
  countCart: 0,
};

const REDUCER_FN = (state, action) => {
  switch (action.type) {
    case 'SET_CART': {
      const carts = action.payload.carts;
      const countCart = action.payload.countCart;
      return { carts, countCart };
    }
    case 'ADD_CART': {
      const product = action.payload.product;
      const newCarts = JSON.parse(JSON.stringify(state.carts));
      newCarts.push(product);
      return { carts: newCarts, countCart: newCarts.length };
    }
    case 'UPDATE_CART': {
      const product = action.payload.product;
      const productId = action.payload.productId;
      const newCarts = JSON.parse(JSON.stringify(state.carts));
      const idx = newCarts.findIndex((item) => item.productId === productId);
      if (idx !== -1) {
        newCarts[idx] = product;
      }
      return { carts: newCarts, countCart: newCarts.length };
    }
    case 'DELETE_CART': {
      const productId = action.payload.productId;
      const newCarts = JSON.parse(JSON.stringify(state.carts)).filter((item) => item.productId !== productId);
      return { carts: newCarts, countCart: newCarts.length };
    }
    case 'INIT_CART': {
      return {
        carts: [],
        countCart: 0,
      };
    }
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(REDUCER_FN, INIT_STATE);

  const authContext = useAuthContext();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = authContext.state.user?.role === 'CUSTOMER' ? await axios.get('/carts') : null;
        if (res) {
          dispatch({ type: 'SET_CART', payload: { carts: res.data.carts, countCart: res.data.countCart } });
        }
      } catch (err) {
        console.dir(err);
      }
    };
    fetchCart();
  }, [authContext]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must use in CartContextProvider!!');
  }

  return context;
};

export { useCartContext, CartContextProvider };
