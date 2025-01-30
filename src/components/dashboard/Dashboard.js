import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import Keyboard from '../keyboard/Keyboard';
import Gallows from '../gallows/Gallows';

const Dashboard = ({ 
  data, 
  gameOver, 
  setGameOver, 
  setShow,
  show, 
  winner, 
  setWinner, 
  failedAttempts, 
  setFailedAttempts,
  keyboardEnabled,
  setKeyboardEnabled,
}) => {
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [answerLetters, setAnswerLetters] = useState([]);

  useEffect(() => {
    if(data && data.answer) {
      let dataAnswerLower = data.answer.toLowerCase();
      setRevealedLetters(Array(dataAnswerLower.length).fill(false));
      setAnswerLetters(dataAnswerLower.split(''));
    }
  }, [data, gameOver, winner]);

  useEffect(() => {
    if (revealedLetters.length > 0 && revealedLetters.every(letter => letter)) {
      setKeyboardEnabled(false);
      setWinner(true);
      setGameOver(false);

      const resetState = () => {
        setKeyboardEnabled(false);
        setRevealedLetters([]);
        setFailedAttempts(0);
        setAnswerLetters([]);
        setShow(true);
      };
      resetState();
    }
  }, [revealedLetters, setWinner, setShow, setGameOver, setFailedAttempts]);
  
  const answerString = () => {
    return answerLetters.map((element, index) => {
      return (
        <p key={index}>
          <span className='answer-letters'>
            {revealedLetters[index] ? element.toLocaleUpperCase() : '_'}
          </span>
        </p>
      );
    });
  };

  const handleLetterClick = (letter) => {
    const isLetterInAnswer = answerLetters.includes(letter);
    if(!isLetterInAnswer) {
      setFailedAttempts(failedAttempts + 1);

      if(failedAttempts === 5) {
        setKeyboardEnabled(false);


        setTimeout(() => {
          setWinner(false);
          setGameOver(true);
          setRevealedLetters([]);
          setFailedAttempts(0);
          setAnswerLetters([]);
          setShow(true);
          return;
        }, 2000)
      }
    }

    const newRevealedLetters = answerLetters.map((el, index) => {
      return el === letter || revealedLetters[index];
    });
    setRevealedLetters(newRevealedLetters);
  }
  
  return (
    <>
    <div 
      className={`dashboard-wrapper 
      ${(failedAttempts === 6) ? 'fade-out-dashboard' : ''} 
      ${show ? 'hidden' : ''} `}
    >
      <div className='quiz-block'>
        {<h1>
          Question from category: <span data-testid='Animals' className='question-category-name'>{data?.category || 'Animals'}</span>
          <p data-testid='question'>{data?.question || 'Loading...'}</p>
        </h1>}
        <div data-testid='answer' className='answer-container'>
          {data && (answerString(data.answer))}
        </div>
        {keyboardEnabled && data && (
          <Keyboard data-testid='keyboard' onKeyboardClick={handleLetterClick} gameOver={gameOver} winner={winner} />
        )}
        <p data-testid='failed-attempts'>Failed attempts: {failedAttempts} / 6</p>
      </div>
      <div className='gallow-block'>
        <Gallows failedAttempts={failedAttempts} />
      </div>
    </div>
    </>
  )
}

export default Dashboard;