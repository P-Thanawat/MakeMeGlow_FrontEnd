import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import '../../css/scrollBar.css';
import Modal from '../../component/Modal';


function ProductDetail({ product, IsFavorite, productImage }) {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const { state: { user } } = useAuthContext();
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const [checkFavorite, setCheckFavorite] = useState(IsFavorite); //IsFavorite from database
  const [selectedColor, setSelectedColor] = useState(product?.[0]?.color);
  const {
    state: { carts },
    dispatch,
  } = useCartContext();
  // console.log(carts);
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    setSelectedColor(product?.[0]?.color);
  }, [product]);

  useEffect(() => {
    setCheckFavorite(IsFavorite);
  }, [IsFavorite]);

  //* check color idx

  let imageIdx = productImage.findIndex((item) => item.id === selectedImg);
  if (imageIdx === -1) imageIdx = 0;

  const handleClickFavorite = async () => {
    try {
      if (user?.role === 'ADMIN') {
        setModal({ active: true, message: `ADMIN DOESN'T HAVE FAVORITE`, header: 'STATUS', redirect: '' });
        // alert(`ADMIN DOESN'T HAVE FAVORITE`)
        return;
      }
      if (!checkFavorite) {
        setCheckFavorite(true);
        await axios.post('/product/favorite', {
          productId: productImage[imageIdx].Product.id,
          productName: productImage[imageIdx].Product.name,
        });
      }
      if (checkFavorite) {
        await axios.delete(`/product/favorite/${product[0].id}`);
        setCheckFavorite(false);
      }
    }
    catch (err) {
      console.log(err.message)
    }
  };

  const handleAddToCart = async () => {
    try {
      if (user?.role === 'ADMIN') {
        setModal({ active: true, message: `ADMIN DOESN'T HAVE CART`, header: 'STATUS', redirect: '' });
        // alert(`ADMIN DOESN'T HAVE CART`)
        return;
      }
      setNumberOfProduct(1);
      const cartItemIdx = carts.findIndex((item) => item.productId === productImage[imageIdx].Product.id);
      if (cartItemIdx === -1) {
        const res = await axios.post('/carts', {
          quality: numberOfProduct,
          productId: productImage[imageIdx].Product.id,
        });
        dispatch({ type: 'ADD_CART', payload: { product: res.data.cartItem } });
        setModal({ active: true, message: 'Add to cart successful', header: 'STATUS', redirect: '' });
        // alert('add to cart successful');
      } else {
        const cartItemUpdate = { ...carts[cartItemIdx], quality: carts[cartItemIdx].quality + numberOfProduct };
        await axios.post(`/carts/cart_item/${cartItemUpdate.id}`, { quality: cartItemUpdate.quality });
        dispatch({
          type: 'UPDATE_CART',
          payload: { product: cartItemUpdate, productId: productImage[imageIdx].Product.id },
        });
        setModal({ active: true, message: 'Add to cart successful', header: 'STATUS', redirect: '' });
      }
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <div>
      <Modal modal={modal} setModal={setModal} />
      <div
        className=' p-4'
        style={{
          backgroundImage: `linear-gradient(180deg, #FEF3F5 13.02%, rgba(251, 243, 245, 0) 100%)`,
        }}
      >
        <div className='container'>
          <div className='row my-5'>
            <div
              className='col-1 overflow-auto scroll-bar'
              style={{
                maxHeight: '30.6vw',
              }}
            >
              {productImage.map((item, index) => (
                <div className='mb-2' key={index}>
                  <img
                    className={`${index === imageIdx ? 'border border-dark' : ''}`}
                    style={{ width: '4vw', height: '4vw', objectFit: 'cover' }}
                    src={item?.imageUrl}
                    alt=''
                    onClick={() => {
                      setSelectedImg(item.id);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className='col-5' style={{ overflow: 'hidden' }}>
              <img
                className='border'
                style={{ width: '100%', objectFit: 'cover' }}
                src={productImage?.[imageIdx]?.imageUrl}
                alt=''
              />
            </div>
            <div className='col-6 ms-5' style={{ width: '28.75vw' }}>
              <h4 style={{ fontSize: '24px' }}>{productImage?.[imageIdx]?.Product?.name}</h4> {/*name*/}
              <hr className='m-0' />
              <p
                className='mt-4 fw-bold'
                style={{ fontSize: '20px' }}
              >{`$${productImage?.[imageIdx]?.Product?.price}`}</p>{' '}
              {/*price*/}
              <p style={{ fontSize: '18px' }}>{productImage?.[imageIdx]?.Product?.colorName}</p> {/*colorName*/}
              <div className='d-flex'>
                {product.map((item, index) => (
                  <div
                    className={`me-2 ${item.color === productImage[imageIdx]?.Product?.color ? 'border border-dark border-2' : ''
                      }`}
                    onClick={() => setSelectedImg(productImage.find((itemP) => itemP.Product.color === item.color).id)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: item?.color,
                    }}
                    key={index}
                  ></div>
                ))}
              </div>
              <div className='d-flex align-items-center my-4'>
                <div className='border border-dark d-flex flex-nowrap align-items-center'>
                  <button onClick={() => setNumberOfProduct((cur) => (cur > 1 ? cur - 1 : cur))} className='btn'>
                    -
                  </button>
                  <span>{numberOfProduct}</span>
                  <button
                    onClick={() =>
                      setNumberOfProduct((cur) => (cur < productImage[imageIdx].Product.countStock ? cur + 1 : cur))
                    }
                    className='btn'
                  >
                    +
                  </button>
                </div>
                <div className='d-flex flex-nowrap'>
                  <button onClick={handleAddToCart} className='btn btn-dark mx-2' style={{ width: '18vw' }}>
                    ADD TO CART
                  </button>
                </div>
                {checkFavorite ? (
                  <button onClick={handleClickFavorite} className='btn border border-dark mx-2'>
                    <i style={{ color: 'black' }} className='bi bi-heart-fill'></i>
                  </button>
                ) : (
                  <button onClick={handleClickFavorite} className='btn border border-dark mx-2'>
                    <i className='bi bi-heart'></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
