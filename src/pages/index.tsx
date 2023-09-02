// pages/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import LoginPage from './loginpage';
import SignupForm from 'components/Signup';

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default Pages;