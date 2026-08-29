import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar, ConnectivityBanner } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ExploreWorlds } from './components/ExploreWorlds';
import { DownloadCenter } from './components/DownloadCenter';
import { MissionsHub } from './components/MissionsHub';
import { AchievementsView } from './components/AchievementsView';
import { ProfileView } from './components/ProfileView';
import { PackDetailsModal } from './components/PackDetailsModal';
import { GamifiedLessonViewer } from './components/GamifiedLessonViewer';
import { DataImpactModal } from './components/DataImpactModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HackathonDemoBar } from './components/HackathonDemoBar';

export const MainLayout: React.FC = () => {
  const { currentNav } = useApp();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* 1. Left Vertical Navigation Sidebar */}
      <Sidebar />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Simplified Top Header */}
        <Navbar />

        {/* Reassuring Connectivity Toast / Alert if offline or syncing */}
        <ConnectivityBanner />

        {/* Active Page View */}
        <main className="flex-1 px-4 sm:px-8 py-4 pb-28">
          {currentNav === 'dashboard' && <Dashboard />}
          {currentNav === 'explore' && <ExploreWorlds />}
          {currentNav === 'downloads' && <DownloadCenter />}
          {currentNav === 'missions' && <MissionsHub />}
          {currentNav === 'achievements' && <AchievementsView />}
          {currentNav === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Modals & Overlays */}
      <PackDetailsModal />
      <GamifiedLessonViewer />
      <DataImpactModal />
      <OnboardingModal />

      {/* Presenter Tour Bar */}
      <HackathonDemoBar />
    </div>
  );
};

export default function App() {
  return <MainLayout />;
}
