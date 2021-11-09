import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import FilterProduct from '../component/FilterProduct';
import ProductCardList from '../component/ProductCard/ProductCardList';
import axios from '../config/axios';
import Pagination from '../component/Pagination';
import { genObjectToFilter } from '../service/genObjToFilter';

function AllProduct() {
  const [product, setProduct] = useState([]);
  const [filterValue, setFilterValue] = useState({ FACE: {}, SHEEK: {}, LIPS: {}, EYES: {}, BODY: {} });
  const [allowFilter, setAllowFilter] = useState([]);
  const [countProduct, setCountProduct] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    setAllowFilter(
      params.category === 'All Product' ||
        !['ALL PRODUCT', 'FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY'].includes(params.category.toUpperCase())
        ? ['FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY']
        : ['FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY'].filter((item) => item.toLowerCase() === params.category)
    );
  }, [params]);

  useEffect(() => {
    setOnPage(1);
    setFilterValue({ FACE: {}, SHEEK: {}, LIPS: {}, EYES: {}, BODY: {} });
    if (
      !['ALL PRODUCT', 'FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY'].includes(params.category.toUpperCase()) &&
      !params.category.startsWith('search:')
    ) {
      history.push('/');
    }
  }, [params]);

  useEffect(() => {
    const fetchProductByCategoryFilter = async () => {
      try {
        const res = await axios.get(
          `/product/all_product/products?category=${params.category}&offset=${9 * (onPage - 1)}&filter=${JSON.stringify(
            genObjectToFilter(filterValue)
          )}`
        );
        setProduct(res.data.products);
        setCountProduct(res.data.count);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchProductByCategoryFilter();
    window.scrollTo(0, 0);
  }, [filterValue, onPage, params]);

  const headerName = ['ALL PRODUCT', 'FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY'].includes(params.category.toUpperCase())
    ? params.category.toUpperCase()
    : `Search : ${params.category.split(':')[1]}`;

  return (
    <>
      <div className='container'>
        <div className='row my-5'>
          <div className='col-9'>
            <h4 className='fs-bold my-2 py-0 '>{headerName}</h4>
          </div>
          <div className='col-3 d-flex justify-content-end'>
            {Math.ceil(countProduct / 9) === 0 ? null : (
              <Pagination countPage={Math.ceil(countProduct / 9)} onPage={onPage} setOnPage={setOnPage} />
            )}
          </div>
          <div className='mt-3  col-2'>
            <FilterProduct allowFilter={allowFilter} filterValue={filterValue} setFilterValue={setFilterValue} />
          </div>
          <div className='col-10 row my-3 mx-0'>
            {product.length === 0 ? (
              <div className='col-12 d-flex justify-content-center align-items-center flex-column'>
                <p className='text-center' style={{ color: '#979797', fontSize: '1.3vw' }}>
                  SORRY, THERE ARE NO SEARCH RESULTS FOR KEYWORD
                </p>
                <p style={{ color: '#979797', fontSize: '1.3vw' }} className='text-center'>
                  CAN'T FIND WHAT YOU'RE LOOKING FOR? TRY ANOTHER SERCH
                </p>
              </div>
            ) : (
              <>
                {product.map((item) => (
                  <div className='col-4' key={item.id}>
                    <ProductCardList
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      width='290px'
                      height='290px'
                      alt={item.name}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProduct;
