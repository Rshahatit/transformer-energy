import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AssessmentFlow from './pages/AssessmentFlow';
import ProjectMap from './pages/ProjectMap';
import CommunityNetwork from './pages/CommunityNetwork';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assessment" element={<AssessmentFlow />} />
            <Route path="/map" element={<ProjectMap />} />
            <Route path="/network" element={<CommunityNetwork />} />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;
