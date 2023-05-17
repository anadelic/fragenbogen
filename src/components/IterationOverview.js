import { useEffect, useState } from 'react';

export default function IterationsOverview() {
  const [data, setData] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

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

  return (
    <>
      {data.length === 0 ? (
        <p>There are no iterations</p>
      ) : (
        <div className="iterations">
          {data.map((iteration) => (
            <div className="iteration-card" key={iteration.id}>
              <p className="iteration-status">Iteration {iteration.status}</p>
              <p>Name: {iteration.name}</p>
              <p>Date: {iteration.date}</p>
              {showAnswers && <p>Answers: {iteration.answers.join(', ')}</p>}
              <button
                className="answers-btn"
                onClick={() => setShowAnswers(!showAnswers)}
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteIteration(iteration.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
