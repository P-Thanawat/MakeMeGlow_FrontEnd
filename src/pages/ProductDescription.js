import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductDetail from '../component/productDescription/ProductDetail';
import { useAuthContext } from '../context/AuthContext';
import '../css/productDescription.css';

function ProductDescription() {
  const { productName } = useParams();
  const {
    state: { user },
  } = useAuthContext();
  const [product, setProduct] = useState([]);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      const run = async () => {
        const {
          data: { product, productImage },
        } = await axios.post(`/product/byProductName?productName=${productName}`, { productName });
        if (user) {
          const {
            data: { IsFavorite },
          } = await axios.post(`/product/checkFavorite`, { productName: productImage?.[0]?.Product?.name });
          setIsFavorite(IsFavorite);
        }
        setProduct(product);
        setProductImage(productImage);
      };
      run();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className='productDescriptionPage'>
      <ProductDetail product={product} IsFavorite={IsFavorite} productImage={productImage} />
      <div className='p-4' style={{ backgroundColor: '#FEF6F8' }}>
        <div className='accordion' id='accordionPanelsStayOpenExample'>
          <div className='container'>
            {/* product info*/}
            <div className='border-0'>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='panelsStayOpen-headingOne'>
                  <button
                    className='accordion-button collapsed text-center'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseOne'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseOne'
                  >
                    <h5 style={{ fontSize: '24px', width: '100%', margin: 'auto' }}>PRODUCT INFO</h5>
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseOne'
                  className='accordion-collapse collapse'
                  aria-labelledby='panelsStayOpen-headingOne'
                >
                  <div className='accordion-body'>
                    <p>{productImage?.[0]?.Product?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            {/* ingreduents*/}
            <div className=' my-4 '>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='panelsStayOpen-headingOne'>
                  <button
                    className='accordion-button collapsed text-center'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseTwo'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseTwo'
                  >
                    <h5 style={{ fontSize: '24px', width: '100%', margin: 'auto' }}>INGREDIENTS</h5>
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseTwo'
                  className='accordion-collapse collapse'
                  aria-labelledby='panelsStayOpen-headingOne'
                >
                  <div className='accordion-body'>
                    <p>{productImage?.[0]?.Product?.ingredient}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            {/*delivery*/}
            <div className=' my-4 '>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='panelsStayOpen-headingOne'>
                  <button
                    className='accordion-button collapsed text-center'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseThree'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseThree'
                  >
                    <h5 style={{ fontSize: '24px', width: '100%', margin: 'auto' }}>DELIVERY</h5>
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseThree'
                  className='accordion-collapse collapse'
                  aria-labelledby='panelsStayOpen-headingOne'
                >
                  <div className='accordion-body'>
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                    plugin adds the appropriate classNamees that we use to style each element. These classNamees control
                    the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of
                    this with custom CSS or overriding our default variables. It's also worth noting that just about any
                    HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            {/* payment and security*/}
            <div className=' my-4'>
              <div className='accordion-item '>
                <div className='accordion-header ' id='panelsStayOpen-headingOne'>
                  <button
                    className='accordion-button collapsed text-center'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseFour'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseFour'
                  >
                    <h5 style={{ fontSize: '24px', width: '100%', margin: 'auto' }}>{`PAYMENT & SECURITY`}</h5>
                  </button>
                </div>
                <div
                  id='panelsStayOpen-collapseFour'
                  className='accordion-collapse collapse'
                  aria-labelledby='panelsStayOpen-headingOne'
                >
                  <div className='accordion-body'>
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                    plugin adds the appropriate classNamees that we use to style each element. These classNamees control
                    the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of
                    this with custom CSS or overriding our default variables. It's also worth noting that just about any
                    HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
