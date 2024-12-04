import React, { useState } from 'react'
import HTML from './html'
import shared from './shared';

const Questions = () => {

  const [form, setForm] = useState(
    shared.questions.reduce((acc, question) => {
      acc[question.question] = '';
      return acc;
    }, {})
  );

  const [currentIndex, setCurrentIndex] = useState(0); 

  const handleRadioChange = (question, value) => {
    setForm({ ...form, [question]: value });
  };

  const handleNext = () => {
    if (currentIndex < shared.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = shared.questions[currentIndex];
  return (
    <div>
      <HTML form={form} handleRadioChange={handleRadioChange} handleNext={handleNext} handleBack={handleBack}
       currentQuestion={currentQuestion}
       currentIndex={currentIndex}/>
    </div>
  )
}

export default Questions
