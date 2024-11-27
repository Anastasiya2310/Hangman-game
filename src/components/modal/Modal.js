import './modal.scss';
import Select from '../select/Select';
import Lottie from 'lottie-react';
import animationData from '../../img/confetti.json';

const Modal = ({ 
  data, 
  handleQuestionChange, 
  selectedCategory, 
  setSelectedCategory, 
  hideModal, 
  show, 
  gameOver, 
  winner }) => {
  const showHideClassModal = show ? 'modal visible-modal' : 'modal hidden-modal';
  const handleStartGame = () => {
    hideModal();
  };

  return (
    <div className={`${show ? 'modal-wraper visible' : 'modal-wraper hidden'} ${gameOver ? 'darkenBg' : 'transparentBg'}`}>
      <div className={showHideClassModal}>
        {gameOver ? (<h1 className="title title-fail">Game Over</h1>) : null}
        {winner ? (<><h1 className="title title-success">You win! Congratulations!</h1><Lottie className="win-animation" animationData={animationData} style={{ width: 200, height: 200 }}></Lottie></>) : null}
        <h2>Choose the category of questions</h2>
        <Select data={data} onQuestionChange={handleQuestionChange} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Select>
        <button onClick={handleStartGame} className='button button-start'>Start game</button>
      </div>
    </div>
  )
}

export default Modal;