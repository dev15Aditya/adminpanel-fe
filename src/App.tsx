import HomePage from './components/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <HomePage />
      </div>
    </>
  );
}

export default App;
