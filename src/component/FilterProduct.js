import React, { useEffect, useState } from 'react';
import '../css/FilterProduct.css';
import { tocamelCase } from '../service/tocamelCase';

function FilterProduct({ allowFilter, filterValue, setFilterValue }) {
  const [expended, setExpended] = useState({
    face: 'false',
    sheek: 'false',
    lips: 'false',
    eyes: 'false',
    body: 'false',
  });

  useEffect(() => {
    setExpended({
      face: 'false',
      sheek: 'false',
      lips: 'false',
      eyes: 'false',
      body: 'false',
    });
  }, [allowFilter]);

  const filterArray = [
    { name: 'FACE', filterItem: ['Foundation', 'Powder', 'Concealer', 'Primer'] },
    { name: 'SHEEK', filterItem: ['Blush', 'Bronzer', 'Highlighter'] },
    { name: 'LIPS', filterItem: ['Liquid Lipstick', 'Lipstick', 'Lip Liner', 'Lip Balm'] },
    { name: 'EYES', filterItem: ['Eyeshadow', 'Eyebrows', 'Eyeliner', 'Mascara'] },
    { name: 'BODY', filterItem: ['Body Makeup'] },
  ];

  const handleClickExpended = (field, e) => {
    setExpended((cur) => {
      const clone = { ...cur };
      clone[field] = clone[field] === 'false' ? 'true' : 'false';
      return clone;
    });
  };

  const handleChangeCheckBox = (category, field, e) => {
    setFilterValue((cur) => {
      const clone = { ...cur };
      clone[category] = { ...clone[category], [field]: e.target.checked };
      return clone;
    });
  };

  const accordionItemShow = filterArray
    .filter((item) => allowFilter.includes(item.name))
    .map((filter, index) => {
      return (
        <div className='accordion-item' key={filter.name}>
          <h2 className='accordion-header' id='face'>
            <button
              className={`accordion-button${expended[filter.name.toLowerCase()] === 'false' ? ' collapsed' : ''}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#accordiot${filter.name}`}
              aria-expanded={expended[filter.name.toLowerCase()]}
              aria-controls={`accordiot${filter.name}`}
              onClick={(e) => handleClickExpended(filter.name.toLowerCase(), e)}
            >
              {filter.name}
            </button>
          </h2>
          <div
            id={`accordiot${filter.name}`}
            className={`accordion-collapse collapse${expended[filter.name.toLowerCase()] !== 'false' ? ' show' : ''}`}
            aria-labelledby='face'
          >
            <div className='accordion-body'>
              {filter.filterItem.map((item, index) => {
                return (
                  <div className='d-flex justify-content-between mb-2' key={index}>
                    <label className='form-check-label' htmlFor={tocamelCase(item)}>
                      {item}
                    </label>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={tocamelCase(item)}
                      checked={filterValue[filter.name][item]}
                      onClick={(e) => handleChangeCheckBox(filter.name, tocamelCase(item), e)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div style={{ width: '100%' }} className='FilterProduct'>
      <h3 className='mb-3'>FILTERS</h3>

      <div className='accordion' id='accordionFilterProduct'>
        {accordionItemShow}
      </div>
    </div>
  );
}

export default FilterProduct;
