import React from 'react'
import './gallows.scss';
import gallow from 'img/gallows-t.svg'

const Gallows = ({ failedAttempts }) => {
  const HANGMAN_PARTS = [
    <div className='man man-head' key='head' data-testid='human-part-1'><span className="eye left-eye">&#10006;</span><span className="eye right-eye">&#10006;</span></div>,
    <div className='man man-body' key='body' data-testid='human-part-2'></div>,
    <div className='man man-left-arm' key='left-arm' data-testid='human-part-3'></div>,
    <div className='man man-right-arm' key='right-arm' data-testid='human-part-4'></div>,
    <div className='man man-left-leg' key='left-leg' data-testid='human-part-5'></div>,
    <div className='man man-right-leg' key='right-leg' data-testid='human-part-6'></div>
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