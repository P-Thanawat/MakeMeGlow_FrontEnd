import React, { useEffect, useRef, useState } from 'react';
import OrderTable from '../component/MyProfile/OrderTable';
import ToShip from '../pic/icons/ToShip.png';
import Deliver from '../pic/icons/deliver.png';
import AdminHeader from '../component/AdminHeader';
import Pagination from '../component/Pagination';
import axios from '../config/axios';

function AdminOrder() {
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
      <AdminHeader />
      <h5 className='container fw-bolder my-4'>ORDERS</h5>
      <div className='container d-flex  justify-content-between'>
        <div className='d-flex justify-content-between '>
          <div
            className='ms-5 me-2 border rounded-3 d-flex justify-content-around'
            style={{ width: '200px', height: '75px' }}
          >
            <div className='mt-2 ms-3'>
              <h4 className='fw-bolder '>{countToShip}</h4>
              <h6 className='fw-light ' style={{ fontSize: '15px' }}>
                To ship
              </h6>
            </div>
            <img src={ToShip} alt='' style={{ width: '60px', height: '60px' }} className='mt-2' />
          </div>
          <div
            className='me-2 border rounded-3 d-flex justify-content-around'
            style={{ width: '200px', height: '75px' }}
          >
            <div className='mt-2 ms-3'>
              <h4 className='fw-bolder'>{countDelivery}</h4>
              <h6 className='fw-light' style={{ fontSize: '15px' }}>
                Delivery
              </h6>
            </div>
            <img src={Deliver} alt='' style={{ width: '60px', height: '60px' }} className='mt-2' />
          </div>
        </div>
        <div className='me-5 mt-5  '>
          <Pagination countPage={Math.ceil((countToShip + countDelivery) / 7)} onPage={onPage} setOnPage={setOnPage} />
        </div>
      </div>
      <OrderTable isAdminPage={true} orderData={orderData} />
    </>
  );
}

export default AdminOrder;
