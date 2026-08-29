import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  Globe,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Code,
  Shield,
  Atom,
  Calculator,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { LearnerType, Language } from '../types';

export const OnboardingModal: React.FC = () => {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    userProfile,
    updateUserProfile,
    setLanguage,
    triggerCelebration,
  } = useApp();

  const [step, setStep] = useState(1);
  const [learnerType, setLearnerType] = useState<LearnerType>(userProfile.learnerType || 'school');
  const [gradeOrStream, setGradeOrStream] = useState(userProfile.gradeOrStream || 'Class 10');
  const [selectedLang, setSelectedLang] = useState<Language>(userProfile.preferredLanguage || 'en');
  const [interests, setInterests] = useState<string[]>(userProfile.interests || ['Science', 'Physics']);
  const [name, setName] = useState(userProfile.name || 'Kala');

  if (!isOnboardingOpen) return null;

  const schoolGrades = ['Class 6', 'Class 8', 'Class 10', 'Class 12'];
  const collegeStreams = ['Engineering', 'Science', 'Commerce', 'Polytechnic Diploma'];

  const interestOptions = [
    { id: 'Science', label: '🔬 Science & Physics', icon: Atom },
    { id: 'Mathematics', label: '➗ Mathematics', icon: Calculator },
    { id: 'Programming', label: '💻 Python & Coding', icon: Code },
    { id: 'Cybersecurity', label: '🛡️ Cybersecurity', icon: Shield },
    { id: 'Digital Skills', label: '🌐 Digital Skills', icon: Globe },
    { id: 'Languages', label: '🗣️ English & Marathi', icon: BookOpen },
  ];

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    updateUserProfile({
      name,
      learnerType,
      gradeOrStream,
      preferredLanguage: selectedLang,
      interests,
      hasOnboarded: true,
    });
    setLanguage(selectedLang);
    setIsOnboardingOpen(false);
    triggerCelebration();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
        {/* Top Progress */}
        <div className="flex items-center justify-between gap-2 mb-5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-emerald-500' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Name & Learner Type */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Step 1 of 4</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Welcome to LearnKopargaon 👋</h2>
              <p className="text-xs text-slate-500">What describes your current education?</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Your First Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setLearnerType('school');
                  setGradeOrStream('Class 10');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  learnerType === 'school'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <School className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-sm text-slate-900">School Student</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Class 1 to 12 curriculum</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLearnerType('undergrad');
                  setGradeOrStream('Engineering');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  learnerType === 'undergrad'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-sm text-slate-900">College Student</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Degree & Diploma tech</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Grade / Stream */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Step 2 of 4</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Choose your Grade or Stream</h2>
              <p className="text-xs text-slate-500">We will adapt quizzes to your level.</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(learnerType === 'school' ? schoolGrades : collegeStreams).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGradeOrStream(item)}
                  className={`p-3 rounded-xl border font-bold text-xs text-left transition-all flex items-center justify-between ${
                    gradeOrStream === item
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item}</span>
                  {gradeOrStream === item && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Language */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Step 3 of 4</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Choose Preferred Language</h2>
              <p className="text-xs text-slate-500">You can easily switch language anytime.</p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'en' as Language, title: 'English', subtitle: 'Standard English medium', flag: '🇬🇧' },
                { id: 'mr' as Language, title: 'मराठी (Marathi)', subtitle: 'अस्सल मराठी भाषेतील धडे', flag: '🇮🇳' },
                { id: 'hi' as Language, title: 'हिंदी (Hindi)', subtitle: 'सरल हिंदी माध्यम में पाठ', flag: '🇮🇳' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedLang(lang.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedLang === lang.id
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{lang.title}</h4>
                      <p className="text-[11px] text-slate-500">{lang.subtitle}</p>
                    </div>
                  </div>
                  {selectedLang === lang.id && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Interests */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Step 4 of 4</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">Select Learning Interests</h2>
              <p className="text-xs text-slate-500">Choose subjects you like.</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {interestOptions.map((item) => {
                const Icon = item.icon;
                const isSelected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{item.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Learning 🚀</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
