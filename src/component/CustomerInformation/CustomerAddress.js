import React from 'react';
import CustomerAddressList from './CustomerAddressLists';

function CustomerAddress({ customerAddress, setIsAddingAddress, setSelectAddress, selectAddress }) {
  const handleChangeAddress = (e) => {
    setSelectAddress(e.target.value);
  };

  const handleClickAnotherAddress = () => {
    setIsAddingAddress(true);
  };

  const customerAddressShow = customerAddress.map((address) => {
    return (
      <CustomerAddressList
        key={address.id}
        address={address}
        selectAddress={selectAddress}
        onChange={handleChangeAddress}
      />
    );
  });

  return (
    <>
      {customerAddressShow}
      <button type='button' className='btn' onClick={handleClickAnotherAddress}>
        {'Another Address >'}
      </button>
    </>
  );
}

export default CustomerAddress;
