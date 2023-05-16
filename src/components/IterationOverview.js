export default function IterationsOverview() {
  // get data from the local storage

  //get data
  const getData = () => {
    const data = localStorage.getItem('questionary');
    return JSON.parse(data);
  };
  const data = getData();
  return (
    <div>
      <h2>Iterations Overview</h2>
      <p>Iteration name: {data.name}</p>
      <p>Iteration date: {data.date} </p>
      <p>Answers:</p>
      <ul>
        {data.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}
