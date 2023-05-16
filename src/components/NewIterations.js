import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../util/database';

export default function NewIteration() {
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  // changing questions with state
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert('you reached the end of the questionary');
    }
  };

  // reseting the questionary
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswerChange = (answerText) => {
    const updatedAnswers = [...answers];
    updatedAnswers.push(answerText);
    setAnswers(updatedAnswers);
  };
  // get current date
  const currentDate = new Date().toLocaleDateString();

  // saving to the local storage and adding timestamp so I can delete single ones after
  const handleSave = () => {
    const iterationData = {
      id: Date.now(),
      name: name,
      date: currentDate,
      answers: answers,
    };
    const savedIterations =
      JSON.parse(localStorage.getItem('questionary')) || [];
    savedIterations.push(iterationData);

    localStorage.setItem('questionary', JSON.stringify(savedIterations));
  };

  return (
    <div>
      <h1>New questionary</h1>
      <p>
        <label htmlFor="title">
          Name:
          <input
            name="title"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </p>
      <h1>Questions</h1>
      <div className="question-text">
        {questions[currentQuestion].questionText}
      </div>
      <div className="answer-section">
        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
          <label key={index}>
            {answerOption.answerText}
            <input
              type="checkbox"
              checked={answers.includes(answerOption.answerText)}
              onChange={() => handleAnswerChange(answerOption.answerText)}
            />
          </label>
        ))}
      </div>

      <button onClick={handleNextQuestion}>Next Question</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSave}>Save</button>

      <Link to="/">Go back to Home Page</Link>
    </div>
  );
}
