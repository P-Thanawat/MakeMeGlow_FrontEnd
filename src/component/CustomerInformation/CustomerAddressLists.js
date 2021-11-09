import React from 'react';

function CustomerAddressList({ address, selectAddress, onChange }) {
  return (
    <div className='border border-dark mt-3 p-3 ps-5 form-check' style={{ fontSize: '1vw' }}>
      <input
        className='form-check-input'
        value={address.id}
        type='radio'
        name='choose-address'
        id={`address-${address.id}`}
        onChange={(e) => onChange(e)}
        checked={selectAddress === address.id}
      />
      <label className='form-check-label' htmlFor={`address-${address.id}`}>
        <p className='m-0' style={{ fontSize: '0.9vw', fontWeight: '600', opacity: '50%' }}>
          Shipping to
        </p>
        <p className='m-0'>{address.firstName + ' ' + address.lastName}</p>
        <p className='m-0'>{address.phone}</p>
        <p className='m-0'>
          {address.address1 +
            ', ' +
            address.address2 +
            ', ' +
            address.district +
            ', ' +
            address.province +
            ' ' +
            address.postalCode}
        </p>
      </label>
    </div>
  );
}

export default CustomerAddressList;
