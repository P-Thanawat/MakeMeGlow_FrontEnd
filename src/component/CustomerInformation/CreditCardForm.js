import React from 'react';

function CreditCardForm({
  setIsSelectAnotherCard,
  count,
  cardContent,
  setCardContent,
  setCardContentError,
  cardContentError,
}) {
  const handleClickBack = () => {
    setIsSelectAnotherCard(false);
  };

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

  return (
    <>
      <div style={{ width: '90%' }}>
        <div className='row mt-4'>
          <div className='mb-3 col-12'>
            <input
              type='text'
              className={`form-control border-dark${cardContentError.number ? ' is-invalid' : ''}`}
              placeholder='Card Number'
              value={cardContent.number}
              onChange={(e) => handleChangeInput('number', e)}
            />
            {cardContentError.number ? <div className='invalid-feedback'>{cardContentError.number}</div> : null}
          </div>
          <div className='mb-3 col-12'>
            <input
              type='text'
              className={`form-control border-dark${cardContentError.name ? ' is-invalid' : ''}`}
              placeholder='Cardholder Name'
              value={cardContent.name}
              onChange={(e) => handleChangeInput('name', e)}
            />
            {cardContentError.name ? <div className='invalid-feedback'>{cardContentError.name}</div> : null}
          </div>
          <div className='mb-3 col-6'>
            <input
              type='month'
              className={`form-control border-dark${cardContentError.expiration ? ' is-invalid' : ''}`}
              placeholder='Expiration Date (MM/YY)'
              value={cardContent.expiration}
              onChange={(e) => handleChangeInput('expiration', e)}
            />
            {cardContentError.expiration ? <div className='invalid-feedback'>{cardContentError.expiration}</div> : null}
          </div>
          <div className='mb-3 col-6'>
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
        </div>
        {count === 0 ? null : (
          <button type='button' className='btn' onClick={handleClickBack}>
            {'< Back To Choose Card'}
          </button>
        )}
      </div>
    </>
  );
}

export default CreditCardForm;
