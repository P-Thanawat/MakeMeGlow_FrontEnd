import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Modal({ modal, setModal }) {
  const activeModal = useRef();
  const history = useHistory();
  useEffect(() => {
    if (modal.active) {
      activeModal.current.click();
    }
  }, [modal.active]);

  const handleClickCloseModal = () => {
    setModal((cur) => ({ ...cur, active: false }));
    if (modal.reload) {
      window.location.reload();
    } else {
      modal.redirect && history.push({ pathname: modal.redirect });
    }
  };

  return (
    <>
      <button
        type='button'
        ref={activeModal}
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#Modal'
        hidden
      >
        Active modal
      </button>

      <div className='modal fade' id='Modal' tabIndex='-1' aria-labelledby='ModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='ModalLabel'>
                {modal.header}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={handleClickCloseModal}
              ></button>
            </div>
            <div className='modal-body'>{modal.message}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={handleClickCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
