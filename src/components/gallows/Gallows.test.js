import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Gallows from './Gallows'
import gallow from '../../img/gallows-t.svg'

describe('Gallows', () => {
  it('should render gallows image', () => {
    render(<Gallows />);

    const gallowsImage = screen.getByAltText('gallows');
    expect(gallowsImage).toBeInTheDocument();
    expect(gallowsImage).toHaveAttribute('src', gallow);
  });
  it('should render human head if 1 fail attempt', () => {
    render(<Gallows failedAttempts={1} />);

    const humanHead = screen.getByTestId('human-part-1');
    expect(humanHead).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(1);
  });
  it('should render human body if 2 fail attempts', () => {
    render(<Gallows failedAttempts={2} />);

    const humanBody = screen.getByTestId('human-part-2');
    expect(humanBody).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(2);
  });
  it('should render left arm if 3 fail attempts', () => {
    render(<Gallows failedAttempts={3} />);

    const leftArm = screen.getByTestId('human-part-3');
    expect(leftArm).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(3);
  });
  it('should render right arm if 4 fail attempts', () => {
    render(<Gallows failedAttempts={4} />);

    const rightArm = screen.getByTestId('human-part-4');
    expect(rightArm).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(4);
  });
  it('should render left leg if 5 fail attempts', () => {
    render(<Gallows failedAttempts={5} />);

    const leftLeg = screen.getByTestId('human-part-5');
    expect(leftLeg).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(5);
  });
  it('should render right leg if 6 fail attempts', () => {
    render(<Gallows failedAttempts={6} />);

    const rightLeg = screen.getByTestId('human-part-6');
    expect(rightLeg).toBeInTheDocument();

    const allHumanParts = screen.getAllByTestId(/human-part-/);
    expect(allHumanParts).toHaveLength(6);
  })
});