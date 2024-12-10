import './gallows.scss';
import gallow from 'img/gallows-t.svg'

const Gallows = ({ failedAttempts }) => {
  const HANGMAN_PARTS = [
    <div className="man man-head" key='head'><span className="eye left-eye">&#10006;</span><span className="eye right-eye">&#10006;</span></div>,
    <div className="man man-body" key='body'></div>,
    <div className="man man-left-arm" key='left-arm'></div>,
    <div className="man man-right-arm" key='right-arm'></div>,
    <div className="man man-left-leg" key='left-leg'></div>,
    <div className="man man-right-leg" key='right-leg'></div>
  ]
  let hangmanParts = HANGMAN_PARTS.slice(0, failedAttempts);

  return (
    <>
      <div className='gallows-img'>
        <img src={gallow} alt='gallows' />
        {hangmanParts}
      </div>
    </>
  )
}

export default Gallows;