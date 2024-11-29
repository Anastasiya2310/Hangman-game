import React, {useEffect, useCallback} from 'react';
import './select.scss';

const Select = ({ data, onQuestionChange, selectedCategory, setSelectedCategory }) => {
  let getRandomQuestion = useCallback((selectedCategory) => {
    if(!data || data.length === 0) return null

    const filteredQuestions = data.filter(
      (item) => item.category === selectedCategory
    );
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  }, [data]);

  useEffect(() => {
    if(data.length > 0 && !selectedCategory) {
      setSelectedCategory(data[0].category);
      const randomQuestion = getRandomQuestion(data[0].category);
      onQuestionChange(randomQuestion);
    }
  },[data, onQuestionChange, getRandomQuestion, selectedCategory, setSelectedCategory]);

  const renderSelect = () => {
    let options = [];
    let uniqueCategories = new Set();

    data.forEach((item) => {
      if(!uniqueCategories.has(item.category)) {
        options.push(
          <option key={item.category} value={item.category}>
            {item.category}
          </option>
        )
        uniqueCategories.add(item.category);
      }
    })
    return options;
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    const randomQuestion = getRandomQuestion(selectedCategory);
    onQuestionChange(randomQuestion);
  }

  return (
    <div className='select-category'>
      {data && (
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {renderSelect()}
        </select>
      )}
    </div>
  )
}

export default Select;