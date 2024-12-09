import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Lottie from 'lottie-react';
import Modal from './Modal'

jest.mock('lottie-react', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="lottie-animation" />)
  };
})

describe('Modal component', () => {
  const mockData = [
    {
      id: 1,
      category: 'Animals',
      question: 'What is the fastest animal?',
      answer: 'Cheetach',
    },
    {
      id: 15,
      category: 'Medicine',
      question: 'Where on your body is your skin the thinnest?',
      answer: 'Eyelid',
    }
  ];
  const mockHandleQuestionChange = jest.fn();
  const mockSetSelectedCategory = jest.fn();
  const mockHideModal = jest.fn();

  const defaultProps = {
    data: mockData,
    handleQuestionChange: mockHandleQuestionChange,
    selectedCategory: 'Animals', 
    setSelectedCategory: mockSetSelectedCategory, 
    hideModal: mockHideModal,
    show: true, 
    gameOver: false, 
    winner: false
  }

  it('apply correct CSS class, when "show" is true', () => {
    render (
      <Modal {...defaultProps} />
    )
    const divModal = screen.getByRole('dialog');

    expect(divModal).toHaveClass('visible');
  });

  it('apply correct CSS class, when "show" is false', () => {
    render (
      <Modal {...defaultProps} show={false} />
    )
    const divModal = screen.getByRole('dialog');
    expect(divModal).toHaveClass('hidden');
  });

  it('apply correct CSS class and title, when "gameOver" is true', () => {
    render (
      <Modal {...defaultProps} show={true} gameOver={true} />
    )
    const divModal = screen.getByRole('dialog');
    const title = screen.getByText('Game Over');

    expect(divModal).toHaveClass('darkenBg');
    expect(title).toBeInTheDocument();
  });

  it('apply correct CSS class and title, when "winner" is true', () => {
    render (
      <Modal {...defaultProps} show={true} gameOver={false} winner={true} />
    )
    const divModal = screen.getByRole('dialog');
    const title = screen.getByText('You win! Congratulations!');
    
    expect(divModal).not.toHaveClass('darkenBg');
    expect(title).toBeInTheDocument();
  });
})