import React from 'react';
import { Link } from 'react-router-dom';
import { formatePrice } from '../../service/IntlFormatter';

function ShoppingCartTotal({ total_price }) {
  return (
    <>
      <div className='me-5 mt-4'>
        <h5 className='mt-5'>TOTAL</h5>
        <h5 className='mt-5'>{formatePrice(total_price)}</h5>
        <button className='rounded-3 btn-dark mt-3' style={{ width: '250px', height: '40px' }}>
          <Link to='/checkout' className='nav-link' style={{ color: 'inherit' }}>
            Checkout
          </Link>
        </button>
        <h6 className='mt-2 ms-5 ps-3 fs-6 fw-light'>Secure shopping</h6>
      </div>
    </>
  );
}

export default ShoppingCartTotal;
