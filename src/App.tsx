import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PersonaBuilder from './pages/PersonaBuilder';
import ContentEditor from './pages/ContentEditor';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/personas" replace />} />
          <Route path="/personas" element={<PersonaBuilder />} />
          <Route path="/content" element={<ContentEditor />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;