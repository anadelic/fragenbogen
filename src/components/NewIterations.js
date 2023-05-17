import { useState } from 'react';
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
      alert("You've reached the end of the questionnaire.");
    }
  };

  // reseting the questionary
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setName('');
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
  };

  // Diasbling next button until user checks at least one answer
  const isAnswerChecked = questions[currentQuestion].answerOptions.some(
    (answerOption) => answers.includes(answerOption.answerText),
  );

  // Diasbling save button until all questions are answered, iterate over each question, checks if at least one answer option is included in the array, checks if the answers array includes some answerText
  const areAllQuestionsAnswered = () => {
    return questions.every((question) => {
      return question.answerOptions.some((answerOption) =>
        answers.includes(answerOption.answerText),
      );
    });
  };

  const handleNotCompleted = () => {
    if (
      (currentQuestion < questions.length - 1 ||
        answers.length < questions.length) &&
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
      <h1>Start a New Questionnaire</h1>
      <p>
        <label htmlFor="title" className="inputLabel">
          Name:
          <input
            className="input"
            name="title"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </p>

      <div className="question-text">
        {questions[currentQuestion].questionText}
      </div>
      <div className="answer-section">
        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
          <label className="checkboxLabel" key={index}>
            {answerOption.answerText}
            <input
              className="checkbox"
              type="checkbox"
              checked={answers.includes(answerOption.answerText)}
              onChange={() => handleAnswerChange(answerOption.answerText)}
            />
          </label>
        ))}
      </div>
      <div>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn"
          onClick={handleNextQuestion}
          disabled={!isAnswerChecked}
        >
          Next
        </button>
        <button
          className="btn"
          onClick={handleSave}
          disabled={!areAllQuestionsAnswered() || !isAnswerChecked}
        >
          Save
        </button>
      </div>

      <Link to="/" onClick={handleNotCompleted} className="link">
        Back to Homepage
      </Link>
    </div>
  );
}
