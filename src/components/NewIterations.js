import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { questions } from '../util/database';

export default function NewIteration() {
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const handleNextBtn = (e) => {
    e.preventDefault();
    setShowInput(true);
  };

  // changing questions with state
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (answers.length > 0) {
        handleSave();
        alert("You've reached the end of the questionnaire.");
      }
      navigate('/');
    }
  };

  // reseting the questionnaire
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setName('');
    setShowInput(false);
  };

  // making a copy of an answer array and updating with new ones, updating original answers array.
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
      status: 'completed',
    };

    const savedIterations =
      JSON.parse(localStorage.getItem('questionary')) || [];
    savedIterations.push(iterationData);

    localStorage.setItem('questionary', JSON.stringify(savedIterations));
    navigate('/');
  };

  // Diasbling next button until user checks at least one answer
  const isAnswerChecked = questions[currentQuestion].answerOptions.some(
    (answerOption) => answers.includes(answerOption.answerText),
  );

  const handleNotCompleted = () => {
    if (
      (currentQuestion < questions.length - 1 ||
        answers.length < questions.length ||
        answers.length >= questions.length) &&
      answers.length !== 0
    ) {
      const iterationData = {
        id: Date.now(),
        name: name,
        date: currentDate,
        answers: answers,
        status: 'not completed',
      };
      const savedIterations =
        JSON.parse(localStorage.getItem('questionary')) || [];
      savedIterations.push(iterationData);

      localStorage.setItem('questionary', JSON.stringify(savedIterations));
    }
  };
  return (
    <div className="newIterationPage">
      {!showInput ? (
        <div>
          <h1 className="title">Start a New Questionnaire</h1>
          <form onSubmit={handleNextBtn}>
            <div className="form-input">
              <label htmlFor="title" className="inputLabel">
                <input
                  className="input"
                  name="title"
                  required
                  placeholder="Enter the name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <button className="next-btn">Next</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <label className="checkboxLabel" key={index}>
                    {answerOption.answerText}
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={answers.includes(answerOption.answerText)}
                      onChange={() =>
                        handleAnswerChange(answerOption.answerText)
                      }
                    />
                  </label>
                ),
              )}
            </div>
          </div>
          <div className="btn-group">
            <button
              className="btn"
              onClick={handleNextQuestion}
              disabled={!isAnswerChecked}
            >
              Next Question
            </button>
          </div>
        </div>
      )}

      <div className="link-btn">
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
        <Link to="/" onClick={handleNotCompleted}>
          <button className="btn-back">Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
}
