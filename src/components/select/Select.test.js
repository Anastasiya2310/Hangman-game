import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Select from './Select'

describe('Select component', () => {
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

  const mockOnQuestionChange = jest.fn();
  const mockSetSelectedCategory = jest.fn();

  it('Should render', () => {
    render(
      <Select 
        data={mockData}
        onQuestionChange={mockOnQuestionChange}
        selectedCategory='Animals'
        setSelectedCategory={mockSetSelectedCategory}
      />
    )
    expect(screen.getByRole('option', {name: 'Animals'}).selected).toBe(true);
  });

  it('Should have a truthy value', () => {
    const { container } = render(
      <Select 
        data={mockData}
        onQuestionChange={mockOnQuestionChange}
        selectedCategory=''
        setSelectedCategory={mockSetSelectedCategory}
      />
    )

    expect(container.firstChild).toBeTruthy();
  });

  it('Length should match the number of unuique catrgories', () => {
    render(
      <Select 
        data={mockData}
        onQuestionChange={mockOnQuestionChange}
        selectedCategory=''
        setSelectedCategory={mockSetSelectedCategory}
      />
    )

    const options = screen.getAllByRole('option');
    const uniqueCategories = new Set(mockData.map(item => item.category));

    expect(options.length).toBe(uniqueCategories.size);
  });

  it('Should call onQuestionChange when a new category is selected', () => {
    render(
      <Select 
        data={mockData}
        onQuestionChange={mockOnQuestionChange}
        selectedCategory='Animals'
        setSelectedCategory={mockSetSelectedCategory}
      />
    )

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, {target: {value: 'Medicine'}});

    expect(mockSetSelectedCategory).toHaveBeenCalledWith('Medicine');
    expect(mockOnQuestionChange).toHaveBeenCalled();
  });

  it('Should render first category on initial render', () => {
    render(
      <Select 
        data={mockData}
        onQuestionChange={mockOnQuestionChange}
        selectedCategory=''
        setSelectedCategory={mockSetSelectedCategory}
      />
    )
    expect(mockSetSelectedCategory).toHaveBeenCalledWith('Animals');
  })
})