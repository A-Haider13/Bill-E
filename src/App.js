import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextEntryQuestion from "./TextEntryQuestion";
import CMCQ from  "./CheckMultipleChoiceQuestion";


// Introductory page component
function IntroPage() {
  return (
    <div className="intro-page">
      <h1>Welcome to our Question Form</h1>
      <p>Use this form to ask your questions and get answers.</p>
      <Link to="/form">
        <button>Go Ahead</button>
      </Link>
    </div>
  );
}

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
  {
    type:"MCQ",
    question: "is Ibrahim a cutie?",
    options: ["yes","YES"]
  },
  {
    type: "Checkbox", // New question type
    question: "Select your favorite colors:",
    options: ["Red", "Blue", "Green", "Yellow", "Other"],
  },
  
  // Add more questions with different types
];

// Form page component
function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    answers: new Array(questions.length).fill(''), // Initialize answers array
  });

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = answer;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleCheckboxChange = (index, option, checked) => {
    const updatedAnswers = [...formData.answers];
    if (!updatedAnswers[index]) {
      updatedAnswers[index] = [];
    }
  
    if (checked) {
      updatedAnswers[index].push(option);
    } else {
      updatedAnswers[index] = updatedAnswers[index].filter((item) => item !== option);
    }
  
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  
    // Debugging statements
    console.log('Form submitted');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Answers:', formData.answers);
    // ...
  
    // You can add code to handle form submission here (e.g., API requests).
  };

  return (
    <div className="form-page">
      <div className="question-form">
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {questions.map((question, index) => {
            if (question.type === "MCQ") {
              return (
                <MultipleChoiceQuestion
                  key={index}
                  question={question.question}
                  options={question.options}
                  selectedOption={formData.answers[index] || ""}
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
                  answer={formData.answers[index] || ""}
                  handleChange={(textAnswer) =>
                    handleAnswerChange(index, textAnswer)
                  }
                />
              );
            }
            else if (question.type === "Checkbox") { // Corrected condition
              return (
                <CMCQ // Use your custom component
                  key={index}
                  question={question.question}
                  options={question.options}
                  selectedOptions={formData.answers[index] || []}
                  handleChange={(selectedOption, checked) =>
                    handleCheckboxChange(index, selectedOption, checked)
                  }
                />
              );
            }
            return null;
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
