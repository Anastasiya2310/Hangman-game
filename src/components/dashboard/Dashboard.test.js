import React, { act } from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  jest.useFakeTimers(); 

  let mockProps = {
    data: {
      id: 1,
      category: 'Animals',
      question: 'What is the fastest animal?',
      answer: 'Cheetach'
    },
    setGameOver: jest.fn(),
    setShow: jest.fn(),
    setWinner: jest.fn(),
    setFailedAttempts: jest.fn(),
    setKeyboardEnabled: jest.fn(),
    keyboardEnabled: true,
    gameOver: false,
    winner: false,
    failedAttempts: 0
  };

  it('should render category and question', () => {
    const { rerender } = render(<Dashboard {...mockProps} />);
    act(() => {
      rerender(<Dashboard {...mockProps} />);
    });
    const title = screen.getByText(/Question from category:/i);
    const category = screen.getByTestId('Animals');
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  }),
  it('should render _ instead of letters if no user interaction', () => {
    render(<Dashboard {...mockProps} />);

    const answerContainer = screen.getByTestId('answer');
    const underscores = answerContainer.querySelectorAll('span.answer-letters');
    expect(underscores).toHaveLength(mockProps.data.answer.length);
    underscores.forEach((underscore) => {
      expect(underscore).toHaveTextContent('_');
    })
  }),
  it('should show number of failed attempts', () => {
    const { rerender } = render(<Dashboard {...mockProps} />);
    const updatedProps = {
      ...mockProps,
      failedAttempts: 3
    };
    act(() => {
      rerender(<Dashboard {...updatedProps} />);
    });

    const failedAttempts = screen.getByTestId('failed-attempts');
    expect(failedAttempts).toBeInTheDocument();
    expect(failedAttempts).toHaveTextContent('Failed attempts: 3 / 6');
  }),
  it('should show "Loading..." title if no data available', () => {
    const { rerender } = render(<Dashboard {...mockProps} />);
    const updatedProps = {
      ...mockProps,
      data: null
    };

    act(() => {
      rerender(<Dashboard {...updatedProps} />);
    });

    expect(screen.getByTestId('question')).toHaveTextContent('Loading...');
  }),
  it('should set "gameOver" to TRUE if failed attempts = 6', () => {
    const { rerender } = render(<Dashboard {...mockProps} />);
    const updatedProps = {
      ...mockProps,
      failedAttempts: 5
    };
    act(() => {
      rerender(<Dashboard {...updatedProps} />);
    });
    
    const wrongLetterButton = screen.getByText('Z');
    fireEvent.click(wrongLetterButton);

    setTimeout(() => {
      expect(mockProps.setGameOver).toHaveBeenCalledWith(true);
      expect(mockProps.setWinner).toHaveBeenCalledWith(false);
    }, 2000)
  }),

  it('should set "winner" to TRUE if entered letters are equal answer',() => {
    render(<Dashboard {...mockProps} />);

    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('H'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('T'));
    fireEvent.click(screen.getByText('A'));
    
    expect(mockProps.setWinner).toHaveBeenCalledWith(true);
    expect(mockProps.setGameOver).toHaveBeenCalledWith(false);
  }),
  it('should increments failed attempts for incorrect letters', () => {
    render(<Dashboard {...mockProps} />);

    fireEvent.click(screen.getByText('Z'));
    expect(mockProps.setFailedAttempts).toHaveBeenCalledWith(1);
  }),

  it('should handle multiple wrong attempts leading to game over', () => {
    const { rerender } = render(<Dashboard {...mockProps} />);
    const updatedProps = {
      ...mockProps,
      failedAttempts: 5
    };

    act(() => {
      rerender(<Dashboard {...updatedProps} />);
    });

    const keyboardButton = screen.getByText('Z');
    fireEvent.click(keyboardButton);

    jest.runAllTimers();
    expect(updatedProps.setKeyboardEnabled).toHaveBeenCalledWith(false);
    expect(updatedProps.setWinner).toHaveBeenCalledWith(false);
    expect(updatedProps.setGameOver).toHaveBeenCalledWith(true);
    expect(updatedProps.setFailedAttempts).toHaveBeenCalledWith(0);
    expect(updatedProps.setShow).toHaveBeenCalledWith(true);
  })
});