import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AccountHeader from '../component/AccountHeader'
import OrderSummary from '../component/OrderSummary'
import '../css/userOrderSummary.css'

function UserOrderSummary() {
  const { orderId } = useParams();
  const [orderItem, setOrderItem] = useState([])
  const [address, setAddress] = useState({})
  useEffect(() => {
    try {
      const run = async () => {
        const { data: { orderItem, address } } = await axios.get(`/orders/getOrderItemById/${orderId}`)
        setOrderItem(orderItem)
        setAddress(address)
      }
      run();
    }
    catch (err) {
      console.log(err.message)
    }
  }, [])


  return (
    <div className='userOrderSummary'>
      <AccountHeader />
      <div className="container" style={{ marginTop: '50px', width: '70vw' }}>
        <h5>{orderItem?.[0]?.orderId}</h5>
        <div className="container" style={{ margin: '50px 0px ' }}>
          <div className="row">
            <div className="col-6 pe-5">
              <OrderSummary orderItems={orderItem} subTotal={orderItem.reduce((acc, item) => acc + +item.amount, 0)} shipping={0} status={orderItem?.[0]?.status} />
            </div>
            <div className="col-6 ps-5">
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>SHIPPING ADDRESS</p>

              <hr />
              <div>
                <p className='m-0' style={{ fontSize: '16px' }}>{address?.firstName} {address?.lastName}</p>
                <p className='m-0' style={{ fontSize: '16px' }}>{address?.phoneNumber}</p>
                <p className='m-0' style={{ fontSize: '16px' }}>{address?.address1}, {address?.address2}</p>
                <p className='m-0' style={{ fontSize: '16px' }}>{address?.district} {address?.subDistrict}</p>
                <p className='m-0' style={{ fontSize: '16px' }}>{address?.province} {address?.postalCode}</p>
              </div>
              <div style={{ fontSize: '14px', marginTop: '20px', width: '20vw', padding: '10px 0px' }} className="badge bg-dark">{address?.User?.email}</div>
              {/* <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '50px' }}>PAYMENT</p>
              <hr />
              <p>PAID BY: CREDITS CARD</p> */}
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '50px' }}>DELIVERY</p>
              <hr />
              <p>TRACKING NUMBER: {orderItem?.[0]?.tracking}</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default UserOrderSummary
