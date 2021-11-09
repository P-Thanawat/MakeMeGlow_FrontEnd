import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ countPage, onPage, setOnPage }) {
  const handleClickPage = (page, e) => {
    e.preventDefault();
    setOnPage(page);
  };

  const handleIncreasePage = (e) => {
    e.preventDefault();
    setOnPage((cur) => cur + 1);
  };

  const handleDecreasePage = (e) => {
    e.preventDefault();
    setOnPage((cur) => cur - 1);
  };
  const start = onPage === 1 ? onPage - 1 : onPage === countPage ? onPage - 3 : onPage - 2;
  const end = onPage === 1 ? onPage + 2 : onPage + 1;

  const arrayOfPage = new Array(countPage)
    .fill(null)
    .map((item, index) => index + 1)
    .slice(start, end);

  const pagination = arrayOfPage.map((index) => {
    return (
      <li className={`page-item${index === onPage ? ' active' : ''}`} key={index}>
        <Link to='#' className='page-link' onClick={(e) => handleClickPage(index, e)}>
          {index}
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item${onPage === 1 ? ' disabled' : ''}`}>
          <Link to='#' className='page-link' onClick={handleDecreasePage}>
            <span aria-hidden='true'>&laquo;</span>
          </Link>
        </li>
        {pagination}
        <li className={`page-item${onPage === countPage ? ' disabled' : ''}`}>
          <Link to='#' className='page-link' onClick={handleIncreasePage}>
            <span aria-hidden='true'>&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
