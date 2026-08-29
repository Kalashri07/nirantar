import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Printer,
  X,
  Sparkles,
  BookOpen,
  WifiOff,
  Flame,
  Zap,
  Terminal,
  ShieldCheck,
  Telescope,
} from 'lucide-react';
import { BadgeItem } from '../types';
import { useApp } from '../context/AppContext';

interface DigitalBadgeModalProps {
  badge: BadgeItem | null;
  onClose: () => void;
}

export const DigitalBadgeModal: React.FC<DigitalBadgeModalProps> = ({ badge, onClose }) => {
  const { userProfile, language, connectivityMode, t } = useApp();

  if (!badge) return null;

  const isOffline = connectivityMode === 'offline';

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Telescope':
        return Telescope;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Terminal':
        return Terminal;
      case 'Flame':
        return Flame;
      case 'WifiOff':
        return WifiOff;
      case 'Zap':
        return Zap;
      default:
        return Award;
    }
  };

  const Icon = getBadgeIcon(badge.icon);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Nirantar Digital Badge - ${badge.title[language]}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #F3EBDD;
      color: #102A43;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    .badge-card {
      background: #FAF6EF;
      border: 3px solid #D8CABA;
      border-radius: 24px;
      padding: 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 10px 25px rgba(16, 42, 67, 0.08);
      position: relative;
    }
    .badge-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 800;
      letter-spacing: 1.5px;
      font-size: 14px;
      color: #675E54;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .badge-icon-box {
      width: 80px;
      height: 80px;
      background: #E9DDCB;
      border: 2px solid #D8CABA;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 36px;
    }
    .badge-title {
      font-size: 24px;
      font-weight: 800;
      color: #102A43;
      margin: 0 0 6px;
    }
    .awarded-to-label {
      font-size: 12px;
      color: #675E54;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 16px;
    }
    .recipient-name {
      font-size: 22px;
      font-weight: 700;
      color: #102A43;
      margin: 4px 0 14px;
    }
    .description {
      font-size: 13px;
      color: #675E54;
      line-height: 1.5;
      margin: 0 0 20px;
      padding: 0 10px;
    }
    .meta-box {
      background: #E9DDCB;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      font-size: 12px;
    }
    .meta-box strong {
      display: block;
      color: #102A43;
      font-size: 14px;
    }
    .status-badge {
      display: inline-block;
      background: #DCEFE5;
      color: #1E573E;
      border: 1px solid #B6DEC9;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .badge-id {
      font-family: monospace;
      font-size: 11px;
      color: #675E54;
      margin-top: 14px;
    }
    @media print {
      body { background: white; }
      .badge-card { box-shadow: none; border-color: #333; }
    }
  </style>
</head>
<body>
  <div class="badge-card">
    <div class="badge-header">
      <span>★ NIRANTAR VERIFIED ACHIEVEMENT ★</span>
    </div>

    <div class="badge-icon-box">
      🏆
    </div>

    <h1 class="badge-title">${badge.title[language]}</h1>

    <div class="awarded-to-label">${t.achievements.awardedTo}</div>
    <div class="recipient-name">${userProfile.name}</div>

    <p class="description">${badge.description[language]}</p>

    <div class="meta-box">
      <div>
        <span>${t.achievements.reward}</span>
        <strong>+${badge.xpReward} XP</strong>
      </div>
      <div>
        <span>${t.achievements.earnedOn}</span>
        <strong>${badge.unlockedAt || 'Today'}</strong>
      </div>
    </div>

    <div class="status-badge">
      ${t.achievements.verifiedStatus}
    </div>

    <div class="badge-id">
      ${t.achievements.badgeIdLabel}: ${badge.badgeCode}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nirantar-Badge-${badge.badgeCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="bg-[#F3EBDD] border border-[#D8CABA] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#E9DDCB] border-b border-[#D8CABA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#102A43] text-white flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
              Nirantar Digital Certificate
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#675E54] hover:text-[#102A43] hover:bg-[#FAF6EF] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Badge Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* THE DIGITAL BADGE CONTAINER (Rendered purely in HTML/CSS) */}
          <div className="bg-[#FAF6EF] border-2 border-[#D8CABA] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
            
            {/* Subtle decorative banner */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#675E54]">
              <Sparkles className="w-3 h-3 text-[#102A43]" />
              <span>NIRANTAR ACHIEVEMENT</span>
              <Sparkles className="w-3 h-3 text-[#102A43]" />
            </div>

            {/* Main Badge Icon */}
            <div className="w-20 h-20 rounded-2xl bg-[#E9DDCB] border-2 border-[#D8CABA] text-[#102A43] mx-auto flex items-center justify-center shadow-xs">
              <Icon className="w-10 h-10 text-[#102A43]" />
            </div>

            {/* Badge Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#102A43] tracking-tight">
                {badge.title[language]}
              </h2>
              <span className="text-[11px] font-semibold text-[#675E54] block mt-0.5">
                {badge.category} Category
              </span>
            </div>

            {/* Recipient */}
            <div className="pt-2 border-t border-[#D8CABA]">
              <span className="text-[11px] text-[#675E54] uppercase tracking-wider block">
                {t.achievements.awardedTo}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#102A43] block mt-0.5">
                {userProfile.name}
              </span>
              <p className="text-xs text-[#675E54] mt-1 max-w-sm mx-auto leading-relaxed">
                {badge.description[language]}
              </p>
            </div>

            {/* Meta Row: XP & Date */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#E9DDCB] border border-[#D8CABA] rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-[#675E54] block">{t.achievements.reward}</span>
                <span className="text-sm font-bold text-[#102A43]">+{badge.xpReward} XP</span>
              </div>
              <div className="bg-[#E9DDCB] border border-[#D8CABA] rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-[#675E54] block">{t.achievements.earnedOn}</span>
                <span className="text-xs font-bold text-[#102A43] mt-0.5 block">{badge.unlockedAt || 'Today'}</span>
              </div>
            </div>

            {/* Verified Status Tag */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCEFE5] border border-[#B6DEC9] text-[#1E573E] text-[11px] font-bold rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.achievements.verifiedStatus}</span>
              </span>
            </div>

            {/* Unique Badge ID */}
            <div className="text-[11px] font-mono text-[#675E54]">
              {t.achievements.badgeIdLabel}: <strong className="text-[#102A43]">{badge.badgeCode}</strong>
            </div>

            {/* Offline indicator if offline */}
            {isOffline && (
              <div className="text-[11px] text-[#782323] bg-[#F9E2E2] border border-[#EBB6B6] py-1 px-2.5 rounded-lg flex items-center justify-center gap-1">
                <WifiOff className="w-3 h-3" />
                <span>{t.achievements.badgeSavedOffline}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions: Print, Download, Close */}
        <div className="p-4 sm:p-5 bg-[#E9DDCB] border-t border-[#D8CABA] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#FAF6EF] hover:bg-white text-[#102A43] border border-[#D8CABA] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#102A43]" />
              <span>{t.achievements.printBadge}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 bg-[#FAF6EF] hover:bg-white text-[#102A43] border border-[#D8CABA] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#102A43]" />
              <span>{t.achievements.downloadBadge}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
