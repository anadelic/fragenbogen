import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../util/database';

export default function NewIteration() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNextQuestion = (answerOption) => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert('you reached the end of the questionary');
    }
  };

  const handleAnswerChange = (answerIndex) => {
    const updatedAnswers = [...answers];
    const answerIndexInArray = updatedAnswers.indexOf(answerIndex);
    if (answerIndexInArray !== -1) {
      updatedAnswers.splice(answerIndexInArray, 1);
    } else {
      updatedAnswers.push(answerIndex);
    }
    setAnswers(updatedAnswers);
  };

  // saving to the local storage
  const saveAnswers = () => {
    const data = {
      name: name,
      date: date,
      answers: answers,
    };

    localStorage.setItem('questionary', JSON.stringify(data));
  };

  // deleting from local storage
  const deleteData = () => {
    localStorage.removeItem(answers);
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
      <p>
        <label htmlFor="date">
          Date:
          <input
            name="date"
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
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
              checked={answers.includes(index)}
              onChange={() => handleAnswerChange(index)}
            />
          </label>
        ))}
      </div>

      <button onClick={handleNextQuestion}>Next Question</button>
      <button onClick={saveAnswers}>Save</button>

      <Link to="/">Go back to Home Page</Link>
    </div>
  );
}
