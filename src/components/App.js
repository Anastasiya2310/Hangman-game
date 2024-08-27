import React, { useState, useEffect } from 'react';
import { neon } from '@neondatabase/serverless';
import './App.scss';
import Dashboard from './dashboard/Dashboard';
import Modal from './modal/Modal';
import Select from './select/Select';
import Lottie from 'lottie-react';
import animationData from '../img/confetti.json';

/*
  api.json data structure

  data: [
    {
      id: number,
      category: 'string',
      question: 'string with qustion',
      answer: 'string with answer',
    },
    {
      id: number,
      category: 'string',
      question: 'string with qustion',
      answer: 'string with answer',
    },
  ]
*/

const App = () => {
  const [data, setData] = useState([]);
  const [winner, setWinner] = useState(false);
  const [show, setShow] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleQuestionChange = (newQuestion) => {
    setCurrentQuestion(newQuestion);
  }

  const hideModal = () => {
    setShow(false);
    setGameOver(false);
    setWinner(false);
    setFailedAttempts(0);

    if(data.length > 0) {
      const filteredQuestion = data.filter(item => item.category === selectedCategory);
      const randomIndex = Math.floor(Math.random() * filteredQuestion.length);
      const randomQuestion = filteredQuestion[randomIndex];
      setCurrentQuestion(randomQuestion);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sql = neon('postgresql://ro_user:hi%26%7CK42%7DG%40A6@ep-lively-violet-a2vco8om-pooler.eu-central-1.aws.neon.tech/random_quotes?sslmode=require');
        const dataDB = await sql('SELECT * FROM questions');
        setData(dataDB);
      } catch(error) {
        throw new Error(`Error: ${error}`);
      }
    }

    fetchData();
  }, [gameOver, winner]);

  return (
    <>
      <Modal hideModal={hideModal} show={show}>
        {gameOver ? (<h1 className="title title-fail">Game Over</h1>) : null}
        {winner ? (<><h1 className="title title-success">You win! Congratulations!</h1><Lottie className="win-animation" animationData={animationData} style={{ width: 200, height: 200 }}></Lottie></>) : null}
        <h2>Choose the category of questions</h2>
        <Select data={data} onQuestionChange={handleQuestionChange} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Select>
      </Modal>
      <Dashboard 
        data={currentQuestion} 
        gameOver={gameOver} 
        setGameOver={setGameOver} 
        setShow={setShow}  
        winner={winner}
        setWinner={setWinner}
        failedAttempts={failedAttempts}
        setFailedAttempts={setFailedAttempts}
      />
    </>
  )
}

export default App;