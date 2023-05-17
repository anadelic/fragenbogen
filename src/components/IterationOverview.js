import { useEffect, useState } from 'react';

export default function IterationsOverview() {
  const [data, setData] = useState([]);

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
        <div>
          <h2>Iterations Overview</h2>
          {data.map((iteration) => (
            <div key={iteration.id}>
              <p>Iteration {iteration.status}</p>
              <p>Name: {iteration.name}</p>
              <p>Date: {iteration.date}</p>
              <p>Answers: {iteration.answers.join(', ')}</p>
              <button onClick={() => deleteIteration(iteration.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
