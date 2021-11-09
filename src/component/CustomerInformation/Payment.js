import React from 'react';
import CustomerCardsList from './CustomerCardsList';

function Payment({ customerCards, setIsSelectAnotherCard, selectedCard, setSelectedCard }) {
  const handleChangeCard = (e) => {
    setSelectedCard(e.target.value);
  };

  const handleClickAnotherCard = () => {
    setIsSelectAnotherCard(true);
  };

  const customerCardsShow = customerCards.map((card) => (
    <CustomerCardsList key={card.id} card={card} cardSelect={selectedCard} onChange={handleChangeCard} />
  ));

  return (
    <>
      {customerCardsShow}
      <button type='button' className='btn' onClick={handleClickAnotherCard}>
        {'Another Card >'}
      </button>
    </>
  );
}

export default Payment;
