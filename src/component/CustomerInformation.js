import React from 'react';
import AddAddressForm from './CustomerInformation/AddAddressForm';
import CreditCardForm from './CustomerInformation/CreditCardForm';
import CustomerAddress from './CustomerInformation/CustomerAddress';
import Payment from './CustomerInformation/Payment';
import visaIcon from '../pic/icons/294654_visa_icon.svg';
import masterCardIcon from '../pic/icons/380809_card_master_mastercard_icon.svg';

function CustomerInformation({
  user,
  isAddingAddress,
  setIsAddingAddress,
  customerAddress,
  addressFrom,
  setAddressFrom,
  setSelectAddress,
  selectAddress,
  isSelectAnotherCard,
  setIsSelectAnotherCard,
  customerCards,
  errorAddressFrom,
  cardContent,
  setCardContent,
  cardContentError,
  setCardContentError,
  setErrorAddressFrom,
  selectedCard,
  setSelectedCard,
}) {
  return (
    <>
      <h3>CUSTOMER INFORMATION</h3>
      <div
        className='mt-4 d-flex align-items-center justify-content-center rounded'
        style={{ height: '2.34375vw', width: '90%', backgroundColor: '#000', color: '#FFF' }}
      >
        <p className='m-0'>{user.email}</p>
      </div>
      <div className='mt-5' style={{ width: '90%' }}>
        <h4>SHIPPING ADDRESS</h4>
        {isAddingAddress ? (
          <AddAddressForm
            setIsAddingAddress={setIsAddingAddress}
            count={customerAddress.length}
            addressFrom={addressFrom}
            setAddressFrom={setAddressFrom}
            errorAddressFrom={errorAddressFrom}
            setErrorAddressFrom={setErrorAddressFrom}
          />
        ) : (
          <CustomerAddress
            customerAddress={customerAddress}
            selectAddress={selectAddress}
            setSelectAddress={setSelectAddress}
            setIsAddingAddress={setIsAddingAddress}
          />
        )}
      </div>
      <div className='d-flex mt-5 justify-content-between' style={{ width: '90%', borderBottom: '1px solid #0003' }}>
        <h4>PAYMENT</h4>
        <div className='mb-2'>
          <img
            src={visaIcon}
            alt='visa-icon'
            style={{
              height: '2.083333333333333vw',
              border: '2px solid #0003',
              width: '3.020833333333333vw',
            }}
          />
          <img
            className='ms-2 p-1'
            src={masterCardIcon}
            alt='visa-icon'
            style={{ height: '2.083333333333333vw', border: '2px solid #0003' }}
          />
        </div>
      </div>

      {isSelectAnotherCard ? (
        <CreditCardForm
          setIsSelectAnotherCard={setIsSelectAnotherCard}
          count={customerCards.length}
          cardContent={cardContent}
          setCardContent={setCardContent}
          cardContentError={cardContentError}
          setCardContentError={setCardContentError}
        />
      ) : (
        <Payment
          customerCards={customerCards}
          setIsSelectAnotherCard={setIsSelectAnotherCard}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )}
    </>
  );
}

export default CustomerInformation;
