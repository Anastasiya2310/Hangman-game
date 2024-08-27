import './modal.scss';

const Modal = ({ children, show, hideModal }) => {
  const showHideClassModal = show ? 'modal visible-modal' : 'modal hidden-modal';
  const handleStartGame = () => {
    hideModal();
  };

  return (
    <div className={show ? 'modal-wraper visible' : 'modal-wraper hidden'}>
      <div className={showHideClassModal}>
        {children}
        <button onClick={handleStartGame} className='button button-start'>Start game</button>
      </div>
    </div>
  )
}

export default Modal;