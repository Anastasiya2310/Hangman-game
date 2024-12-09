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
  const handleStartGame = () => {
    hideModal();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className={`modal-wraper ${show ? 'visible' : 'hidden'} ${gameOver ? 'darkenBg' : 'transparentBg'}`}>
      <div className='modal'>
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