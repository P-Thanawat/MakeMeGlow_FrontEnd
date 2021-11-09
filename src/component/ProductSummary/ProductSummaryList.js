import axios from '../../config/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductSummaryList({ product, setRefresh }) {
  const [numberOfReadytoSend, setNumberOfReadytoSend] = useState(0)

  useEffect(() => {
    try {
      const run = async () => {
        const { data: { numberOfReadytoSend } } = await axios.get(`/product/readyToShip/${product.id}`)
        setNumberOfReadytoSend(numberOfReadytoSend)
      }
      run()
    }
    catch (err) {

    }
  }, [])


  const handleDelete = async () => {
    try {
      await axios.delete(`/product/${product.id}`)
      setRefresh(cur => !cur)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  return (
    <tr className='border border-dark'>
      <td className='text-dark p-2 text-center' colSpan='1'> {/*id*/}
        {product.id}
      </td>
      <td className='text-dark p-2 text-center' colSpan='2'> {/*name*/}
        {product.name}
      </td>
      <td className='p-2' colSpan='1'> {/*color*/}
        <div className='d-flex justify-content-center align-items-center ' style={{ width: '100%', height: '100%' }}>
          <div style={{ backgroundColor: product.color, width: '1vw', height: '1vw' }}></div>
        </div>
      </td>
      <td className='text-dark p-2 text-center' colSpan='1'> {/*category*/}
        {product.cetagory}
      </td>
      <td className='text-dark p-2 text-center' colSpan='1'> {/*stock*/}
        {product.countStock}
      </td>
      <td className='text-dark p-2 text-center' colSpan='1'> {/*ready to ship*/}
        {numberOfReadytoSend}
      </td>
      <td className='text-dark p-2 text-center' colSpan='2'> {/*edit and delete*/}
        <Link to={{
          pathname: "/create_product",
          state: { edit: true, product }
        }}>
          <button className='btn btn-outline-primary m-1'>
            <i className='bi bi-pencil-square'></i>
          </button>
        </Link>
        <button onClick={handleDelete} className='btn btn-outline-danger m-1'>
          <i className='bi bi-trash'></i>
        </button>
      </td>
    </tr>
  );
}

export default ProductSummaryList;
