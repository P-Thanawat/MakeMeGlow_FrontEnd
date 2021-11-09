import axios from "../config/axios";
import React, { useEffect, useState } from "react";
import AccountHeader from "../component/AccountHeader";
import { validateAddress1, validateAddress2, validateDistrict, validateFirstName, validateLastName, validatePhoneNumber, validateProvince, validateSubDistrict } from "../service/validateForm";
import { useHistory, useLocation } from "react-router";
import Modal from '../component/Modal';

function AddNewAddress() {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const history = useHistory()
  const location = useLocation();
  const [addressData, setAddressData] = useState({})
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    province: '',
    district: '',
    subDistrict: '',
    phoneNumber: '',
  })
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);


  useEffect(() => {

    const fetchProvince = async () => {
      try {
        const { data: { provinces } } = await axios.get('/locations/province');
        setProvinces(provinces);
        if (location?.state) {
          const { state: address } = location;
          setAddressData({
            firstName: address.firstName,
            lastName: address.lastName,
            address1: address.address1,
            province: address.province,
            district: address.district,
            subDistrict: address.subDistrict,
            phoneNumber: address.phoneNumber,
          })
          const run = async () => {
            const provinceId = provinces.find((item) => item.name === address.province)?.id;
            const { data: { districts } } = await axios.get(`/locations/district/${provinceId}`);
            setDistrict(districts);
            const districtId = districts.find((item) => item.name === address.district)?.id;
            const { data: { sub_districts } } = await axios.get(`/locations/sub_district/${districtId}`);
            setSubDistrict(sub_districts);
            const res = await axios.get(`/locations/postal_code/${districtId}`);
            setAddressData((cur) => ({ ...cur, postalCode: res.data.postal_code }));
          }
          run()
        }
      } catch (err) {
        console.dir(err);
      }
    };
    fetchProvince();
  }, [])



  const inputOnChange = e => {
    if (e.target.id === 'firstName') setError(cur => ({ ...cur, [e.target.id]: validateFirstName(e.target.value) }))
    if (e.target.id === 'lastName') setError(cur => ({ ...cur, [e.target.id]: validateLastName(e.target.value) }))
    if (e.target.id === 'address1') setError(cur => ({ ...cur, [e.target.id]: validateAddress1(e.target.value) }))
    if (e.target.id === 'phoneNumber') setError(cur => ({ ...cur, [e.target.id]: validatePhoneNumber(e.target.value) }))

    setAddressData(cur => ({ ...cur, [e.target.id]: e.target.value }))

  }

  const handleUpdate = async () => {
    try {
      const errorFirstName = validateFirstName(addressData.firstName);
      const errorLastName = validateLastName(addressData.lastName);
      const errorAddress1 = validateAddress1(addressData.address1);
      const errorProvince = validateProvince(addressData.province);
      const errorDistrict = validateDistrict(addressData.district);
      const errorSubDistrict = validateSubDistrict(addressData.subDistrict);
      const errorPhoneNumber = validatePhoneNumber(addressData.phoneNumber);

      setError({
        ...error,
        firstName: errorFirstName,
        lastName: errorLastName,
        address1: errorAddress1,
        province: errorProvince,
        district: errorDistrict,
        subDistrict: errorSubDistrict,
        phoneNumber: errorPhoneNumber,
      });

      if (errorFirstName || errorLastName || errorAddress1 || errorProvince || errorDistrict || errorSubDistrict || errorPhoneNumber) {
        return;
      }

      await axios.put(`/address/${location.state.id}`, addressData)
      setModal({ active: true, message: 'Editing Address is Successful', header: 'STATUS', redirect: '' });
      // alert('Editing Address is Successful')
      history.push('/myAddress')
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const handleAddAddress = async () => {
    try {
      const errorFirstName = validateFirstName(addressData.firstName);
      const errorLastName = validateLastName(addressData.lastName);
      const errorAddress1 = validateAddress1(addressData.address1);
      const errorProvince = validateProvince(addressData.province);
      const errorDistrict = validateDistrict(addressData.district);
      const errorSubDistrict = validateSubDistrict(addressData.subDistrict);
      const errorPhoneNumber = validatePhoneNumber(addressData.phoneNumber);

      setError({
        ...error,
        firstName: errorFirstName,
        lastName: errorLastName,
        address1: errorAddress1,
        province: errorProvince,
        district: errorDistrict,
        subDistrict: errorSubDistrict,
        phoneNumber: errorPhoneNumber,
      });

      if (errorFirstName || errorLastName || errorAddress1 || errorProvince || errorDistrict || errorSubDistrict || errorPhoneNumber) {
        return;
      }

      await axios.post('/address', { ...addressData })
      setModal({ active: true, message: 'Adding Address is Successful', header: 'STATUS', redirect: '' });
      // alert('Adding Address is Successful')
      history.push('/myAddress')
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const handleChangeProvince = async (e) => {
    try {
      if (e.target.id === 'province') setError(cur => ({ ...cur, [e.target.id]: validateProvince(e.target.value) }))
      setAddressData((cur) => ({ ...cur, province: e.target.value }));
      setAddressData((cur) => ({ ...cur, district: '' }));
      setAddressData((cur) => ({ ...cur, subDistrict: '' }));
      setAddressData((cur) => ({ ...cur, postalCode: '' }));
      if (e.target.value) {
        const provinceId = provinces.find((item) => item.name === e.target.value).id;
        const res = await axios.get(`/locations/district/${provinceId}`);
        setDistrict(res.data.districts);
      } else {
        setDistrict([]);
        setSubDistrict([]);
      }
    } catch (err) {
      console.dir(err);
    }
  };

  const handleChangeDistrict = async (e) => {
    try {
      if (e.target.id === 'district') setError(cur => ({ ...cur, [e.target.id]: validateDistrict(e.target.value) }))
      setAddressData((cur) => ({ ...cur, district: e.target.value }));
      setAddressData((cur) => ({ ...cur, subDistrict: '' }));
      setAddressData((cur) => ({ ...cur, postalCode: '' }));
      if (e.target.value) {
        const districtId = district.find((item) => item.name === e.target.value).id;
        const res = await axios.get(`/locations/sub_district/${districtId}`);
        setSubDistrict(res.data.sub_districts);
      } else {
        setSubDistrict([]);
      }
    } catch (err) {
      console.dir(err);
    }
  };

  const handleChangeSubDistrict = async (e) => {
    try {
      if (e.target.id === 'subDistrict') setError(cur => ({ ...cur, [e.target.id]: validateSubDistrict(e.target.value) }))
      setAddressData((cur) => ({ ...cur, subDistrict: e.target.value }));
      if (e.target.value) {
        const districtId = district.find((item) => item.name === addressData.district).id;
        const res = await axios.get(`/locations/postal_code/${districtId}`);
        setAddressData((cur) => ({ ...cur, postalCode: res.data.postal_code }));
      } else {
        setAddressData((cur) => ({ ...cur, postalCode: '' }));
      }
    } catch (err) {
      console.dir(err);
    }
  };
  const provinceShow = provinces.map((province) => (
    <option key={province.id} value={province.name}>
      {province.name}
    </option>
  ));

  const districtShow = district.map((district) => (
    <option key={district.id} value={district.name}>
      {district.name}
    </option>
  ));

  const subDistrictShow = subDistrict.map((subDistrict) => (
    <option key={subDistrict.id} value={subDistrict.name}>
      {subDistrict.name}
    </option>
  ));



  return (

    <>
      <Modal modal={modal} setModal={setModal} />
      <AccountHeader />
      <h6 className=" fw-bold d-flex justify-content-center mt-5">{`${location?.state ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}`} </h6>
      <div className="container my-4 d-flex flex-column justify-content-center align-items-center" style={{ width: "35vw" }}>
        <div className="d-flex align-items-center justify-content-center mb-3 my-4 col-12" >
          <div className='w-50 me-3'>
            <input
              type="text"
              id='firstName'
              placeholder="Firstname*"
              className={`form-control ${error.firstName ? ' is-invalid' : 'border-dark'}`}
              onChange={e => inputOnChange(e)}
              value={addressData.firstName}
            />
            {error.firstName ? <div className='invalid-feedback'>{error.firstName}</div> : null}
          </div>
          <div className='w-50'>
            <input
              type="text"
              id='lastName'
              placeholder="Lastname*"
              className={`form-control ${error.lastName ? ' is-invalid' : 'border-dark'}`}
              onChange={e => inputOnChange(e)}
              value={addressData.lastName}
            />
            {error.lastName ? <div className='invalid-feedback'>{error.lastName}</div> : null}
          </div>
        </div>
        <div className='mb-3 col-12'>
          <input
            type="text"
            id='address1'
            placeholder="Address1*"
            className={`form-control ${error.address1 ? ' is-invalid' : 'border-dark'}`}
            onChange={e => inputOnChange(e)}
            value={addressData.address1}
          />
          {error.address1 ? <div className='invalid-feedback'>{error.address1}</div> : null}
        </div>
        <div className='mb-3 col-12'>
          <input
            type="text"
            id='address2'
            placeholder="Address2"
            className={`form-control border-dark`}
            style={{ width: "100%" }}
            onChange={e => inputOnChange(e)}
            value={addressData.address2}
          />
        </div>
        <div className="d-flex col-12 mb-3">
          <div className='w-50 me-3'>
            <select value={addressData.province} onChange={e => handleChangeProvince(e)} id='province' className={`form-select ${error.province ? ' is-invalid' : 'border-dark'}`}>
              <option value='' >Province*</option>
              {provinceShow}
            </select>
            {error.province ? <div className='invalid-feedback'>{error.province}</div> : null}
          </div>
          <div className='w-50'>
            <select value={addressData.district} onChange={e => handleChangeDistrict(e)} id='district' className={`form-select ${error.district ? ' is-invalid' : 'border-dark'}`} aria-label="Default select example">
              <option value=''>District*</option>
              {districtShow}
            </select>
            {error.district ? <div className='invalid-feedback'>{error.district}</div> : null}
          </div>
        </div>
        <div className="d-flex col-12 mb-3">
          <div className='w-50 me-3'>
            <select value={addressData.subDistrict} onChange={e => handleChangeSubDistrict(e)} id='subDistrict' className={`form-select ${error.subDistrict ? ' is-invalid' : 'border-dark'}`} aria-label="Default select example">
              <option value='' >Sub District*</option>
              {subDistrictShow}
            </select>
            {error.subDistrict ? <div className='invalid-feedback'>{error.subDistrict}</div> : null}
          </div>
          <div className="w-50">
            <input
              type="text"
              id='postalCode'
              placeholder="Postal Code*"
              className="form-control border-dark"
              value={addressData.postalCode}
              onChange={e => inputOnChange(e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-3 col-12">
          <div className='w-50 me-3'>
            <input
              type="text"
              id='phoneNumber'
              placeholder="Phone*"
              className={`form-control ${error.phoneNumber ? ' is-invalid' : ' border-dark'}`}
              onChange={e => inputOnChange(e)}
              value={addressData.phoneNumber}
            />
            {error.phoneNumber ? <div className='invalid-feedback'>{error.phoneNumber}</div> : null}
          </div>
          <div className="w-50"></div>
        </div>
        <div className="d-flex justify-content-center mt-2 mb-5">
          {location?.state ?
            <button onClick={handleUpdate} className="btn btn-dark">UPDATE</button> :
            <button onClick={handleAddAddress} className="btn btn-dark">ADD ADDRESS</button>

          }
        </div>
      </div>
    </>
  );
}

export default AddNewAddress;
