import React from "react";

function TextEntryQuestion(props) {
  const { question, answer, handleChange } = props;

  return (
    <div>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default TextEntryQuestion;
