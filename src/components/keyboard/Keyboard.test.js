import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Keyboard from './Keyboard'

describe('Keyboard',() => {
  it('should render the keyboard', () => {
    render(<Keyboard />)
    expect(screen.getByText('A')).toBeInTheDocument()
  }),
  it('should disable the letter when it is clicked', async () => {
    const onKeyboardClick = jest.fn();
    const gameOver = false;
    const winner = false;
    render(<Keyboard onKeyboardClick={onKeyboardClick} gameOver={gameOver} winner={winner} />);
    fireEvent.click(screen.getByText('A'));
    await waitFor(() => {
      expect(screen.getByText('A')).toBeDisabled();
    });
    expect(screen.getByText('A')).toHaveClass('disabled');
  }), 
  it('should render all alphabet keys', () => {
    render(<Keyboard />)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  }),
  it('should call onKeyboardClick when a letter is clicked', () => {
    const onKeyboardClick = jest.fn();
    render(<Keyboard onKeyboardClick={onKeyboardClick} />)
    fireEvent.click(screen.getByText('A'))
    expect(onKeyboardClick).toHaveBeenCalledWith('a')
  }),
  it('should call onKeyPress when a letter is pressed', () => {
    const onKeyboardClick = jest.fn();
    render(<Keyboard onKeyboardClick={onKeyboardClick} />)
    fireEvent.keyDown(document, {key: 'A', code: 'KeyA'})
    expect(onKeyboardClick).toHaveBeenCalledWith('a')
  }),
  it('should not call onKeyPress when a letter is pressed', () => {
    const onKeyboardClick = jest.fn();
    render(<Keyboard onKeyboardClick={onKeyboardClick} />)
    fireEvent.keyPress(screen.getByText('A'))
    expect(onKeyboardClick).not.toHaveBeenCalledWith('a')
  }),
  it('should apply correct styling for correct letters', () => {
    render(<Keyboard correctLetters={['A']} />)
    fireEvent.keyPress(screen.getByText('A'))
    expect(screen.getByText('A')).toHaveClass('keyboard-letter')
  }),
  it('should reset all keys when reset prop is triggered', () => {
    render(<Keyboard reset={true} />)
    const keys = screen.getAllByRole('button');
    keys.forEach((key) => {
      expect(key).not.toHaveClass('correct');
      expect(key).not.toHaveClass('incorrect');
    });
  })
})
