import { useState, useEffect } from 'react';
import './dashboard.scss';
import Keyboard from '../keyboard/Keyboard';
import Gallows from '../gallows/Gallows';

const Dashboard = ({ 
  data, 
  gameOver, 
  setGameOver, 
  setShow, 
  winner, 
  setWinner, 
  failedAttempts, 
  setFailedAttempts,
}) => {
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [keyboardEnabled, setKeyboardEnabled] = useState(true);
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
      setKeyboardEnabled(true);
      setWinner(true);
      setGameOver(false);

      const resetState = () => {
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
    if(!keyboardEnabled) return;

    const isLetterInAnswer = answerLetters.includes(letter);
    if(!isLetterInAnswer) {
      setFailedAttempts(failedAttempts + 1);

      if(failedAttempts === 5) {
        setTimeout(() => {
          setWinner(false);
          setKeyboardEnabled(true);
          setGameOver(true);
          setRevealedLetters([]);
          setFailedAttempts(0);
          setAnswerLetters([]);
          setShow(true);
          return;
        }, 300)
      }
    }

    const newRevealedLetters = answerLetters.map((el, index) => {
      return el === letter || revealedLetters[index];
    });
    setRevealedLetters(newRevealedLetters);
  }
  
  return (
    <>
    <div className='dashboard-wrapper'>
      <div className='quiz-block'>
        {<h1>
          Question from category: <span className='question-category-name'>{data?.category || 'Animal'}</span>
          <p>{data?.question || 'Loading...'}</p>
        </h1>}
        <div className='answer-container'>
          {data && (answerString(data.answer))}
        </div>
        {keyboardEnabled && data && (
          <Keyboard onKeyboardClick={handleLetterClick} gameOver={gameOver} winner={winner} />
        )}
        <p>Failed attempts: {failedAttempts} / 6</p>
      </div>
      <div className='gallow-block'>
        <Gallows failedAttempts={failedAttempts} />
      </div>
    </div>
    </>
    
  )
}

export default Dashboard;