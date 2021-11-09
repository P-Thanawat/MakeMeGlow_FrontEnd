import React from 'react';
import { formatePrice } from '../service/IntlFormatter';
import OrderItemList from './orderSummary/OrderItemList';

function OrderSummary({ orderItems, subTotal, shipping, status }) {
  const orderItemsShow = orderItems.map((item) => {
    return (
      <OrderItemList
        key={item.id}
        imageUrl={item.imageUrl}
        name={item.name}
        color={item.colorName}
        quality={item.quality}
        totalPrice={item.price * item.quality}
      />
    );
  });

  return (
    <>
      <div className='d-flex justify-content-between align-items-center' style={{ borderBottom: '1px solid #0003' }}>
        <h2 className='pb-3'>ORDER SUMMARY</h2>
        {status && (
          <p
            className='badge py-3'
            style={{ fontSize: '14px', padding: '0px 10px', backgroundColor: '#E5F7EA', color: '#05B535' }}
          >
            {status}
          </p>
        )}
      </div>
      <div className='overflow-auto' style={{ maxHeight: '29.16666666666668vw' }}>
        {orderItemsShow}
      </div>
      <div
        className='d-flex align-items-end'
        style={{ width: '100%', borderBottom: '1px solid #0003', height: '7.291666666666667vw' }}
      >
        <div className='row px-0 mx-0' style={{ width: '100%' }}>
          <div className='col-6'>
            <h5>SUBTOTAL</h5>
          </div>
          <div className='col-6 d-flex justify-content-end p-0 pe-3'>
            <p>{formatePrice(subTotal)}</p>
          </div>
          <div className='col-6'>
            <h5>SHIPPING</h5>
          </div>
          <div className='col-6 d-flex justify-content-end p-0 pe-3'>
            <p>{formatePrice(shipping)}</p>
          </div>
        </div>
      </div>
      <div className='row mt-3 px-0 mx-0' style={{ width: '100%' }}>
        <div className='col-6'>
          <h5>TOTAL</h5>
        </div>
        <div className='col-6 d-flex justify-content-end p-0 pe-3'>
          <p>{formatePrice(subTotal + shipping)}</p>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
