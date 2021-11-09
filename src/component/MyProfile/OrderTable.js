import React from 'react';
import OrderLists from './OrderLists';
import { formatePrice } from '../../service/IntlFormatter';

function OrderTable({ isAdminPage, orderData }) {
  return (
    <>
      <div className={`container mb-5 ${isAdminPage ? '' : 'mt-5'}`}>
        <div className='border rounded-3 px-5 py-2 my-3 mx-5'>
          <div className='row py-3'>
            <div className='col-2 '>
              <h6 className='fs-bold'>Order ID</h6>
            </div>
            <div className='col-2'>
              <h6 className='fs-bold'>Customer Name</h6>
            </div>
            <div className='col-2'>
              <h6 className='fs-bold'>Date</h6>
            </div>
            <div className='col-2'>
              <h6 className='fs-bold'>Amount</h6>
            </div>
            <div className='col-1'>
              <h6 className='fs-bold'>Status</h6>
            </div>
            <div className='col-3'>
              <h6 className='fs-bold'>Tracking Number</h6>
            </div>
          </div>
          {orderData.map((item) => (
            <OrderLists
              isAdminPage={isAdminPage}
              key={item.orderId}
              id={item.orderId}
              customerName={item.firstname}
              date={new Date(item.date).toLocaleDateString('en-US')}
              amount={formatePrice(item.amount)}
              status={item.shippingStatus}
              trackingNumber={item.shippingTrackingId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderTable;
