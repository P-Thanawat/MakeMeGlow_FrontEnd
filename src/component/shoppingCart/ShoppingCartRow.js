import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { formatePrice } from '../../service/IntlFormatter';
import axios from '../../config/axios';

function ShoppingCartRow({ cartItem }) {
  const { dispatch } = useCartContext();

  const handleClickIncreaseQuality = async () => {
    try {
      const cartItemUpdate = { ...cartItem, quality: cartItem.quality + 1 };
      await axios.post(`/carts/cart_item/${cartItemUpdate.id}`, { quality: cartItemUpdate.quality });
      dispatch({
        type: 'UPDATE_CART',
        payload: { product: { ...cartItem, quality: cartItem.quality + 1 }, productId: cartItem.productId },
      });
    } catch (err) {
      console.dir(err);
    }
  };

  const handleClickDecreaseQuality = async () => {
    if (cartItem.quality > 1) {
      try {
        const cartItemUpdate = { ...cartItem, quality: cartItem.quality - 1 };
        await axios.post(`/carts/cart_item/${cartItemUpdate.id}`, { quality: cartItemUpdate.quality });
        dispatch({
          type: 'UPDATE_CART',
          payload: { product: { ...cartItem, quality: cartItem.quality - 1 }, productId: cartItem.productId },
        });
      } catch (err) {
        console.dir(err);
      }
    } else {
      try {
        await axios.delete(`/carts/cart_item/${cartItem.id}`);
        dispatch({
          type: 'DELETE_CART',
          payload: { productId: cartItem.productId },
        });
      } catch (err) {
        console.dir(err);
      }
    }
  };

  const handleClickDeleteCartItem = async () => {
    try {
      await axios.delete(`/carts/cart_item/${cartItem.id}`);
      dispatch({
        type: 'DELETE_CART',
        payload: { productId: cartItem.productId },
      });
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <>
      <div className='row border-bottom p-2'>
        <div className='col-6 d-flex'>
          <img src={cartItem.imageUrl} alt='' style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          <div className='d-flex justify-content-center flex-column ms-3'>
            <h6 className=''>{cartItem.name}</h6>
            <h6 className='' style={{ opacity: '50%' }}>
              {cartItem.colorName}
            </h6>
          </div>
        </div>
        <div className='col-2'>
          <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100%' }}>
            <div className='border border-dark rounded-3' style={{ height: '40px' }}>
              <button className='btn' onClick={handleClickDecreaseQuality}>
                -
              </button>
              <span>{cartItem.quality}</span>
              <button className='btn' onClick={handleClickIncreaseQuality}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className='col-2 d-flex justify-content-center align-items-center'>
          <h6>{formatePrice(cartItem.price)}</h6>
        </div>
        <div className='col-2 text-center'>
          <div className='d-flex justify-content-between' style={{ height: '100%' }}>
            <div className='d-flex justify-content-center align-items-center' style={{ width: '85%' }}>
              <h6>{formatePrice(cartItem.quality * cartItem.price)}</h6>
            </div>
            <div className='d-flex justify-content-end align-items-start' style={{ width: '15%' }}>
              <button className='btn m-0 p-0' onClick={handleClickDeleteCartItem}>
                <i className='bi bi-x-lg'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCartRow;
