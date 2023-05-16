import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Questionary</h1>
      <Link to="newIteration">
        <button>New Iteration</button>
      </Link>
      <h2>Iterations overview</h2>
    </div>
  );
}
