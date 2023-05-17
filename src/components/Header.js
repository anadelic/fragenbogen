import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <p>Star Wars Quiz App</p>
      <Link to="newIteration">
        <button className="iteration-btn">New Iteration</button>
      </Link>
    </div>
  );
};
