import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../config/axios';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePasswordAndConfirmPassWord,
} from '../service/validateForm';
import Modal from '../component/Modal';

function SignUp() {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorSignUp, setErrorSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isAccept, setIsAccept] = useState(false);

  const history = useHistory();

  const handleChangeInput = (field, e) => {
    setSignUpForm((cur) => {
      const clone = { ...cur };
      clone[field] = e.target.value;
      return clone;
    });
    if (field !== 'confirmPassword') {
      setErrorSignUp((cur) => {
        const clone = { ...cur };
        clone[field] = '';
        return clone;
      });
    }
  };

  const handleChangeCheckBox = (e) => {
    setIsAccept((cur) => !cur);
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const errorFirstName = validateFirstName(signUpForm.firstName);
    const errorLastName = validateLastName(signUpForm.lastName);
    const errorEmail = validateEmail(signUpForm.email);
    const errorPassword = validatePasswordAndConfirmPassWord(signUpForm.password, signUpForm.confirmPassword);

    setErrorSignUp({
      ...errorSignUp,
      firstName: errorFirstName,
      lastName: errorLastName,
      email: errorEmail,
      password: errorPassword,
    });

    if (!errorFirstName && !errorLastName && !errorEmail && !errorPassword) {
      try {
        if (isAccept) {
          await axios.post('/users/register', { ...signUpForm });
          setSignUpForm({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          history.push({ pathname: '/login' });
        } else {
          setModal({ active: true, message: 'Please Read the Privace Policy and accept', header: 'STATUS', redirect: '' });
          // alert('Please Read the Privace Policy and accept');
        }
      } catch (err) {
        console.dir(err);
      }
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
        className='bg-white my-5'
        style={{
          width: '28.64583333333333vw',
          boxShadow: '0 0.2083333333333333vw 0.8333333333333333vw #0004',
          borderRadius: '1vw',
        }}
      >
        <form onSubmit={handleSubmitSignUp}>
          <div className='pt-5 px-4 pb-3' style={{ width: '85%', margin: '0 auto' }}>
            <h4 className='text-center'>CREATE YOUR ACCOUNT</h4>
            <div className='row mt-5'>
              <div className='col-6 mt-4 mb-3'>
                <input
                  type='text'
                  className={`form-control${errorSignUp.firstName ? ' is-invalid' : ''}`}
                  style={{ backgroundColor: '#FEF3F5' }}
                  placeholder='Firstname'
                  value={signUpForm.firstName}
                  onChange={(e) => handleChangeInput('firstName', e)}
                />
                {errorSignUp.firstName ? <div className='invalid-feedback'>{errorSignUp.firstName}</div> : null}
              </div>
              <div className='col-6 mt-4 mb-3'>
                <input
                  type='text'
                  className={`form-control${errorSignUp.lastName ? ' is-invalid' : ''}`}
                  style={{ backgroundColor: '#FEF3F5' }}
                  placeholder='Lastname'
                  value={signUpForm.lastName}
                  onChange={(e) => handleChangeInput('lastName', e)}
                />
                {errorSignUp.lastName ? <div className='invalid-feedback'>{errorSignUp.lastName}</div> : null}
              </div>
              <div className='col-12 mb-3'>
                <input
                  type='text'
                  className={`form-control${errorSignUp.email ? ' is-invalid' : ''}`}
                  style={{ backgroundColor: '#FEF3F5' }}
                  placeholder='Email Address'
                  value={signUpForm.email}
                  onChange={(e) => handleChangeInput('email', e)}
                />
                {errorSignUp.email ? <div className='invalid-feedback'>{errorSignUp.email}</div> : null}
              </div>
              <div className='col-6 mb-3'>
                <input
                  type='password'
                  className={`form-control${errorSignUp.password ? ' is-invalid' : ''}`}
                  style={{ backgroundColor: '#FEF3F5' }}
                  placeholder='Password'
                  value={signUpForm.password}
                  onChange={(e) => handleChangeInput('password', e)}
                />
                {errorSignUp.password ? <div className='invalid-feedback'>{errorSignUp.password}</div> : null}
              </div>
              <div className='col-6 mb-3'>
                <input
                  type='password'
                  className={`form-control${errorSignUp.password ? ' is-invalid' : ''}`}
                  style={{ backgroundColor: '#FEF3F5' }}
                  placeholder='Confirm Password'
                  value={signUpForm.confirmPassword}
                  onChange={(e) => handleChangeInput('confirmPassword', e)}
                />
              </div>
              <div className='col-12 mb-3'>
                <div id='passwordHelpBlock' className='form-text'>
                  Your password must be 8-20 characters long, contain letters, numbers and special characters.
                </div>
              </div>
              <div className='col-12 text-center mb-4'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={isAccept}
                  id='flexCheckChecked'
                  onChange={handleChangeCheckBox}
                />
                <label className='form-check-label ms-3' htmlFor='flexCheckChecked'>
                  <span style={{ opacity: '50%' }}> I have read the </span> Privace Policy
                </label>
              </div>
              <div className='col-12'>
                <button
                  className='btn btn-dark'
                  style={{ width: '100%', minHeight: '2.083333333333333vw' }}
                  type='submit'
                >
                  GET STARTED
                </button>
              </div>
              <button className='btn mb-2'>
                <Link to='/login' className='nav-link text-start' style={{ color: '#000' }}>
                  {'<< Back to Login'}
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
