import React, { useEffect, useState } from 'react';
import Carousel from '../component/Carousel';
import HomeQuote from '../component/HomeQuote';
import ProductFiltered from '../component/ProductFitered';
import ProductDetail from '../component/productDescription/ProductDetail';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

function Home(filtered) {
  const {
    state: { user },
  } = useAuthContext();
  const [product, setProduct] = useState([]);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [productImage, setProductImage] = useState([]);
  const [feature, setFeature] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const {
          data: { product, productImage },
        } = await axios.get(`/product/arrival`); //input productName
        if (user && product.length) {
          const {
            data: { IsFavorite },
          } = await axios.post(`/product/checkFavorite`, { productName: product?.[0]?.name });
          setIsFavorite(IsFavorite);
        }
        setProduct(product);
        setProductImage(productImage);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchFeatureProduct = async () => {
      try {
        const res = await axios.get('/product/feature_product/All');
        console.log(res.data);
        setFeature(res.data.featureProduct);
      } catch (err) {
        console.dir(err);
      }
    };
    const fetchBestSellerProduct = async () => {
      try {
        const res = await axios.get('/product/best_seller/All');
        console.log(res.data);
        setBestSeller(res.data.bestSellerProduct);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchFeatureProduct();
    fetchBestSellerProduct();
    run();
  }, []);
  return (
    <div>
      <Carousel />
      <div className='container'>
        <ProductFiltered filtered='FEATURED PRODUCT' product={feature} />
      </div>
      <HomeQuote />
      {product.length &&
        <>
          <div className="w-100" style={{ backgroundColor: '#FEF3F5' }}>
            <h5 className='container mb-0 '>NEW ARRIVAL</h5>
          </div>
          <ProductDetail product={product} IsFavorite={IsFavorite} productImage={productImage} />
        </>
      }
      <HomeQuote />
      <div className='container'>
        <ProductFiltered filtered='BEST SELLERS' product={bestSeller} />
      </div>
    </div>
  );
}

export default Home;
