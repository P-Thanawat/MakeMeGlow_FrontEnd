import axios from '../config/axios';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { validateEmail, validateFirstName, validateLastName, validateMessage } from '../service/validateForm';
import { useHistory } from 'react-router';
import Modal from '../component/Modal';

function ContactUs() {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const {
    state: { user },
  } = useAuthContext();
  const history = useHistory();
  const [contactData, setContactData] = useState({
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    email: user ? user.email : '',
    message: '',
  });
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeData = (e) => {
    setContactData((cur) => ({ ...cur, [e.target.id]: e.target.value }));
    setError((cur) => ({ ...cur, [e.target.id]: '' }));
  };

  const handleClickSend = async () => {
    try {
      const errorFirstName = validateFirstName(contactData.firstName);
      const errorLastName = validateLastName(contactData.lastName);
      const errorEmail = validateEmail(contactData.email);
      const errorMessage = validateMessage(contactData.message);

      setError({
        ...error,
        firstName: errorFirstName,
        lastName: errorLastName,
        email: errorEmail,
        message: errorMessage,
      });

      if (errorFirstName || errorLastName || errorEmail || errorMessage) {
        return;
      }
      await axios.post('/contactUs', contactData);
      setModal({ active: true, message: 'Sending Message Successful', header: 'STATUS', redirect: '/', reload: false });
      // alert('Sending Message Successful');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        background: 'linear-gradient(0deg, #FEFFFF 0%, #FEF3F5 100%)',
        width: '100%',
        minHeight: '70vh',
      }}
    >
      <Modal modal={modal} setModal={setModal} />
      <div
        className='my-5 p-5'
        style={{
          width: '39.0625vw',
          backgroundColor: '#FFFC',
          borderRadius: '0.8333333333333333vw',
          boxShadow: '0 1.041666666666667vw 1.354166666666667vw #0001,0 8px 9px #0001',
        }}
      >
        <div className='row'>
          <div className='col-12 mb-4'>
            <h3 className='text-center' style={{ opacity: '50%' }}>
              CONTACT US
            </h3>
          </div>
          <div className='col-6 mb-4'>
            <label htmlFor='firstName' className='mb-1'>
              First Name
            </label>
            <input
              onChange={onChangeData}
              value={contactData.firstName}
              type='text'
              className={`form-control ${error.firstName ? ' is-invalid' : ''}`}
              id='firstName'
              placeholder='First Name'
            />
            {error.firstName ? <div className='invalid-feedback'>{error.firstName}</div> : null}
          </div>
          <div className='col-6 mb-4'>
            <label htmlFor='lastName' className='mb-1'>
              Last Name
            </label>
            <input
              onChange={onChangeData}
              value={contactData.lastName}
              type='text'
              className={`form-control ${error.lastName ? ' is-invalid' : ''}`}
              id='lastName'
              placeholder='Last Name'
            />
            {error.lastName ? <div className='invalid-feedback'>{error.lastName}</div> : null}
          </div>
          <div className='col-12 mb-4'>
            <label htmlFor='email' className='mb-1'>
              Email Adress
            </label>
            <input
              onChange={onChangeData}
              value={contactData.email}
              type='text'
              className={`form-control ${error.email ? ' is-invalid' : ''}`}
              id='email'
              placeholder='Email Adress'
            />
            {error.email ? <div className='invalid-feedback'>{error.email}</div> : null}
          </div>
          <div className='col-12 mb-4'>
            <label htmlFor='message' className='mb-1'>
              Your message
            </label>
            <textarea
              className={`form-control ${error.message ? ' is-invalid' : ''}`}
              id='message'
              style={{ height: '5.520833333333333vw' }}
              placeholder='Message here...'
              onChange={onChangeData}
              value={contactData.message}
            ></textarea>
            {error.message ? <div className='invalid-feedback'>{error.message}</div> : null}
          </div>
          <div className='col-12 mb-4'>
            <button className='btn btn-dark' style={{ width: '100%' }} onClick={handleClickSend}>
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
