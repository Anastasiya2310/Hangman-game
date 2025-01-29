import './keyboard.scss';
import React, { useEffect, useMemo, useState } from 'react';

const Keyboard = ({ onKeyboardClick, gameOver, winner }) => {
  const [disabledKeys, setDisabledKeys] = useState([]);

  let charCodes = useMemo(() => ({
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',
  }),[]);

  const handleLetterClick = (letter) => {
    onKeyboardClick(letter);
    setDisabledKeys([...disabledKeys, letter]);
  }

  const resetKeyboard = () => {
    setDisabledKeys([]);
  }

  useEffect(() => {
    if(gameOver || winner) {
      resetKeyboard();
    }
  }, [gameOver, winner]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = Object.keys(charCodes).find((key) => charCodes[key] === event.code);
      if(letter && !disabledKeys.includes(letter) && !winner && !gameOver) {
        onKeyboardClick(letter);
        setDisabledKeys([...disabledKeys, letter]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onKeyboardClick, charCodes, disabledKeys, gameOver, winner]);

  const createButtons = (alphabet) => {
    let letters = [];
    for(let char in alphabet){
      letters.push(<button disabled={(!gameOver && !winner && disabledKeys.includes(char)) ? 'disabled' : null} className={`keyboard-letter ${disabledKeys.includes(char) && !gameOver && !winner ? 'disabled' : ''}`} key={char} onClick={() => handleLetterClick(char)}>{char.toLocaleUpperCase()}</button>);
    }
    return letters;
  }

  return (
    <div className='keyboard-container'>
      <div className='keyborad-letters'>
        {createButtons(charCodes)}
      </div>
    </div>
  )
}

export default Keyboard;