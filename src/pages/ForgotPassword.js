import React, { useState } from 'react';
import axios from '../config/axios';
import Modal from '../component/Modal';
import { validateEmail } from '../service/validateForm';
import { useHistory } from 'react-router';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ active: false, redirect: '', header: '', message: '', reload: false });

  const history = useHistory();

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    const errorEmail = validateEmail(email);
    if (!errorEmail) {
      try {
        await axios.post('/users/forgot_password', { email });
        history.push({ pathname: '/login', state: { message: 'We have send a password reset otp to your email.' } });
      } catch (err) {
        console.dir(err);
        console.clear();
        if (err.response.status === 400 && err.response.data.message === "User don't exist with that email!!") {
          setModal({
            active: true,
            redirect: '/forgot_password',
            header: 'Forgot Password',
            message: "User don't exist with that email!!",
            reload: false,
          });
        }
      }
    } else {
      setError(errorEmail);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '65vh' }}>
      <Modal modal={modal} setModal={setModal} />
      <form
        onSubmit={handleSubmitForgotPassword}
        className='shadow d-flex justify-content-center align-items-center rounded py-5'
        style={{ width: '35%', borderTop: '8px solid #0004' }}
      >
        <div className='d-flex flex-column row align-items-center' style={{ width: '100%' }}>
          <h3 className='text-center col-12'>FORGOT PASSWORD?</h3>
          <p className='text-center col-12'>Enter your email to reset your password.</p>

          <div className='input-group flex-nowrap my-3' style={{ width: '80%' }}>
            <input
              type='text'
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className='ps-1'
              style={{
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                outline: 'none',
                width: '100%',
              }}
              placeholder='Email'
            />
            <span
              style={{
                backgroundColor: 'inherit',
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                paddingRight: '0.7vw',
              }}
            >
              <i className='bi bi-envelope' style={{ opacity: '60%' }}></i>
            </span>
          </div>
          <div style={{ width: '80%' }}>
            <input type='text' className={`form-control is-invalid`} hidden />
            {error ? <div className='invalid-feedback'>{error}</div> : null}
          </div>
          <button className='btn btn-dark mt-4' type='submit' style={{ width: '8.8541666vw' }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
