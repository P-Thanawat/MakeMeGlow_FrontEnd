import React from 'react';
import Footer from '../component/Footer';
import NavHeader from '../component/NavHeader';

function AppContainer({ children }) {
  return (
    <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
      <NavHeader />
      <div className='flex-grow-1'>{children}</div>
      <Footer />
    </div>
  );
}

export default AppContainer;
