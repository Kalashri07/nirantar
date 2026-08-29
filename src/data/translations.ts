import type { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  subheading: string;
  nav: {
    dashboard: string;
    explore: string;
    downloads: string;
    missions: string;
    achievements: string;
    profile: string;
    lowData: string;
    demoGuide: string;
  };
  connectivity: {
    online: string;
    lowData: string;
    offline: string;
    onlineDesc: string;
    lowDataDesc: string;
    offlineDesc: string;
    manageDownloads: string;
    switchMode: string;
    pendingSyncCount: string;
    syncSuccess: string;
    syncingTitle: string;
    syncingSubtitle: string;
    offlineSafety: string;
    connectionRestored: string;
    downloadDisabledOffline: string;
    offlineReady: string;
  };
  dashboard: {
    greeting: string;
    greetingSubtitle: string;
    levelLabel: string;
    xpProgress: string;
    streakLabel: string;
    continueLearning: string;
    continueMission: string;
    availableOffline: string;
    recommendedPacks: string;
    exploreAll: string;
    dataSavedToday: string;
    quickStats: string;
    offlineHoursLabel: string;
    activitiesLabel: string;
  };
  worlds: {
    allWorlds: string;
    science: string;
    math: string;
    language: string;
    tech: string;
    scienceDesc: string;
    mathDesc: string;
    languageDesc: string;
    techDesc: string;
  };
  downloads: {
    title: string;
    storageUsage: string;
    storageFree: string;
    downloadedPacks: string;
    availableToDownload: string;
    downloadButton: string;
    downloading: string;
    downloadComplete: string;
    deleteFromDevice: string;
    readyOffline: string;
    sizeLabel: string;
    noDownloadsYet: string;
  };
  lowDataMode: {
    bannerTitle: string;
    bannerSubtitle: string;
    sessionSaved: string;
    impactTitle: string;
    todayUsed: string;
    todaySaved: string;
    weekUsed: string;
    weekSaved: string;
    togglePrompt: string;
    activeText: string;
  };
  missions: {
    title: string;
    subtitle: string;
    dailyTab: string;
    weeklyTab: string;
    subjectTab: string;
    claimReward: string;
    claimed: string;
    locked: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    unlockedBadges: string;
    lockedBadges: string;
    xpHistory: string;
    rarity: string;
  };
  profile: {
    title: string;
    learnerType: string;
    gradeStream: string;
    preferredLang: string;
    offlineImpact: string;
    hoursLearnedOffline: string;
    activitiesCompletedOffline: string;
    estimatedDataSaved: string;
    resetDemo: string;
    exportProgress: string;
  };
  onboarding: {
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    schoolStudent: string;
    undergradStudent: string;
    finishButton: string;
    nextButton: string;
    backButton: string;
  };
  lesson: {
    learnTab: string;
    thinkTab: string;
    playTab: string;
    challengeTab: string;
    nextStep: string;
    prevStep: string;
    finishMission: string;
    correctAnswer: string;
    tryAgain: string;
    missionCompleted: string;
    badgeUnlocked: string;
    xpEarnedNotice: string;
    runCode: string;
    resetCode: string;
    codeSuccess: string;
    codeError: string;
    verifyAnswer: string;
    backToDashboard: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "LearnKopargaon",
    tagline: "Learn anywhere. Continue everywhere.",
    subheading: "A multilingual, ultra-low-data learning platform designed for uninterrupted education in low-connectivity environments.",
    nav: {
      dashboard: "Dashboard",
      explore: "Explore Worlds",
      downloads: "Offline Library",
      missions: "Missions",
      achievements: "Achievements",
      profile: "Profile",
      lowData: "Data Saver",
      demoGuide: "Demo Guide",
    },
    connectivity: {
      online: "ONLINE",
      lowData: "LOW DATA MODE",
      offline: "OFFLINE",
      onlineDesc: "Full network connectivity active. Cloud sync active.",
      lowDataDesc: "Your learning experience is optimized to use minimal data.",
      offlineDesc: "Your progress is safely saved on this device.",
      manageDownloads: "Manage Downloads",
      switchMode: "Switch Mode",
      pendingSyncCount: "activities waiting to sync",
      syncSuccess: "All progress synchronized successfully!",
      syncingTitle: "Syncing your learning progress...",
      syncingSubtitle: "Uploading local completions to cloud servers",
      offlineSafety: "No internet needed! All completed quizzes and missions are safely cached.",
      connectionRestored: "CONNECTION RESTORED",
      downloadDisabledOffline: "Connect to internet or low-data mode to download new packs.",
      offlineReady: "Ready for Offline Learning",
    },
    dashboard: {
      greeting: "Welcome to Nirantar 👋",
      greetingSubtitle: "Learning that continues, even when connectivity doesn't.",
      levelLabel: "Current Level",
      xpProgress: "XP Progress",
      streakLabel: "Day Streak",
      continueLearning: "Continue Learning",
      continueMission: "Continue Mission →",
      availableOffline: "Available Offline ✓",
      recommendedPacks: "Recommended Learning Packs",
      exploreAll: "Explore All Worlds →",
      dataSavedToday: "Data Saved Today",
      quickStats: "Learning Impact",
      offlineHoursLabel: "Offline Hours",
      activitiesLabel: "Activities Done",
    },
    worlds: {
      allWorlds: "All Learning Worlds",
      science: "Science World",
      math: "Math World",
      language: "Language World",
      tech: "Undergraduate Tech World",
      scienceDesc: "Explore physics mechanics, periodic table elements, and interactive lab mysteries.",
      mathDesc: "Master algebraic equations, spatial geometry, and progressive puzzles.",
      languageDesc: "Enhance practical communication, vocabulary, and situational dialogs.",
      techDesc: "Build real programming logic, security intuition, and terminal debugging.",
    },
    downloads: {
      title: "My Offline Library",
      storageUsage: "Offline Learning Storage",
      storageFree: "available on local device",
      downloadedPacks: "Downloaded Packs",
      availableToDownload: "Available for Download",
      downloadButton: "Download Pack",
      downloading: "Downloading...",
      downloadComplete: "Ready Offline ✓",
      deleteFromDevice: "Remove Download",
      readyOffline: "Available for 100% Offline Access",
      sizeLabel: "Size",
      noDownloadsYet: "No learning packs downloaded yet. Tap download on any module to make it accessible offline.",
    },
    lowDataMode: {
      bannerTitle: "LOW DATA MODE ACTIVE",
      bannerSubtitle: "High-res images and video streaming disabled. Pure text, vector SVGs, and interactive quizzes enabled.",
      sessionSaved: "Estimated data saved this session",
      impactTitle: "Data Consumption Impact",
      todayUsed: "Data Used Today",
      todaySaved: "Estimated Data Saved Today",
      weekUsed: "Data Used This Week",
      weekSaved: "Estimated Data Saved This Week",
      togglePrompt: "Toggle Low Data Mode to save up to 85% mobile data bandwidth.",
      activeText: "Active",
    },
    missions: {
      title: "Mission Headquarters",
      subtitle: "Complete daily and weekly curriculum challenges to level up faster.",
      dailyTab: "Daily Quests",
      weeklyTab: "Weekly Challenges",
      subjectTab: "Special Ops",
      claimReward: "Claim Reward",
      claimed: "Claimed ✓",
      locked: "Locked",
    },
    achievements: {
      title: "Badges & Achievements",
      subtitle: "Showcase your educational milestones and offline learning mastery.",
      unlockedBadges: "Unlocked Badges",
      lockedBadges: "Badges in Progress",
      xpHistory: "XP Growth Timeline",
      rarity: "Rarity",
    },
    profile: {
      title: "Learner Profile",
      learnerType: "Student Type",
      gradeStream: "Class / Academic Stream",
      preferredLang: "Preferred Language",
      offlineImpact: "Offline Learning Impact",
      hoursLearnedOffline: "Hours Learned Offline",
      activitiesCompletedOffline: "Activities Completed Offline",
      estimatedDataSaved: "Estimated Mobile Data Saved",
      resetDemo: "Reset Demo State",
      exportProgress: "Export Offline Certificate",
    },
    onboarding: {
      step1Title: "Welcome to LearnKopargaon!",
      step1Subtitle: "Choose your learner type to personalize your experience.",
      step2Title: "Select Class or Stream",
      step2Subtitle: "We adapt curriculum challenges to your grade.",
      step3Title: "Choose Preferred Language",
      step3Subtitle: "You can switch anytime during lessons.",
      step4Title: "What are your learning interests?",
      step4Subtitle: "Select subjects you are passionate about exploring.",
      schoolStudent: "School Student (Class 1–12)",
      undergradStudent: "Undergraduate Student (College)",
      finishButton: "Launch Learning Dashboard 🚀",
      nextButton: "Next Step →",
      backButton: "← Back",
    },
    lesson: {
      learnTab: "1. Learn Concept",
      thinkTab: "2. Think & Reflect",
      playTab: "3. Interactive Play",
      challengeTab: "4. Mission Checkpoint",
      nextStep: "Next Stage →",
      prevStep: "← Previous",
      finishMission: "Complete Mission 🎉",
      correctAnswer: "Awesome! Correct Answer +25 XP",
      tryAgain: "Not quite right. Read the hint and try again!",
      missionCompleted: "MISSION COMPLETED 🏆",
      badgeUnlocked: "New Badge Unlocked!",
      xpEarnedNotice: "XP Earned",
      runCode: "▶ Run Code",
      resetCode: "↺ Reset Code",
      codeSuccess: "Code executed flawlessly! Test cases passed.",
      codeError: "Syntax Error or bug detected. Review line highlighted.",
      verifyAnswer: "Verify Solution",
      backToDashboard: "Return to Dashboard",
    },
  },
  mr: {
    appName: "लर्नकोपरगाव (LearnKopargaon)",
    tagline: "कुठेही शिका. अखंड प्रगती करा.",
    subheading: "कोपरगाव आणि ग्रामीण भागातील विद्यार्थ्यांसाठी ऑफलाइन-प्रथम, कमी-डेटा, बहुभाषिक शिक्षण मंच.",
    nav: {
      dashboard: "डॅशबोर्ड",
      explore: "विषय जग (Explore)",
      downloads: "ऑफलाइन लायब्ररी",
      missions: "मोहिमा (Missions)",
      achievements: "यश व पदके",
      profile: "माझे प्रोफाईल",
      lowData: "डेटा सेव्हर",
      demoGuide: "डेमो मार्गदर्शक",
    },
    connectivity: {
      online: "ऑनलाइन (ONLINE)",
      lowData: "कमी डेटा मोड (LOW DATA)",
      offline: "ऑफलाइन (OFFLINE)",
      onlineDesc: "इंटरनेट सक्रिय आहे. क्लाउड सिंक चालू आहे.",
      lowDataDesc: "तुमचा शिकण्याचा अनुभव कमीत कमी इंटरनेट डेटामध्ये चालण्यासाठी ऑप्टिमाइझ केला आहे.",
      offlineDesc: "तुमची प्रगती या फोन/डिव्हाइसवर सुरक्षितपणे सेव्ह झाली आहे.",
      manageDownloads: "डाउनलोड्स व्यवस्थापित करा",
      switchMode: "मोड बदला",
      pendingSyncCount: "क्रियाकलाप सिंक होण्याची वाट पाहत आहेत",
      syncSuccess: "सर्व प्रगती क्लाउडवर यशस्वीरित्या सिंक झाली!",
      syncingTitle: "तुमची शिक्षण प्रगती सिंक होत आहे...",
      syncingSubtitle: "ऑफलाइन पूर्ण केलेले धडे सर्व्हरवर पाठवत आहोत",
      offlineSafety: "इंटरनेटची गरज नाही! सर्व उत्तरे व प्रगती स्थानिक मेमरीमध्ये सुरक्षित आहेत.",
      connectionRestored: "इंटरनेट कनेक्शन पुन्हा जोडले गेले!",
      downloadDisabledOffline: "नवीन पॅक डाउनलोड करण्यासाठी इंटरनेट चालू करा.",
      offlineReady: "ऑफलाइन शिक्षणासाठी तयार",
    },
    dashboard: {
      greeting: "निरंतर मध्ये आपले स्वागत आहे 👋",
      greetingSubtitle: "इंटरनेट नसले तरी अखंड चालू राहणारे शिक्षण.",
      levelLabel: "सध्याची पातळी",
      xpProgress: "XP प्रगती",
      streakLabel: "दिवसांची मालिका (Streak)",
      continueLearning: "शिकणे पुढे चालू ठेवा",
      continueMission: "मोहीम सुरू ठेवा →",
      availableOffline: "ऑफलाइन उपलब्ध ✓",
      recommendedPacks: "शिफारस केलेले शिक्षण संच",
      exploreAll: "सर्व विषय जग पहा →",
      dataSavedToday: "आज वाचवलेला डेटा",
      quickStats: "शिक्षणाचा प्रभाव",
      offlineHoursLabel: "ऑफलाइन तास",
      activitiesLabel: "पूर्ण उपक्रम",
    },
    worlds: {
      allWorlds: "सर्व शिक्षण जग (Learning Worlds)",
      science: "विज्ञान विश्व (Science)",
      math: "गणित विश्व (Math)",
      language: "भाषा विश्व (Language)",
      tech: "पदवीधर तंत्रज्ञान विश्व (Tech)",
      scienceDesc: "भौतिकशास्त्राचे नियम, आवर्त सारणी आणि प्रयोगशाळेतील रहस्ये अनुभवा.",
      mathDesc: "बीजगणित समीकरणे, भूमिती आणि बुद्धिमत्ता कोडी सोडवा.",
      languageDesc: "संभाषण कौशल्य, शब्दसंग्रह आणि व्यावहारिक संवाद सुधारा.",
      techDesc: "पायथन प्रोग्रामिंग, सायबर सुरक्षा आणि कोडिंग कोडी सोडवा.",
    },
    downloads: {
      title: "माझी ऑफलाइन लायब्ररी",
      storageUsage: "ऑफलाइन स्टोरेज वापर",
      storageFree: "डिव्हाइसवर शिल्लक जागा",
      downloadedPacks: "डाउनलोड केलेले संच",
      availableToDownload: "डाउनलोडसाठी उपलब्ध",
      downloadButton: "पॅक डाउनलोड करा",
      downloading: "डाउनलोड होत आहे...",
      downloadComplete: "ऑफलाइन तयार ✓",
      deleteFromDevice: "डाउनलोड काढा",
      readyOffline: "१००% ऑफलाइन वापरासाठी उपलब्ध",
      sizeLabel: "आकार",
      noDownloadsYet: "अद्याप कोणताही पॅक डाउनलोड केला नाही. ऑफलाइन वापरण्यासाठी डाउनलोड बटनावर टॅप करा.",
    },
    lowDataMode: {
      bannerTitle: "कमी डेटा मोड सक्रिय (LOW DATA MODE)",
      bannerSubtitle: "मोठ्या प्रतिमा आणि व्हिडिओ बंद. केवळ उपयुक्त मजकूर, व्हेक्टर चित्रे आणि प्रश्नमंजुषा चालू.",
      sessionSaved: "या सत्रात वाचवलेला अंदाजे डेटा",
      impactTitle: "डेटा बचत प्रभाव",
      todayUsed: "आज वापरलेला डेटा",
      todaySaved: "आज वाचवलेला अंदाजे डेटा",
      weekUsed: "या आठवड्यात वापरलेला डेटा",
      weekSaved: "या आठवड्यात वाचवलेला डेटा",
      togglePrompt: "८५% पर्यंत मोबाइल डेटा वाचवण्यासाठी कमी डेटा मोड चालू करा.",
      activeText: "सक्रिय",
    },
    missions: {
      title: "मोहीम केंद्र (Missions)",
      subtitle: "पातळी वाढवण्यासाठी दररोज आणि साप्ताहिक आव्हाने पूर्ण करा.",
      dailyTab: "दैनिक मोहिमा",
      weeklyTab: "साप्ताहिक आव्हाने",
      subjectTab: "विशेष आव्हाने",
      claimReward: "बक्षीस मिळवा",
      claimed: "मिळाले ✓",
      locked: "कुलूपबंद",
    },
    achievements: {
      title: "पदके आणि उपलब्धी (Achievements)",
      subtitle: "तुमचे शैक्षणिक टप्पे आणि ऑफलाइन प्रभुत्व दाखवा.",
      unlockedBadges: "अनलॉक झालेली पदके",
      lockedBadges: "प्रगतीत असलेली पदके",
      xpHistory: "XP वाढीचा इतिहास",
      rarity: "दुर्मिळता",
    },
    profile: {
      title: "विद्यार्थी प्रोफाईल",
      learnerType: "विद्यार्थी प्रकार",
      gradeStream: "इयत्ता / शैक्षणिक शाखा",
      preferredLang: "पसंतीची भाषा",
      offlineImpact: "ऑफलाइन शिक्षणाचा प्रभाव",
      hoursLearnedOffline: "ऑफलाइन शिकलेले तास",
      activitiesCompletedOffline: "ऑफलाइन पूर्ण केलेले उपक्रम",
      estimatedDataSaved: "वाचवलेला मोबाइल डेटा",
      resetDemo: "डेमो रीसेट करा",
      exportProgress: "प्रगती प्रमाणपत्र डाउनलोड करा",
    },
    onboarding: {
      step1Title: "लर्नकोपरगाव मध्ये आपले स्वागत आहे!",
      step1Subtitle: "वैयक्तिक अनुभवासाठी तुमचा विद्यार्थी प्रकार निवडा.",
      step2Title: "इयत्ता किंवा शाखा निवडा",
      step2Subtitle: "आम्ही तुमच्या इयत्तेनुसार आव्हाने जुळवून घेतो.",
      step3Title: "पसंतीची भाषा निवडा",
      step3Subtitle: "धड्यादरम्यान तुम्ही केव्हाही भाषा बदलू शकता.",
      step4Title: "तुमचे आवडते विषय कोणते आहेत?",
      step4Subtitle: "तुम्हाला शिकायला आवडणारे विषय निवडा.",
      schoolStudent: "शालेय विद्यार्थी (इयत्ता १–१२)",
      undergradStudent: "पदवीधर विद्यार्थी (कॉलेज)",
      finishButton: "डॅशबोर्ड सुरू करा 🚀",
      nextButton: "पुढील पायरी →",
      backButton: "← मागे",
    },
    lesson: {
      learnTab: "१. संकल्पना शिका",
      thinkTab: "२. विचार करा",
      playTab: "३. संवादात्मक खेळ",
      challengeTab: "४. अंतिम आव्हान",
      nextStep: "पुढील टप्पा →",
      prevStep: "← मागे",
      finishMission: "मोहीम पूर्ण करा 🎉",
      correctAnswer: "उत्कृष्ट! अचूक उत्तर +२५ XP",
      tryAgain: "उत्तर बरोबर नाही. संकेत वाचा आणि पुन्हा प्रयत्न करा!",
      missionCompleted: "मोहीम यशस्वीरित्या पूर्ण 🏆",
      badgeUnlocked: "नवीन पदक अनलॉक झाले!",
      xpEarnedNotice: "मिळालेले XP",
      runCode: "▶ कोड चालवा",
      resetCode: "↺ कोड रीसेट करा",
      codeSuccess: "कोड योग्यरित्या चालला! सर्व चाचण्या उत्तीर्ण.",
      codeError: "कोडमध्ये त्रुटी आढळली. ठळक ओळ तपासा.",
      verifyAnswer: "उत्तर तपासा",
      backToDashboard: "डॅशबोर्डवर परत जा",
    },
  },
  hi: {
    appName: "लर्नकोपरगांव (LearnKopargaon)",
    tagline: "कहीं भी सीखें। निरंतर आगे बढ़ें।",
    subheading: "कोपरगांव और ग्रामीण क्षेत्रों के छात्रों के लिए ऑफलाइन-फर्स्ट, कम-डेटा, बहुभाषी शिक्षण मंच।",
    nav: {
      dashboard: "डैशबोर्ड",
      explore: "विषय संसार (Explore)",
      downloads: "ऑफलाइन लाइब्रेरी",
      missions: "मिशन (Missions)",
      achievements: "उपलब्धियां व बैज",
      profile: "मेरा प्रोफ़ाइल",
      lowData: "डेटा सेवर",
      demoGuide: "डेमो गाइड",
    },
    connectivity: {
      online: "ऑनलाइन (ONLINE)",
      lowData: "कम डेटा मोड (LOW DATA)",
      offline: "ऑफलाइन (OFFLINE)",
      onlineDesc: "इंटरनेट कनेक्टिविटी सक्रिय है। क्लाउड सिंक चालू है।",
      lowDataDesc: "आपका शिक्षण अनुभव न्यूनतम डेटा का उपयोग करने के लिए अनुकूलित है।",
      offlineDesc: "आपकी प्रगति इस डिवाइस पर सुरक्षित रूप से सहेजी गई है।",
      manageDownloads: "डाउनलोड प्रबंधित करें",
      switchMode: "मोड बदलें",
      pendingSyncCount: "गतिविधियां सिंक होने की प्रतीक्षा कर रही हैं",
      syncSuccess: "सभी प्रगति क्लाउड पर सफलतापूर्वक सिंक हो गई!",
      syncingTitle: "आपकी सीखने की प्रगति सिंक हो रही है...",
      syncingSubtitle: "ऑफलाइन पूर्ण किए गए पाठ सर्वर पर अपलोड किए जा रहे हैं",
      offlineSafety: "इंटरनेट की आवश्यकता नहीं! सभी उत्तर और क्विज़ स्थानीय रूप से सुरक्षित हैं।",
      connectionRestored: "इंटरनेट कनेक्शन बहाल हुआ!",
      downloadDisabledOffline: "नए पैक डाउनलोड करने के लिए इंटरनेट से कनेक्ट करें।",
      offlineReady: "ऑफलाइन सीखने के लिए तैयार",
    },
    dashboard: {
      greeting: "निरंतर में आपका स्वागत है 👋",
      greetingSubtitle: "इंटरनेट के बिना भी निरंतर जारी रहने वाली शिक्षा।",
      levelLabel: "वर्तमान स्तर",
      xpProgress: "XP प्रगति",
      streakLabel: "दिनों का स्ट्रीक",
      continueLearning: "सीखना जारी रखें",
      continueMission: "मिशन जारी रखें →",
      availableOffline: "ऑफलाइन उपलब्ध ✓",
      recommendedPacks: "अनुशंसित शिक्षण पैक",
      exploreAll: "सभी विषय संसार देखें →",
      dataSavedToday: "आज बचाया गया डेटा",
      quickStats: "शिक्षण प्रभाव",
      offlineHoursLabel: "ऑफलाइन घंटे",
      activitiesLabel: "पूर्ण गतिविधियां",
    },
    worlds: {
      allWorlds: "सभी शिक्षण संसार (Learning Worlds)",
      science: "विज्ञान संसार (Science)",
      math: "गणित संसार (Math)",
      language: "भाषा संसार (Language)",
      tech: "स्नातक तकनीकी संसार (Tech)",
      scienceDesc: "भौतिकी के नियम, आवर्त सारणी और प्रयोगशाला रहस्यों को समझें।",
      mathDesc: "बीजगणित के समीकरण, ज्यामिति और प्रगतिशील पहेलियां हल करें।",
      languageDesc: "व्यावहारिक संचार, शब्दावली और संवादात्मक कौशल में सुधार करें।",
      techDesc: "पायथन प्रोग्रामिंग, साइबर सुरक्षा और कोडिंग पहेलियां हल करें।",
    },
    downloads: {
      title: "मेरी ऑफलाइन लाइब्रेरी",
      storageUsage: "ऑफलाइन स्टोरेज उपयोग",
      storageFree: "डिवाइस पर उपलब्ध स्थान",
      downloadedPacks: "डाउनलोड किए गए पैक",
      availableToDownload: "डाउनलोड के लिए उपलब्ध",
      downloadButton: "पैक डाउनलोड करें",
      downloading: "डाउनलोड हो रहा है...",
      downloadComplete: "ऑफलाइन तैयार ✓",
      deleteFromDevice: "डाउनलोड हटाएं",
      readyOffline: "100% ऑफलाइन उपयोग के लिए उपलब्ध",
      sizeLabel: "आकार",
      noDownloadsYet: "अभी तक कोई पैक डाउनलोड नहीं हुआ। ऑफलाइन उपयोग के लिए किसी भी मॉड्यूल पर डाउनलोड दबाएं।",
    },
    lowDataMode: {
      bannerTitle: "कम डेटा मोड सक्रिय (LOW DATA MODE)",
      bannerSubtitle: "भारी चित्र और वीडियो बंद। केवल उपयोगी टेक्स्ट, वेक्टर चित्र और क्विज़ सक्षम।",
      sessionSaved: "इस सत्र में बचाया गया अनुमानित डेटा",
      impactTitle: "डेटा बचत प्रभाव",
      todayUsed: "आज प्रयुक्त डेटा",
      todaySaved: "आज बचाया गया अनुमानित डेटा",
      weekUsed: "इस सप्ताह प्रयुक्त डेटा",
      weekSaved: "इस सप्ताह बचाया गया डेटा",
      togglePrompt: "85% तक मोबाइल डेटा बचाने के लिए कम डेटा मोड चालू करें।",
      activeText: "सक्रिय",
    },
    missions: {
      title: "मिशन मुख्यालय (Missions)",
      subtitle: "तेजी से लेवल अप करने के लिए दैनिक और साप्ताहिक चुनौतियां पूरी करें।",
      dailyTab: "दैनिक मिशन",
      weeklyTab: "साप्ताहिक चुनौतियां",
      subjectTab: "विशेष मिशन",
      claimReward: "इनाम प्राप्त करें",
      claimed: "प्राप्त किया ✓",
      locked: "बंद",
    },
    achievements: {
      title: "बैज और उपलब्धियां (Achievements)",
      subtitle: "अपने शैक्षणिक मील के पत्थर और ऑफलाइन महारत का प्रदर्शन करें।",
      unlockedBadges: "अनलॉक किए गए बैज",
      lockedBadges: "प्रगति में बैज",
      xpHistory: "XP वृद्धि समयरेखा",
      rarity: "दुर्लभता",
    },
    profile: {
      title: "छात्र प्रोफ़ाइल",
      learnerType: "छात्र का प्रकार",
      gradeStream: "कक्षा / अध्ययन शाखा",
      preferredLang: "पसंदीदा भाषा",
      offlineImpact: "ऑफलाइन शिक्षण प्रभाव",
      hoursLearnedOffline: "ऑफलाइन सीखे गए घंटे",
      activitiesCompletedOffline: "ऑफलाइन पूर्ण की गई गतिविधियां",
      estimatedDataSaved: "बचाया गया मोबाइल डेटा",
      resetDemo: "डेमो रीसेट करें",
      exportProgress: "प्रमाणपत्र डाउनलोड करें",
    },
    onboarding: {
      step1Title: "लर्नकोपरगांव में आपका स्वागत है!",
      step1Subtitle: "व्यक्तिगत अनुभव के लिए अपने छात्र का प्रकार चुनें।",
      step2Title: "कक्षा या स्ट्रीम चुनें",
      step2Subtitle: "हम आपकी कक्षा के अनुसार चुनौतियों को अनुकूलित करते हैं।",
      step3Title: "पसंदीदा भाषा चुनें",
      step3Subtitle: "आप पाठ के दौरान किसी भी समय भाषा बदल सकते हैं।",
      step4Title: "आपकी सीखने की रुचियां क्या हैं?",
      step4Subtitle: "वे विषय चुनें जिन्हें आप गहराई से सीखना चाहते हैं।",
      schoolStudent: "स्कूली छात्र (कक्षा 1–12)",
      undergradStudent: "स्नातक छात्र (कॉलेज)",
      finishButton: "डैशबोर्ड शुरू करें 🚀",
      nextButton: "अगला चरण →",
      backButton: "← वापस",
    },
    lesson: {
      learnTab: "1. अवधारणा सीखें",
      thinkTab: "2. विचार करें",
      playTab: "3. इंटरैक्टिव खेल",
      challengeTab: "4. मिशन चेकपॉइंट",
      nextStep: "अगला चरण →",
      prevStep: "← पिछला",
      finishMission: "मिशन पूरा करें 🎉",
      correctAnswer: "शानदार! सही उत्तर +25 XP",
      tryAgain: "उत्तर सही नहीं है। संकेत पढ़ें और पुनः प्रयास करें!",
      missionCompleted: "मिशन सफलतापूर्वक पूरा हुआ 🏆",
      badgeUnlocked: "नया बैज अनलॉक हुआ!",
      xpEarnedNotice: "अर्जित XP",
      runCode: "▶ कोड चलाएं",
      resetCode: "↺ कोड रीसेट करें",
      codeSuccess: "कोड सफलतापूर्वक चला! सभी परीक्षण उत्तीर्ण।",
      codeError: "कोड में त्रुटि मिली। हाइलाइट की गई लाइन जांचें।",
      verifyAnswer: "उत्तर जांचें",
      backToDashboard: "डैशबोर्ड पर वापस जाएं",
    },
  },
};
