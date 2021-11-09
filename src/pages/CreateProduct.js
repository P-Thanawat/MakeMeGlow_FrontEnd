import axios from '../config/axios';
import React, { useEffect, useState } from 'react';
import DragAndDrop from '../component/CreateProduct/DragAndDrop';
import { useHistory, useLocation } from 'react-router';
import {
  validateCategory,
  validateColorCode,
  validateColorName,
  validateDescription,
  validateImageFile,
  validateImageShow,
  validateIngredients,
  validatePrice,
  validateProductName,
  validateQuantity,
} from '../service/validateForm';
import Modal from '../component/Modal';

function CreateProduct() {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const history = useHistory();
  const location = useLocation();
  const [imagesFile, setImagesFile] = useState(new Array(6).fill(null));
  const [imagesShow, setImagesShow] = useState(['', '', '', '', '', '']);
  const [productData, setProductData] = useState({});
  const [error, setError] = useState({
    productName: '',
    price: '',
    quantity: '',
    category: '',
    colorName: '',
    colorCode: '',
    description: '',
    ingredients: '',
    imageShow: '',
  });
  const [deletedImg, setDeletedImg] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (location?.state?.edit) {
      const {
        state: { product },
      } = location;
      setProductData({
        productName: product.name,
        price: product.price,
        quantity: product.countStock,
        category: product.cetagory,
        colorName: product.colorName,
        colorCode: product.color,
        description: product.description,
        ingredients: product.ingredient,
      });
      const run = async () => {
        try {
          const {
            data: { productImage },
          } = await axios.get(`/product/productImage/${product.id}`);
          const newImageShow = [...imagesShow];
          productImage.forEach((item, index) => {
            newImageShow[index] = item.imageUrl;
          });
          setImagesShow(newImageShow);
        } catch (err) {
          console.log(err.message);
        }
      };
      run();
    }
  }, []);

  const handleClickUpdate = async () => {
    try {
      const errorProductName = validateProductName(productData.productName);
      const errorPrice = validatePrice(productData.price);
      const errorQuantity = validateQuantity(productData.quantity);
      const errorCategory = validateCategory(productData.category);
      const errorColorName = validateColorName(productData.colorName);
      const errorColorCode = validateColorCode(productData.colorCode);
      const errorDescription = validateDescription(productData.description);
      const errorIngredients = validateIngredients(productData.ingredients);
      const errorImageShow = validateImageShow(imagesShow);

      setError({
        ...error,
        productName: errorProductName,
        price: errorPrice,
        quantity: errorQuantity,
        category: errorCategory,
        colorName: errorColorName,
        colorCode: errorColorCode,
        description: errorDescription,
        ingredients: errorIngredients,
        images: errorImageShow,
      });

      if (
        errorProductName ||
        errorPrice ||
        errorQuantity ||
        errorCategory ||
        errorColorName ||
        errorColorCode ||
        errorDescription ||
        errorIngredients ||
        errorImageShow
      ) {
        return;
      }

      const formData = new FormData();
      formData.append('name', productData.productName);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('cetagory', productData.category);
      formData.append('colorName', productData.colorName);
      formData.append('color', productData.colorCode);
      formData.append('countStock', productData.quantity);
      formData.append('ingredient', productData.ingredients);
      formData.append('deletedImg', deletedImg);
      imagesFile.forEach((item) => {
        if (item) {
          formData.append('imageUrl', item);
        }
      });
      setShowSpinner(true);
      await axios.put(`/product/${location.state.product.id}`, formData);
      setShowSpinner(false);
      setModal({ active: true, message: 'Update is Successful', header: 'STATUS', redirect: '/product_summary' });
      // alert('Update is Successful');
      // history.push('/product_summary');
    } catch (err) {
      console.log(err.message);
    }
  };

  const imagesShowList = imagesShow.map((imageUrl, index) => {
    return (
      <DragAndDrop
        key={index}
        imageUrl={imageUrl}
        index={index}
        setImagesShow={setImagesShow}
        setImagesFile={setImagesFile}
        setDeletedImg={setDeletedImg}
        imagesShow={imagesShow}
      />
    );
  });

  const handleClickSave = async () => {
    try {
      const errorProductName = validateProductName(productData.productName);
      const errorPrice = validatePrice(productData.price);
      const errorQuantity = validateQuantity(productData.quantity);
      const errorCategory = validateCategory(productData.category);
      const errorColorName = validateColorName(productData.colorName);
      const errorColorCode = validateColorCode(productData.colorCode);
      const errorDescription = validateDescription(productData.description);
      const errorIngredients = validateIngredients(productData.ingredients);
      const errorImageFile = validateImageFile(imagesFile);

      setError({
        ...error,
        productName: errorProductName,
        price: errorPrice,
        quantity: errorQuantity,
        category: errorCategory,
        colorName: errorColorName,
        colorCode: errorColorCode,
        description: errorDescription,
        ingredients: errorIngredients,
        images: errorImageFile,
      });

      if (
        errorProductName ||
        errorPrice ||
        errorQuantity ||
        errorCategory ||
        errorColorName ||
        errorColorCode ||
        errorDescription ||
        errorIngredients ||
        errorImageFile
      ) {
        return;
      }

      const formData = new FormData();
      formData.append('name', productData.productName);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('cetagory', productData.category);
      formData.append('colorName', productData.colorName);
      formData.append('color', productData.colorCode);
      formData.append('countStock', productData.quantity);
      formData.append('ingredient', productData.ingredients);
      imagesFile.forEach((item) => {
        if (item) {
          formData.append('imageUrl', item);
        }
      });

      setShowSpinner(true);
      await axios.post('/product', formData);
      setShowSpinner(false);
      setModal({ active: true, message: 'Create is Successful', header: 'STATUS', redirect: '/product_summary' });
      // alert('Create is Successful');
      // history.push('/product_summary');
    }
    catch (err) {
      console.log(err.message)
    }
  };

  const inputOnChange = (e) => {
    if (e.target.id === 'productName')
      setError((cur) => ({ ...cur, [e.target.id]: validateProductName(e.target.value) }));
    if (e.target.id === 'price') setError((cur) => ({ ...cur, [e.target.id]: validatePrice(e.target.value) }));
    if (e.target.id === 'quantity') setError((cur) => ({ ...cur, [e.target.id]: validateQuantity(e.target.value) }));
    if (e.target.id === 'category') setError((cur) => ({ ...cur, [e.target.id]: validateCategory(e.target.value) }));
    if (e.target.id === 'colorName') setError((cur) => ({ ...cur, [e.target.id]: validateColorName(e.target.value) }));
    if (e.target.id === 'colorCode') setError((cur) => ({ ...cur, [e.target.id]: validateColorCode(e.target.value) }));
    if (e.target.id === 'description')
      setError((cur) => ({ ...cur, [e.target.id]: validateDescription(e.target.value) }));
    if (e.target.id === 'productNingredientsame')
      setError((cur) => ({ ...cur, [e.target.id]: validateIngredients(e.target.value) }));

    setProductData((cur) => ({ ...cur, [e.target.id]: e.target.value }));
  };

  return (
    <div
      className='d-flex justify-content-center'
      style={{
        background: '#FEF3F5',
        width: '100%',
        minHeight: '70vh',
      }}
    >
      <Modal modal={modal} setModal={setModal} />
      <div className='container bg-white d-flex justify-content-center' style={{ minHeight: '100%', width: '76%' }}>
        <div style={{ width: '70%' }}>
          <div className='row mt-5 mb-5'>
            <div className='col-12 mb-5'>
              <h3 style={{ textAlign: 'center' }}>{`${location?.state?.edit ? 'EDIT PRODUCT' : 'CREATE NEW PRODUCT'
                }`}</h3>
            </div>
            <div className='col-12 mb-2'>
              <label htmlFor='productName' className='form-label'>
                Product Name
              </label>
              <input
                value={productData.productName}
                onChange={(e) => inputOnChange(e)}
                type='text'
                id='productName'
                className={`form-control ${error.productName ? ' is-invalid' : ''}`}
              />
              {error.productName ? <div className='invalid-feedback'>{error.productName}</div> : null}
            </div>
            <div className='col-6 mb-2'>
              <label htmlFor='price' className='form-label'>
                Price
              </label>
              <input
                value={productData.price}
                onChange={(e) => inputOnChange(e)}
                type='text'
                id='price'
                className={`form-control ${error.price ? ' is-invalid' : ''}`}
              />
              {error.price ? <div className='invalid-feedback'>{error.price}</div> : null}
            </div>
            <div className='col-6 mb-2'>
              <label htmlFor='quantity' className='form-label'>
                Quantity
              </label>
              <input
                value={productData.quantity}
                onChange={(e) => inputOnChange(e)}
                type='text'
                id='quantity'
                className={`form-control ${error.quantity ? ' is-invalid' : ''}`}
              />
              {error.quantity ? <div className='invalid-feedback'>{error.quantity}</div> : null}
            </div>
            <div className='col-12 mb-2'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <select
                onChange={(e) => inputOnChange(e)}
                className={`form-select ${error.category ? ' is-invalid' : ''}`}
                id='category'
              >
                <option defaultValue='' >
                  select category...
                </option>
                <option value='FACE'>FACE</option>
                <option value='SHEEK'>SHEEK</option>
                <option value='LIPS'>LIPS</option>
                <option value='EYES'>EYES</option>
                <option value='BODY'>BODY</option>
              </select>
              {error.category ? <div className='invalid-feedback'>{error.category}</div> : null}
            </div>
            <div className='col-6 mb-2'>
              <label htmlFor='colorName' className='form-label'>
                Options - Color Name
              </label>
              <input
                value={productData.colorName}
                onChange={(e) => inputOnChange(e)}
                type='text'
                id='colorName'
                className={`form-control ${error.colorName ? ' is-invalid' : ''}`}
              />
              {error.colorName ? <div className='invalid-feedback'>{error.colorName}</div> : null}
            </div>
            <div className='col-6 mb-2'>
              <label htmlFor='colorCode' className='form-label'>
                Options - Color Code #
              </label>
              <input
                value={productData.colorCode}
                onChange={(e) => inputOnChange(e)}
                type='text'
                id='colorCode'
                className={`form-control ${error.colorCode ? ' is-invalid' : ''}`}
              />
              {error.colorCode ? <div className='invalid-feedback'>{error.colorCode}</div> : null}
            </div>
            <div className='col-12 mb-2'>
              <label className='form-label'>Images</label>
              <div className='row border rounded py-4 px-4 is-invalid' style={{ margin: '1px' }}>
                {imagesShowList}
              </div>
              {error.images ? <div className='invalid-feedback'>{error.images}</div> : null}
            </div>
            <div className='col-12 mb-2'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                value={productData.description}
                onChange={(e) => inputOnChange(e)}
                className={`form-control ${error.description ? ' is-invalid' : ''}`}
                id='description'
                style={{ height: '11.45833333333333vw' }}
              ></textarea>
              {error.description ? <div className='invalid-feedback'>{error.description}</div> : null}
            </div>
            <div className='col-12 mb-2'>
              <label htmlFor='ingredients' className='form-label'>
                Ingredients
              </label>
              <textarea
                value={productData.ingredients}
                onChange={(e) => inputOnChange(e)}
                className={`form-control ${error.ingredients ? ' is-invalid' : ''}`}
                id='ingredients'
                style={{ height: '11.45833333333333vw' }}
              ></textarea>
              {error.ingredients ? <div className='invalid-feedback'>{error.ingredients}</div> : null}
            </div>
            <div className='d-flex mt-3'>
              <div className='col-4'></div>
              <div className='col-4 d-flex justify-content-center align-items-center'>
                {location?.state?.edit ? (
                  <button
                    onClick={handleClickUpdate}
                    className='btn btn-dark'
                    style={{ minWidth: '9.375vw', minHeight: '2.604166666666667vw' }}
                  >
                    UPDATE
                  </button>
                ) : (
                  <button
                    onClick={handleClickSave}
                    className='btn btn-dark'
                    style={{ minWidth: '9.375vw', minHeight: '2.604166666666667vw' }}
                  >
                    SAVE
                  </button>
                )}
              </div>
              {showSpinner ? (
                <div className='col-4 d-flex align-items-center p-0 m-0'>
                  <div class='mx-4 spinner-border text-info' role='status'>
                    <span class='visually-hidden'>Loading...</span>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
