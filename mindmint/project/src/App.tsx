import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import HabitTracker from './components/HabitTracker';
import AITherapist from './components/AITherapist';
import Analytics from './components/Analytics';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

type ViewType = 'dashboard' | 'mood' | 'journal' | 'habits' | 'ai-chat' | 'analytics' | 'admin';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'habits':
        return <HabitTracker />;
      case 'ai-chat':
        return <AITherapist />;
      case 'analytics':
        return <Analytics />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="lg:ml-64">
        <div className="p-4 lg:p-8">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;