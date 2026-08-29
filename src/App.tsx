import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomeDashboard } from './components/HomeDashboard';
import { LearnCatalog } from './components/LearnCatalog';
import { MyLibrary } from './components/MyLibrary';
import { MissionsView } from './components/MissionsView';
import { AchievementsView } from './components/AchievementsView';
import { ProfileSettings } from './components/ProfileSettings';
import { LessonWorkspace } from './components/LessonWorkspace';
import { PackDetailsModal } from './components/PackDetailsModal';

export const MainLayout: React.FC = () => {
  const { currentNav } = useApp();

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#20242b] flex">
      {/* 1. Left Vertical Navigation Sidebar */}
      <Sidebar />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Simple, compact Top Bar */}
        <TopBar />

        {/* Active Page View */}
        <main className="flex-1 px-4 sm:px-8 py-6 pb-24 md:pb-12">
          {(currentNav === 'home' || currentNav === 'dashboard') && <HomeDashboard />}
          {(currentNav === 'learn' || currentNav === 'explore') && <LearnCatalog />}
          {(currentNav === 'library' || currentNav === 'downloads') && <MyLibrary />}
          {currentNav === 'missions' && <MissionsView />}
          {currentNav === 'achievements' && <AchievementsView />}
          {currentNav === 'profile' && <ProfileSettings />}
        </main>
      </div>

      {/* Distraction-Free Lesson Workspace (2-Column Modal) */}
      <LessonWorkspace />

      {/* Course Details Modal */}
      <PackDetailsModal />
    </div>
  );
};

export default function App() {
  return <MainLayout />;
}
