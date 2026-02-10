import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import MedicalHistoryPage from './pages/MedicalHistoryPage';
import ReportsPage from './pages/ReportsPage';
import FormsPage from './pages/FormsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import LabPage from './pages/LabPage';
import WelfarePage from './pages/WelfarePage';
import './styles/App.css';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/patients" element={<PatientsPage />} />
                  <Route path="/patients/:id" element={<PatientDetailsPage />} />
                  <Route path="/medical-history" element={<MedicalHistoryPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/forms" element={<FormsPage />} />
                  <Route path="/alerts" element={<NotificationsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/casualties" element={<PatientsPage />} />
                  <Route path="/lab" element={<LabPage />} />
                  <Route path="/welfare" element={<WelfarePage />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;