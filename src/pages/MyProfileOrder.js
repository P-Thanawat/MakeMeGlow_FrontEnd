import axios from '../config/axios';
import React, { useEffect, useState } from 'react';
import AccountHeader from '../component/AccountHeader';
import OrderTable from '../component/MyProfile/OrderTable';

function MyProfileOrder() {
  const [onPage, setOnPage] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [countDelivery, setCountDelivery] = useState(0);
  const [countToShip, setCountToShip] = useState(0);

  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const res = await axios.get(`/orders?offset=${7 * (onPage - 1)}`);
        console.log(res.data);
        setCountDelivery(res.data?.count[0]?.count || 0);
        setCountToShip(res.data?.count[1]?.count || 0);
        setOrderData(res.data.orderItems);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchOrderItem();
  }, []);
  return (
    <>
      <AccountHeader />
      {orderData.length === 0 ? (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '40vh' }}>
          <p className='text-center' style={{ color: '#979797', fontSize: '1.3vw' }}>
            No order found Looks like you have not made your order yet.
          </p>
        </div>
      ) : (
        <OrderTable isAdminOrder={false} orderData={orderData} />
      )}
    </>
  );
}

export default MyProfileOrder;
