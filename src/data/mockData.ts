import type { LearningPack, MissionItem, BadgeItem, UserProfile } from '../types';

export const SUPPORTED_EDUCATION_LEVELS = [
  // School
  { category: 'School', options: [
    '1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard',
    '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard',
    '11th Standard', '12th Standard'
  ]},
  // BTech
  { category: 'BTech', options: [
    'BTech FY', 'BTech SY', 'BTech TY', 'BTech Final Year'
  ]},
  // BBA
  { category: 'BBA', options: [
    'BBA FY', 'BBA SY', 'BBA TY'
  ]},
  // MBA
  { category: 'MBA', options: [
    'MBA FY', 'MBA SY'
  ]},
  // BCA
  { category: 'BCA', options: [
    'BCA FY', 'BCA SY', 'BCA TY'
  ]},
];

export const initialUserProfile: UserProfile = {
  name: "Learner",
  learnerType: "school",
  gradeOrStream: "10th Standard",
  interests: ["Science", "Programming", "Physics"],
  preferredLanguage: "en",
  level: 7,
  levelTitle: {
    en: "Curious Explorer",
    mr: "जिज्ञासू संशोधक",
    hi: "जिज्ञासु खोजकर्ता"
  },
  currentXp: 1240,
  targetXp: 2000,
  streakDays: 6,
  completedModuleIds: [],
  offlineHours: 14.5,
  offlineActivitiesCompleted: 42,
  dataSavedMb: 320,
  hasOnboarded: true,
};

export const learningPacks: LearningPack[] = [
  // 1. PHYSICS QUEST
  {
    id: "physics-quest",
    worldId: "science",
    subjectName: { en: "Physics", mr: "भौतिकशास्त्र", hi: "भौतिकी" },
    title: {
      en: "Physics Quest: Laws of Motion",
      mr: "भौतिकशास्त्र शोध: गतीचे नियम",
      hi: "भौतिकी खोज: गति के नियम"
    },
    subtitle: {
      en: "Master Newton's 3 laws through interactive laboratory experiments",
      mr: "संवादात्मक प्रयोगशाळेतून न्यूटनचे ३ नियम शिका",
      hi: "इंटरैक्टिव प्रयोगशाला प्रयोगों से न्यूटन के 3 नियम सीखें"
    },
    levelBadge: {
      en: "Class 9–10 & Undergrad Prep",
      mr: "इयत्ता ९–१० आणि पूर्वतयारी",
      hi: "कक्षा 9-10 और प्रारंभिक तैयारी"
    },
    targetAudience: "School",
    estimatedSizeMb: 4.2,
    xpReward: 250,
    difficulty: "Intermediate",
    description: {
      en: "Learn Newton's Laws through interactive scenarios and challenges. Test forces, inertia, and momentum with interactive lightweight simulators.",
      mr: "संवादात्मक परिस्थिती आणि आव्हानांद्वारे न्यूटनचे नियम शिका. बल, जडत्व आणि संवेगाचा अभ्यास करा.",
      hi: "इंटरैक्टिव परिदृश्यों और चुनौतियों के माध्यम से न्यूटन के नियम सीखें। बल, जड़त्व और संवेग का परीक्षण करें।"
    },
    icon: "Atom",
    gradient: "from-blue-600 to-cyan-500",
    isDownloaded: true,
    progressPercentage: 68,
    syllabus: [
      { id: "p1", title: { en: "1. Introduction to Forces & Motion", mr: "१. बल आणि गतीची ओळख", hi: "1. बल और गति का परिचय" }, durationMin: 5, completed: true },
      { id: "p2", title: { en: "2. Newton's First Law (Inertia)", mr: "२. न्यूटनचा पहिला नियम (जडत्व)", hi: "2. न्यूटन का प्रथम नियम (जड़त्व)" }, durationMin: 8, completed: true },
      { id: "p3", title: { en: "3. Newton's Second Law (F = ma)", mr: "३. न्यूटनचा दुसरा नियम (F = ma)", hi: "3. न्यूटन का द्वितीय नियम (F = ma)" }, durationMin: 10, completed: true },
      { id: "p4", title: { en: "4. Newton's Third Law (Action-Reaction)", mr: "४. न्यूटनचा तिसरा नियम (क्रिया-प्रतिक्रिया)", hi: "4. न्यूटन का तृतीय नियम (क्रिया-प्रतिक्रिया)" }, durationMin: 8, completed: false },
      { id: "p5", title: { en: "5. Interactive Lab Challenge: Stop Runaway Cart", mr: "५. प्रयोगशाळा आव्हान: धावती गाडी थांबवा", hi: "5. प्रयोगशाला चुनौती: भागती गाड़ी रोकें" }, durationMin: 12, completed: false },
      { id: "p6", title: { en: "6. Final Mission Checkpoint & Badge Exam", mr: "६. अंतिम मोहीम व पदक चाचणी", hi: "6. अंतिम मिशन व बैज परीक्षा" }, durationMin: 10, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: STOP THE RUNAWAY CART 🚀",
        mr: "मोहीम: धावती गाडी थांबवा 🚀",
        hi: "मिशन: भागती गाड़ी रोकें 🚀"
      },
      scenario: {
        en: "A heavy supply cart is moving through the Kopargaon Science Lab corridor. Use Newton's Laws of Motion to control forces, apply calculated friction, and stop it safely before the barrier.",
        mr: "कोपरगाव सायन्स लॅबच्या कॉरिडोअरमध्ये एक सामानाची गाडी घसरत जात आहे. न्यूटनच्या गती नियमांचा वापर करून तिला सुरक्षितपणे थांबवा.",
        hi: "कोपरगांव साइंस लैब के गलियारे में एक भारी कार्ट तेजी से बढ़ रही है। न्यूटन के नियमों का उपयोग करके बल संतुलित करें और उसे सुरक्षित रोकें।"
      },
      badgeReward: "Newton's Explorer",
      steps: [
        {
          id: "step-1",
          type: "learn",
          title: {
            en: "Concept: Newton's First Law (Law of Inertia)",
            mr: "संकल्पना: न्यूटनचा पहिला नियम (जडत्वाचा नियम)",
            hi: "अवधारणा: न्यूटन का प्रथम नियम (जड़त्व का नियम)"
          },
          description: {
            en: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force.",
            mr: "कोणतीही वस्तू जोपर्यंत तिच्यावर बाह्य असंतुलित बल कार्य करत नाही, तोपर्यंत स्थिर अवस्थेत किंवा सरळ रेषेतील एकसमान गतीत राहते.",
            hi: "कोई भी वस्तु तब तक अपनी विराम अवस्था या सरल रेखा में एकसमान गति में रहती है, जब तक कि उस पर कोई बाहरी असंतुलित बल कार्य न करे।"
          },
          question: {
            en: "Why does the supply cart keep moving when no one is pushing it?",
            mr: "गाडीला कोणीही धक्का देत नसतानाही ती पुढे का धावत राहते?",
            hi: "जब कोई गाड़ी को धक्का नहीं दे रहा, तब भी वह आगे क्यों बढ़ती रहती है?"
          },
          options: [
            {
              id: "opt-1",
              text: {
                en: "Because of its Inertia of Motion (lack of opposing friction)",
                mr: "गतीच्या जडत्वामुळे (विरोधी घर्षण बल नसल्याने)",
                hi: "गति के जड़त्व के कारण (विरोधी घर्षण बल की कमी)"
              },
              isCorrect: true,
              explanation: {
                en: "Correct! The cart maintains its velocity until friction or braking force counteracts its inertia.",
                mr: "अगदी बरोबर! जोपर्यंत घर्षण किंवा ब्रेक बल लागत नाही, तोपर्यंत जडत्वामुळे गाडी पुढे जात राहते.",
                hi: "बिल्कुल सही! जब तक घर्षण या ब्रेक बल नहीं लगता, जड़त्व के कारण गति बनी रहती है।"
              }
            },
            {
              id: "opt-2",
              text: {
                en: "Gravity is pulling it forward horizontally",
                mr: "गुरुत्वाकर्षण तिला क्षितीजसमांतर पुढे खेचत आहे",
                hi: "गुरुत्वाकर्षण उसे क्षैतिज रूप से आगे खींच रहा है"
              },
              isCorrect: false,
              explanation: {
                en: "Gravity acts downward, not horizontally along the flat corridor.",
                mr: "गुरुत्वाकर्षण बल खाली जमिनीकडे कार्य करते, पुढे नाही.",
                hi: "गुरुत्वाकर्षण नीचे की ओर कार्य करता है, क्षैतिज आगे नहीं।"
              }
            }
          ],
          xpReward: 25
        },
        {
          id: "step-2",
          type: "play",
          title: {
            en: "Interactive Simulator: Force & Acceleration (F = ma)",
            mr: "संवादात्मक सिम्युलेटर: बल आणि प्रवेग (F = ma)",
            hi: "इंटरैक्टिव सिम्युलेटर: बल और त्वरण (F = ma)"
          },
          description: {
            en: "Adjust the braking force to decelerate a 150 kg cart moving at 12 m/s before it travels 30 meters.",
            mr: "१५० किलो वजनाच्या आणि १२ मीटर/सेकंद वेगाने जाणाऱ्या गाडीला ३० मीटर अंतर गाठण्यापूर्वी थांबवण्यासाठी योग्य ब्रेक फोर्स लावा.",
            hi: "150 किग्रा और 12 मी/से की गति वाली गाड़ी को 30 मीटर के भीतर रोकने के लिए सही ब्रेकिंग बल लागू करें।"
          },
          interactiveData: {
            simType: "force_cart",
            initialCartWeight: 150,
            initialForce: 360
          },
          question: {
            en: "If the cart mass is 150 kg and desired deceleration is -2.4 m/s², what opposing force is required? (Formula: F = m × a)",
            mr: "गाडीचे वस्तुमान १५० किलो आणि आवश्यक मंदन -२.४ मी/से² असल्यास किती विरोधी बल लागेल? (सूत्र: F = m × a)",
            hi: "यदि गाड़ी का द्रव्यमान 150 किग्रा और आवश्यक मंदन -2.4 मी/से² है, तो कितना विरोधी बल चाहिए? (सूत्र: F = m × a)"
          },
          options: [
            {
              id: "opt-2a",
              text: { en: "360 Newtons (N)", mr: "३६० न्यूटन (N)", hi: "360 न्यूटन (N)" },
              isCorrect: true,
              explanation: {
                en: "F = 150 kg × 2.4 m/s² = 360 N opposing force!",
                mr: "F = १५० × २.४ = ३६० न्यूटन बल आवश्यक आहे!",
                hi: "F = 150 × 2.4 = 360 न्यूटन बल चाहिए!"
              }
            },
            {
              id: "opt-2b",
              text: { en: "150 Newtons (N)", mr: "१५० न्यूटन (N)", hi: "150 न्यूटन (N)" },
              isCorrect: false,
              explanation: {
                en: "Multiply mass by acceleration: 150 × 2.4 = 360 N.",
                mr: "वस्तुमान गुणिले प्रवेग: १५० × २.४ = ३६० न्यूटन.",
                hi: "द्रव्यमान और त्वरण का गुणन करें: 150 × 2.4 = 360 N."
              }
            }
          ],
          xpReward: 35
        },
        {
          id: "step-3",
          type: "challenge",
          title: {
            en: "Mission Checkpoint: Action & Reaction (Third Law)",
            mr: "मोहीम चेकपॉइंट: क्रिया आणि प्रतिक्रिया (तिसरा नियम)",
            hi: "मिशन चेकपॉइंट: क्रिया और प्रतिक्रिया (तृतीय नियम)"
          },
          description: {
            en: "When the lab technician pushes the emergency magnetic brake against the floor, what happens according to Newton's 3rd Law?",
            mr: "जेव्हा प्रयोगशाळा तंत्रज्ञ आपत्कालीन चुंबकीय ब्रेक जमिनीवर दाबतो, तेव्हा न्यूटनच्या तिसऱ्या नियमानुसार काय घडते?",
            hi: "जब लैब तकनीशियन फर्श पर आपातकालीन चुंबकीय ब्रेक लगाता है, तो न्यूटन के तीसरे नियम के अनुसार क्या होता है?"
          },
          question: {
            en: "For every action, there is an equal and opposite reaction. The brake pushes the floor backward, so the floor...",
            mr: "प्रत्येक क्रियेला समान व विरुद्ध प्रतिक्रिया असते. ब्रेक जमिनीला मागे ढकलतो, तर जमीन...",
            hi: "प्रत्येक क्रिया के बराबर और विपरीत प्रतिक्रिया होती है। ब्रेक फर्श को पीछे धकेलता है, तो फर्श..."
          },
          options: [
            {
              id: "opt-3a",
              text: {
                en: "Exerts an equal forward opposing frictional force on the cart, halting it",
                mr: "गाडीवर समान विरोधी घर्षण बल लावून तिला थांबवते",
                hi: "गाड़ी पर समान विरोधी घर्षण बल लगाकर उसे रोकती है"
              },
              isCorrect: true,
              explanation: {
                en: "Spot on! The action-reaction pair provides the required friction to safely stop the runaway cart!",
                mr: "उत्कृष्ट! क्रिया-प्रतिक्रिया जोडीमुळे आवश्यक घर्षण निर्माण होऊन गाडी सुरक्षित थांबली!",
                hi: "शाबाश! क्रिया-प्रतिक्रिया युग्म से घर्षण उत्पन्न होकर गाड़ी रुक गई!"
              }
            },
            {
              id: "opt-3b",
              text: {
                en: "Does nothing because floors cannot exert force",
                mr: "काहीच करत नाही कारण जमीन बल लावू शकत नाही",
                hi: "कुछ नहीं करती क्योंकि फर्श बल नहीं लगा सकती"
              },
              isCorrect: false,
              explanation: {
                en: "Solid surfaces exert normal and frictional reactive forces.",
                mr: "जमीन नेहमी प्रतिक्रिया बल लावते.",
                hi: "फर्श हमेशा प्रतिक्रिया बल लगाती है।"
              }
            }
          ],
          xpReward: 40
        }
      ]
    }
  },

  // 2. CHEMISTRY LAB
  {
    id: "chemistry-lab",
    worldId: "science",
    subjectName: { en: "Chemistry", mr: "रसायनशास्त्र", hi: "रसायन विज्ञान" },
    title: {
      en: "Chemistry Lab: Periodic Table Mission",
      mr: "रसायनशास्त्र लॅब: आवर्त सारणी मोहीम",
      hi: "रसायन विज्ञान लैब: आवर्त सारणी मिशन"
    },
    subtitle: {
      en: "Save the Science Lab by matching reactive elements and balancing reactions",
      mr: "मूलद्रव्यांचे गुणधर्म ओळखून आणि रासायनिक अभिक्रिया संतुलित करून लॅब वाचवा",
      hi: "तत्वों के गुण पहचानकर और रासायनिक अभिक्रियाएं संतुलित कर लैब को सुरक्षित करें"
    },
    levelBadge: {
      en: "Class 8–10",
      mr: "इयत्ता ८–१०",
      hi: "कक्षा 8-10"
    },
    targetAudience: "School",
    estimatedSizeMb: 3.8,
    xpReward: 220,
    difficulty: "Beginner",
    description: {
      en: "Explore elements, atomic numbers, groups, and chemical properties through progressive laboratory challenges.",
      mr: "मूलद्रव्ये, अणुक्रमांक, आवर्त आणि रासायनिक गुणधर्मांचा अभ्यास करा.",
      hi: "तत्वों, परमाणु क्रमांकों, समूहों और रासायनिक गुणों का अन्वेषण करें।"
    },
    icon: "FlaskConical",
    gradient: "from-emerald-600 to-teal-400",
    isDownloaded: true,
    progressPercentage: 40,
    syllabus: [
      { id: "c1", title: { en: "1. Structure of the Periodic Table", mr: "१. आवर्त सारणीची रचना", hi: "1. आवर्त सारणी की संरचना" }, durationMin: 6, completed: true },
      { id: "c2", title: { en: "2. Alkali Metals & Reactivity (Group 1)", mr: "२. अल्कली धातू आणि क्रियाशीलता", hi: "2. क्षार धातुएं और क्रियाशीलता" }, durationMin: 8, completed: true },
      { id: "c3", title: { en: "3. Noble Gases & Electron Stability", mr: "३. निष्क्रिय वायू आणि स्थिरता", hi: "3. उत्कृष्ट गैसें और इलेक्ट्रॉन स्थिरता" }, durationMin: 7, completed: false },
      { id: "c4", title: { en: "4. Interactive Reagent Mixing Challenge", mr: "४. संवादात्मक रासायनिक संयोग आव्हान", hi: "4. इंटरैक्टिव रासायनिक मिश्रण चुनौती" }, durationMin: 10, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: SAVE THE SCIENCE LAB 🧪",
        mr: "मोहीम: सायन्स लॅब सुरक्षित करा 🧪",
        hi: "मिशन: साइंस लैब सुरक्षित करें 🧪"
      },
      scenario: {
        en: "An unlabelled container of an alkali metal is exposed to humidity. Identify the correct element by atomic number and select the neutralizer reagent to stabilize the reaction safely.",
        mr: "लॅबमध्ये एका अज्ञात अल्कली धातूचा डबा उघडा राहिला आहे. अणुक्रमांक ओळखून त्याला सुरक्षितपणे निष्क्रिय करा.",
        hi: "लैब में एक अज्ञात क्षार धातु का कंटेनर खुला रह गया है। परमाणु क्रमांक से पहचानकर सही अभिकर्मक से उसे सुरक्षित निष्क्रिय करें।"
      },
      badgeReward: "Science Explorer",
      steps: [
        {
          id: "chem-1",
          type: "learn",
          title: {
            en: "Periodic Trends: Alkali Metals (Group 1)",
            mr: "आवर्त सारणी: अल्कली धातू (गट १)",
            hi: "आवर्त सारणी: क्षार धातुएं (समूह 1)"
          },
          description: {
            en: "Group 1 elements (Lithium, Sodium, Potassium) have 1 valence electron, making them vigorously reactive with moisture in the air.",
            mr: "गट १ मधील मूलद्रव्ये (लिथियम, सोडियम, पोटॅशियम) अत्यंत क्रियाशील असतात आणि पाण्याशी वेगाने अभिक्रिया करतात.",
            hi: "समूह 1 के तत्व (लिथियम, सोडियम, पोटेशियम) बहुत क्रियाशील होते हैं और नमी से तेजी से अभिक्रिया करते हैं।"
          },
          question: {
            en: "Which element with Atomic Number 11 reacts vigorously with water to form a hydroxide?",
            mr: "अणुक्रमांक ११ असलेले कोणते मूलद्रव्य पाण्यासोबत तीव्र अभिक्रिया करते?",
            hi: "परमाणु क्रमांक 11 वाला कौन सा तत्व पानी के साथ तीव्र अभिक्रिया करता है?"
          },
          options: [
            {
              id: "chem-1a",
              text: { en: "Sodium (Na)", mr: "सोडियम (Na)", hi: "सोडियम (Na)" },
              isCorrect: true,
              explanation: {
                en: "Correct! Sodium (Na, Z=11) is stored under kerosene to prevent reaction with atmospheric humidity.",
                mr: "अगदी बरोबर! सोडियम (Na) हवेतील आर्द्रतेशी अभिक्रिया टाळण्यासाठी रॉकेलमध्ये ठेवतात.",
                hi: "बिल्कुल सही! सोडियम (Na) को हवा से बचाने के लिए मिट्टी के तेल में रखा जाता है।"
              }
            },
            {
              id: "chem-1b",
              text: { en: "Helium (He)", mr: "हेलियम (He)", hi: "हीलियम (He)" },
              isCorrect: false,
              explanation: {
                en: "Helium is an inert noble gas with atomic number 2.",
                mr: "हेलियम हा निष्क्रिय वायू असून त्याचा अणुक्रमांक २ आहे.",
                hi: "हीलियम एक निष्क्रिय गैस है जिसका परमाणु क्रमांक 2 है।"
              }
            }
          ],
          xpReward: 30
        },
        {
          id: "chem-2",
          type: "play",
          title: {
            en: "Lab Simulation: Neutralizing the Spill",
            mr: "लॅब सिम्युलेशन: द्रावण सुरक्षित करणे",
            hi: "लैब सिमुलेशन: सुरक्षित निष्प्रभावीकरण"
          },
          description: {
            en: "Sodium hydroxide (NaOH) base spill detected on the floor. Choose the safe neutralizing weak acid.",
            mr: "जमिनीवर सोडियम हायड्रॉक्साइड (NaOH) सांडले आहे. त्याला सुरक्षितपणे उदासीन करण्यासाठी योग्य सौम्य आम्ल निवडा.",
            hi: "फर्श पर सोडियम हाइड्रॉक्साइड (NaOH) गिर गया है। उसे सुरक्षित रूप से उदासीन करने के लिए सही अम्ल चुनें।"
          },
          interactiveData: {
            simType: "chemistry_reaction",
            elements: [
              { name: "Sodium", symbol: "Na", atomicNumber: 11, group: "Alkali Metal" },
              { name: "Chlorine", symbol: "Cl", atomicNumber: 17, group: "Halogen" },
              { name: "Argon", symbol: "Ar", atomicNumber: 18, group: "Noble Gas" }
            ]
          },
          question: {
            en: "What happens when an acid reacts with a base (Neutralization reaction)?",
            mr: "आम्ल आणि आम्लारी यांच्यातील अभिक्रियेतून (उदासिनीकरण) काय तयार होते?",
            hi: "अम्ल और क्षार की अभिक्रिया (उदासीनीकरण) से क्या बनता है?"
          },
          options: [
            {
              id: "chem-2a",
              text: { en: "Salt + Water (Safe neutral state)", mr: "क्षार + पाणी (उदासीन अवस्था)", hi: "लवण + जल (सुरक्षित उदासीन अवस्था)" },
              isCorrect: true,
              explanation: {
                en: "Acid + Base → Salt + Water (Neutralization complete!)",
                mr: "आम्ल + आम्लारी → क्षार + पाणी (उदासिनीकरण पूर्ण झाले!)",
                hi: "अम्ल + क्षार → लवण + जल (उदासीनीकरण पूर्ण!)"
              }
            },
            {
              id: "chem-2b",
              text: { en: "Combustible Hydrogen Gas", mr: "ज्वलनशील हायड्रोजन वायू", hi: "ज्वलनशील हाइड्रोजन गैस" },
              isCorrect: false,
              explanation: {
                en: "Neutralization between acid and base produces salt and water, not free hydrogen.",
                mr: "उदासिनीकरणात क्षार आणि पाणी तयार होते.",
                hi: "उदासीनीकरण में लवण और जल बनता है।"
              }
            }
          ],
          xpReward: 35
        }
      ]
    }
  },

  // 3. MATH WORLD: ALGEBRA ADVENTURE
  {
    id: "algebra-adventure",
    worldId: "math",
    subjectName: { en: "Mathematics", mr: "गणित", hi: "गणित" },
    title: {
      en: "Math Explorer: Algebra Adventure",
      mr: "गणित शोधक: बीजगणित साहस",
      hi: "गणित अन्वेषक: बीजगणित साहसिक यात्रा"
    },
    subtitle: {
      en: "Crack algebraic puzzles, linear equations, and spatial balance",
      mr: "रेषीय समीकरणे आणि बीजगणिती कोडी सोडवून पुढील पायऱ्या अनलॉक करा",
      hi: "रैखिक समीकरण और बीजगणित की पहेलियां हल करके नए स्तर खोलें"
    },
    levelBadge: {
      en: "Class 7–10",
      mr: "इयत्ता ७–१०",
      hi: "कक्षा 7-10"
    },
    targetAudience: "School",
    estimatedSizeMb: 2.9,
    xpReward: 200,
    difficulty: "Intermediate",
    description: {
      en: "Solve algebra puzzles and unlock progressive levels through gamified visual balancing scales.",
      mr: "बीजगणित कोडी आणि तराजूच्या संतुलनाद्वारे गणितीय संकल्पना स्पष्ट करा.",
      hi: "बीजगणित की पहेलियां और तराजू संतुलन के माध्यम से गणितीय अवधारणाओं को समझें।"
    },
    icon: "Calculator",
    gradient: "from-amber-500 to-orange-500",
    isDownloaded: true,
    progressPercentage: 25,
    syllabus: [
      { id: "m1", title: { en: "1. Balancing the Unknown Variable (x)", mr: "१. अज्ञात चल (x) चे संतुलन", hi: "1. अज्ञात चर (x) का संतुलन" }, durationMin: 5, completed: true },
      { id: "m2", title: { en: "2. Solving 2-step Equations", mr: "२. द्वि-स्तरीय समीकरणे", hi: "2. दो-चरणीय समीकरण" }, durationMin: 7, completed: false },
      { id: "m3", title: { en: "3. Real-world Market Word Problems", mr: "३. बाजारातील व्यावहारिक गणिते", hi: "3. बाजार संबंधी व्यावहारिक प्रश्न" }, durationMin: 8, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: BALANCE THE KOPARGAON GRAIN SCALE ⚖️",
        mr: "मोहीम: कोपरगाव धान्य वजन तराजू संतुलित करा ⚖️",
        hi: "मिशन: कोपरगांव अनाज तराजू संतुलित करें ⚖️"
      },
      scenario: {
        en: "A farmer in Kopargaon market has 3 identical grain sacks (x kg each) plus a 5 kg weight on the left pan. The right pan has 26 kg. Find the weight of one sack.",
        mr: "कोपरगाव बाजारातील शेतकऱ्याकडे डाव्या पारड्यात ३ धान्याची पोती (प्रत्येकी x किलो) आणि ५ किलोचे वजन आहे. उजव्या पारड्यात २६ किलो आहे. एका पोत्याचे वजन किती?",
        hi: "कोपरगांव मंडी के किसान के पास बाएं पलड़े में 3 समान बोरियां (प्रत्येक x किग्रा) और 5 किग्रा का बाट है। दाएं पलड़े में 26 किग्रा है। एक बोरी का वजन ज्ञात करें।"
      },
      badgeReward: "Math Prodigy",
      steps: [
        {
          id: "m-step-1",
          type: "think",
          title: {
            en: "Set Up the Equation: 3x + 5 = 26",
            mr: "समीकरण मांडा: 3x + 5 = 26",
            hi: "समीकरण बनाएं: 3x + 5 = 26"
          },
          description: {
            en: "Subtract 5 from both sides: 3x = 21. Then divide by 3.",
            mr: "दोन्ही बाजूंमधून ५ वजा करा: 3x = 21. नंतर ३ ने भागा.",
            hi: "दोनों पक्षों से 5 घटाएं: 3x = 21. फिर 3 से भाग दें।"
          },
          question: {
            en: "What is the value of x (weight of 1 grain sack)?",
            mr: "x चे मूल्य (१ पोत्याचे वजन) किती आहे?",
            hi: "x का मान (1 बोरी का वजन) क्या है?"
          },
          options: [
            {
              id: "m-opt-1",
              text: { en: "7 kg (3 × 7 + 5 = 26)", mr: "७ किलो (३ × ७ + ५ = २६)", hi: "7 किग्रा (3 × 7 + 5 = 26)" },
              isCorrect: true,
              explanation: {
                en: "Excellent! 3x = 21, so x = 7 kg.",
                mr: "उत्तम! 3x = 21 म्हणून x = ७ किलो.",
                hi: "बहुत बढ़िया! 3x = 21, अतः x = 7 किग्रा।"
              }
            },
            {
              id: "m-opt-2",
              text: { en: "8 kg", mr: "८ किलो", hi: "8 किग्रा" },
              isCorrect: false,
              explanation: {
                en: "3 × 8 + 5 = 29, which exceeds 26.",
                mr: "३ × ८ + ५ = २९ होते, जे २६ पेक्षा जास्त आहे.",
                hi: "3 × 8 + 5 = 29 होता है, जो 26 से अधिक है।"
              }
            }
          ],
          xpReward: 30
        }
      ]
    }
  },

  // 4. LANGUAGE WORLD: ENGLISH EXPLORER
  {
    id: "english-explorer",
    worldId: "language",
    subjectName: { en: "English", mr: "इंग्रजी", hi: "अंग्रेजी" },
    title: {
      en: "English Explorer: Communication Challenge",
      mr: "इंग्रजी शोधक: व्यावहारिक संभाषण आव्हान",
      hi: "अंग्रेजी अन्वेषक: व्यावहारिक संवाद चुनौती"
    },
    subtitle: {
      en: "Build practical fluency for interviews, exams, and daily interactions",
      mr: "मुलाखती, परीक्षा आणि दैनंदिन संवादासाठी इंग्रजी संवाद कौशल्य सुधारा",
      hi: "साक्षात्कार, परीक्षाओं और दैनिक संवाद के लिए अंग्रेजी कौशल सुधारें"
    },
    levelBadge: {
      en: "All Students",
      mr: "सर्व विद्यार्थ्यांसाठी",
      hi: "सभी विद्यार्थियों के लिए"
    },
    targetAudience: "School",
    estimatedSizeMb: 3.1,
    xpReward: 180,
    difficulty: "Beginner",
    description: {
      en: "Improve practical spoken and written English through realistic village-to-city scenarios and interactive tasks.",
      mr: "व्यावहारिक संभाषण आणि शब्दसंग्रहाचा संवादात्मक सराव करा.",
      hi: "व्यावहारिक संवाद और शब्दावली का संवादात्मक अभ्यास करें।"
    },
    icon: "BookOpen",
    gradient: "from-purple-600 to-indigo-500",
    isDownloaded: false,
    progressPercentage: 0,
    syllabus: [
      { id: "e1", title: { en: "1. Confident Introductions & Greetings", mr: "१. आत्मविश्वासपूर्ण परिचय व संभाषण", hi: "1. आत्मविश्वास से परिचय और अभिवादन" }, durationMin: 5, completed: false },
      { id: "e2", title: { en: "2. Asking for Directions & Assistance", mr: "२. पत्ता विचारणे व मदत मागणे", hi: "2. दिशा पूछना और सहायता मांगना" }, durationMin: 6, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: THE CAMPUS INTERVIEW 🎙️",
        mr: "मोहीम: कॅम्पस मुलाखत संवाद 🎙️",
        hi: "मिशन: कैंपस साक्षात्कार संवाद 🎙️"
      },
      scenario: {
        en: "You are introducing your project at a state science exhibition. Choose the most clear and professional response.",
        mr: "तुम्ही राज्यस्तरीय विज्ञान प्रदर्शनात तुमचा प्रकल्प सादर करत आहात. सर्वात योग्य इंग्रजी वाक्य निवडा.",
        hi: "आप राज्य स्तरीय विज्ञान प्रदर्शनी में अपनी परियोजना प्रस्तुत कर रहे हैं। सबसे उपयुक्त अंग्रेजी वाक्य चुनें।"
      },
      badgeReward: "Fluent Speaker",
      steps: [
        {
          id: "e-step-1",
          type: "learn",
          title: {
            en: "Professional Self-Introduction",
            mr: "व्यावसायिक स्व-परिचय",
            hi: "पेशेवर स्व-परिचय"
          },
          description: {
            en: "State your name, institution, and key objective concisely.",
            mr: "तुमचे नाव, शाळा/कॉलेज आणि प्रकल्पाचा मुख्य उद्देश थोडक्यात सांगा.",
            hi: "अपना नाम, संस्थान और परियोजना का मुख्य उद्देश्य संक्षेप में बताएं।"
          },
          question: {
            en: "Which opening sentence is grammatically correct and impactful?",
            mr: "कोणते वाक्य व्याकरणदृष्ट्या अचूक आणि प्रभावी आहे?",
            hi: "कौन सा वाक्य व्याकरण की दृष्टि से सही और प्रभावशाली है?"
          },
          options: [
            {
              id: "e-opt-1",
              text: {
                en: "Good morning! Today I am presenting our offline learning project innovation.",
                mr: "Good morning! Today I am presenting our offline learning project innovation.",
                hi: "Good morning! Today I am presenting our offline learning project innovation."
              },
              isCorrect: true,
              explanation: {
                en: "Clear, polite, and confident!",
                mr: "स्पष्ट, नम्र आणि आत्मविश्वासपूर्ण!",
                hi: "स्पष्ट, विनम्र और आत्मविश्वास से परिपूर्ण!"
              }
            },
            {
              id: "e-opt-2",
              text: {
                en: "Myself student coming from Kopargaon college.",
                mr: "Myself student coming from Kopargaon college.",
                hi: "Myself student coming from Kopargaon college."
              },
              isCorrect: false,
              explanation: {
                en: "'Myself' is grammatically incorrect for introductions. Use 'My name is' or 'I am'.",
                mr: "परिचयासाठी 'Myself' ऐवजी 'My name is' वापरावे.",
                hi: "परिचय के लिए 'Myself' के स्थान पर 'My name is' का उपयोग करें।"
              }
            }
          ],
          xpReward: 25
        }
      ]
    }
  },

  // 5. UNDERGRAD TECH: PYTHON QUEST
  {
    id: "python-quest",
    worldId: "tech",
    subjectName: { en: "Programming", mr: "प्रोग्रामिंग", hi: "प्रोग्रामिंग" },
    title: {
      en: "Python Quest: Code Breaker",
      mr: "पायथन शोध: कोड ब्रेकर",
      hi: "पायथन खोज: कोड ब्रेकर"
    },
    subtitle: {
      en: "Learn Python syntax, loops, and debugging through simulated interactive terminal puzzles",
      mr: "पायथन प्रोग्रॅमिंग, लूप्स आणि डिबगिंग संवादात्मक कोड एडिटरद्वारे शिका",
      hi: "पायथन सिंटैक्स, लूप और डिबगिंग को इंटरैक्टिव कोड एडिटर से सीखें"
    },
    levelBadge: {
      en: "Undergraduate / Diploma",
      mr: "पदवीधर / डिप्लोमा",
      hi: "स्नातक / डिप्लोमा"
    },
    targetAudience: "Undergraduate",
    estimatedSizeMb: 5.4,
    xpReward: 300,
    difficulty: "Intermediate",
    description: {
      en: "Learn Python fundamentals through interactive coding puzzles and lightweight offline browser-executable code challenges.",
      mr: "संवादात्मक कोडिंग कोडी आणि ऑफलाइन ब्राउझर कोड आव्हानांद्वारे पायथन शिका.",
      hi: "इंटरैक्टिव कोडिंग पहेलियों और ऑफलाइन ब्राउज़र कोडिंग चुनौतियों से पायथन सीखें।"
    },
    icon: "Code2",
    gradient: "from-blue-700 to-indigo-600",
    isDownloaded: false,
    progressPercentage: 0,
    syllabus: [
      { id: "py1", title: { en: "1. Variables & Dynamic Types", mr: "१. व्हेरिएबल्स आणि डेटा प्रकार", hi: "1. वेरिएबल और डेटा प्रकार" }, durationMin: 8, completed: false },
      { id: "py2", title: { en: "2. Conditional Logic (if/elif/else)", mr: "२. अटी आणि निर्णय (if/else)", hi: "2. कंडीशनल लॉजिक (if/else)" }, durationMin: 10, completed: false },
      { id: "py3", title: { en: "3. For Loops & Accumulator Patterns", mr: "३. फॉर लूप्स आणि गणना", hi: "3. फॉर लूप और संचयी गणना" }, durationMin: 12, completed: false },
      { id: "py4", title: { en: "4. Debugging & Code Breaker Final Challenge", mr: "४. डिबगिंग आणि कोड ब्रेकर अंतिम आव्हान", hi: "4. डिबगिंग और कोड ब्रेकर अंतिम चुनौती" }, durationMin: 15, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: CODE BREAKER TERMINAL 💻",
        mr: "मोहीम: कोड ब्रेकर टर्मिनल 💻",
        hi: "मिशन: कोड ब्रेकर टर्मिनल 💻"
      },
      scenario: {
        en: "The Kopargaon weather sensor node stopped transmitting data due to a Python script bug. Inspect the code, fix the syntax bug in the loop condition, and restore sensor streaming.",
        mr: "कोपरगाव हवामान सेन्सर नोडमधील पायथन कोडमधील त्रुटीमुळे डेटा थांबला आहे. कोड दुरुस्त करून सेन्सर पुन्हा चालू करा.",
        hi: "कोपरगांव मौसम सेंसर नोड में एक पायथन बग के कारण डेटा आना बंद हो गया है। कोड सुधारकर सेंसर को पुनः सक्रिय करें।"
      },
      badgeReward: "Code Breaker",
      steps: [
        {
          id: "py-step-1",
          type: "code",
          title: {
            en: "Challenge: Fix the Sensor Calculation Loop",
            mr: "आव्हान: सेन्सर गणना लूप दुरुस्त करा",
            hi: "चुनौती: सेंसर गणना लूप ठीक करें"
          },
          description: {
            en: "The weather station records 5 temperature readings: [28, 31, 29, 30, 32]. Fix line 4 so it correctly sums the temperatures.",
            mr: "हवामान केंद्र ५ तापमानांची नोंद घेते: [28, 31, 29, 30, 32]. बेरीज अचूक करण्यासाठी ओळ ४ दुरुस्त करा.",
            hi: "मौसम स्टेशन 5 तापमान रिकॉर्ड करता है: [28, 31, 29, 30, 32]. तापमान का योग करने के लिए लाइन 4 को ठीक करें।"
          },
          interactiveData: {
            simType: "python_editor",
            initialCode: `# Kopargaon Sensor Aggregator\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average Temp: {average} C")`,
            expectedCodeSubstring: "total += temp",
            solutionCode: `# Fixed Sensor Script\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average Temp: {average} C")`
          },
          question: {
            en: "What is the resulting average temperature of the 5 sensor readings?",
            mr: "५ सेन्सर नोंदींचे सरासरी तापमान किती येईल?",
            hi: "5 सेंसर रीडिंग का परिणामी औसत तापमान क्या होगा?"
          },
          options: [
            {
              id: "py-opt-1",
              text: { en: "30.0 °C (Sum = 150, 150 / 5 = 30)", mr: "३०.० °C (एकूण = १५०, १५० / ५ = ३०)", hi: "30.0 °C (योग = 150, 150 / 5 = 30)" },
              isCorrect: true,
              explanation: {
                en: "Great job! Average calculation verified: 150 / 5 = 30.0 °C.",
                mr: "उत्कृष्ट! सरासरी गणना बरोबर: १५० / ५ = ३०.० °C.",
                hi: "बहुत अच्छे! औसत गणना सही: 150 / 5 = 30.0 °C।"
              }
            },
            {
              id: "py-opt-2",
              text: { en: "25.5 °C", mr: "२५.५ °C", hi: "25.5 °C" },
              isCorrect: false,
              explanation: {
                en: "Recalculate sum (28+31+29+30+32 = 150).",
                mr: "बेरीज पुन्हा तपासा (२८+३१+२९+३०+३२ = १५०).",
                hi: "योग दोबारा जांचें (28+31+29+30+32 = 150)।"
              }
            }
          ],
          xpReward: 50
        }
      ]
    }
  },

  // 6. UNDERGRAD TECH: CYBERSECURITY MISSION
  {
    id: "cybersecurity-mission",
    worldId: "tech",
    subjectName: { en: "Cybersecurity", mr: "सायबर सुरक्षा", hi: "साइबर सुरक्षा" },
    title: {
      en: "Cybersecurity Mission: Defend the Network",
      mr: "सायबर सुरक्षा मोहीम: नेटवर्क संरक्षण",
      hi: "साइबर सुरक्षा मिशन: नेटवर्क सुरक्षा"
    },
    subtitle: {
      en: "Simulate real security incident triage, detect phishing, and protect college portals",
      mr: "फिशिंग ओळखा, सायबर हल्ले रोखा आणि कॉलेज नेटवर्क सुरक्षित करा",
      hi: "फिशिंग पहचानें, साइबर हमलों को रोकें और कॉलेज नेटवर्क सुरक्षित करें"
    },
    levelBadge: {
      en: "Undergraduate / Digital Defense",
      mr: "पदवीधर / डिजिटल सुरक्षा",
      hi: "स्नातक / डिजिटल सुरक्षा"
    },
    targetAudience: "Undergraduate",
    estimatedSizeMb: 6.1,
    xpReward: 350,
    difficulty: "Intermediate",
    description: {
      en: "Learn cybersecurity defense principles through simulated security incidents, phishing email analysis, and password hygiene.",
      mr: "संवादात्मक सुरक्षा घटना विश्लेषण, फिशिंग ईमेल शोध आणि पासवर्ड सुरक्षिततेचे धडे.",
      hi: "सिम्युलेटेड सुरक्षा घटनाओं, फ़िशिंग ईमेल विश्लेषण और पासवर्ड सुरक्षा के नियम सीखें।"
    },
    icon: "ShieldAlert",
    gradient: "from-rose-600 to-red-500",
    isDownloaded: false,
    progressPercentage: 0,
    syllabus: [
      { id: "sec1", title: { en: "1. Recognizing Phishing Vectors & Suspicious URLs", mr: "१. बनावट लिंक्स आणि फिशिंग ईमेल ओळखणे", hi: "1. संदिग्ध लिंक और फ़िशिंग ईमेल पहचानना" }, durationMin: 8, completed: false },
      { id: "sec2", title: { en: "2. Password Entropy & Multi-Factor Auth (MFA)", mr: "२. मजबूत पासवर्ड आणि दुहेरी प्रमाणीकरण (MFA)", hi: "2. मजबूत पासवर्ड और टू-फैक्टर ऑथेंटिकेशन (MFA)" }, durationMin: 10, completed: false },
      { id: "sec3", title: { en: "3. Incident Triage: Defend the Student Server", mr: "३. कॉलेज सर्व्हरवरील सुरक्षा तपासणी", hi: "3. कॉलेज सर्वर पर सुरक्षा जांच" }, durationMin: 15, completed: false },
    ],
    interactiveMission: {
      title: {
        en: "MISSION: DEFEND THE NETWORK 🔐",
        mr: "मोहीम: नेटवर्कचे रक्षण करा 🔐",
        hi: "मिशन: नेटवर्क की रक्षा करें 🔐"
      },
      scenario: {
        en: "A simulated alert notifies that a student received an urgent email claiming 'Your College Scholarship is Blocked! Click here immediately to verify your bank PIN'. Analyze the incident.",
        mr: "कॉलेज नेटवर्कवर एक संशयास्पद ईमेल आला आहे: 'तुमची स्कॉलरशिप थांबवली आहे! बँक पिन टाकून लगेच व्हेरिफाय करा'. या घटनेचे विश्लेषण करा.",
        hi: "कॉलेज नेटवर्क पर एक संदिग्ध ईमेल आया है: 'आपकी छात्रवृत्ति अवरुद्ध है! बैंक पिन दर्ज कर तुरंत सत्यापित करें'। इस घटना का विश्लेषण करें।"
      },
      badgeReward: "Cyber Guardian",
      steps: [
        {
          id: "sec-step-1",
          type: "security",
          title: {
            en: "Stage 1: Phishing Email Inspection",
            mr: "टप्पा १: संशयास्पद ईमेल तपासणी",
            hi: "चरण 1: संदिग्ध ईमेल की जांच"
          },
          description: {
            en: "Sender: admin@univ-kopargaon-verify-scholarship.xyz | Subject: URGENT: Action Required in 30 mins!",
            mr: "प्रेषक: admin@univ-kopargaon-verify-scholarship.xyz | विषय: तात्काळ ३० मिनिटांत कारवाई करा!",
            hi: "प्रेषक: admin@univ-kopargaon-verify-scholarship.xyz | विषय: तत्काल 30 मिनट में कार्रवाई करें!"
          },
          question: {
            en: "What are the key red flags indicating this is a malicious phishing attempt?",
            mr: "हा ईमेल बनावट (फिशिंग) असल्याचे कोणते प्रमुख संकेत दर्शवतात?",
            hi: "यह ईमेल नकली (फ़िशिंग) होने के मुख्य संकेत क्या हैं?"
          },
          options: [
            {
              id: "sec-opt-1",
              text: {
                en: "Suspicious domain (.xyz), artificial urgency (30 mins), and requesting confidential bank PIN",
                mr: "अनोळखी डोमेन (.xyz), कृत्रिम घाई (३० मिनिटे) आणि गोपनीय बँक पिन मागणे",
                hi: "संदिग्ध डोमेन (.xyz), अनावश्यक जल्दबाजी (30 मिनट) और गोपनीय बैंक पिन मांगना"
              },
              isCorrect: true,
              explanation: {
                en: "Target neutralised! Official institutions never use random .xyz domains or demand bank PINs via email.",
                mr: "बरोबर! कोणतीही अधिकृत संस्था ईमेलद्वारे गोपनीय पिन मागत नाही.",
                hi: "बिल्कुल सही! कोई भी आधिकारिक संस्था ईमेल द्वारा बैंक पिन नहीं मांगती।"
              }
            },
            {
              id: "sec-opt-2",
              text: {
                en: "It looks legitimate because it has the word 'kopargaon' in the domain",
                mr: "डोमेनमध्ये 'kopargaon' शब्द असल्याने तो खरा वाटतो",
                hi: "डोमेन में 'kopargaon' शब्द होने से यह असली लगता है"
              },
              isCorrect: false,
              explanation: {
                en: "Attackers often spoof local institution names in deceptive subdomains.",
                mr: "हॅकर्स नेहमी लोकांची दिशाभूल करण्यासाठी स्थानिक नावांचा गैरवापर करतात.",
                hi: "हमलावर अक्सर भटकाने के लिए स्थानीय नामों का दुरुपयोग करते हैं।"
              }
            }
          ],
          xpReward: 45
        }
      ]
    }
  }
];

export const mockMissions: MissionItem[] = [
  {
    id: "m-daily-1",
    type: "daily",
    title: {
      en: "Daily Kickstart: Complete 1 Learning Challenge",
      mr: "दैनिक आरंभ: १ शिक्षण आव्हान पूर्ण करा",
      hi: "दैनिक शुरुआत: 1 शिक्षण चुनौती पूरी करें"
    },
    description: {
      en: "Solve any interactive checkpoint across Science, Math, or Tech worlds.",
      mr: "विज्ञान, गणित किंवा तंत्रज्ञान विषयातील कोणतेही १ आव्हान पूर्ण करा.",
      hi: "विज्ञान, गणित या तकनीकी संसार में से कोई भी 1 चुनौती पूरी करें।"
    },
    progress: 1,
    total: 1,
    xpReward: 30,
    isClaimed: false,
    icon: "Target"
  },
  {
    id: "m-daily-2",
    type: "daily",
    title: {
      en: "Data Saver Hero: Learn in Low Data Mode",
      mr: "डेटा सेव्हर हिरो: कमी डेटा मोडमध्ये शिका",
      hi: "डेटा सेवर हीरो: कम डेटा मोड में सीखें"
    },
    description: {
      en: "Spend at least 5 minutes studying with Low Data Mode active.",
      mr: "कमी डेटा मोड चालू ठेवून किमान ५ मिनिटे अभ्यास करा.",
      hi: "कम डेटा मोड सक्रिय रखकर कम से कम 5 मिनट पढ़ाई करें।"
    },
    progress: 5,
    total: 5,
    xpReward: 25,
    isClaimed: true,
    icon: "WifiOff"
  },
  {
    id: "m-weekly-1",
    type: "weekly",
    title: {
      en: "Weekly Master: Complete 3 Subject Missions",
      mr: "साप्ताहिक मास्टर: ३ विषय मोहिमा पूर्ण करा",
      hi: "साप्ताहिक मास्टर: 3 विषय मिशन पूरे करें"
    },
    description: {
      en: "Earn checkpoints in Physics, Chemistry, and Python.",
      mr: "भौतिकशास्त्र, रसायनशास्त्र आणि पायथनमध्ये प्रगती करा.",
      hi: "भौतिकी, रसायन विज्ञान और पायथन में चुनौतियां पूरी करें।"
    },
    progress: 2,
    total: 3,
    xpReward: 150,
    badgeReward: "Offline Champion",
    isClaimed: false,
    icon: "Award"
  },
  {
    id: "m-weekly-2",
    type: "weekly",
    title: {
      en: "Zero Data Streak: 5 Days of Offline Study",
      mr: "झिरो डेटा स्ट्रीक: ५ दिवस ऑफलाइन अभ्यास",
      hi: "जीरो डेटा स्ट्रीक: 5 दिन ऑफलाइन अध्ययन"
    },
    description: {
      en: "Complete downloaded lessons without consuming cellular bandwidth.",
      mr: "इंटरनेट डेटा न वापरता डाऊनलोड केलेले धडे पूर्ण करा.",
      hi: "मोबाइल डेटा खर्च किए बिना डाउनलोड किए गए पाठ पूरे करें।"
    },
    progress: 5,
    total: 5,
    xpReward: 200,
    isClaimed: false,
    icon: "Flame"
  },
  {
    id: "m-subj-1",
    type: "subject",
    title: {
      en: "Newton's Apprentice Challenge",
      mr: "न्यूटन शिष्य आव्हान",
      hi: "न्यूटन का शिष्य चुनौती"
    },
    description: {
      en: "Score 100% on all 3 Physics Quest interactive checkpoints.",
      mr: "भौतिकशास्त्राच्या सर्व ३ चेकपॉईंट्सवर १००% गुण मिळवा.",
      hi: "भौतिकी के सभी 3 चेकपॉइंट्स में 100% स्कोर प्राप्त करें।"
    },
    progress: 2,
    total: 3,
    xpReward: 120,
    isClaimed: false,
    icon: "Zap"
  }
];

export const mockBadges: BadgeItem[] = [
  {
    id: "b-science-explorer",
    badgeCode: "NIR-SCI-001",
    title: {
      en: "Science Explorer",
      mr: "विज्ञान संशोधक (Science Explorer)",
      hi: "विज्ञान खोजकर्ता (Science Explorer)"
    },
    description: {
      en: "Completed interactive Physics & Chemistry lab missions.",
      mr: "भौतिकशास्त्र व रसायनशास्त्राच्या संवादात्मक मोहिमा यशस्वीरित्या पूर्ण केल्या.",
      hi: "भौतिकी और रसायन विज्ञान की प्रयोगशाला मिशन सफलतापूर्वक पूरे किए।"
    },
    icon: "Telescope",
    category: "Science",
    isUnlocked: true,
    unlockedAt: "Today",
    rarity: "Rare",
    xpReward: 100,
  },
  {
    id: "b-cyber-guardian",
    badgeCode: "NIR-SEC-002",
    title: {
      en: "Cyber Guardian",
      mr: "सायबर रक्षक (Cyber Guardian)",
      hi: "साइबर रक्षक (Cyber Guardian)"
    },
    description: {
      en: "Identified phishing vectors and secured college network endpoints.",
      mr: "फिशिंग हल्ले ओळखले आणि कॉलेज नेटवर्क सुरक्षित केले.",
      hi: "फ़िशिंग हमलों की पहचान कर नेटवर्क को सुरक्षित किया।"
    },
    icon: "ShieldCheck",
    category: "Cybersecurity",
    isUnlocked: false,
    rarity: "Epic",
    xpReward: 150,
  },
  {
    id: "b-code-breaker",
    badgeCode: "NIR-COD-003",
    title: {
      en: "Code Breaker",
      mr: "कोड ब्रेकर (Code Breaker)",
      hi: "कोड ब्रेकर (Code Breaker)"
    },
    description: {
      en: "Debugged and executed Python sensor scripts offline.",
      mr: "पायथन सेन्सर कोड यशस्वीरित्या डिबग आणि रन केला.",
      hi: "पायथन सेंसर कोड को सफलतापूर्वक डिबग और रन किया।"
    },
    icon: "Terminal",
    category: "Tech",
    isUnlocked: false,
    rarity: "Epic",
    xpReward: 120,
  },
  {
    id: "b-7day-streak",
    badgeCode: "NIR-STR-007",
    title: {
      en: "7-Day Streak",
      mr: "७ दिवसांची मालिका (7-Day Streak)",
      hi: "7 दिनों की निरंतरता (7-Day Streak)"
    },
    description: {
      en: "Studied continuously for 6+ consecutive days.",
      mr: "सलग ६+ दिवस न चुकता अभ्यास केला.",
      hi: "लगातार 6+ दिनों तक निरंतर अध्ययन किया।"
    },
    icon: "Flame",
    category: "Habit",
    isUnlocked: true,
    unlockedAt: "Today",
    rarity: "Common",
    xpReward: 75,
  },
  {
    id: "b-offline-champion",
    badgeCode: "NIR-OFF-042",
    title: {
      en: "Offline Champion",
      mr: "ऑफलाइन चॅम्पियन (Offline Champion)",
      hi: "ऑफलाइन चैंपियन (Offline Champion)"
    },
    description: {
      en: "Completed 40+ learning activities without internet access.",
      mr: "इंटरनेट नसताना ४०+ शैक्षणिक उपक्रम पूर्ण केले.",
      hi: "इंटरनेट के बिना 40+ शिक्षण गतिविधियां पूरी कीं।"
    },
    icon: "WifiOff",
    category: "Offline",
    isUnlocked: true,
    unlockedAt: "3 days ago",
    rarity: "Legendary",
    xpReward: 150,
  },
  {
    id: "b-low-data-learner",
    badgeCode: "NIR-DAT-300",
    title: {
      en: "Low Data Learner",
      mr: "डेटा सेव्हर विद्वान (Low Data Learner)",
      hi: "डेटा सेवर विद्वान (Low Data Learner)"
    },
    description: {
      en: "Saved more than 300 MB of mobile cellular data while studying.",
      mr: "अभ्यास करताना ३०० MB पेक्षा जास्त mobile डेटा वाचवला.",
      hi: "पढ़ाई के दौरान 300 MB से अधिक मोबाइल डेटा बचाया।"
    },
    icon: "Zap",
    category: "Efficiency",
    isUnlocked: true,
    unlockedAt: "This week",
    rarity: "Rare",
    xpReward: 100,
  }
];
