import React, { useEffect, useState } from 'react';
import AccountHeader from '../component/AccountHeader';
import UserPaymentCardList from '../component/UserPayment/UserPaymentCardList';
// import { customerCards } from '../mocks/customerCards';
import { Link } from 'react-router-dom';
import axios from '../config/axios';

function UserPayment() {
  const [customerCards, setCustomerCards] = useState([]);

  useEffect(() => {
    const fetchCreditCard = async () => {
      try {
        const res = await axios.get('/credit_cards');
        setCustomerCards(res.data.creditCards);
      } catch (err) {
        console.dir(err);
      }
    };
    fetchCreditCard();
  }, []);

  const Omise = window.Omise;
  Omise.setPublicKey('pkey_test_5pdoxhl4p3erc27pgew');

  const handleClickDeleteCard = async (card_id) => {
    try {
      await axios.post(`/credit_cards/${card_id}`);
      const newCustomerCards = customerCards.filter((card) => card.id !== card_id);
      setCustomerCards(newCustomerCards);
    } catch (err) {
      console.dir(err);
    }
  };

  const customerCardsShow = customerCards.map((card) => (
    <UserPaymentCardList key={card.id} card={card} handleClickDeleteCard={handleClickDeleteCard} />
  ));

  return (
    <>
      <AccountHeader />
      <div className='container d-flex align-items-center justify-content-center my-5' style={{ minHeight: '40vh' }}>
        <div className='text-center' style={{ width: '80%' }}>
          <h4>CARD LIST</h4>
          {customerCardsShow}
          <button className='btn btn-dark mt-3 mb-5'>
            <Link to='/user_add_card' className='nav-link' style={{ color: 'inherit' }}>
              ADD NEW CARD
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default UserPayment;
