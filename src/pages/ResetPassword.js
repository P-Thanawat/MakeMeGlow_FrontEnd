import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Modal from '../component/Modal';
import axios from '../config/axios';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState({ newPassword: '', confirmNewPassword: '' });
  const [modal, setModal] = useState({ active: false, redirect: '', header: '', message: '', reload: false });
  const [error, setError] = useState('');
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState(false);
  const { token } = useParams();
  const history = useHistory();

  const handleSubmitSetNewpassword = async (e) => {
    e.preventDefault();
    if (newPassword.newPassword !== newPassword.confirmNewPassword) {
      setError("Password doesn't match");
    } else {
      try {
        await axios.post('/users/reset_password', {
          newPassword: newPassword.newPassword,
          confirmNewPassword: newPassword.confirmNewPassword,
          resetToken: token,
        });
        history.push({ pathname: '/login', state: { message: 'Reset Password Successfull!!' } });
      } catch (err) {
        console.dir(err);
        setModal({
          active: true,
          redirect: '/forgot_password',
          header: 'Forgot Password',
          message: 'Token error please send otp again!!',
          reload: false,
        });
      }
    }
  };

  const handleChangeInput = (type, e) => {
    setNewPassword((cur) => ({ ...cur, [type]: e.target.value }));
    setError('');
  };

  const handleClickToggleNewPassWord = () => {
    setIsShowNewPassword((cur) => !cur);
  };

  const handleClickToggleConfirmPassWord = () => {
    setIsShowingConfirmPassword((cur) => !cur);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '65vh' }}>
      <Modal modal={modal} setModal={setModal} />
      <form
        onSubmit={handleSubmitSetNewpassword}
        className='shadow d-flex justify-content-center align-items-center rounded py-5'
        style={{ width: '35%', borderTop: '8px solid #0004' }}
      >
        <div className='d-flex flex-column align-items-center' style={{ width: '100%' }}>
          <h3 className='text-center col-12'>RESET PASSWORD?</h3>
          <div class='input-group flex-nowrap my-3' style={{ width: '80%' }}>
            <input
              type={isShowNewPassword ? 'text' : 'password'}
              onChange={(e) => handleChangeInput('newPassword', e)}
              className={`ps-1${error ? ' is-invalid' : ''}`}
              style={{
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                outline: 'none',
                width: '100%',
              }}
              placeholder='New Password'
            />
            <button
              type='button'
              style={{
                backgroundColor: 'inherit',
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                paddingRight: '0.7vw',
              }}
              onClick={handleClickToggleNewPassWord}
            >
              {!isShowNewPassword ? (
                <>
                  {/* <i className='bi bi-unlock' style={{ opacity: '70%' }}></i> */}
                  <i className='bi bi-eye' style={{ opacity: '70%' }}></i>
                </>
              ) : (
                <>
                  {/* <i className='bi bi-lock' style={{ opacity: '70%' }}></i> */}
                  <i className='bi bi-eye-slash' style={{ opacity: '70%' }}></i>
                </>
              )}
            </button>
          </div>
          <div class='input-group flex-nowrap my-3' style={{ width: '80%' }}>
            <input
              type={isShowingConfirmPassword ? 'text' : 'password'}
              onChange={(e) => handleChangeInput('confirmNewPassword', e)}
              className={`ps-1`}
              style={{
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                outline: 'none',
                width: '100%',
              }}
              placeholder='Confirm Password'
            />
            <button
              type='button'
              style={{
                backgroundColor: 'inherit',
                border: 'none',
                borderBottom: error ? '1.5px solid #dc3545' : '1.5px solid #0004',
                paddingRight: '0.7vw',
              }}
              onClick={handleClickToggleConfirmPassWord}
            >
              {!isShowingConfirmPassword ? (
                <>
                  {/* <i className='bi bi-unlock' style={{ opacity: '70%' }}></i> */}
                  <i className='bi bi-eye' style={{ opacity: '70%' }}></i>
                </>
              ) : (
                <>
                  {/* <i className='bi bi-lock' style={{ opacity: '70%' }}></i> */}
                  <i className='bi bi-eye-slash' style={{ opacity: '70%' }}></i>
                </>
              )}
            </button>
          </div>
          <div style={{ width: '80%' }}>
            <input type='text' className={`form-control is-invalid`} hidden />
            {error ? <div className='invalid-feedback'>{error}</div> : null}
          </div>
          <button type='submit' className='btn btn-dark mt-2' style={{ width: '8.8541666vw' }}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
