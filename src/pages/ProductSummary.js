import axios from '../config/axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterProduct from '../component/FilterProduct';
import ProductSummaryList from '../component/ProductSummary/ProductSummaryList';
import Pagination from '../component/Pagination';
import { genObjectToFilter } from '../service/genObjToFilter';
import AdminHeader from '../component/AdminHeader';

function ProductSummary() {
  const [products, setProducts] = useState([]);
  const [countProduct, setCountProduct] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [filterValue, setFilterValue] = useState({ FACE: {}, SHEEK: {}, LIPS: {}, EYES: {}, BODY: {} });
  const [allowFilter, setAllowFilter] = useState([]);
  const [onPage, setOnPage] = useState(1);

  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0)
    const run = async () => {
      const res = await axios.get(
        `/product?filter=${JSON.stringify(genObjectToFilter(filterValue))}&offset=${7 * (onPage - 1)}`
      );
      console.log(res.data);
      setCountProduct(res.data.count.countProduct);
      setProducts(res.data.products);
    };

    if (isFirstRender.current) {
      setAllowFilter(['FACE', 'SHEEK', 'LIPS', 'EYES', 'BODY']);
      isFirstRender.current = false;
    }

    run();
  }, [refresh, filterValue, onPage]);

  useEffect(() => {
    setOnPage(1);
  }, [filterValue]);

  const productsTableBody = products?.map((product) => {
    return <ProductSummaryList key={product.id} product={product} setRefresh={setRefresh} />;
  });

  return (
    <>
      <AdminHeader />
      <div className='container my-5'>
        <div className='d-flex justify-content-between mb-3'>
          <h2>PRODUCT STOCK</h2>
          <button className='btn btn-outline-dark'>
            <Link className='nav-link' to='/create_product' style={{ color: 'inherit' }}>
              CREATE
            </Link>
          </button>
        </div>
        <div className='row'>
          <div className='col-2'>
            <FilterProduct allowFilter={allowFilter} filterValue={filterValue} setFilterValue={setFilterValue} />
          </div>
          <div className='col-10'>
            <table style={{ width: '100%' }}>
              <thead>
                <tr className='bg-dark border border-dark'>
                  <th className='text-white p-2 text-center' colSpan='1'>
                    PRODUCT ID
                  </th>
                  <th className='text-white p-2 text-center' colSpan='2'>
                    PRODUCT NAME
                  </th>
                  <th className='text-white p-2 text-center' colSpan='1'>
                    COLOR
                  </th>
                  <th className='text-white p-2 text-center' colSpan='1'>
                    CATEGORY
                  </th>
                  <th className='text-white p-2 text-center' colSpan='1'>
                    STOCK
                  </th>
                  <th className='text-white p-2 text-center' colSpan='1'>
                    READY TO SHIP
                  </th>
                  <th className='text-white p-2 text-center' colSpan='2'>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>{productsTableBody}</tbody>
            </table>
          </div>
        </div>
        <div className='col-12 mt-3 d-flex justify-content-end'>
          {countProduct !== 0 ? (
            <Pagination countPage={Math.ceil(countProduct / 7)} onPage={onPage} setOnPage={setOnPage} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductSummary;
