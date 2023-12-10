import { Link } from 'react-router-dom';

export default function WelcomeMessage() {
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl font-mono font-bold text-white">
        Welcome to Your Admin Panel!
      </h1>
      <p className="text-gray-300">
        <Link to="/login" className="text-blue-500">
          Log in
        </Link>{' '}
        or{' '}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>{' '}
        to get started.
      </p>
    </div>
  );
}
