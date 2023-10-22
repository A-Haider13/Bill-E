import React from 'react';

function MultipleChoiceQuestion(props) {
  const { question, options, selectedOption, handleChange } = props;

  return (
    <div>
      <p>{question}</p>
      <form>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </form>
    </div>
  );
}

export default MultipleChoiceQuestion;
