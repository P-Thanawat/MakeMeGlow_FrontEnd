import React from 'react';
import { Link } from 'react-router-dom';
import { formatePrice } from '../../service/IntlFormatter';

function ProductCardList({ name, imageUrl, price, width, height, alt }) {
  return (
    <Link to={`/productDescription/${name}`} className='nav-link'>
      <div
        className='d-flex align-items-center justify-content-between flex-column p-3'
        style={{ color: '#000', height: '480px' }}
      >
        <div>
          <img style={{ width, height, objectFit: 'cover' }} src={imageUrl} alt={alt} />
          <h5 className='p-3 text-center'>{name}</h5>
        </div>

        <div className='d-flex align-items-center justify-content-end flex-column' style={{ height: '30%' }}>
          <span className='mb-1'>{formatePrice(price)}</span>
          <button className='btn btn-dark' style={{ cursor: 'pointer' }}>
            SELECT SHADE
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCardList;
