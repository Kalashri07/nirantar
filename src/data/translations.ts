export interface Translations {
  appName: string;
  tagline: string;
  subheading: string;
  nav: {
    home: string;
    learn: string;
    library: string;
    missions: string;
    achievements: string;
    leaderboard: string;
    challenges: string;
    profile: string;
  };
  connectivity: {
    online: string;
    lowData: string;
    offline: string;
    connected: string;
    offlineAvailable: string;
    offlineBanner: string;
    syncingBanner: string;
    syncedBanner: string;
    pendingSyncText: string;
  };
  leaderboard: {
    title: string;
    subtitle: string;
    weeklyTab: string;
    monthlyTab: string;
    allTimeTab: string;
    allSubjects: string;
    rankCol: string;
    learnerCol: string;
    xpCol: string;
    levelCol: string;
    missionsCol: string;
    yourPositionTitle: string;
    yourRank: string;
    pointsNeeded: string;
  };
  challenges: {
    title: string;
    subtitle: string;
    createTitle: string;
    chooseFriend: string;
    challengeType: string;
    duration: string;
    goal: string;
    goalDesc: string;
    startBtn: string;
    vsTitle: string;
    timeRemaining: string;
    currentLeader: string;
    aheadBy: string;
    completeTitle: string;
    youWon: string;
    friendWon: string;
    rewardEarned: string;
    badgeAwarded: string;
    prevChallenges: string;
    winner: string;
    offlineNotice: string;
    syncedNotice: string;
  };
  home: {
    welcomeSub: string;
    continueLearning: string;
    continueAction: string;
    availableOffline: string;
    overview: string;
    learningProgress: string;
    currentStreak: string;
    points: string;
    daysStreak: string;
    recommended: string;
    recommendedSub: string;
    startModule: string;
    viewAll: string;
  };
  learn: {
    title: string;
    subtitle: string;
    schoolTab: string;
    undergradTab: string;
    allSubjects: string;
    modulesCount: string;
  };
  library: {
    title: string;
    subtitle: string;
    storageUsed: string;
    downloadedList: string;
    availableList: string;
    downloadAction: string;
    downloading: string;
    readyOffline: string;
    removeAction: string;
    noDownloads: string;
  };
  missions: {
    title: string;
    subtitle: string;
    todaysGoal: string;
    todaysGoalDesc: string;
    weeklyProgress: string;
    availableChallenges: string;
    claimReward: string;
    completed: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    recentEarned: string;
    milestones: string;
    subjectBadges: string;
    streakBadges: string;
    unlocked: string;
    locked: string;
  };
  profile: {
    title: string;
    subtitle: string;
    educationDetails: string;
    gradeStream: string;
    learnerType: string;
    languagePref: string;
    dataSaverTitle: string;
    dataSaverDesc: string;
    dataSavedEstimate: string;
    offlineSyncTitle: string;
    offlineSyncDesc: string;
    resetDemo: string;
  };
  lesson: {
    checkpoints: string;
    stepCount: string;
    checkAnswer: string;
    correctNotification: string;
    tryAgainNotification: string;
    nextCheckpoint: string;
    finishLesson: string;
    completedTitle: string;
    completedDesc: string;
    backToCourse: string;
  };
}

export const translations: Record<'en' | 'mr' | 'hi', Translations> = {
  en: {
    appName: "Nirantar",
    tagline: "Learning that continues, even when connectivity doesn't.",
    subheading: "An offline-first, multilingual, low-bandwidth educational platform for school and undergraduate learners.",
    nav: {
      home: "Home",
      learn: "Learn",
      library: "My Library",
      missions: "Missions",
      achievements: "Achievements",
      leaderboard: "Leaderboard",
      challenges: "Challenges",
      profile: "Profile",
    },
    leaderboard: {
      title: "Leaderboard",
      subtitle: "See how you're progressing with other learners.",
      weeklyTab: "This Week",
      monthlyTab: "This Month",
      allTimeTab: "All Time",
      allSubjects: "All Subjects",
      rankCol: "Rank",
      learnerCol: "Learner",
      xpCol: "XP",
      levelCol: "Level",
      missionsCol: "Missions Done",
      yourPositionTitle: "Your Position",
      yourRank: "Rank",
      pointsNeeded: "XP to reach",
    },
    challenges: {
      title: "Personal Challenges",
      subtitle: "Challenge a friend and see who can earn more XP.",
      createTitle: "Challenge a Friend",
      chooseFriend: "Choose a friend",
      challengeType: "Challenge Type",
      duration: "Challenge Duration",
      goal: "Challenge Goal",
      goalDesc: "Earn the most XP during the challenge period.",
      startBtn: "Start Challenge",
      vsTitle: "FRIEND CHALLENGE",
      timeRemaining: "Time Remaining",
      currentLeader: "Current Leader",
      aheadBy: "ahead",
      completeTitle: "CHALLENGE COMPLETE!",
      youWon: "You Won!",
      friendWon: "Won!",
      rewardEarned: "Bonus XP Reward",
      badgeAwarded: "Friend Challenge Winner",
      prevChallenges: "Previous Challenges",
      winner: "Winner",
      offlineNotice: "OFFLINE — Challenge progress saved on this device.",
      syncedNotice: "SYNCED — Challenge progress synchronized.",
    },
    connectivity: {
      online: "Online",
      lowData: "Low Data",
      offline: "Offline",
      connected: "Connected",
      offlineAvailable: "Offline — Learning Available",
      offlineBanner: "You're offline. Your downloaded lessons are still available.",
      syncingBanner: "Syncing your offline learning progress to the cloud...",
      syncedBanner: "You're back online. Your progress has been synced.",
      pendingSyncText: "activities will sync when you're back online",
    },
    home: {
      welcomeSub: "Continue learning at your own pace.",
      continueLearning: "Continue Learning",
      continueAction: "Continue Learning →",
      availableOffline: "Available Offline",
      overview: "Learning Overview",
      learningProgress: "Learning Progress",
      currentStreak: "Current Streak",
      points: "Points",
      daysStreak: "days",
      recommended: "Recommended for You",
      recommendedSub: "Structured curriculum modules tailored to your level.",
      startModule: "Start Lesson →",
      viewAll: "View all in Learn →",
    },
    learn: {
      title: "Explore Curriculum",
      subtitle: "Browse curriculum tracks across school and undergraduate programs.",
      schoolTab: "School (Classes 1–12)",
      undergradTab: "Undergraduate (Higher Ed)",
      allSubjects: "All Subjects",
      modulesCount: "learning modules available",
    },
    library: {
      title: "My Library",
      subtitle: "Your downloaded learning, available anytime.",
      storageUsed: "Storage used on this device",
      downloadedList: "Downloaded Modules",
      availableList: "Available for Download",
      downloadAction: "Download to Device",
      downloading: "Downloading...",
      readyOffline: "Offline Ready",
      removeAction: "Remove",
      noDownloads: "No lessons downloaded yet. Tap 'Download to Device' on any module to study without internet.",
    },
    missions: {
      title: "Learning Missions",
      subtitle: "Complete daily goals and subject challenges to earn points and badges.",
      todaysGoal: "Today's Goal",
      todaysGoalDesc: "Complete at least one lesson or simulation checkpoint today.",
      weeklyProgress: "Weekly Progress",
      availableChallenges: "Available Challenges",
      claimReward: "Claim Reward",
      completed: "Completed ✓",
    },
    achievements: {
      title: "Achievements & Badges",
      subtitle: "Track your learning milestones, offline mastery, and study streaks.",
      recentEarned: "Recently Earned",
      milestones: "Learning Milestones",
      subjectBadges: "Subject Mastery",
      streakBadges: "Streak & Dedication",
      unlocked: "Unlocked",
      locked: "In Progress",
    },
    profile: {
      title: "Student Profile",
      subtitle: "Manage your education stream, study language, and offline data saver.",
      educationDetails: "Education Level",
      gradeStream: "Grade / Stream",
      learnerType: "Student Category",
      languagePref: "Primary Language",
      dataSaverTitle: "Low Data Mode",
      dataSaverDesc: "Disables heavy media and non-essential assets to save bandwidth.",
      dataSavedEstimate: "You've saved approximately 120 MB of data this month.",
      offlineSyncTitle: "Local Storage & Cloud Sync",
      offlineSyncDesc: "All quiz answers and lesson checkpoints are saved locally first.",
      resetDemo: "Reset Demo Progress",
    },
    lesson: {
      checkpoints: "Lesson Outline",
      stepCount: "Checkpoint",
      checkAnswer: "Check Answer",
      correctNotification: "+25 XP · Great work!",
      tryAgainNotification: "Not quite. Check the hint and try again!",
      nextCheckpoint: "Next Checkpoint →",
      finishLesson: "Finish Lesson 🎉",
      completedTitle: "Checkpoint Completed!",
      completedDesc: "You have completed all interactive checkpoints for this lesson.",
      backToCourse: "Back to Dashboard",
    },
  },
  mr: {
    appName: "निरंतर",
    tagline: "इंटरनेट नसले तरी अखंड चालू राहणारे शिक्षण.",
    subheading: "शालेय व महाविद्यालयीन विद्यार्थ्यांसाठी ऑफलाइन-फर्स्ट, कमी-डेटा, बहुभाषी शिक्षण मंच.",
    nav: {
      home: "मुख्यपृष्ठ",
      learn: "अभ्यासक्रम",
      library: "माझी लायब्ररी",
      missions: "मोहिमा",
      achievements: "उपलब्धी",
      leaderboard: "गुणतालिका",
      challenges: "मित्र आव्हाने",
      profile: "माझे प्रोफाईल",
    },
    leaderboard: {
      title: "गुणतालिका (Leaderboard)",
      subtitle: "इतर विद्यार्थ्यांच्या तुलनेत तुमची प्रगती तपासा.",
      weeklyTab: "या आठवड्यात",
      monthlyTab: "या महिन्यात",
      allTimeTab: "सर्वकालीन",
      allSubjects: "सर्व विषय",
      rankCol: "क्रमांक",
      learnerCol: "विद्यार्थी",
      xpCol: "गुण (XP)",
      levelCol: "पातळी",
      missionsCol: "पूर्ण मोहिमा",
      yourPositionTitle: "तुमचे स्थान",
      yourRank: "क्रमांक",
      pointsNeeded: "पुढील क्रमांकासाठी XP",
    },
    challenges: {
      title: "मित्रांसोबत वैयक्तिक आव्हान",
      subtitle: "मित्राला आव्हान द्या आणि कोणाला जास्त XP मिळतात ते पहा.",
      createTitle: "मित्राला आव्हान द्या",
      chooseFriend: "मित्र निवडा",
      challengeType: "आव्हानाचा विषय",
      duration: "आव्हानाचा कालावधी",
      goal: "आव्हानाचे ध्येय",
      goalDesc: "कालावधीत सर्वात जास्त XP मिळवणे.",
      startBtn: "आव्हान सुरू करा",
      vsTitle: "मित्र विरुद्ध मित्र स्पर्धा",
      timeRemaining: "उरलेला वेळ",
      currentLeader: "सध्या आघाडीवर",
      aheadBy: "गुणांनी पुढे",
      completeTitle: "आव्हान पूर्ण झाले!",
      youWon: "तुम्ही जिंकलात! 🎉",
      friendWon: "जिंकला!",
      rewardEarned: "बोनस XP बक्षीस",
      badgeAwarded: "मित्र आव्हान विजेता पदक",
      prevChallenges: "मागील आव्हाने",
      winner: "विजेता",
      offlineNotice: "ऑफलाइन — आव्हान प्रगती या फोनमध्ये सुरक्षित साठवली आहे.",
      syncedNotice: "सिंक झाले — आव्हान प्रगती क्लाउडवर सिंक झाली.",
    },
    connectivity: {
      online: "ऑनलाइन",
      lowData: "कमी डेटा मोड",
      offline: "ऑफलाइन",
      connected: "जोडले आहे",
      offlineAvailable: "ऑफलाइन — शिक्षण उपलब्ध",
      offlineBanner: "तुम्ही ऑफलाइन आहात. तुमचे डाउनलोड केलेले धडे उपलब्ध आहेत.",
      syncingBanner: "ऑफलाइन शिकलेली प्रगती क्लाउडवर सिंक होत आहे...",
      syncedBanner: "तुम्ही पुन्हा ऑनलाइन आलात. तुमची प्रगती सिंक झाली आहे.",
      pendingSyncText: "क्रियाकलाप पुन्हा ऑनलाइन आल्यावर सिंक होतील",
    },
    home: {
      welcomeSub: "आपल्या गतीने आणि सवडीनुसार शिका.",
      continueLearning: "शिकणे पुढे चालू ठेवा",
      continueAction: "अभ्यास पुढे चालू ठेवा →",
      availableOffline: "ऑफलाइन उपलब्ध",
      overview: "शिक्षणाचा आढावा",
      learningProgress: "एकूण प्रगती",
      currentStreak: "सध्याची मालिका",
      points: "गुण (XP)",
      daysStreak: "दिवस",
      recommended: "तुमच्यासाठी शिफारस केलेले",
      recommendedSub: "तुमच्या इयत्तेनुसार तयार केलेले अभ्यासक्रम संच.",
      startModule: "धडा सुरू करा →",
      viewAll: "सर्व अभ्यासक्रम पहा →",
    },
    learn: {
      title: "अभ्यासक्रम विषय",
      subtitle: "शालेय आणि महाविद्यालयीन शिक्षण विभागांमधील विषय निवडा.",
      schoolTab: "शालेय (इयत्ता १ ते १२)",
      undergradTab: "पदवीधर (उच्च शिक्षण)",
      allSubjects: "सर्व विषय",
      modulesCount: "अभ्यासक्रम संच उपलब्ध",
    },
    library: {
      title: "माझी लायब्ररी",
      subtitle: "तुमचे डाउनलोड केलेले धडे, कधीही उपलब्ध.",
      storageUsed: "डिव्हाइसवर वापरलेली जागा",
      downloadedList: "डाउनलोड केलेले संच",
      availableList: "डाउनलोडसाठी उपलब्ध",
      downloadAction: "डिव्हाइसवर डाउनलोड करा",
      downloading: "डाउनलोड होत आहे...",
      readyOffline: "ऑफलाइन तयार",
      removeAction: "काढा",
      noDownloads: "अद्याप कोणतेही धडे डाउनलोड केलेले नाहीत. ऑफलाइन शिकण्यासाठी कोणत्याही संचावर 'डाउनलोड' दाबा.",
    },
    missions: {
      title: "शिक्षण मोहिमा",
      subtitle: "गुण आणि पदके मिळवण्यासाठी दररोज आणि साप्ताहिक उद्दिष्टे पूर्ण करा.",
      todaysGoal: "आजचे उद्दिष्ट",
      todaysGoalDesc: "आज किमान एक धडा किंवा प्रयोगशाळा टप्पा पूर्ण करा.",
      weeklyProgress: "साप्ताहिक प्रगती",
      availableChallenges: "उपलब्ध आव्हाने",
      claimReward: "बक्षीस मिळवा",
      completed: "पूर्ण झाले ✓",
    },
    achievements: {
      title: "पदके आणि उपलब्धी",
      subtitle: "तुमचे शैक्षणिक टप्पे आणि सातत्य तपासा.",
      recentEarned: "अलीकडे मिळालेली पदके",
      milestones: "शैक्षणिक टप्पे",
      subjectBadges: "विषय नैपुण्य",
      streakBadges: "सातत्य आणि निष्ठा",
      unlocked: "अनलॉक झाले",
      locked: "प्रगतीत",
    },
    profile: {
      title: "विद्यार्थी प्रोफाईल",
      subtitle: "तुमची इयत्ता, भाषा आणि डेटा सेव्हर व्यवस्थापित करा.",
      educationDetails: "शिक्षण पातळी",
      gradeStream: "इयत्ता / शाखा",
      learnerType: "विद्यार्थी गट",
      languagePref: "प्राधान्य दिलेली भाषा",
      dataSaverTitle: "कमी डेटा मोड",
      dataSaverDesc: "बँडविड्थ वाचवण्यासाठी मोठ्या फाइल्स बंद ठेवते.",
      dataSavedEstimate: "तुम्ही या महिन्यात अंदाजे १२० MB डेटा वाचवला आहे.",
      offlineSyncTitle: "स्थानिक स्टोरेज आणि सिंक",
      offlineSyncDesc: "सर्व उत्तरे आणि प्रगती आधी फोनमध्ये सुरक्षित साठवली जाते.",
      resetDemo: "डेमो रीसेट करा",
    },
    lesson: {
      checkpoints: "धड्याची रूपरेषा",
      stepCount: "टप्पा",
      checkAnswer: "उत्तर तपासा",
      correctNotification: "+२५ XP · उत्तम कार्य!",
      tryAgainNotification: "उत्तर बरोबर नाही. पुन्हा प्रयत्न करा!",
      nextCheckpoint: "पुढील टप्पा →",
      finishLesson: "धडा पूर्ण करा 🎉",
      completedTitle: "टप्पा पूर्ण झाला!",
      completedDesc: "तुम्ही या धड्यातील सर्व टप्पे यशस्वीरित्या पूर्ण केले आहेत.",
      backToCourse: "डॅशबोर्डवर परत जा",
    },
  },
  hi: {
    appName: "निरंतर",
    tagline: "इंटरनेट के बिना भी निरंतर जारी रहने वाली शिक्षा।",
    subheading: "स्कूली और कॉलेज छात्रों के लिए ऑफलाइन-फर्स्ट, कम-डेटा, बहुभाषी शिक्षण मंच।",
    nav: {
      home: "मुख्य पृष्ठ",
      learn: "पाठ्यक्रम",
      library: "मेरी लाइब्रेरी",
      missions: "मिशन",
      achievements: "उपलब्धियां",
      leaderboard: "लीडरबोर्ड",
      challenges: "मित्र चुनौतियाँ",
      profile: "प्रोफ़ाइल",
    },
    leaderboard: {
      title: "लीडरबोर्ड (Leaderboard)",
      subtitle: "अन्य शिक्षार्थियों के साथ अपनी प्रगति देखें।",
      weeklyTab: "इस सप्ताह",
      monthlyTab: "इस महीने",
      allTimeTab: "सर्वकालिक",
      allSubjects: "सभी विषय",
      rankCol: "रैंक",
      learnerCol: "शिक्षार्थी",
      xpCol: "अंक (XP)",
      levelCol: "स्तर",
      missionsCol: "पूर्ण मिशन",
      yourPositionTitle: "आपकी स्थिति",
      yourRank: "रैंक",
      pointsNeeded: "अगली रैंक के लिए आवश्यक XP",
    },
    challenges: {
      title: "दोस्तों के साथ व्यक्तिगत चुनौती",
      subtitle: "किसी मित्र को चुनौती दें और देखें कि कौन अधिक XP अर्जित करता है।",
      createTitle: "मित्र को चुनौती दें",
      chooseFriend: "मित्र चुनें",
      challengeType: "चुनौती का विषय",
      duration: "चुनौती की अवधि",
      goal: "चुनौती का लक्ष्य",
      goalDesc: "अवधि के दौरान सबसे अधिक XP अर्जित करना।",
      startBtn: "चुनौती शुरू करें",
      vsTitle: "मित्र बनाम मित्र मुकाबला",
      timeRemaining: "शेष समय",
      currentLeader: "वर्तमान में आगे",
      aheadBy: "अंकों से आगे",
      completeTitle: "चुनौती पूर्ण हुई!",
      youWon: "आप जीत गए! 🎉",
      friendWon: "जीत गया!",
      rewardEarned: "बोनस XP पुरस्कार",
      badgeAwarded: "मित्र चुनौती विजेता पदक",
      prevChallenges: "पिछली चुनौतियाँ",
      winner: "विजेता",
      offlineNotice: "ऑफलाइन — चुनौती प्रगति इस डिवाइस पर सुरक्षित है।",
      syncedNotice: "सिंक हुआ — चुनौती प्रगति क्लाउड पर सिंक हो गई।",
    },
    connectivity: {
      online: "ऑनलाइन",
      lowData: "कम डेटा मोड",
      offline: "ऑफलाइन",
      connected: "कनेक्टेड",
      offlineAvailable: "ऑफलाइन — शिक्षा उपलब्ध",
      offlineBanner: "आप ऑफलाइन हैं। आपके डाउनलोड किए गए पाठ उपलब्ध हैं।",
      syncingBanner: "ऑफलाइन सीखने की प्रगति क्लाउड पर सिंक हो रही है...",
      syncedBanner: "आप वापस ऑनलाइन आ गए हैं। आपकी प्रगति सिंक हो गई है।",
      pendingSyncText: "गतिविधियां वापस ऑनलाइन आने पर सिंक होंगी",
    },
    home: {
      welcomeSub: "अपनी गति से सीखना जारी रखें।",
      continueLearning: "सीखना जारी रखें",
      continueAction: "पाठ जारी रखें →",
      availableOffline: "ऑफलाइन उपलब्ध",
      overview: "सीखने का अवलोकन",
      learningProgress: "कुल प्रगति",
      currentStreak: "वर्तमान स्ट्रीक",
      points: "अंक (XP)",
      daysStreak: "दिन",
      recommended: "आपके लिए अनुशंसित",
      recommendedSub: "आपकी कक्षा के अनुसार तैयार किए गए शिक्षण मॉड्यूल।",
      startModule: "पाठ शुरू करें →",
      viewAll: "सभी पाठ्यक्रम देखें →",
    },
    learn: {
      title: "पाठ्यक्रम देखें",
      subtitle: "स्कूली और स्नातक स्तर के सभी विषयों में से चुनें।",
      schoolTab: "स्कूल (कक्षा 1 से 12)",
      undergradTab: "कॉलेज / स्नातक (उच्च शिक्षा)",
      allSubjects: "सभी विषय",
      modulesCount: "मॉड्यूल उपलब्ध",
    },
    library: {
      title: "मेरी लाइब्रेरी",
      subtitle: "आपके डाउनलोड किए गए पाठ, कभी भी उपलब्ध।",
      storageUsed: "डिवाइस पर उपयोग किया गया स्टोरेज",
      downloadedList: "डाउनलोड किए गए मॉड्यूल",
      availableList: "डाउनलोड के लिए उपलब्ध",
      downloadAction: "डिवाइस पर डाउनलोड करें",
      downloading: "डाउनलोड हो रहा है...",
      readyOffline: "ऑफलाइन तैयार",
      removeAction: "हटाएं",
      noDownloads: "अभी तक कोई पाठ डाउनलोड नहीं हुआ है। ऑफलाइन पढ़ने के लिए किसी भी मॉड्यूल पर 'डाउनलोड' दबाएं।",
    },
    missions: {
      title: "लर्निंग मिशन",
      subtitle: "अंक और बैज अर्जित करने के लिए दैनिक लक्ष्य और चुनौतियाँ पूरी करें।",
      todaysGoal: "आज का लक्ष्य",
      todaysGoalDesc: "आज कम से कम एक पाठ या लैब चेकपॉइंट पूरा करें।",
      weeklyProgress: "साप्ताहिक प्रगति",
      availableChallenges: "उपलब्ध चुनौतियां",
      claimReward: "इनाम प्राप्त करें",
      completed: "पूर्ण हुआ ✓",
    },
    achievements: {
      title: "उपलब्धियां और बैज",
      subtitle: "अपने शैक्षणिक मील के पत्थर और अध्ययन स्ट्रीक को ट्रैक करें।",
      recentEarned: "हाल ही में अर्जित बैज",
      milestones: "शिक्षण मील के पत्थर",
      subjectBadges: "विषय दक्षता",
      streakBadges: "स्ट्रीक और समर्पण",
      unlocked: "अनलॉक",
      locked: "प्रगति में",
    },
    profile: {
      title: "छात्र प्रोफ़ाइल",
      subtitle: "अपनी कक्षा, अध्ययन भाषा और डेटा सेवर को प्रबंधित करें।",
      educationDetails: "शिक्षा स्तर",
      gradeStream: "कक्षा / स्ट्रीम",
      learnerType: "छात्र श्रेणी",
      languagePref: "प्राथमिक भाषा",
      dataSaverTitle: "कम डेटा मोड",
      dataSaverDesc: "बैंडविड्थ बचाने के लिए भारी मीडिया को अक्षम करता है।",
      dataSavedEstimate: "आपने इस महीने लगभग 120 MB डेटा बचाया है।",
      offlineSyncTitle: "स्थानीय मेमोरी और सिंक",
      offlineSyncDesc: "सभी उत्तर और चेकपॉइंट पहले आपके डिवाइस पर सुरक्षित होते हैं।",
      resetDemo: "डेमो रीसेट करें",
    },
    lesson: {
      checkpoints: "पाठ रूपरेखा",
      stepCount: "चेकपॉइंट",
      checkAnswer: "उत्तर जांचें",
      correctNotification: "+25 XP · बहुत बढ़िया!",
      tryAgainNotification: "उत्तर सही नहीं है। संकेत देखें और पुनः प्रयास करें!",
      nextCheckpoint: "अगला चेकपॉइंट →",
      finishLesson: "पाठ पूरा करें 🎉",
      completedTitle: "चेकपॉइंट पूरा हुआ!",
      completedDesc: "आपने इस पाठ के सभी इंटरैक्टिव चेकपॉइंट सफलतापूर्वक पूरे कर लिए हैं।",
      backToCourse: "डैशबोर्ड पर वापस जाएं",
    },
  },
};
