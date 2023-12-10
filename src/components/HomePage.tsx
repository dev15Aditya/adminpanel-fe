import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import WelcomeMessage from './WelcomeMessage';
import DataTable from './DataTable';
import ProgressForm from './Form';

export default function HomePage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const respose = await fetch('http://localhost:8080/form/formData');
      const data = await respose.json();
      setData(data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeMessage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/progress-form" element={<ProgressForm />} />
          <Route path="/data-table" element={<DataTable data={data} />} />
        </Routes>
      </Router>
    </>
  );
}
