import React from 'react';
import ShoppingCartRow from '../component/shoppingCart/ShoppingCartRow';
import ShoppingCartTotal from '../component/shoppingCart/ShoppingCartTotal';
import { useCartContext } from '../context/CartContext';
import emptyShoppingCart from '../pic/icons/empty-cart-png-9.png';

export default function ShoppingCart() {
  const {
    state: { carts },
  } = useCartContext();

  const totalPrice = carts.reduce((acc, cur) => {
    return acc + cur.quality * cur.price;
  }, 0);
  return (
    <>
      {carts.length > 0 ? (
        <>
          <div className='d-flex justify-content-evenly ms-5'>
            <div className='p-3 ps-0 me-0 mt-5 mb-5' style={{ width: '964px' }}>
              <div className='row border-bottom pb-1'>
                <div className='col-6'>
                  <h5>Product</h5>
                </div>
                <div className='col-2 text-center'>
                  <h5>QTY</h5>
                </div>
                <div className='col-2 text-center'>
                  <h5>Price</h5>
                </div>
                <div className='col-2 text-center'>
                  <div className='d-flex justify-content-center align-items-center' style={{ width: '85%' }}>
                    <h5>Total</h5>
                  </div>
                </div>
              </div>

              {carts.map((item) => (
                <ShoppingCartRow
                  key={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  color={item.colorName}
                  quantity={item.quality}
                  cartItem={item}
                />
              ))}
            </div>
            <ShoppingCartTotal total_price={totalPrice} />
          </div>
        </>
      ) : (
        <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '55vh' }}>
          <div>
            <img
              src={emptyShoppingCart}
              alt='emptycart'
              className='bi bi-cart-x bi-10x ms-3 mt-5  row'
              style={{ width: '100px', height: '100px', cursor: 'pointer', position: 'relative', left: '45%' }}
            />
            <h4 className=' mt-0 pt-0 fw-normal mt-3' style={{ position: 'relative', left: '25%' }}>
              Your cart is currently empty.
            </h4>
            <h5 className=' fw-light mt-3' style={{ position: 'relative', left: '25%' }}>
              Add something to make me happy
            </h5>
          </div>
        </div>
      )}
    </>
  );
}
