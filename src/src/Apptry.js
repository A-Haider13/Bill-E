import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextEntryQuestion from "./TextEntryQuestion";



const questions = [
    {
      type: "MCQ",
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
    },
    {
      type: "Text",
      question: "Name a famous scientist.",
    },
    // Add more questions with different types
  ];
  
function App() {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  return (
    <div>
      {questions.map((question, index) => {
        if (question.type === "MCQ") {
          return (
            <MultipleChoiceQuestion
              key={index}
              question={question.question}
              options={question.options}
              selectedOption={answers[index] || ""}
              handleChange={(selectedOption) =>
                handleAnswerChange(index, selectedOption)
              }
            />
          );
        } else if (question.type === "Text") {
          return (
            <TextEntryQuestion
              key={index}
              question={question.question}
              answer={answers[index] || ""}
              handleChange={(textAnswer) =>
                handleAnswerChange(index, textAnswer)
              }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;
