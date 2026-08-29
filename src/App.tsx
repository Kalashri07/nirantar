import React from 'react';
import { useApp } from './context/AppContext';
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
import { BookOpen } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const { currentNav, t } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Connectivity & Sync Status Alert Banner */}
      <ConnectivityBanner />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 pb-28">
        {currentNav === 'dashboard' && <Dashboard />}
        {currentNav === 'explore' && <ExploreWorlds />}
        {currentNav === 'downloads' && <DownloadCenter />}
        {currentNav === 'missions' && <MissionsHub />}
        {currentNav === 'achievements' && <AchievementsView />}
        {currentNav === 'profile' && <ProfileView />}
      </main>

      {/* Modals & Overlays */}
      <PackDetailsModal />
      <GamifiedLessonViewer />
      <DataImpactModal />
      <OnboardingModal />

      {/* 14-Step Interactive Hackathon Demo Stepper */}
      <HackathonDemoBar />

      {/* Clean Light Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-black text-slate-900 text-sm">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>LearnKopargaon</span>
          </div>
          <p className="text-xs font-semibold text-emerald-700">
            “{t.tagline}”
          </p>
          <p className="text-[11px] text-slate-400 max-w-lg mx-auto">
            {t.subheading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-slate-400">
            <span>✓ Offline Ready</span>
            <span>•</span>
            <span>⚡ Ultra-Low Data</span>
            <span>•</span>
            <span>🌐 English / मराठी / हिंदी</span>
            <span>•</span>
            <span>🏆 Gamified Lessons</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <MainLayout />;
}
