import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvitePage from '../pages/InvitePage.jsx';
import ConfirmForm from '../pages/ConfirmForm.jsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitePage />} />
        <Route path="/confirmar" element={<ConfirmForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
