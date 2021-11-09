import axios from '../config/axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountHeader from '../component/AccountHeader';
import visaIcon from '../pic/icons/294654_visa_icon.svg';
import masterCardIcon from '../pic/icons/380809_card_master_mastercard_icon.svg';
import {
  validateCraditCardNumber,
  validateCraditCardName,
  validateCraditCardExp,
  validateCraditCardSecurityCode,
} from '../service/validateForm';

function UserAddCard() {
  const [cardContent, setCardContent] = useState({
    number: '',
    name: '',
    expiration: '',
    securityCode: '',
  });
  const [cardContentError, setCardContentError] = useState({
    number: '',
    name: '',
    expiration: '',
    securityCode: '',
  });

  const history = useHistory();

  const handleChangeInput = (field, e) => {
    setCardContent((cur) => {
      const clone = { ...cur };
      if (field === 'securityCode') {
        clone[field] = +e.target.value;
      } else {
        clone[field] = e.target.value;
      }
      return clone;
    });
    setCardContentError((cur) => {
      const clone = { ...cur };
      clone[field] = '';
      return clone;
    });
  };

  const Omise = window.Omise;
  Omise.setPublicKey('pkey_test_5pdoxhl4p3erc27pgew');

  const handleSubmitAddCreditCard = (e) => {
    try {
      e.preventDefault();

      const errorName = validateCraditCardName(cardContent.name);
      const errorNumber = validateCraditCardNumber(cardContent.number);
      const errorExp = validateCraditCardExp(cardContent.expiration);
      const errorSecureCode = validateCraditCardSecurityCode(cardContent.securityCode);

      if (errorName || errorNumber || errorExp || errorSecureCode) {
        setCardContentError({
          number: errorNumber,
          name: errorName,
          expiration: errorExp,
          securityCode: errorSecureCode,
        });
      } else {
        const tokenParameters = {
          expiration_month: cardContent.expiration.split('-')[1],
          expiration_year: cardContent.expiration.split('-')[0],
          name: cardContent.name,
          number: cardContent.number,
          security_code: 123,
        };

        Omise.createToken('card', tokenParameters, async function (statusCode, response) {
          try {
            await axios.post('/credit_cards', { token: response.id });
            history.push({ pathname: '/user_payment' });
          } catch (err) {
            console.dir(err);
          }
        });
      }
    }
    catch (err) {
      console.log(err.message)
    }
  };

  return (
    <div className='UserAddCard'>
      <AccountHeader />
      <form onSubmit={handleSubmitAddCreditCard}>
        <div className='container my-5'>
          <div className='d-flex justify-content-center'>
            <div className='row' style={{ width: '50%' }}>
              <div className='col-11 d-flex justify-content-center align-items-center'>
                <h4>ADD NEW CARD</h4>
              </div>
              <div className='col-1'>
                <button className='btn'>
                  <Link to='/user_payment' className='nav-link' style={{ color: 'inherit' }}>
                    <i className='bi bi-x' style={{ fontSize: '2vw' }}></i>
                  </Link>
                </button>
              </div>
              <div className='col-12 mt-4'>
                <input
                  type='text'
                  className={`form-control border-dark${cardContentError.number ? ' is-invalid' : ''}`}
                  placeholder='Card Number'
                  value={cardContent.number}
                  onChange={(e) => handleChangeInput('number', e)}
                />
                {cardContentError.number ? <div className='invalid-feedback'>{cardContentError.number}</div> : null}
              </div>
              <div className='col-12 mt-3'>
                <input
                  type='text'
                  className={`form-control border-dark${cardContentError.name ? ' is-invalid' : ''}`}
                  placeholder='Cardholder Name*'
                  value={cardContent.name}
                  onChange={(e) => handleChangeInput('name', e)}
                />
                {cardContentError.name ? <div className='invalid-feedback'>{cardContentError.name}</div> : null}
              </div>
              <div className='col-6 mt-3'>
                <input
                  type='month'
                  className={`form-control border-dark${cardContentError.expiration ? ' is-invalid' : ''}`}
                  placeholder='Expiration Date (MM/YY)'
                  value={cardContent.expiration}
                  onChange={(e) => handleChangeInput('expiration', e)}
                />
                {cardContentError.expiration ? (
                  <div className='invalid-feedback'>{cardContentError.expiration}</div>
                ) : null}
              </div>
              <div className='col-6 mt-3'>
                <input
                  type='password'
                  maxLength='3'
                  className={`form-control border-dark${cardContentError.securityCode ? ' is-invalid' : ''}`}
                  placeholder='Security Code'
                  value={cardContent.securityCode}
                  onChange={(e) => handleChangeInput('securityCode', e)}
                />
                {cardContentError.securityCode ? (
                  <div className='invalid-feedback'>{cardContentError.securityCode}</div>
                ) : null}
              </div>
              <div className='col-12 mt-3 d-flex justify-content-end'>
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
              <div className='col-12 d-flex justify-content-center'>
                <button className='btn btn-dark' type='submit'>
                  ADD CARD
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserAddCard;
