import { Link } from 'react-router-dom';
import IterationsOverview from './IterationOverview';

export default function HomePage() {
  return (
    <div>
      <h1>Questionary</h1>
      <Link to="newIteration">
        <button>New Iteration</button>
      </Link>
      <IterationsOverview />
    </div>
  );
}
