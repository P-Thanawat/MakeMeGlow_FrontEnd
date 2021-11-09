import React from 'react';
import image_slide_1 from '../pic/carousel/image-slide-nont-1.jpeg';
import image_slide_2 from '../pic/carousel/image-slide-nont-2.jpeg';
import image_slide_3 from '../pic/carousel/image-slide-nont-3.jpeg';

function Carousel() {
  const imagesPromo = [
    {
      id: '1',
      image: image_slide_1,
      header: 'STICK BLUSH',
      title: 'AN ULTRA-LIGHTWEIGHT CREAM BLUSH THAT MELTS INTO SKIN AND CREATES RADIANT, NATURAL-LOOKING COLOR.',
    },
    {
      id: '2',
      image: image_slide_2,
      header: 'STICK HIGHLIGHTER',
      title: 'A SHIMMERING, ULTRE-SMOOTH CREAM HIGHLIGHTER FOR INSTANT LIGHT AND LUMINOSITY IN JUST ONE SWIPE.',
    },
    {
      id: '3',
      image: image_slide_3,
      header: 'CREAM BRONZER',
      title: 'A REVOLUTIONARY NEW, WEIGHTLESS CREAM FORMULA FOR SUN-KISSED COLOR.',
    },
  ];

  const buttonCarousel = imagesPromo.map((item, index) => {
    return (
      <button
        key={item.id}
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide-to={index}
        className={`${index === 0 ? 'active' : ''}`}
        aria-current='true'
        aria-label={`Slide ${index}`}
      ></button>
    );
  });

  const imagesCarousel = imagesPromo.map((item, index) => {
    return (
      <div key={item.id} className={`carousel-item${index === 0 ? ' active' : ''}`}>
        <img
          src={item.image}
          className='d-block w-100'
          alt='...'
          style={{
            height: '80vh',
            objectFit: 'cover',
            objectPosition: 'center -1vw',
          }}
        />
        <div className='carousel-caption d-none d-md-block' style={{ color: '#000' }}>
          <h2 className='fw-bold'>{item.header}</h2>
          <p>{item.title}</p>
        </div>
      </div>
    );
  });

  return (
    <div id='carouselExampleIndicators' className='carousel slide' data-bs-ride='carousel' data-bs-interval='2000'>
      <div className='carousel-indicators'>{buttonCarousel}</div>
      <div className='carousel-inner'>{imagesCarousel}</div>
    </div>
  );
}

export default Carousel;
