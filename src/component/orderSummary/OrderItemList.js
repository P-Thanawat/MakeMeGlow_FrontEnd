import React from 'react';
import { formatePrice } from '../../service/IntlFormatter';

function OrderItemList({ imageUrl, name, color, quality, totalPrice }) {
  return (
    <div
      className='d-flex align-items-center justify-content-between'
      style={{ height: '7.29166666666667vw', borderBottom: '1px dashed #0005' }}
    >
      <img
        src={imageUrl}
        alt='product_pic'
        style={{ height: '4.6875vw', width: '4.6875vw', objectFit: 'cover' }}
        className='rounded'
      />
      <div className='d-flex flex-column p-2' style={{ width: '100%' }}>
        <h5 className='m-0 p-0'>{name}</h5>
        <p className='m-0 p-0 opacity-50'>{color}</p>
        <div className='d-flex justify-content-between'>
          <p className='m-0 p-0 opacity-50'>Qty: {quality}</p>
          <p className='m-0 p-0 pe-3'>{formatePrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItemList;
