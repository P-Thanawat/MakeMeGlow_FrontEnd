import React, { useRef, useState } from 'react';
import '../../css/DragAndDrop.css';
import { toBase64 } from '../../service/convertFile';
import Modal from '../../component/Modal';

function DragAndDrop({ imageUrl, index, setImagesShow, setImagesFile, setDeletedImg, imagesShow }) {
  const [modal, setModal] = useState({ active: false, message: '', header: '', redirect: '/', reload: true });
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef();

  const handleClickAddImage = () => {
    if (!imageUrl) {
      inputRef.current.click();
    }
  };

  const handleChangeInput = async (e) => {
    if (e.target.files[0]) {
      if (['image/png', 'image/jpg', 'image/jpeg'].includes(e.target.files[0]?.type)) {
        try {
          setImagesFile((cur) => {
            const clone = [...cur];
            clone[index] = e.target.files[0];
            return clone;
          });
          const imageUrl = await toBase64(e.target.files[0]);
          setImagesShow((cur) => {
            const clone = [...cur];
            clone[index] = imageUrl;
            return clone;
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        setModal({ active: true, message: 'Only .png, .jpg and .jpeg format allowed!', header: 'STATUS', redirect: '' });
        // alert('Only .png, .jpg and .jpeg format allowed!');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDropFile = async (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files[0]) {
      if (['image/png', 'image/jpg', 'image/jpeg'].includes(e.dataTransfer.files[0].type)) {
        try {
          setImagesFile((cur) => {
            const clone = [...cur];
            clone[index] = e.dataTransfer.files[0];
            return clone;
          });
          const imageUrl = await toBase64(e.dataTransfer.files[0]);
          setImagesShow((cur) => {
            const clone = [...cur];
            clone[index] = imageUrl;
            return clone;
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        setModal({ active: true, message: 'Only .png, .jpg and .jpeg format allowed!', header: 'STATUS', redirect: '' });
        // alert('Only .png, .jpg and .jpeg format allowed!');
      }
    }
  };

  const handleClickClear = () => {
    if (imagesShow[index].split(':')[0] === 'https') {
      setDeletedImg((cur) => [...cur, imagesShow[index]]);
    }
    setImagesShow((cur) => {
      const clone = [...cur];
      clone[index] = '';
      return clone;
    });
    setImagesFile((cur) => {
      const clone = [...cur];
      clone[index] = null;
      return clone;
    });
  };

  return (
    <>
      <Modal modal={modal} setModal={setModal} />
      <div className='DragAndDrop col-lg-4 col-md-6 col-sm-12 p-2'>
        <div
          onClick={handleClickAddImage}
          onDrop={handleDropFile}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border text-center rounded-3${isDragOver ? ' onDragOver' : ''}`}
          id='click_drag_and_drop'
          style={{
            fontSize: '120px',
            opacity: imageUrl ? '' : '50%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            minHeight: '14vw',
            minWidth: '14vw',
          }}
        >
          {imageUrl ? (
            <div className='d-flex justify-content-end'>
              <button className='btn' type='button' onClick={handleClickClear}>
                <i className='bi bi-x text-white' style={{ fontSize: '1.5625vw', fontWeight: '900' }}></i>
              </button>
            </div>
          ) : (
            <>
              <i className='bi bi-images'></i>
              <p className='p-1' style={{ fontSize: '0.625vw' }}>
                Click here or drag and drop to add images
              </p>
            </>
          )}
        </div>
        <input type='file' ref={inputRef} hidden onChange={handleChangeInput} />
      </div>
    </>
  );
}

export default DragAndDrop;
