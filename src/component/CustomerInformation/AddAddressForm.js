import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

function AddAddressForm({
  setIsAddingAddress,
  count,
  addressFrom,
  setAddressFrom,
  errorAddressFrom,
  setErrorAddressFrom,
}) {
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const res = await axios.get('/locations/province');
        setProvinces(res.data.provinces);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchProvince();
  }, []);

  const handleClickBack = () => {
    setIsAddingAddress(false);
  };

  const handleChangeInput = (field, e) => {
    setAddressFrom((cur) => {
      const clone = { ...cur };
      clone[field] = e.target.value;
      return clone;
    });
    setErrorAddressFrom((cur) => {
      const clone = { ...cur };
      clone[field] = '';
      return clone;
    });
  };

  const handleChangeProvince = async (e) => {
    try {
      setErrorAddressFrom((cur) => ({ ...cur, province: '' }));
      setAddressFrom((cur) => ({ ...cur, province: e.target.value }));
      setAddressFrom((cur) => ({ ...cur, district: '' }));
      setAddressFrom((cur) => ({ ...cur, subDistrict: '' }));
      setAddressFrom((cur) => ({ ...cur, postalCode: '' }));
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
      setErrorAddressFrom((cur) => ({ ...cur, district: '' }));
      setAddressFrom((cur) => ({ ...cur, district: e.target.value }));
      setAddressFrom((cur) => ({ ...cur, subDistrict: '' }));
      setAddressFrom((cur) => ({ ...cur, postalCode: '' }));
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
      setErrorAddressFrom((cur) => ({ ...cur, subDistrict: '' }));
      setAddressFrom((cur) => ({ ...cur, subDistrict: e.target.value }));
      if (e.target.value) {
        const districtId = district.find((item) => item.name === addressFrom.district).id;
        const res = await axios.get(`/locations/postal_code/${districtId}`);
        setAddressFrom((cur) => ({ ...cur, postalCode: res.data.postal_code }));
      } else {
        setAddressFrom((cur) => ({ ...cur, postalCode: '' }));
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
      <div className='row mt-4'>
        <div className='mb-3 col-6'>
          <input
            type='text'
            className={`form-control border-dark${errorAddressFrom.firstName ? ' is-invalid' : ''}`}
            placeholder='Firstname'
            value={addressFrom.firstName}
            onChange={(e) => handleChangeInput('firstName', e)}
          />
          {errorAddressFrom.firstName ? <div className='invalid-feedback'>{errorAddressFrom.firstName}</div> : null}
        </div>
        <div className='mb-3 col-6'>
          <input
            type='text'
            className={`form-control border-dark${errorAddressFrom.lastName ? ' is-invalid' : ''}`}
            placeholder='Lastname'
            value={addressFrom.lastName}
            onChange={(e) => handleChangeInput('lastName', e)}
          />
          {errorAddressFrom.lastName ? <div className='invalid-feedback'>{errorAddressFrom.lastName}</div> : null}
        </div>
        <div className='mb-3 col-12'>
          <input
            type='text'
            className={`form-control border-dark${errorAddressFrom.address1 ? ' is-invalid' : ''}`}
            placeholder='Address 1'
            value={addressFrom.address1}
            onChange={(e) => handleChangeInput('address1', e)}
          />
          {errorAddressFrom.address1 ? <div className='invalid-feedback'>{errorAddressFrom.address1}</div> : null}
        </div>
        <div className='mb-3 col-12'>
          <input
            type='text'
            className='form-control border-dark'
            placeholder='Address 2'
            value={addressFrom.address2}
            onChange={(e) => handleChangeInput('address2', e)}
          />
        </div>
        <div className='mb-3 col-6'>
          <select
            className={`form-select border-dark${errorAddressFrom.province ? ' is-invalid' : ''}`}
            value={addressFrom.province}
            onChange={handleChangeProvince}
          >
            <option value=''>Province</option>
            {provinceShow}
          </select>
          {errorAddressFrom.province ? <div className='invalid-feedback'>{errorAddressFrom.province}</div> : null}
        </div>
        <div className='mb-3 col-6'>
          <select
            className={`form-select border-dark${errorAddressFrom.district ? ' is-invalid' : ''}`}
            value={addressFrom.district}
            onChange={handleChangeDistrict}
            disabled={!addressFrom.province}
          >
            <option value=''>District</option>
            {districtShow}
          </select>
          {errorAddressFrom.district ? <div className='invalid-feedback'>{errorAddressFrom.district}</div> : null}
        </div>
        <div className='mb-3 col-6'>
          <select
            className={`form-select border-dark${errorAddressFrom.subDistrict ? ' is-invalid' : ''}`}
            value={addressFrom.subDistrict}
            onChange={handleChangeSubDistrict}
            disabled={!addressFrom.district}
          >
            <option value=''>Sub District</option>
            {subDistrictShow}
          </select>
          {errorAddressFrom.subDistrict ? <div className='invalid-feedback'>{errorAddressFrom.subDistrict}</div> : null}
        </div>
        <div className='mb-3 col-6'>
          <input
            type='text'
            className='form-control border-dark'
            placeholder='Postal Code'
            value={addressFrom.postalCode}
            readOnly
          />
        </div>
        <div className='mb-3 col-6'>
          <input
            type='text'
            className={`form-control border-dark${errorAddressFrom.phoneNumber ? ' is-invalid' : ''}`}
            placeholder='Phone'
            value={addressFrom.phoneNumber}
            onChange={(e) => handleChangeInput('phoneNumber', e)}
          />
          {errorAddressFrom.phoneNumber ? <div className='invalid-feedback'>{errorAddressFrom.phoneNumber}</div> : null}
        </div>
      </div>

      {count === 0 ? null : (
        <button type='button' className='btn' onClick={handleClickBack}>
          {'< Back To Choose Address'}
        </button>
      )}
    </>
  );
}

export default AddAddressForm;
