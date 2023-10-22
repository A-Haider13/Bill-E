import React from 'react';

function CheckMultipleChoiceQuestion(props) {
  const { question, options, selectedOptions, handleChange } = props;

  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={(e) => handleChange(option, e.target.checked)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default CheckMultipleChoiceQuestion;
