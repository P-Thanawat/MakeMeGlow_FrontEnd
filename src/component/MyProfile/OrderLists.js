import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import editButton from '../../pic/icons/edit.png';
import saveButton from '../../pic/icons/save.png';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';

function OrderLists({ isAdminPage, id, customerName, date, amount, status, trackingNumber }) {
  const [save, setSave] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editStatus, setEditStatus] = useState(true);
  const [editTrackingNumber, setEditTrackingNumber] = useState(trackingNumber);
  const [shippingStatus, setShippingStatus] = useState(status);
  const [selectSatatus, setSelectStatus] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [statusToBack, setStatusToBack] = useState();
  const [trackNoToBack, setTrackNoToBack] = useState();
  const history = useHistory();
  const {
    state: { user },
  } = useAuthContext();
  const role = user ? user.role : 'GUEST';

  const handleEdit = () => {
    setSave(true);
    setEdit(true);
    setEditInput(true);
    setEditStatus(true);
    setSelectStatus(true);
  };

  const handleEditTracking = (e) => {
    setEditTrackingNumber(e.target.value);
  };

  const handleSave = () => {
    setStatusToBack(shippingStatus);
    setTrackNoToBack(editTrackingNumber);
    setEditStatus(false);
    setSelectStatus(true);
    setEditInput(false);
    setSave(false);
    window.location.reload();
  };
  // const moreOrderDetail = () => {
  //   history.push("/product_summary");
  // };

  const handleStatus = (e) => {
    setShippingStatus(e.target.value);
  };

  useEffect(() => {
    try {
      const updateShippingInfo = async () => {
        await axios.put(`/orders/order_admin_edit_shipping_info/${id}`, {
          shippingStatus: statusToBack,
          shippingTrackingId: trackNoToBack,
        });

        // console.log(trackNoToBack);
        // alert("Shipping information has been updated.");
      };
      updateShippingInfo();
    } catch (err) {
      console.log(err);
    }
  }, [statusToBack, trackNoToBack]);
  return (
    <>
      <div className='row'>
        <div className='col-2'>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={role === 'ADMIN' ? `/adminOrderSummary/${id}` : `/userOrderSummary/${id}`}
          >
            <h6 className='fs-bold'>{id}</h6>
          </Link>
        </div>
        <div className='col-2'>
          <h6 className='fs-bold'>{customerName}</h6>
        </div>
        <div className='col-2'>
          <h6 className='fs-bold'>{date}</h6>
        </div>
        <div className='col-2'>
          <h6 className='fs-bold'>{amount}</h6>
        </div>
        <div className='col-1'>
          {isAdminPage ? (
            edit ? (
              editStatus ? (
                <>
                  <select
                    value={shippingStatus}
                    style={{ backgroundColor: '#F4F4F4', color: '#000000', border: 'none' }}
                    onChange={handleStatus}
                  >
                    <option
                      className='fw-bold rounded-3 '
                      style={{ backgroundColor: '#E5F7EA', color: '#05B535' }}
                      value='To Ship'
                    >
                      To ship
                    </option>
                    <option
                      className='fw-bold rounded-3'
                      style={{ backgroundColor: '#FDF6E9', color: '#EDB543' }}
                      value='Delivery'
                    >
                      Delivery
                    </option>
                  </select>
                </>
              ) : selectSatatus ? (
                <span
                  className='fw-bold rounded-3'
                  style={{
                    width: '70px',
                    height: '30px',
                    backgroundColor: `${shippingStatus === 'To Ship' ? '#E5F7EA' : '#FDF6E9'}`,
                    color: `${shippingStatus === 'To Ship' ? '#05B535' : '#EDB543'}`,
                    border: 'none',
                  }}
                >
                  {shippingStatus}
                </span>
              ) : (
                <>
                  <span
                    className='fw-bold rounded-3'
                    style={{
                      width: '70px',
                      height: '30px',
                      backgroundColor: `${shippingStatus === 'To Ship' ? '#E5F7EA' : '#FDF6E9'}`,
                      color: `${shippingStatus === 'To Ship' ? '#05B535' : '#EDB543'}`,
                      border: 'none',
                    }}
                  >
                    {shippingStatus}
                  </span>
                </>
              )
            ) : (
              <>
                <span
                  className='fw-bold rounded-3'
                  style={{
                    width: '70px',
                    height: '30px',
                    backgroundColor: `${shippingStatus === 'To Ship' ? '#E5F7EA' : '#FDF6E9'}`,
                    color: `${shippingStatus === 'To Ship' ? '#05B535' : '#EDB543'}`,
                    border: 'none',
                  }}
                >
                  {shippingStatus}
                </span>
              </>
            )
          ) : (
            <>
              <span
                className='fw-bold rounded-3'
                style={{
                  width: '70px',
                  height: '30px',
                  backgroundColor: `${shippingStatus === 'To Ship' ? '#E5F7EA' : '#FDF6E9'}`,
                  color: `${shippingStatus === 'To Ship' ? '#05B535' : '#EDB543'}`,
                  border: 'none',
                }}
              >
                {shippingStatus}
              </span>
            </>
          )}
        </div>
        <div className='col-2 d-flex justify-content-between'>
          {isAdminPage ? (
            edit ? (
              editInput ? (
                <input
                  type='text'
                  className='fs-bold'
                  value={editTrackingNumber}
                  style={{ width: '80%', height: '30px', border: 'none' }}
                  onChange={handleEditTracking}
                />
              ) : (
                <span style={{ height: '30px', border: 'none' }}>{editTrackingNumber}</span>
              )
            ) : (
              <span style={{ height: '30px', border: 'none' }}>{editTrackingNumber}</span>
            )
          ) : (
            <span style={{ height: '30px', border: 'none' }}>{trackingNumber}</span>
          )}
        </div>
        {isAdminPage ? (
          <div className='col-1'>
            {!save ? (
              <button className='btn btn-outline-primary' onClick={handleEdit}>
                <i className='bi bi-pencil-square'></i>
              </button>
            ) : (
              <button className='btn btn-outline-success' onClick={handleSave}>
                <i className='bi bi-save'></i>
              </button>
            )}
          </div>
        ) : (
          ''
        )}

        <hr className='mt-2' />
      </div>
    </>
  );
}

export default OrderLists;
