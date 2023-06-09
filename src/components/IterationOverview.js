import { useEffect, useState } from 'react';

export default function IterationsOverview() {
  const [data, setData] = useState([]);
  const [showAnswers, setShowAnswers] = useState([]);

  // Getting data from the local storage, if there is no data setting to an empty array
  useEffect(() => {
    const storedData = localStorage.getItem('questionary');
    setData(JSON.parse(storedData) || []);
  }, []);

  // Delete an iteration by ID
  function deleteIteration(iterationId) {
    const updatedData = data.filter(
      (iteration) => iteration.id !== iterationId,
    );
    setData(updatedData);
    // updating local storage after deleting
    localStorage.setItem('questionary', JSON.stringify(updatedData));
  }

  //checks if the current state of the showAnswers array includes iterationId
  function showAndHideAnswers(iterationId) {
    setShowAnswers((currState) => {
      if (currState.includes(iterationId)) {
        return currState.filter((id) => id !== iterationId);
      } else {
        return [...currState, iterationId];
      }
    });
  }

  return (
    <>
      {data.length === 0 ? (
        <p>There are no iterations</p>
      ) : (
        <div className="iterations">
          {data.map((iteration) => (
            <div
              className="iteration-container"
              key={`iteration-${iteration.id}`}
            >
              <div className="iteration-card">
                <p>Status: {iteration.status}</p>
                <p>Name: {iteration.name}</p>
                <p>Date: {iteration.date}</p>
                <button
                  className="delete-btn"
                  onClick={() => deleteIteration(iteration.id)}
                >
                  Delete
                </button>
              </div>
              {showAnswers.includes(iteration.id) && (
                <div className="answers">
                  <p>Answers:</p>
                  {iteration.answers.map((answer, index) => (
                    <p key={index}>{answer}</p>
                  ))}
                </div>
              )}
              <button
                className="answers-btn"
                onClick={() => showAndHideAnswers(iteration.id)}
              >
                {showAnswers.includes(iteration.id)
                  ? 'Hide Answers'
                  : 'Show Answers'}
              </button>
            </div>
          ))}
        </div>
      )}
      <footer className="footer">
        Copyright <span>Quiz</span>
        {new Date().getFullYear()}
      </footer>
    </>
  );
}
