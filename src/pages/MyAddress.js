import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountHeader from '../component/AccountHeader';
import AddAddressForm from '../component/CustomerInformation/AddAddressForm';

function MyAddress() {
  const [allAddresses, setAllAddresses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(0);
  const [addressFrom, setAddressFrom] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    phoneNumber: '',
  });
  const [errorAddressFrom, setErrorAddressFrom] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    province: '',
    district: '',
    subDistrict: '',
    phoneNumber: '',
  });

  useEffect(() => {
    try {
      const run = async () => {
        const {
          data: { allAddress, count },
        } = await axios.get('/address');
        setAllAddresses(allAddress);
        setCount(count);
      };
      run();
    } catch (err) {
      console.log(err.message);
    }
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/address/${id}`);
      setRefresh((cur) => !cur);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickAddAddress = async () => {
    try {
      await axios.post('/address', addressFrom);
      setAddressFrom({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        province: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        phoneNumber: '',
      });
      setRefresh((cur) => !cur);
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <>
      <AccountHeader />
      <div className='container '>
        <h6 className=' fw-bold d-flex justify-content-center mt-5 mb-2'>SHIPPING ADDRESS</h6>
        {allAddresses.length === 0 ? (
          <div className='d-flex justify-content-center mb-4'>
            <div style={{ width: '45%' }} className='d-flex flex-column align-items-center'>
              <AddAddressForm
                count={0}
                addressFrom={addressFrom}
                setAddressFrom={setAddressFrom}
                errorAddressFrom={errorAddressFrom}
                setErrorAddressFrom={setErrorAddressFrom}
              />
              <button className='btn btn-dark' style={{ width: '8.854166666666667vw' }} onClick={handleClickAddAddress}>
                ADD ADDRESS
              </button>
            </div>
          </div>
        ) : (
          <>
            {allAddresses.map((item) => (
              <div key={item.id} className='d-flex flex-row justify-content-center mx-0 mb-3'>
                <div className='flex-start border border-dark border-end-0 px-5 py-3' style={{ width: '35vw' }}>
                  <h6>
                    {`${item.firstName}
              ${item.lastName}
              `}
                  </h6>
                  <h6>{item.phone}</h6>
                  <h6>
                    {`${item.address1} 
              ${item.address2},
              ${item.district},
              ${item.province},
              ${item.postalCode}`}
                  </h6>
                </div>
                <div className='flex-end d-flex'>
                  <button
                    style={{
                      backgroundColor: '#FFD6DC',
                      border: '1px solid #000000',
                      borderRight: 'none',
                      width: '50px',
                    }}
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to={{
                        pathname: '/addNewAddress',
                        state: item,
                      }}
                    >
                      <i className='bi bi-pencil-square fs-4' style={{ cursor: 'pointer' }}></i>
                    </Link>
                  </button>
                  <button
                    style={{ backgroundColor: '#FFD6DC', border: '1px solid #000000', width: '50px' }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className='bi bi-trash fs-4' style={{ cursor: 'pointer' }}></i>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {count ? (
          <h6 className='d-flex justify-content-center mb-5' style={{}}>
            <Link to={{ pathname: '/addNewAddress' }}>
              <button className='btn' style={{ fontSize: '14px', cursor: 'pointer' }}>
                ADD NEW
              </button>
            </Link>
          </h6>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default MyAddress;
