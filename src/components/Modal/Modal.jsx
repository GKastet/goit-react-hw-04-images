import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalStyled } from './ModalStyled';

function Modal({ onCloseModal, modalData }) {
  const handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <ModalStyled className="overlay" onClick={handleClickOverlay}>
      <div className="modal">
        <img src={modalData?.largeImageURL} alt={modalData?.tags} />
      </div>
    </ModalStyled>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
};

export default Modal;
