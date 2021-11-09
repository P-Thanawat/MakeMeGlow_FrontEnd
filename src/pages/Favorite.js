import React, { useEffect, useState } from 'react';
import AccountHeader from '../component/AccountHeader';
import ProductCardList from '../component/ProductCard/ProductCardList';
import axios from '../config/axios';

function Favorite() {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteProduct = async () => {
      try {
        const res = await axios.get('/product/favorite/All');
        setProductItems(res.data.favoriteProductList);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchFavoriteProduct();
  }, []);

  return (
    <>
      <AccountHeader />
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
        <div className='container' style={{ width: '65%' }}>
          <h4 className=' fw-bold d-flex justify-content-center mt-5 '>FAVORITE</h4>
          <div className='d-flex row flex-wrap mt-5 mb-5'>
            {productItems.length > 0 ? (
              <>
                {productItems.map((item) => (
                  <div className='col-4'>
                    <ProductCardList
                      key={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      width='290px'
                      height='330px'
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className='container d-flex justify-content-center'>
                <div>
                  <h4 className=' mt-0 pt-0 fw-light ' style={{ position: 'relative', left: '35%' }}>
                    No favorites yet.
                  </h4>
                  <h5 className=' fw-light '>
                    Save your items you're interested in by clicking the icon
                    <i
                      className='bi bi-suit-heart-fill ms-3 mt-5 fa-2x row'
                      style={{ position: 'relative', left: '45%' }}
                    ></i>
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>{' '}
      </div>
    </>
  );
}

export default Favorite;
