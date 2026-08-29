import type { Language } from '../types';

export interface WrittenModuleStep {
  id: string;
  moduleNumber: number;
  moduleLabel: { en: string; mr: string; hi: string };
  title: { en: string; mr: string; hi: string };
  conceptText: { en: string; mr: string; hi: string };
  keyPoints?: { en: string[]; mr: string[]; hi: string[] };
  formula?: string;
  exampleText: { en: string; mr: string; hi: string };
  hasQuestion: boolean;
  question?: { en: string; mr: string; hi: string };
  options?: Array<{
    id: string;
    text: { en: string; mr: string; hi: string };
    isCorrect: boolean;
    explanation: { en: string; mr: string; hi: string };
  }>;
  xpReward: number;
}

export interface DetailedLessonData {
  packId: string;
  badgeName: string;
  totalXp: number;
  modules: WrittenModuleStep[];
}

export const detailedLessons: Record<string, DetailedLessonData> = {
  // ==========================================
  // 1. PHYSICS: LAWS OF MOTION
  // ==========================================
  "physics-quest": {
    packId: "physics-quest",
    badgeName: "Newton Explorer",
    totalXp: 250,
    modules: [
      {
        id: "phy-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — Introduction", mr: "मॉड्यूल १ — ओळख", hi: "मॉड्यूल 1 — परिचय" },
        title: { en: "Introduction to Forces & Motion", mr: "बल आणि गतीची ओळख", hi: "बल और गति का परिचय" },
        conceptText: {
          en: "Force is a push or pull that can change the motion, direction, or shape of an object. Sir Isaac Newton formulated three fundamental laws of motion that describe the relationship between the forces acting on a body and its motion through space.",
          mr: "बल म्हणजे असा धक्का किंवा ओढ ज्यामुळे वस्तूची गती, दिशा किंवा आकार बदलू शकतो. सर आयझॅक न्यूटन यांनी वस्तूवर कार्य करणारे बल आणि तिची गती यामधील संबंध स्पष्ट करणारे तीन मूलभूत नियम मांडले.",
          hi: "बल वह धक्का या खिंचाव है जो किसी वस्तु की गति, दिशा या आकार को बदल सकता है। सर आइजैक न्यूटन ने गति के तीन मौलिक नियम दिए जो वस्तु पर लगने वाले बल और उसकी गति के संबंध को समझाते हैं।"
        },
        keyPoints: {
          en: [
            "A force can cause a stationary object to move.",
            "A force can change the speed or direction of a moving object.",
            "Forces are measured in Newtons (N)."
          ],
          mr: [
            "बलामुळे स्थिर वस्तू गतिमान होऊ शकते.",
            "बलामुळे गतिमान वस्तूची गती किंवा दिशा बदलू शकते.",
            "बलाचे एकक न्यूटन (N) आहे."
          ],
          hi: [
            "बल किसी स्थिर वस्तु को गतिशील कर सकता है।",
            "बल गतिशील वस्तु की गति या दिशा बदल सकता है।",
            "बल का मात्रक न्यूटन (N) है।"
          ]
        },
        exampleText: {
          en: "Example: Pushing a textbook across a study table or kicking a football across the field.",
          mr: "उदाहरण: टेबलावर ठेवलेले पुस्तक पुढे ढकलणे किंवा फुटबॉलला लाथ मारणे.",
          hi: "उदाहरण: मेज पर रखी किताब को आगे खिसकाना या फुटबॉल को किक मारना।"
        },
        hasQuestion: true,
        question: {
          en: "What is the standard scientific unit used to measure force?",
          mr: "बल मोजण्यासाठी कोणते शास्त्रीय एकक वापरले जाते?",
          hi: "बल मापने के लिए किस वैज्ञानिक मात्रक का उपयोग किया जाता है?"
        },
        options: [
          { id: "p1-a", text: { en: "Newton (N)", mr: "न्यूटन (N)", hi: "न्यूटन (N)" }, isCorrect: true, explanation: { en: "Correct! Force is measured in Newtons (N), named after Sir Isaac Newton.", mr: "अगदी बरोबर! बलाचे एकक न्यूटन (N) आहे.", hi: "बिल्कुल सही! बल का मात्रक न्यूटन (N) है।" } },
          { id: "p1-b", text: { en: "Kilogram (kg)", mr: "किलोग्रॅम (kg)", hi: "किलोग्राम (kg)" }, isCorrect: false, explanation: { en: "Kilogram is the unit of mass, not force.", mr: "किलोग्रॅम हे वस्तुमानाचे एकक आहे.", hi: "किलोग्राम द्रव्यमान का मात्रक है, बल का नहीं।" } },
          { id: "p1-c", text: { en: "Meter per second (m/s)", mr: "मीटर प्रति सेकंद (m/s)", hi: "मीटर प्रति सेकंड (m/s)" }, isCorrect: false, explanation: { en: "m/s is the unit of speed or velocity.", mr: "m/s हे वेगाचे एकक आहे.", hi: "m/s चाल या वेग का मात्रक है।" } }
        ],
        xpReward: 20
      },
      {
        id: "phy-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Newton's First Law", mr: "मॉड्यूल २ — न्यूटनचा पहिला नियम", hi: "मॉड्यूल 2 — न्यूटन का प्रथम नियम" },
        title: { en: "Newton's First Law (Law of Inertia)", mr: "न्यूटनचा पहिला गतीचा नियम (जडत्व)", hi: "न्यूटन का गति का प्रथम नियम (जड़त्व)" },
        conceptText: {
          en: "An object at rest remains at rest, and an object in motion continues moving at a constant velocity, unless acted upon by an unbalanced external force. This natural tendency of objects to resist any change in their state of motion is called Inertia.",
          mr: "जोपर्यंत एखाद्या वस्तूवर कोणतेही बाह्य असंतुलित बल कार्य करत नाही, तोपर्यंत ती वस्तू स्थिर अवस्थेत किंवा सरळ रेषेतील एकसमान गतीत कायम राहते. या गुणधर्माला जडत्व (Inertia) म्हणतात.",
          hi: "प्रत्येक वस्तु अपनी विरामावस्था या सरल रेखा में एकसमान गति की अवस्था में तब तक बनी रहती है, जब तक कि उस पर कोई बाहरी असंतुलित बल न लगाया जाए। इसे जड़त्व (Inertia) कहते हैं।"
        },
        keyPoints: {
          en: [
            "Inertia is directly proportional to mass (heavier objects have greater inertia).",
            "Friction and air resistance are common external forces on Earth.",
            "In deep space without friction, a moving satellite glides forever."
          ],
          mr: [
            "जडत्व हे वस्तूच्या वस्तुमानावर अवलंबून असते (जास्त वजन = जास्त जडत्व).",
            "घर्षण आणि हवेचा रोध ही बाह्य बले गती थांबवतात.",
            "अंतराळात घर्षण नसल्याने उपग्रह अखंड पुढे जात राहतो."
          ],
          hi: [
            "जड़त्व द्रव्यमान पर निर्भर करता है (अधिक द्रव्यमान = अधिक जड़त्व)।",
            "घर्षण और वायु प्रतिरोध गति को रोकने वाले बाहरी बल हैं।",
            "अंतरिक्ष में बिना घर्षण के वस्तुएं निरंतर चलती रहती हैं।"
          ]
        },
        exampleText: {
          en: "Example: When a school bus suddenly stops, passengers lean forward because their bodies want to keep moving due to inertia.",
          mr: "उदाहरण: धावणाऱ्या बसने अचानक ब्रेक लावल्यास प्रवासी पुढे झुकतात कारण त्यांचे शरीर जडत्वामुळे पुढे जात राहते.",
          hi: "उदाहरण: चलती बस के अचानक रुकने पर यात्री आगे की ओर झुक जाते हैं क्योंकि जड़त्व के कारण शरीर गति में रहना चाहता है।"
        },
        hasQuestion: true,
        question: {
          en: "What happens to a moving object when there is NO net external force acting on it?",
          mr: "जेव्हा एखाद्या गतिमान वस्तूवर कोणतेही बाह्य बल लागत नाही, तेव्हा काय घडते?",
          hi: "जब किसी गतिशील वस्तु पर कोई बाहरी बल कार्य नहीं करता, तो क्या होता है?"
        },
        options: [
          { id: "p2-a", text: { en: "It automatically slows down and stops", mr: "ती आपोआप हळू होऊन थांबते", hi: "वह स्वतः धीमी होकर रुक जाती है" }, isCorrect: false, explanation: { en: "Objects only slow down if friction or another force acts.", mr: "घर्षण किंवा बाह्य बल असेल तरच वस्तू थांबते.", hi: "घर्षण या अन्य बल होने पर ही वस्तु रुकती है।" } },
          { id: "p2-b", text: { en: "It continues moving at constant velocity in a straight line", mr: "ती सरळ रेषेत एकाच वेगाने पुढे जात राहते", hi: "वह एकसमान वेग से सीधी रेखा में चलती रहती है" }, isCorrect: true, explanation: { en: "Correct! According to Newton's First Law, without net force, velocity remains constant.", mr: "अगदी बरोबर! बाह्य बल नसल्यास वस्तूचा वेग कायम राहतो.", hi: "बिल्कुल सही! न्यूटन के प्रथम नियम के अनुसार बिना बल के वेग स्थिर रहता है।" } },
          { id: "p2-c", text: { en: "It instantly accelerates to maximum speed", mr: "ती वेगाने धावू लागते", hi: "वह तुरंत तेज गति पकड़ लेती है" }, isCorrect: false, explanation: { en: "Acceleration requires an external force.", mr: "प्रवेगासाठी बाह्य बलाची आवश्यकता असते.", hi: "त्वरण के लिए बल की आवश्यकता होती है।" } }
        ],
        xpReward: 30
      },
      {
        id: "phy-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Newton's Second Law", mr: "मॉड्यूल ३ — न्यूटनचा दुसरा नियम", hi: "मॉड्यूल 3 — न्यूटन का द्वितीय नियम" },
        title: { en: "Newton's Second Law (F = m × a)", mr: "न्यूटनचा दुसरा गतीचा नियम (F = m × a)", hi: "न्यूटन का गति का द्वितीय नियम (F = m × a)" },
        formula: "F = m × a  (Force = mass × acceleration)",
        conceptText: {
          en: "The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. In simple terms: Greater force produces greater acceleration, while greater mass requires more force to accelerate.",
          mr: "वस्तूवर प्रयुक्त केलेले बल हे वस्तूचे वस्तुमान आणि तिच्यातील प्रवेग यांच्या गुणाकाराएवढे असते (F = m × a). सोप्या भाषेत: जास्त बल म्हणजे जास्त प्रवेग, आणि जड वस्तू हलवण्यासाठी जास्त बल लागते.",
          hi: "किसी वस्तु पर लगाया गया बल उसके द्रव्यमान और उत्पन्न त्वरण के गुणनफल के बराबर होता है (F = m × a)। सरल शब्दों में: अधिक बल से अधिक त्वरण मिलता है, और भारी वस्तु को त्वरित करने के लिए अधिक बल चाहिए।"
        },
        keyPoints: {
          en: [
            "F = Net Force (Newtons, N)",
            "m = Mass of object (kilograms, kg)",
            "a = Acceleration (meters per second squared, m/s²)"
          ],
          mr: [
            "F = प्रयुक्त बल (न्यूटन, N)",
            "m = वस्तूचे वस्तुमान (किलोग्रॅम, kg)",
            "a = प्रवेग (m/s²)"
          ],
          hi: [
            "F = कुल बल (न्यूटन, N)",
            "m = वस्तु का द्रव्यमान (किलोग्राम, kg)",
            "a = त्वरण (m/s²)"
          ]
        },
        exampleText: {
          en: "Example: Pushing an empty shopping cart is easy (small mass). Pushing a cart loaded with 50 kg of grain requires significantly more force to achieve the same speed.",
          mr: "उदाहरण: रिकामी गाडी ढकलणे सोपे असते (कमी वस्तुमान). पण ५० किलो धान्याने भरलेली गाडी ढकलण्यासाठी खूप जास्त बल लागते.",
          hi: "उदाहरण: खाली ठेला धकेलना आसान है (कम द्रव्यमान)। लेकिन 50 किग्रा अनाज से भरा ठेला उसी गति से चलाने के लिए अधिक बल लगाना पड़ता है।"
        },
        hasQuestion: true,
        question: {
          en: "If a 10 kg box is pushed with a net force of 50 N, what is its acceleration?",
          mr: "जर १० किलोच्या खोक्यावर ५० न्यूटन (N) बल लावले, तर त्याचा प्रवेग (acceleration) किती होईल? (F = m × a)",
          hi: "यदि 10 किग्रा के बक्से पर 50 न्यूटन का बल लगाया जाए, तो उसका त्वरण क्या होगा? (सूत्र: F = m × a)"
        },
        options: [
          { id: "p3-a", text: { en: "5 m/s² (a = 50 / 10)", mr: "५ m/s² (a = ५० / १०)", hi: "5 m/s² (a = 50 / 10)" }, isCorrect: true, explanation: { en: "Correct! a = F / m = 50 N / 10 kg = 5 m/s².", mr: "अगदी बरोबर! a = ५० / १० = ५ m/s² प्रवेग निर्माण होईल.", hi: "बिल्कुल सही! a = 50 / 10 = 5 m/s² त्वरण होगा।" } },
          { id: "p3-b", text: { en: "500 m/s²", mr: "५०० m/s²", hi: "500 m/s²" }, isCorrect: false, explanation: { en: "Do not multiply mass and force; divide force by mass.", mr: "गुणाकार ऐवजी भागाकार करा: a = F / m.", hi: "गुणा नहीं, भाग करें: a = F / m." } },
          { id: "p3-c", text: { en: "0.2 m/s²", mr: "०.२ m/s²", hi: "0.2 m/s²" }, isCorrect: false, explanation: { en: "Formula is a = F / m = 50 / 10 = 5.", mr: "सूत्र a = F / m = ५० / १० = ५ आहे.", hi: "सूत्र a = F / m = 50 / 10 = 5 है।" } }
        ],
        xpReward: 40
      },
      {
        id: "phy-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Newton's Third Law", mr: "मॉड्यूल ४ — न्यूटनचा तिसरा नियम", hi: "मॉड्यूल 4 — न्यूटन का तृतीय नियम" },
        title: { en: "Newton's Third Law (Action & Reaction)", mr: "न्यूटनचा तिसरा गतीचा नियम (क्रिया आणि प्रतिक्रिया)", hi: "न्यूटन का गति का तृतीय नियम (क्रिया और प्रतिक्रिया)" },
        conceptText: {
          en: "For every action force, there is an equal and opposite reaction force. Forces always occur in matched pairs. When body A exerts a force on body B, body B simultaneously exerts an equal magnitude force in the opposite direction on body A.",
          mr: "प्रत्येक क्रिया बलास नेहमी समान परिमाणाचे आणि विरुद्ध दिशेने असणारे प्रतिक्रिया बल अस्तित्वात असते. निसर्गात बले नेहमी जोडीने कार्य करतात.",
          hi: "प्रत्येक क्रिया के बराबर और विपरीत दिशा में प्रतिक्रिया होती है। बल सदैव युग्म (जोड़े) में कार्य करते हैं। जब वस्तु A वस्तु B पर बल लगाती है, तो वस्तु B भी वस्तु A पर समान और विपरीत बल लगाती है।"
        },
        keyPoints: {
          en: [
            "Action and reaction forces act on TWO DIFFERENT objects (they do not cancel each other).",
            "Rockets fly by pushing exhaust gas downward, which pushes the rocket upward.",
            "Swimmers push water backward to propel themselves forward."
          ],
          mr: [
            "क्रिया आणि प्रतिक्रिया बले वेगवेगळ्या वस्तूंवर कार्य करतात.",
            "रॉकेट खाली वायू सोडते, ज्यामुळे रॉकेट वर ढकलले जाते.",
            "पोहताना हात पाण्याला मागे ढकलतात, ज्यामुळे शरीर पुढे जाते."
          ],
          hi: [
            "क्रिया और प्रतिक्रिया बल दो अलग-अलग वस्तुओं पर कार्य करते हैं।",
            "रॉकेट गैसों को नीचे धकेलता है, जिससे रॉकेट ऊपर उठता है।",
            "तैराक पानी को पीछे धकेलता है, जिससे उसका शरीर आगे बढ़ता है।"
          ]
        },
        exampleText: {
          en: "Example: Jumping off a small boat into the water — as you push forward, the boat moves backward.",
          mr: "उदाहरण: छोट्या नावेतून काठावर उडी मारताना शरीर पुढे जाते आणि नाव मागे ढकलली जाते.",
          hi: "उदाहरण: नाव से किनारे पर कूदते समय आप आगे बढ़ते हैं और नाव पीछे की ओर हटती है।"
        },
        hasQuestion: true,
        question: {
          en: "When a space rocket launches, how does it move upward into the sky?",
          mr: "अंतराळात रॉकेट सोडताना ते आकाशात वर कसे झेपावते?",
          hi: "अंतरिक्ष रॉकेट लॉन्च होते समय आकाश में ऊपर की ओर कैसे बढ़ता है?"
        },
        options: [
          { id: "p4-a", text: { en: "The hot gas pushed downward exerts an equal upward reactive force on the rocket", mr: "खाली सोडलेला वायू रॉकेटवर तितकेच वर ढकलणारे प्रतिक्रिया बल लावतो", hi: "नीचे छोड़ी गई गर्म गैस रॉकेट पर समान ऊपर की ओर प्रतिक्रिया बल लगाती है" }, isCorrect: true, explanation: { en: "Correct! Action = gas expelled downward, Reaction = rocket pushed upward.", mr: "अगदी बरोबर! क्रिया = वायू खाली सोडणे, प्रतिक्रिया = रॉकेट वर जाणे.", hi: "बिल्कुल सही! क्रिया = गैस नीचे जाना, प्रतिक्रिया = रॉकेट ऊपर उठना।" } },
          { id: "p4-b", text: { en: "The rocket pushes against atmospheric air like an airplane", mr: "रॉकेट हवेला धक्का देऊन वर जाते", hi: "रॉकेट हवा को धक्का देकर ऊपर जाता है" }, isCorrect: false, explanation: { en: "Rockets work even in the vacuum of space without air!", mr: "रॉकेट हवेविना अंतराळातही कार्य करते.", hi: "रॉकेट बिना हवा के अंतरिक्ष में भी कार्य करता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "phy-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Challenge", mr: "मॉड्यूल ५ — व्यावहारिक आव्हान", hi: "मॉड्यूल 5 — व्यावहारिक चुनौती" },
        title: { en: "🚲 The Bicycle & Hill Challenge", mr: "🚲 सायकल आणि टेकडी आव्हान", hi: "🚲 साइकिल और पहाड़ी चुनौती" },
        conceptText: {
          en: "Apply all three Newton's Laws together! When riding a bicycle up an incline in rural Kopargaon, gravity, rolling friction, and pedal force all interact simultaneously.",
          mr: "न्यूटनचे तिन्ही नियम एकत्र लागू करा! सायकल चालवताना गुरुत्वाकर्षण, घर्षण आणि पायाचे बल एकत्र कार्य करतात.",
          hi: "न्यूटन के तीनों नियमों को एक साथ लागू करें! साइकिल चलाते समय गुरुत्वाकर्षण, घर्षण और पैडल का बल एक साथ कार्य करते हैं।"
        },
        exampleText: {
          en: "Scenario: You are riding a bicycle at 10 km/h on a flat road and then begin climbing a steep slope. To maintain your speed, you must pedal with greater force.",
          mr: "परिस्थिती: तुम्ही सपाट रस्त्यावर १० किमी/तास वेगाने सायकल चालवत आहात आणि अचानक चढण सुरू होते. वेग कायम ठेवण्यासाठी तुम्हाला जास्त जोर लावावा लागतो.",
          hi: "परिदृश्य: आप सपाट सड़क पर 10 किमी/घंटा की गति से साइकिल चला रहे हैं और चढ़ाई शुरू होती है। गति बनाए रखने के लिए आपको अधिक जोर से पैडल मारना पड़ता है।"
        },
        hasQuestion: true,
        question: {
          en: "Why must you push the bicycle pedals harder when climbing up a slope to maintain the same speed?",
          mr: "चढणीवर सायकलचा वेग कायम ठेवण्यासाठी पायडलवर जास्त जोर का लावावा लागतो?",
          hi: "चढ़ाई पर साइकिल की गति बनाए रखने के लिए पैडल पर अधिक बल क्यों लगाना पड़ता है?"
        },
        options: [
          { id: "p5-a", text: { en: "You must overcome the downward component of gravity and friction (Newton's 2nd Law F = ma)", mr: "गुरुत्वाकर्षणाचा खाली ओढणारा घटक आणि घर्षण जिंकण्यासाठी अधिक बल हवे (F = ma)", hi: "गुरुत्वाकर्षण के नीचे की ओर लगने वाले बल और घर्षण को संतुलित करने के लिए अधिक बल चाहिए (F = ma)" }, isCorrect: true, explanation: { en: "Outstanding! Downward gravitational force resists forward motion on slopes, requiring higher pedal force to maintain acceleration.", mr: "उत्कृष्ट! चढणीवर गुरुत्वाकर्षण मागे ओढते, त्यामुळे गती टिकवण्यासाठी जास्त बल लागते.", hi: "बहुत बढ़िया! चढ़ाई पर गुरुत्वाकर्षण का विरोध करने के लिए अधिक बल आवश्यक होता है।" } },
          { id: "p5-b", text: { en: "The bicycle mass mysteriously increases on hills", mr: "टेकडीवर सायकलचे वजन वाढते", hi: "पहाड़ी पर साइकिल का द्रव्यमान बढ़ जाता है" }, isCorrect: false, explanation: { en: "Mass remains constant; the directional force of gravity changes.", mr: "वस्तुमान बदलत नाही, फक्त गुरुत्वाकर्षण बलाचा रोध वाढतो.", hi: "द्रव्यमान स्थिर रहता है, गुरुत्वाकर्षण का प्रभाव बदलता है।" } },
          { id: "p5-c", text: { en: "Newton's laws stop working on inclined surfaces", mr: "चढणीवर नियम लागू पडत नाहीत", hi: "चढ़ाई पर न्यूटन के नियम काम नहीं करते" }, isCorrect: false, explanation: { en: "Newton's laws apply universally across all surfaces and space.", mr: "न्यूटनचे नियम सर्वत्र लागू पडतात.", hi: "न्यूटन के नियम सार्वभौमिक हैं।" } }
        ],
        xpReward: 100
      }
    ]
  },

  // ==========================================
  // 2. CHEMISTRY: PERIODIC TABLE
  // ==========================================
  "chemistry-lab": {
    packId: "chemistry-lab",
    badgeName: "Science Explorer",
    totalXp: 220,
    modules: [
      {
        id: "ch-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — Introduction to Elements", mr: "मॉड्यूल १ — मूलद्रव्यांची ओळख", hi: "मॉड्यूल 1 — तत्वों का परिचय" },
        title: { en: "What is an Element?", mr: "मूलद्रव्य म्हणजे काय?", hi: "तत्व क्या है?" },
        conceptText: {
          en: "An element is a pure substance consisting entirely of atoms that all have the same number of protons in their atomic nuclei. There are 118 confirmed elements organized in the Periodic Table.",
          mr: "मूलद्रव्य हा एकाच प्रकारच्या अणूंपासून बनलेला शुद्ध पदार्थ असतो. आधुनिक आवर्त सारणीमध्ये ११८ ज्ञात मूलद्रव्ये मांडलेली आहेत.",
          hi: "तत्व एक शुद्ध पदार्थ है जिसके सभी परमाणुओं में प्रोटॉनों की संख्या समान होती है। आधुनिक आवर्त सारणी में 118 ज्ञात तत्व व्यवस्थित हैं।"
        },
        exampleText: { en: "Example: Pure Gold (Au), Oxygen gas (O2), and Iron (Fe).", mr: "उदाहरण: शुद्ध सोने (Au), ऑक्सिजन वायू (O2), आणि लोखंड (Fe).", hi: "उदाहरण: शुद्ध सोना (Au), ऑक्सीजन गैस (O2), और लोहा (Fe)।" },
        hasQuestion: true,
        question: {
          en: "What is the fundamental building block of an element?",
          mr: "मूलद्रव्याचा सर्वात लहान मूलभूत घटक कोणता?",
          hi: "किसी तत्व की मूलभूत संरचनात्मक इकाई क्या है?"
        },
        options: [
          { id: "c1-a", text: { en: "Atom", mr: "अणू (Atom)", hi: "परमाणु (Atom)" }, isCorrect: true, explanation: { en: "Correct! Atoms are the basic units of chemical elements.", mr: "बरोबर! अणू हा मूलद्रव्याचा मूलभूत घटक आहे.", hi: "सही! परमाणु तत्वों की मूल इकाई हैं।" } },
          { id: "c1-b", text: { en: "Mixture", mr: "मिश्रण", hi: "मिश्रण" }, isCorrect: false, explanation: { en: "A mixture contains multiple distinct substances.", mr: "मिश्रणात अनेक पदार्थ एकत्र असतात.", hi: "मिश्रण में कई पदार्थ होते हैं।" } }
        ],
        xpReward: 20
      },
      {
        id: "ch-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Atomic Number", mr: "मॉड्यूल २ — अणुक्रमांक", hi: "मॉड्यूल 2 — परमाणु क्रमांक" },
        title: { en: "Atomic Number & Protons (Z)", mr: "अणुक्रमांक आणि प्रोटॉन्स", hi: "परमाणु क्रमांक और प्रोटॉन" },
        conceptText: {
          en: "The Atomic Number (symbol Z) of an element is the total number of protons found in the nucleus of every atom of that element. It determines the unique identity of the element.",
          mr: "अणुक्रमांक (Z) म्हणजे अणूच्या केंद्रकातील प्रोटॉन्सची एकूण संख्या. यामुळे प्रत्येक मूलद्रव्याची वेगळी ओळख निश्चित होते.",
          hi: "किसी तत्व का परमाणु क्रमांक (Z) उसके नाभिक में उपस्थित प्रोटॉनों की कुल संख्या होती है। यह तत्व की पहचान निर्धारित करता है।"
        },
        exampleText: { en: "Example: Hydrogen has Z=1 (1 proton), Carbon has Z=6 (6 protons), Sodium has Z=11.", mr: "उदाहरण: हायड्रोजन Z=१, कार्बन Z=६, सोडियम Z=११.", hi: "उदाहरण: हाइड्रोजन Z=1, कार्बन Z=6, सोडियम Z=11।" },
        hasQuestion: true,
        question: {
          en: "If an atom has 6 protons in its nucleus, which element is it?",
          mr: "एका अणूच्या केंद्रकात ६ प्रोटॉन्स असल्यास ते कोणते मूलद्रव्य आहे?",
          hi: "यदि किसी परमाणु के नाभिक में 6 प्रोटॉन हैं, तो वह कौन सा तत्व है?"
        },
        options: [
          { id: "c2-a", text: { en: "Carbon (C)", mr: "कार्बन (C)", hi: "कार्बन (C)" }, isCorrect: true, explanation: { en: "Correct! Carbon always has Atomic Number Z = 6.", mr: "बरोबर! कार्बनचा अणुक्रमांक ६ आहे.", hi: "सही! कार्बन का परमाणु क्रमांक 6 होता है।" } },
          { id: "c2-b", text: { en: "Nitrogen (N)", mr: "नायट्रोजन (N)", hi: "नाइट्रोजन (N)" }, isCorrect: false, explanation: { en: "Nitrogen has 7 protons (Z=7).", mr: "नायट्रोजनचा अणुक्रमांक ७ आहे.", hi: "नाइट्रोजन का परमाणु क्रमांक 7 है।" } }
        ],
        xpReward: 30
      },
      {
        id: "ch-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Periodic Table Groups", mr: "मॉड्यूल ३ — आवर्त सारणीतील गट", hi: "मॉड्यूल 3 — आवर्त सारणी के समूह" },
        title: { en: "Columns & Chemical Families", mr: "उभे स्तंभ आणि रासायनिक कुटुंबे", hi: "स्तंभ और रासायनिक परिवार" },
        conceptText: {
          en: "Vertical columns in the Periodic Table are called Groups. Elements in the same group have the same number of valence electrons and share similar chemical reactivities.",
          mr: "आवर्त सारणीतील उभ्या स्तंभांना गट (Groups) म्हणतात. एकाच गटातील मूलद्रव्यांचे रासायनिक गुणधर्म समान असतात.",
          hi: "आवर्त सारणी के ऊर्ध्वाधर स्तंभों को समूह (Group) कहते हैं। एक ही समूह के तत्वों के रासायनिक गुण समान होते हैं।"
        },
        exampleText: { en: "Group 1 = Alkali Metals (highly reactive). Group 18 = Noble Gases (inert & stable).", mr: "गट १ = अल्कली धातू (अति-क्रियाशील). गट १८ = निष्क्रिय वायू (स्थिर).", hi: "समूह 1 = क्षार धातुएं (अत्यधिक क्रियाशील)। समूह 18 = अक्रिय गैसें।" },
        hasQuestion: true,
        question: {
          en: "Why do Helium, Neon, and Argon belong to the Noble Gases (Group 18)?",
          mr: "हेलियम, निऑन आणि अरगॉन निष्क्रिय वायूंच्या (गट १८) गटात का मोडतात?",
          hi: "हीलियम, नियॉन और आर्गन अक्रिय गैसों (समूह 18) में क्यों आते हैं?"
        },
        options: [
          { id: "c3-a", text: { en: "They have complete outer electron shells and rarely react", mr: "त्यांच्या बाह्य कक्षा पूर्ण भरलेल्या असून ते सहसा अभिक्रिया करत नाहीत", hi: "उनके बाहरी कोश पूर्ण होते हैं और वे रासायनिक रूप से स्थिर होते हैं" }, isCorrect: true, explanation: { en: "Spot on! Complete electron shells grant great chemical stability.", mr: "उत्कृष्ट! बाह्य कक्षा पूर्ण असल्याने ते स्थिर असतात.", hi: "शाबाश! पूर्ण इलेक्ट्रॉन कोश के कारण वे स्थिर होते हैं।" } },
          { id: "c3-b", text: { en: "They explode upon contact with air", mr: "ते हवेच्या संपर्कात येताच फुटतात", hi: "वे हवा के संपर्क में आते ही फट जाते हैं" }, isCorrect: false, explanation: { en: "Noble gases are inert and non-reactive.", mr: "निष्क्रिय वायू शांत आणि स्थिर असतात.", hi: "अक्रिय गैसें रासायनिक रूप से शांत होती हैं।" } }
        ],
        xpReward: 40
      },
      {
        id: "ch-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Alkali Metals & Storage", mr: "मॉड्यूल ४ — अल्कली धातू आणि साठवणूक", hi: "मॉड्यूल 4 — क्षार धातुएं और भंडारण" },
        title: { en: "Reactivity of Group 1 (Sodium & Potassium)", mr: "गट १ मधील सोडियम व पोटॅशियमची क्रियाशीलता", hi: "समूह 1 के सोडियम और पोटेशियम की क्रियाशीलता" },
        conceptText: {
          en: "Group 1 alkali metals like Sodium (Na) and Potassium (K) have a single valence electron that they readily lose. They react vigorously with water and moisture to produce hydrogen gas and alkaline hydroxides.",
          mr: "सोडियम (Na) आणि पोटॅशियम (K) हवेतील आर्द्रता आणि पाण्याशी तीव्र अभिक्रिया करतात. त्यामुळे त्यांना रॉकेलमध्ये सुरक्षित ठेवले जाते.",
          hi: "सोडियम (Na) और पोटेशियम (K) पानी और हवा की नमी से तीव्र अभिक्रिया करते हैं। इसलिए इन्हें मिट्टी के तेल में रखा जाता है।"
        },
        exampleText: { en: "Reaction: 2Na + 2H2O → 2NaOH + H2 (Hydrogen gas evolved).", mr: "अभिक्रिया: 2Na + 2H2O → 2NaOH + H2 (हायड्रोजन वायू बाहेर पडतो).", hi: "अभिक्रिया: 2Na + 2H2O → 2NaOH + H2 (हाइड्रोजन गैस निकलती है)।" },
        hasQuestion: true,
        question: {
          en: "Why is pure Sodium metal stored immersed under kerosene in school laboratories?",
          mr: "शाळांच्या प्रयोगशाळेत सोडियम धातू रॉकेलमध्ये का बुडवून ठेवला जातो?",
          hi: "स्कूल प्रयोगशाला में सोडियम धातु को मिट्टी के तेल में डुबोकर क्यों रखा जाता है?"
        },
        options: [
          { id: "c4-a", text: { en: "To prevent it from reacting violently with moisture and oxygen in air", mr: "हवेतील ऑक्सिजन आणि पाण्याच्या वाफेसोबत होणारी स्फोटक अभिक्रिया रोखण्यासाठी", hi: "हवा की नमी और ऑक्सीजन के साथ होने वाली तीव्र अभिक्रिया को रोकने के लिए" }, isCorrect: true, explanation: { en: "Correct! Kerosene isolates sodium from atmospheric water vapour.", mr: "अगदी बरोबर! रॉकेलमुळे हवेतील बाष्पाशी संपर्क तुटतो.", hi: "बिल्कुल सही! मिट्टी का तेल नमी से संपर्क रोकता है।" } },
          { id: "c4-b", text: { en: "To make it change color to purple", mr: "त्याचा रंग बदलण्यासाठी", hi: "उसका रंग बदलने के लिए" }, isCorrect: false, explanation: { en: "Kerosene is used strictly for safe isolation.", mr: "सुरक्षिततेसाठीच रॉकेल वापरतात.", hi: "सुरक्षा के लिए ही तेल में रखा जाता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "ch-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Lab Challenge", mr: "मॉड्यूल ५ — लॅब आव्हान", hi: "मॉड्यूल 5 — प्रयोगशाला चुनौती" },
        title: { en: "🧪 Neutralizing a Chemical Spill", mr: "🧪 सांडलेले रासायनिक द्रावण उदासीन करणे", hi: "🧪 गिरे हुए रासायनिक घोल को उदासीन करना" },
        conceptText: {
          en: "A basic Sodium Hydroxide (NaOH) alkaline solution has spilled on the science lab floor. In chemistry, an Acid + Base reaction produces harmless Salt + Water through Neutralization.",
          mr: "लॅबमध्ये अल्कधर्मी सोडियम हायड्रॉक्साइड (NaOH) सांडले आहे. आम्ल आणि आम्लारी यांच्या उदासिनीकरण अभिक्रियेतून सुरक्षित क्षार व पाणी बनते.",
          hi: "प्रयोगशाला में सोडियम हाइड्रॉक्साइड (NaOH) क्षार गिर गया है। अम्ल और क्षार की उदासीनीकरण अभिक्रिया से लवण और जल बनता है।"
        },
        exampleText: { en: "Reaction: HCl (acid) + NaOH (base) → NaCl (table salt) + H2O (water).", mr: "रासायनिक समीकरण: HCl + NaOH → NaCl (मीठ) + H2O (पाणी).", hi: "समीकरण: HCl + NaOH → NaCl (नमक) + H2O (जल)।" },
        hasQuestion: true,
        question: {
          en: "What safe product is formed when you neutralize a base spill with a mild dilute acid?",
          mr: "आम्ल आणि आम्लारी यांच्या उदासिनीकरण अभिक्रियेतून काय तयार होते?",
          hi: "अम्ल और क्षार के उदासीनीकरण से क्या बनता है?"
        },
        options: [
          { id: "c5-a", text: { en: "Salt and Water (Neutral, safe pH ~ 7)", mr: "क्षार आणि पाणी (सुरक्षित उदासीन अवस्था)", hi: "लवण और जल (सुरक्षित उदासीन अवस्था)" }, isCorrect: true, explanation: { en: "Bravo! Neutralization produces harmless salt and water.", mr: "उत्कृष्ट! उदासिनीकरणात मीठ आणि पाणी तयार होते.", hi: "बहुत बढ़िया! उदासीनीकरण से लवण और जल बनता है।" } },
          { id: "c5-b", text: { en: "Flammable methane gas", mr: "ज्वलनशील मिथेन वायू", hi: "मिथेन गैस" }, isCorrect: false, explanation: { en: "Neutralization does not create hydrocarbons.", mr: "उदासिनीकरणात क्षार व पाणीच बनते.", hi: "उदासीनीकरण में लवण और जल ही बनता है।" } }
        ],
        xpReward: 90
      }
    ]
  },

  // ==========================================
  // 3. MATHEMATICS: ALGEBRA ADVENTURE
  // ==========================================
  "algebra-adventure": {
    packId: "algebra-adventure",
    badgeName: "Math Prodigy",
    totalXp: 200,
    modules: [
      {
        id: "m-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — Introduction to Algebra", mr: "मॉड्यूल १ — बीजगणिताची ओळख", hi: "मॉड्यूल 1 — बीजगणित का परिचय" },
        title: { en: "What is Algebra?", mr: "बीजगणित म्हणजे काय?", hi: "बीजगणित क्या है?" },
        conceptText: {
          en: "Algebra is the branch of mathematics that uses letters and symbols to represent unknown numbers and quantities in formulas and equations.",
          mr: "बीजगणित म्हणजे गणिताची अशी शाखा जिथे अज्ञात संख्या दर्शवण्यासाठी अक्षरे (उदा. x, y) वापरली जातात.",
          hi: "बीजगणित गणित की वह शाखा है जिसमें अज्ञात मानों को दर्शाने के लिए अक्षरों (जैसे x, y) और प्रतीकों का उपयोग किया जाता है।"
        },
        exampleText: { en: "Example: If 5 + x = 12, then the unknown number x must be 7.", mr: "उदाहरण: जर ५ + x = १२, तर अज्ञात संख्या x = ७ असेल.", hi: "उदाहरण: यदि 5 + x = 12, तो अज्ञात संख्या x = 7 होगी।" },
        hasQuestion: true,
        question: {
          en: "In the expression 4x + 9, what does the letter 'x' represent?",
          mr: "४x + ९ या राशीमध्ये 'x' हे काय दर्शवते?",
          hi: "4x + 9 में अक्षर 'x' क्या दर्शाता है?"
        },
        options: [
          { id: "m1-a", text: { en: "An unknown variable", mr: "एक अज्ञात चल (Variable)", hi: "एक अज्ञात चर (Variable)" }, isCorrect: true, explanation: { en: "Correct! 'x' is a variable that can hold numerical values.", mr: "बरोबर! 'x' हे चल आहे.", hi: "सही! 'x' एक चर राशि है।" } },
          { id: "m1-b", text: { en: "Multiplication symbol only", mr: "फक्त गुणाकाराचे चिन्ह", hi: "केवल गुणा का चिह्न" }, isCorrect: false, explanation: { en: "In algebra, x represents a variable quantity.", mr: "बीजगणितात x हे चल असते.", hi: "बीजगणित में x चर मान होता है।" } }
        ],
        xpReward: 20
      },
      {
        id: "m-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Balancing the Equation Scale", mr: "मॉड्यूल २ — समीकरण संतुलन", hi: "मॉड्यूल 2 — समीकरण संतुलन" },
        title: { en: "The Golden Rule of Equations", mr: "समीकरणाचा सुवर्ण नियम", hi: "समीकरण का स्वर्णिम नियम" },
        conceptText: {
          en: "An equation is like a balanced twin-pan scale. Whatever mathematical operation you perform on the left side (add, subtract, multiply, divide), you MUST perform exactly the same on the right side to keep it balanced.",
          mr: "समीकरण हे दोन पारड्यांच्या संतुलित तराजूसारखे असते. डाव्या बाजूवर जी क्रिया केली, तीच उजव्या बाजूवरही करावी लागते.",
          hi: "समीकरण दोनों पलड़ों वाले संतुलित तराजू जैसा होता है। जो संक्रिया बाएं पक्ष में की जाए, वही दाएं पक्ष में भी करनी होगी।"
        },
        exampleText: { en: "If x + 8 = 20, subtract 8 from both sides: x = 20 - 8 = 12.", mr: "जर x + ८ = २०, दोन्ही बाजूंमधून ८ वजा करा: x = १२.", hi: "यदि x + 8 = 20, दोनों पक्षों से 8 घटाएं: x = 12।" },
        hasQuestion: true,
        question: {
          en: "Solve for y:  y - 15 = 45",
          mr: "y ची किंमत काढा:  y - १५ = ४५",
          hi: "y का मान ज्ञात करें:  y - 15 = 45"
        },
        options: [
          { id: "m2-a", text: { en: "y = 60 (Add 15 to both sides)", mr: "y = ६० (दोन्ही बाजूंमध्ये १५ मिळवा)", hi: "y = 60 (दोनों पक्षों में 15 जोड़ें)" }, isCorrect: true, explanation: { en: "Correct! y = 45 + 15 = 60.", mr: "बरोबर! y = ४५ + १५ = ६०.", hi: "सही! y = 45 + 15 = 60." } },
          { id: "m2-b", text: { en: "y = 30", mr: "y = ३०", hi: "y = 30" }, isCorrect: false, explanation: { en: "To isolate y, add 15: 45 + 15 = 60.", mr: "१५ मिळवणे आवश्यक आहे: ४५ + १५ = ६०.", hi: "15 जोड़ना होगा: 45 + 15 = 60." } }
        ],
        xpReward: 30
      },
      {
        id: "m-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Two-Step Equations", mr: "मॉड्यूल ३ — द्वि-स्तरीय समीकरणे", hi: "मॉड्यूल 3 — दो-चरणीय समीकरण" },
        title: { en: "Solving 2-Step Linear Equations", mr: "२-पायऱ्यांची रेषीय समीकरणे", hi: "2-चरणीय रैखिक समीकरण" },
        conceptText: {
          en: "To solve an equation like 2x + 7 = 19, first isolate the variable term by subtracting 7 from both sides (2x = 12), then divide by 2 to find x = 6.",
          mr: "२x + ७ = १९ सोडवण्यासाठी आधी दोन्ही बाजूंमधून ७ वजा करा (२x = १२), नंतर २ ने भागा (x = ६).",
          hi: "2x + 7 = 19 हल करने के लिए पहले दोनों पक्षों से 7 घटाएं (2x = 12), फिर 2 से भाग दें (x = 6)।"
        },
        exampleText: { en: "Formula: ax + b = c → ax = c - b → x = (c - b) / a.", mr: "पायरी: २x + ७ = १९ → २x = १२ → x = ६.", hi: "चरण: 2x + 7 = 19 → 2x = 12 → x = 6." },
        hasQuestion: true,
        question: {
          en: "Solve for x:  3x + 4 = 25",
          mr: "x चे मूल्य काढा:  ३x + ४ = २५",
          hi: "x का मान ज्ञात करें:  3x + 4 = 25"
        },
        options: [
          { id: "m3-a", text: { en: "x = 7 (3x = 21 → x = 7)", mr: "x = ७ (३x = २१ → x = ७)", hi: "x = 7 (3x = 21 → x = 7)" }, isCorrect: true, explanation: { en: "Correct! 3x = 25 - 4 = 21, and 21 / 3 = 7.", mr: "बरोबर! २५ - ४ = २१, आणि २१ / ३ = ७.", hi: "सही! 25 - 4 = 21, और 21 / 3 = 7." } },
          { id: "m3-b", text: { en: "x = 8", mr: "x = ८", hi: "x = 8" }, isCorrect: false, explanation: { en: "3 × 8 + 4 = 28, not 25.", mr: "३ × ८ + ४ = २८ होते.", hi: "3 × 8 + 4 = 28 होता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "m-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Word Problems to Equations", mr: "मॉड्यूल ४ — शाब्दिक उदाहरणे", hi: "मॉड्यूल 4 — व्यावहारिक प्रश्न" },
        title: { en: "Translating Words into Math", mr: "शाब्दिक वर्णनाचे समीकरणात रूपांतर", hi: "कथनों को समीकरण में बदलना" },
        conceptText: {
          en: "Real-world problems can be translated into algebraic models. Identify the unknown as 'x', write the relationship, and solve algebraically.",
          mr: "दैनंदिन जीवनातील गणिते समीकरणात मांडून अचूक उत्तरे मिळवता येतात.",
          hi: "दैनिक जीवन की समस्याओं को बीजगणितीय समीकरणों में बदलकर हल किया जा सकता है।"
        },
        exampleText: { en: "'A notebook costs twice as much as a pen' → Notebook = 2p.", mr: "'वहीची किंमत पेनाच्या दुप्पट आहे' → वही = २p.", hi: "'कॉपी की कीमत पेन से दोगुनी है' → कॉपी = 2p." },
        hasQuestion: true,
        question: {
          en: "Rohan bought 4 identical cricket balls and paid a total of ₹120. Which equation represents this?",
          mr: "रोहनने ४ सारखे क्रिकेट चेंडू खरेदी केले आणि एकूण ₹१२० दिले. याचे योग्य समीकरण कोणते?",
          hi: "रोहन ने 4 समान क्रिकेट गेंदें खरीदीं और कुल ₹120 दिए। इसका सही समीकरण क्या है?"
        },
        options: [
          { id: "m4-a", text: { en: "4x = 120 (where x = price of 1 ball)", mr: "४x = १२० (जिथे x = एका चेंडूची किंमत)", hi: "4x = 120 (जहाँ x = 1 गेंद का मूल्य)" }, isCorrect: true, explanation: { en: "Correct! 4 × x = 120, so x = ₹30 per ball.", mr: "बरोबर! ४x = १२०, म्हणजेच x = ₹३० प्रति चेंडू.", hi: "सही! 4x = 120, अतः x = ₹30 प्रति गेंद।" } },
          { id: "m4-b", text: { en: "x + 4 = 120", mr: "x + ४ = १२०", hi: "x + 4 = 120" }, isCorrect: false, explanation: { en: "Multiplication is needed for multiple items: 4x = 120.", mr: "गुणाकार आवश्यक आहे: ४x = १२०.", hi: "गुणन आवश्यक है: 4x = 120." } }
        ],
        xpReward: 40
      },
      {
        id: "m-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Challenge", mr: "मॉड्यूल ५ — बाजार गणित आव्हान", hi: "मॉड्यूल 5 — मंडी बाजार चुनौती" },
        title: { en: "⚖️ The Kopargaon Grain Market Challenge", mr: "⚖️ कोपरगाव धान्य वजन आव्हान", hi: "⚖️ कोपरगांव अनाज मंडी संतुलन चुनौती" },
        conceptText: {
          en: "A farmer in Kopargaon market places 3 identical sacks of wheat (each weighing x kg) plus a 5 kg iron weight on the left pan of the weighing balance. The right pan has 26 kg.",
          mr: "कोपरगाव बाजारातील शेतकऱ्याच्या तराजूच्या डाव्या पारड्यात ३ गव्हाची पोती (प्रत्येकी x किलो) आणि ५ किलोचे वजन आहे. उजव्या पारड्यात २६ किलो आहे.",
          hi: "कोपरगांव मंडी के किसान के तराजू के बाएं पलड़े में 3 गेहूं की बोरियां (प्रत्येक x किग्रा) और 5 किग्रा का बाट है। दाएं पलड़े में 26 किग्रा है।"
        },
        exampleText: { en: "Equation: 3x + 5 = 26. Find the weight of one sack of wheat.", mr: "समीकरण: ३x + ५ = २६. एका पोत्याचे वजन शोधा.", hi: "समीकरण: 3x + 5 = 26. एक बोरी का वजन ज्ञात करें।" },
        hasQuestion: true,
        question: {
          en: "What is the weight of one sack of wheat (x)?",
          mr: "एका गव्हाच्या पोत्याचे वजन (x) किती किलो आहे?",
          hi: "एक गेहूं की बोरी का वजन (x) कितना है?"
        },
        options: [
          { id: "m5-a", text: { en: "7 kg (3x = 21 → x = 7 kg)", mr: "७ किलो (३x = २१ → x = ७ किलो)", hi: "7 किग्रा (3x = 21 → x = 7 किग्रा)" }, isCorrect: true, explanation: { en: "Outstanding! 3x = 26 - 5 = 21, and 21 / 3 = 7 kg.", mr: "उत्कृष्ट! ३x = २१, म्हणून x = ७ किलो.", hi: "बहुत बढ़िया! 3x = 21, अतः x = 7 किग्रा।" } },
          { id: "m5-b", text: { en: "10 kg", mr: "१० किलो", hi: "10 किग्रा" }, isCorrect: false, explanation: { en: "3 × 10 + 5 = 35 kg, which exceeds 26 kg.", mr: "३ × १० + ५ = ३५ होते.", hi: "3 × 10 + 5 = 35 होता है।" } }
        ],
        xpReward: 70
      }
    ]
  },

  // ==========================================
  // 4. PYTHON: CODE BREAKER
  // ==========================================
  "python-quest": {
    packId: "python-quest",
    badgeName: "Code Breaker",
    totalXp: 300,
    modules: [
      {
        id: "py-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — Variables & Types", mr: "मॉड्यूल १ — व्हेरिएबल्स आणि डेटा", hi: "मॉड्यूल 1 — वेरिएबल और डेटा प्रकार" },
        title: { en: "Storing Data in Variables", mr: "व्हेरिएबल्समध्ये डेटा साठवणे", hi: "वेरिएबल में डेटा सहेजना" },
        conceptText: {
          en: "In Python, a variable is a named container that holds a value in memory. Python automatically detects whether a variable is an Integer, Float, String, or Boolean without explicit declarations.",
          mr: "पायथनमध्ये व्हेरिएबल म्हणजे मेमरीमध्ये माहिती साठवणारे भांडे. पायथन आपोआप संख्या, शब्द किंवा सत्य/असत्य प्रकार ओळखते.",
          hi: "पायथन में वेरिएबल एक कंटेनर है जो मानों को मेमोरी में सहेजता है। पायथन डेटा प्रकार (संख्या, टेक्स्ट) स्वतः पहचानता है।"
        },
        exampleText: { en: "score = 100 (Integer)\ntemp = 28.5 (Float)\nstudent = 'Kala' (String)", mr: "गुण = १०० (संख्या)\nनाव = 'राहुल' (शब्द)", hi: "अंक = 100\nनाम = 'छात्र'" },
        hasQuestion: true,
        question: {
          en: "Which Python statement correctly assigns a text string to a variable?",
          mr: "पायथनमध्ये शब्दांचे व्हेरिएबल तयार करण्याचे अचूक विधान कोणते?",
          hi: "पायथन में टेक्स्ट वेरिएबल बनाने का सही सिंटैक्स कौन सा है?"
        },
        options: [
          { id: "py1-a", text: { en: "city = 'Kopargaon'", mr: "city = 'कोपरगाव'", hi: "city = 'कोपरगांव'" }, isCorrect: true, explanation: { en: "Correct! Strings must be enclosed within single or double quotes.", mr: "बरोबर! शब्द नेहमी अवतरण चिन्हात (' ') लिहितात.", hi: "सही! टेक्स्ट को हमेशा कोट्स (' ') में लिखा जाता है।" } },
          { id: "py1-b", text: { en: "city == Kopargaon", mr: "city == कोपरगाव", hi: "city == कोपरगांव" }, isCorrect: false, explanation: { en: "== is for comparison, not assignment.", mr: "== हे तपासणीसाठी वापरतात, साठवण्यासाठी = वापरतात.", hi: "== तुलना के लिए होता है, मान देने के लिए = चाहिए।" } }
        ],
        xpReward: 30
      },
      {
        id: "py-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Conditional Statements", mr: "मॉड्यूल २ — अटी व निर्णय (if/else)", hi: "मॉड्यूल 2 — कंडीशनल लॉजिक (if/else)" },
        title: { en: "Decision Making with if/else", mr: "if आणि else द्वारे निर्णय घेणे", hi: "if और else से निर्णय लेना" },
        conceptText: {
          en: "Conditional statements evaluate boolean conditions. If the condition is True, the indented code block runs; otherwise, the alternative block executes.",
          mr: "जर एखादी अट खरी असेल तर एक कृती केली जाते, अन्यथा दुसरी कृती केली जाते.",
          hi: "यदि दी गई शर्त सत्य (True) होती है, तो कोड चलता है; अन्यथा दूसरा ब्लॉक निष्पादित होता है।"
        },
        exampleText: { en: "if battery < 20:\n    print('Please charge your phone')\nelse:\n    print('Battery is sufficient')", mr: "जर बॅटरी < २०:\n    'चार्ज करा'\nअन्यथा:\n    'बॅटरी पुरेशी आहे'", hi: "यदि बैटरी < 20:\n    'चार्ज करें'\nअन्यथा:\n    'बैटरी ठीक है'" },
        hasQuestion: true,
        question: {
          en: "What will this code print if temp = 35?\nif temp > 30:\n    print('Hot')\nelse:\n    print('Cool')",
          mr: "जर temp = ३५ असेल, तर काय उत्तर येईल?\nif temp > 30: 'Hot' else: 'Cool'",
          hi: "यदि temp = 35 हो, तो आउटपुट क्या होगा?\nif temp > 30: 'Hot' else: 'Cool'"
        },
        options: [
          { id: "py2-a", text: { en: "Hot (since 35 > 30 is True)", mr: "Hot (कारण ३५ > ३० खरे आहे)", hi: "Hot (क्योंकि 35 > 30 सत्य है)" }, isCorrect: true, explanation: { en: "Correct! 35 is greater than 30, so the if-block executes.", mr: "बरोबर! ३५ हे ३० पेक्षा मोठे असल्याने 'Hot' दिसेल.", hi: "सही! 35 > 30 सत्य होने पर 'Hot' प्रिंट होगा।" } },
          { id: "py2-b", text: { en: "Cool", mr: "Cool", hi: "Cool" }, isCorrect: false, explanation: { en: "The else-block only runs if condition is False.", mr: "अट खोटी असेल तरच else चालतो.", hi: "शर्त गलत होने पर ही else चलता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "py-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Loops & Iteration", mr: "मॉड्यूल ३ — लूप्स आणि पुनरावृत्ती", hi: "मॉड्यूल 3 — लूप और पुनरावृत्ति" },
        title: { en: "Repeating Actions with for Loops", mr: "for लूप द्वारे बेरीज व पुनरावृत्ती", hi: "for लूप से दोहराव और गणना" },
        conceptText: {
          en: "A for loop iterates over each item in a list or sequence, allowing you to process datasets automatically without writing repeated code lines.",
          mr: "for लूपच्या मदतीने यादीतील प्रत्येक घटकावर आपोआप प्रक्रिया करता येते.",
          hi: "for लूप की मदद से सूची के प्रत्येक घटक पर स्वचालित रूप से गणना की जा सकती है।"
        },
        exampleText: { en: "marks = [85, 90, 95]\ntotal = 0\nfor m in marks:\n    total += m\nprint(total) # Output: 270", mr: "गुण = [८५, ९०, ९५]\nएकूण = २७०", hi: "अंक = [85, 90, 95]\nयोग = 270" },
        hasQuestion: true,
        question: {
          en: "Which operator is used to add a number to an accumulator in Python?",
          mr: "पायथनमध्ये बेरजेत भर टाकण्यासाठी कोणता ऑपरेटर वापरतात?",
          hi: "पायथन में योग में जोड़ने के लिए कौन सा ऑपरेटर उपयोग होता है?"
        },
        options: [
          { id: "py3-a", text: { en: "+=  (e.g., total += score)", mr: "+=  (उदा. total += गुण)", hi: "+=  (जैसे: total += score)" }, isCorrect: true, explanation: { en: "Correct! 'total += x' is shorthand for 'total = total + x'.", mr: "बरोबर! 'total += x' म्हणजेच 'total = total + x'.", hi: "सही! 'total += x' का अर्थ 'total = total + x' है।" } },
          { id: "py3-b", text: { en: "=+", mr: "=+", hi: "=+" }, isCorrect: false, explanation: { en: "The plus must precede the equals sign: +=.", mr: "चिन्ह आधी हवे: +=.", hi: "प्लस चिह्न पहले होना चाहिए: +=." } }
        ],
        xpReward: 50
      },
      {
        id: "py-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Debugging Code", mr: "मॉड्यूल ४ — कोड डिबगिंग", hi: "मॉड्यूल 4 — कोड डिबगिंग" },
        title: { en: "Finding and Fixing Code Bugs", mr: "कोडमधील चुका शोधून दुरुस्त करणे", hi: "कोड में गलतियाँ ढूंढकर ठीक करना" },
        conceptText: {
          en: "Debugging is the systematic process of finding and resolving errors (bugs) in code. Common Python bugs include syntax errors, off-by-one errors, and variable overwriting.",
          mr: "डिबगिंग म्हणजे कोडमधील चुका शोधून त्या दुरुस्त करणे.",
          hi: "डिबगिंग कोड में गलतियों (बग्स) को खोजने और ठीक करने की प्रक्रिया है।"
        },
        exampleText: { en: "Buggy: total = reading (overwrites previous sum)\nFixed: total += reading (adds to sum)", mr: "चूक: total = वाचन\nदुरुस्त: total += वाचन", hi: "गलत: total = reading\nसही: total += reading" },
        hasQuestion: true,
        question: {
          en: "If a loop contains 'total = temp' instead of 'total += temp', what will happen?",
          mr: "जर लूपमध्ये 'total += temp' ऐवजी 'total = temp' लिहिले, तर काय होईल?",
          hi: "यदि लूप में 'total += temp' के स्थान पर 'total = temp' लिखा हो, तो क्या होगा?"
        },
        options: [
          { id: "py4-a", text: { en: "It overwrites the total on each step, keeping only the last number", mr: "प्रत्येक वेळी जुनी बेरीज पुसली जाऊन फक्त शेवटचा आकडा राहील", hi: "हर बार पिछला योग मिट जाएगा और केवल अंतिम संख्या बचेगी" }, isCorrect: true, explanation: { en: "Spot on! '=' replaces the variable, while '+=' accumulates.", mr: "बरोबर! '=' ने किंमत बदलते, '+=' ने बेरीज होते.", hi: "सही! '=' मान बदल देता है, '+=' योग करता है।" } },
          { id: "py4-b", text: { en: "Python will crash with a memory overflow", mr: "पायथन क्रॅश होईल", hi: "पायथन क्रैश हो जाएगा" }, isCorrect: false, explanation: { en: "It runs without error, but calculates wrong mathematical result (logic bug).", mr: "कोड चालेल पण उत्तर चुकेल.", hi: "कोड चलेगा लेकिन उत्तर गलत आएगा।" } }
        ],
        xpReward: 60
      },
      {
        id: "py-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Coding Challenge", mr: "मॉड्यूल ५ — हवामान सेन्सर आव्हान", hi: "मॉड्यूल 5 — मौसम सेंसर चुनौती" },
        title: { en: "💻 Kopargaon Weather Sensor Challenge", mr: "💻 कोपरगाव हवामान सेन्सर आव्हान", hi: "💻 कोपरगांव मौसम सेंसर चुनौती" },
        conceptText: {
          en: "A solar weather station records 5 temperature readings: [28, 31, 29, 30, 32] °C. Calculate the average temperature using Python logic.",
          mr: "सौर हवामान केंद्राने ५ तापमानांची नोंद घेतली: [२८, ३१, २९, ३०, ३२] °C. सरासरी तापमान काढा.",
          hi: "सौर मौसम स्टेशन 5 तापमान रिकॉर्ड करता है: [28, 31, 29, 30, 32] °C। औसत तापमान की गणना करें।"
        },
        exampleText: { en: "Sum: 28 + 31 + 29 + 30 + 32 = 150. Count: 5. Average = 150 / 5 = 30.0 °C.", mr: "एकूण बेरीज: १५०. नोंदी: ५. सरासरी = १५० / ५ = ३०.० °C.", hi: "कुल योग: 150। संख्या: 5। औसत = 150 / 5 = 30.0 °C।" },
        hasQuestion: true,
        question: {
          en: "What is the average temperature calculated from the 5 sensor readings?",
          mr: "५ सेन्सर नोंदींचे सरासरी तापमान किती येईल?",
          hi: "5 सेंसर रीडिंग का परिणामी औसत तापमान क्या होगा?"
        },
        options: [
          { id: "py5-a", text: { en: "30.0 °C (Sum = 150, 150 / 5 = 30)", mr: "३०.० °C (एकूण = १५०, १५० / ५ = ३०)", hi: "30.0 °C (योग = 150, 150 / 5 = 30)" }, isCorrect: true, explanation: { en: "Excellent! 150 divided by 5 equals 30.0 °C.", mr: "उत्कृष्ट! १५० भागिले ५ बरोबर ३०.० °C.", hi: "बहुत बढ़िया! 150 भाग 5 बराबर 30.0 °C।" } },
          { id: "py5-b", text: { en: "28.5 °C", mr: "२८.५ °C", hi: "28.5 °C" }, isCorrect: false, explanation: { en: "Sum is 150; 150 / 5 = 30.0.", mr: "बेरीज १५० / ५ = ३०.० आहे.", hi: "योग 150 / 5 = 30.0 है।" } }
        ],
        xpReward: 120
      }
    ]
  },

  // ==========================================
  // 5. CYBERSECURITY: DEFEND THE NETWORK
  // ==========================================
  "cybersecurity-mission": {
    packId: "cybersecurity-mission",
    badgeName: "Cyber Guardian",
    totalXp: 350,
    modules: [
      {
        id: "sec-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — What is Cybersecurity?", mr: "मॉड्यूल १ — सायबर सुरक्षा म्हणजे काय?", hi: "मॉड्यूल 1 — साइबर सुरक्षा क्या है?" },
        title: { en: "Introduction to Digital Defense", mr: "डिजिटल संरक्षणाची ओळख", hi: "डिजिटल सुरक्षा का परिचय" },
        conceptText: {
          en: "Cybersecurity is the practice of protecting internet-connected systems, computers, mobile phones, servers, and sensitive student data from malicious digital attacks.",
          mr: "सायबर सुरक्षा म्हणजे कॉम्प्युटर, मोबाईल, सर्व्हर आणि विद्यार्थ्यांचा वैयक्तिक डेटा डिजिटल हल्ल्यांपासून सुरक्षित ठेवणे.",
          hi: "साइबर सुरक्षा कंप्यूटर, मोबाइल, सर्वर और व्यक्तिगत डेटा को दुर्भावनापूर्ण डिजिटल हमलों से सुरक्षित रखने की प्रक्रिया है।"
        },
        exampleText: { en: "Protecting college exam portals, bank credentials, and email accounts.", mr: "कॉलेज परीक्षा पोर्टल, बँक माहिती आणि ईमेल खाती सुरक्षित ठेवणे.", hi: "कॉलेज पोर्टल, बैंक विवरण और ईमेल खातों को सुरक्षित रखना।" },
        hasQuestion: true,
        question: {
          en: "What is the primary goal of cybersecurity?",
          mr: "सायबर सुरक्षेचे मुख्य उद्दिष्ट कोणते?",
          hi: "साइबर सुरक्षा का प्राथमिक लक्ष्य क्या है?"
        },
        options: [
          { id: "sec1-a", text: { en: "Protect data confidentiality, integrity, and availability (CIA Triad)", mr: "माहितीची गोपनीयता, अचूकता आणि उपलब्धता सुरक्षित ठेवणे", hi: "डेटा की गोपनीयता, अखंडता और उपलब्धता की रक्षा करना" }, isCorrect: true, explanation: { en: "Correct! The CIA Triad is the foundation of information security.", mr: "बरोबर! गोपनीयता, अखंडता आणि उपलब्धता हे मुख्य आधारस्तंभ आहेत.", hi: "सही! सीआईए ट्रायड सूचना सुरक्षा की नींव है।" } },
          { id: "sec1-b", text: { en: "To make internet speed slower", mr: "इंटरनेटचा वेग कमी करणे", hi: "इंटरनेट धीमा करना" }, isCorrect: false, explanation: { en: "Security protects systems without hindering usability.", mr: "सुरक्षा यंत्रणेचे रक्षण करते.", hi: "सुरक्षा प्रणाली की रक्षा करती है।" } }
        ],
        xpReward: 30
      },
      {
        id: "sec-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Recognizing Phishing", mr: "मॉड्यूल २ — फिशिंग ओळखणे", hi: "मॉड्यूल 2 — फ़िशिंग पहचानना" },
        title: { en: "What is a Phishing Attack?", mr: "फिशिंग हल्ला म्हणजे काय?", hi: "फ़िशिंग हमला क्या है?" },
        conceptText: {
          en: "Phishing is a deceptive social engineering attack where attackers impersonate trusted institutions (like schools, banks, or colleges) to trick victims into revealing passwords, PINs, or confidential data.",
          mr: "फिशिंग म्हणजे अधिकृत संस्थांचे (बँक, कॉलेज) खोटे रूप घेऊन पासवर्ड किंवा बँक पिन चोरण्यासाठी पाठवलेले फसवे मेसेज.",
          hi: "फ़िशिंग एक धोखाधड़ी वाला हमला है जिसमें हमलावर बैंक या कॉलेज बनकर पासवर्ड या पिन चुराने का प्रयास करते हैं।"
        },
        exampleText: { en: "Fake message: 'Your scholarship is canceled! Click this unknown link immediately to re-verify your ATM PIN.'", mr: "फसवा संदेश: 'तुमची स्कॉलरशिप थांबवली आहे! लगेच पिन टाकून व्हेरिफाय करा.'", hi: "फर्जी संदेश: 'छात्रवृत्ति रोकी गई है! तुरंत बैंक पिन दर्ज करें।'" },
        hasQuestion: true,
        question: {
          en: "Which of the following is a major red flag of a phishing attempt?",
          mr: "खालीलपैकी कोणता संदेश फिशिंग (बनावट) असण्याचे मुख्य लक्षण आहे?",
          hi: "निम्नलिखित में से कौन सा फ़िशिंग का मुख्य चेतावनी संकेत है?"
        },
        options: [
          { id: "sec2-a", text: { en: "Urgent pressure demanding your secret PIN or password via an unverified link", mr: "अनोळखी लिंकवर तातडीने गुप्त पासवर्ड किंवा पिन मागणे", hi: "अज्ञात लिंक पर तुरंत गुप्त पिन या पासवर्ड की मांग करना" }, isCorrect: true, explanation: { en: "Correct! Legitimate institutions never ask for secret passwords or PINs via email/SMS.", mr: "बरोबर! कोणतीही अधिकृत संस्था ईमेलवर गुप्त पासवर्ड मागत नाही.", hi: "सही! कोई भी बैंक या कॉलेज ईमेल पर पासवर्ड नहीं मांगता।" } },
          { id: "sec2-b", text: { en: "An email greeting you properly from the official verified domain", mr: "अधिकृत कॉलेज डोमेनवरून आलेला सामान्य संदेश", hi: "आधिकारिक डोमेन से आया सामान्य ईमेल" }, isCorrect: false, explanation: { en: "Official emails without suspicious demands are normal.", mr: "अधिकृत ईमेल सामान्य असतात.", hi: "आधिकारिक ईमेल सामान्य होते हैं।" } }
        ],
        xpReward: 40
      },
      {
        id: "sec-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Inspecting Suspicious Links", mr: "मॉड्यूल ३ — संशयास्पद लिंक्स तपासणे", hi: "मॉड्यूल 3 — संदिग्ध लिंक की जांच" },
        title: { en: "Domain Name Verification", mr: "वेबसाइट डोमेन नाव तपासणे", hi: "वेबसाइट डोमेन नाम की जांच" },
        conceptText: {
          en: "Scammers often create fake websites with slightly misspelled domain names (e.g. `univ-kopargaon-portal-verify.xyz` instead of the genuine `univkopargaon.edu.in`). Always inspect the actual URL.",
          mr: "हॅकर्स हुबेहूब दिसणाऱ्या बनावट वेबसाइट्स तयार करतात (उदा. `kopargaon-college-free-gift.xyz`). नेहमी मूळ अधिकृत डोमेन तपासा.",
          hi: "धोखेबाज असली जैसी दिखने वाली फर्जी वेबसाइटें बनाते हैं। हमेशा असली डोमेन नाम की जांच करें।"
        },
        exampleText: { en: "Look for HTTPS lock icon and verify the domain suffix (.edu.in, .gov.in, .ac.in).", mr: "HTTPS कुलूप चिन्ह आणि अधिकृत .edu.in किंवा .gov.in डोमेन तपासा.", hi: "HTTPS ताला चिह्न और आधिकारिक .edu.in या .gov.in डोमेन देखें।" },
        hasQuestion: true,
        question: {
          en: "Which URL is likely a fake malicious spoofing link?",
          mr: "खालीलपैकी कोणती लिंक बनावट आणि धोकादायक असण्याची दाट शक्यता आहे?",
          hi: "इनमें से कौन सा लिंक फर्जी और खतरनाक हो सकता है?"
        },
        options: [
          { id: "sec3-a", text: { en: "http://univ-kopargaon-free-scholarship-urgent.xyz/login", mr: "http://univ-kopargaon-free-scholarship-urgent.xyz/login", hi: "http://univ-kopargaon-free-scholarship-urgent.xyz/login" }, isCorrect: true, explanation: { en: "Correct! The suspicious .xyz domain and urgency indicate a phishing link.", mr: "बरोबर! .xyz आणि असंबद्ध नाव ही बनावट लिंक दर्शवते.", hi: "सही! .xyz डोमेन और फर्जी नाम खतरे का संकेत हैं।" } },
          { id: "sec3-b", text: { en: "https://www.kopargaoncollege.edu.in/portal", mr: "https://www.kopargaoncollege.edu.in/portal", hi: "https://www.kopargaoncollege.edu.in/portal" }, isCorrect: false, explanation: { en: "This is a legitimate educational (.edu.in) domain.", mr: "हे अधिकृत शैक्षणिक डोमेन आहे.", hi: "यह आधिकारिक शैक्षणिक डोमेन है।" } }
        ],
        xpReward: 50
      },
      {
        id: "sec-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Strong Passwords & MFA", mr: "मॉड्यूल ४ — मजबूत पासवर्ड आणि MFA", hi: "मॉड्यूल 4 — मजबूत पासवर्ड और MFA" },
        title: { en: "Multi-Factor Authentication (MFA)", mr: "मजबूत पासवर्ड आणि दुहेरी प्रमाणीकरण", hi: "मजबूत पासवर्ड और टू-फैक्टर ऑथेंटिकेशन" },
        conceptText: {
          en: "A strong password combines uppercase letters, lowercase letters, numbers, and symbols with at least 12 characters. Multi-Factor Authentication (MFA) adds an extra verification layer (like a phone OTP or authenticator prompt).",
          mr: "मजबूत पासवर्डमध्ये मोठी-लहान अक्षरे, आकडे आणि चिन्हे असावीत. दुहेरी प्रमाणीकरण (MFA/OTP) खात्याला अतिरिक्त सुरक्षा कवच देते.",
          hi: "मजबूत पासवर्ड में अक्षर, संख्याएं और विशेष चिह्न होने चाहिए। टू-फैक्टर ऑथेंटिकेशन (MFA) खाते को अतिरिक्त सुरक्षा प्रदान करता है।"
        },
        exampleText: { en: "Strong: Kp#2026@Scholar! | Weak: 123456 or password", mr: "मजबूत: Kp#2026@Scholar! | कमकुवत: 123456", hi: "मजबूत: Kp#2026@Scholar! | कमजोर: 123456" },
        hasQuestion: true,
        question: {
          en: "Even if an attacker steals your password, what stops them if you have MFA enabled?",
          mr: "जरी कोणाला तुमचा पासवर्ड कळाला, तरी MFA चालू असल्यास ते लॉगिन का करू शकत नाहीत?",
          hi: "यदि किसी को आपका पासवर्ड पता चल जाए, फिर भी MFA होने पर वह लॉगिन क्यों नहीं कर सकता?"
        },
        options: [
          { id: "sec4-a", text: { en: "They still lack the second verification factor (like the OTP on your phone)", mr: "त्यांच्याकडे तुमच्या फोनवर येणारा दुसरा घटक (OTP) नसतो", hi: "उनके पास आपके फोन पर आने वाला दूसरा सुरक्षा कोड (OTP) नहीं होता" }, isCorrect: true, explanation: { en: "Correct! MFA requires both password AND physical device verification.", mr: "बरोबर! MFA मुळे फोनवरील OTP असल्याशिवाय प्रवेश मिळत नाही.", hi: "सही! MFA में फोन के OTP के बिना लॉगिन नहीं हो सकता।" } },
          { id: "sec4-b", text: { en: "The computer will immediately turn off", mr: "कॉम्प्युटर बंद पडेल", hi: "कंप्यूटर तुरंत बंद हो जाएगा" }, isCorrect: false, explanation: { en: "MFA simply blocks unauthorized access attempts.", mr: "MFA अनधिकृत प्रवेश रोखते.", hi: "MFA अनधिकृत लॉगिन को रोकता है।" } }
        ],
        xpReward: 60
      },
      {
        id: "sec-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Incident Challenge", mr: "मॉड्यूल ५ — सुरक्षा घटना आव्हान", hi: "मॉड्यूल 5 — सुरक्षा घटना चुनौती" },
        title: { en: "🔐 Student Portal Triage Challenge", mr: "🔐 विद्यार्थी पोर्टल सुरक्षा तपासणी", hi: "🔐 छात्र पोर्टल सुरक्षा चुनौती" },
        conceptText: {
          en: "You receive an SMS alert: 'Your student scholarship account has an urgent security issue. Click bit.ly/3x9Kp to confirm your bank password in 15 minutes.' How do you respond?",
          mr: "तुम्हाला एक एसएमएस आला: 'स्कॉलरशिपसाठी १५ मिनिटांत bit.ly/3x9Kp वर क्लिक करून बँक पासवर्ड टाका.' तुम्ही काय कराल?",
          hi: "आपको एसएमएस मिला: 'छात्रवृत्ति खाते में समस्या है। 15 मिनट में bit.ly/3x9Kp पर जाकर बैंक पासवर्ड दर्ज करें।' आप क्या करेंगे?"
        },
        exampleText: { en: "Best Practice: Never click urgent unknown links. Contact your college administration directly through verified numbers.", mr: "योग्य कृती: अनोळखी लिंकवर कधीही क्लिक करू नका. कॉलेज कार्यालयाशी थेट संपर्क साधा.", hi: "सही तरीका: अनजान लिंक पर क्लिक न करें। सीधे कॉलेज कार्यालय से संपर्क करें।" },
        hasQuestion: true,
        question: {
          en: "What is the safest and most professional response to this SMS?",
          mr: "या संशयास्पद संदेशावर सर्वात सुरक्षित आणि योग्य कृती कोणती?",
          hi: "इस संदिग्ध संदेश पर सबसे सुरक्षित प्रतिक्रिया क्या है?"
        },
        options: [
          { id: "sec5-a", text: { en: "Do NOT click the link; report the phishing attempt to college admin and block the sender", mr: "लिंकवर मुळीच क्लिक करू नका; कॉलेज प्रशासनाला कळवा आणि नंबर ब्लॉक करा", hi: "लिंक पर क्लिक न करें; कॉलेज प्रशासन को सूचित करें और नंबर ब्लॉक करें" }, isCorrect: true, explanation: { en: "Masterful defense! Reporting and ignoring phishing prevents credential theft.", mr: "उत्कृष्ट! बनावट लिंक टाळून तक्रार करणे हेच योग्य पाऊल आहे.", hi: "बहुत बढ़िया! फर्जी लिंक को नजरअंदाज करना और रिपोर्ट करना ही सही कदम है।" } },
          { id: "sec5-b", text: { en: "Click the link quickly before the 15-minute timer expires", mr: "१५ मिनिटांत पटकन लिंक उघडून पासवर्ड टाका", hi: "15 मिनट खत्म होने से पहले लिंक खोलें" }, isCorrect: false, explanation: { en: "Artificial urgency is the hallmark of phishing scams!", mr: "घाई करणे हाच फिशिंगचा सापळा असतो.", hi: "जल्दबाजी का दबाव बनाना ही फ़िशिंग का जाल होता है।" } }
        ],
        xpReward: 170
      }
    ]
  },

  // ==========================================
  // 6. ENGLISH: COMMUNICATION CHALLENGE
  // ==========================================
  "english-explorer": {
    packId: "english-explorer",
    badgeName: "Fluent Speaker",
    totalXp: 180,
    modules: [
      {
        id: "eng-mod-1",
        moduleNumber: 1,
        moduleLabel: { en: "MODULE 1 — Confident Greetings", mr: "मॉड्यूल १ — अभिवादन व संभाषण", hi: "मॉड्यूल 1 — अभिवादन और शिष्टाचार" },
        title: { en: "Professional Greetings & Timing", mr: "वेळेनुसार योग्य इंग्रजी अभिवादन", hi: "समय के अनुसार उचित अंग्रेजी अभिवादन" },
        conceptText: {
          en: "Greetings establish positive rapport in professional, academic, and everyday conversations. Use 'Good morning' before 12:00 PM, 'Good afternoon' between 12:00 PM and 5:00 PM, and 'Good evening' after 5:00 PM.",
          mr: "अभिवादनामुळे संभाषण सकारात्मक होते. सकाळी १२ पर्यंत 'Good morning', दुपारी ५ पर्यंत 'Good afternoon', आणि संध्याकाळी ५ नंतर 'Good evening' वापरावे.",
          hi: "अभिवादन से बातचीत विनम्र होती है। सुबह 12 बजे तक 'Good morning', दोपहर 5 बजे तक 'Good afternoon', और शाम 5 बजे के बाद 'Good evening' कहें।"
        },
        exampleText: { en: "Morning: 'Good morning, Sir!' | Afternoon: 'Good afternoon, Madam!'", mr: "सकाळी: 'Good morning!' | दुपारी: 'Good afternoon!'", hi: "सुबह: 'Good morning!' | दोपहर: 'Good afternoon!'" },
        hasQuestion: true,
        question: {
          en: "You are meeting your college principal at 2:30 PM. What is the most appropriate greeting?",
          mr: "दुपारी २:३० वाजता प्राचार्यांना भेटताना कोणते अभिवादन योग्य आहे?",
          hi: "दोपहर 2:30 बजे कॉलेज प्रिंसिपल से मिलते समय उचित अभिवादन क्या है?"
        },
        options: [
          { id: "e1-a", text: { en: "Good afternoon, Sir!", mr: "Good afternoon, Sir!", hi: "Good afternoon, Sir!" }, isCorrect: true, explanation: { en: "Correct! Between 12:00 PM and 5:00 PM, use 'Good afternoon'.", mr: "बरोबर! दुपारी 'Good afternoon' वापरतात.", hi: "सही! दोपहर में 'Good afternoon' का प्रयोग होता है।" } },
          { id: "e1-b", text: { en: "Good night, Sir!", mr: "Good night, Sir!", hi: "Good night, Sir!" }, isCorrect: false, explanation: { en: "'Good night' is only used when taking leave before sleeping.", mr: "'Good night' निरोप घेताना वापरतात.", hi: "'Good night' विदा लेते समय कहा जाता है।" } }
        ],
        xpReward: 20
      },
      {
        id: "eng-mod-2",
        moduleNumber: 2,
        moduleLabel: { en: "MODULE 2 — Self-Introduction", mr: "मॉड्यूल २ — स्व-परिचय", hi: "मॉड्यूल 2 — आत्म-परिचय" },
        title: { en: "Introducing Yourself Professionally", mr: "आत्मविश्वासपूर्ण परिचय देणे", hi: "आत्मविश्वास से परिचय देना" },
        conceptText: {
          en: "When introducing yourself, use 'My name is...' or 'I am...'. Avoid using 'Myself [Name]' as it is grammatically incorrect in standard English.",
          mr: "स्वतःचा परिचय देताना 'My name is...' किंवा 'I am...' वापरावे. 'Myself...' वापरणे व्याकरणदृष्ट्या चुकीचे आहे.",
          hi: "परिचय देते समय 'My name is...' या 'I am...' कहें। 'Myself...' कहना व्याकरण की दृष्टि से अशुद्ध है।"
        },
        exampleText: { en: "Correct: 'My name is Rahul. I am studying Computer Engineering in Kopargaon.'", mr: "योग्य: 'My name is Rahul. I am studying in Kopargaon.'", hi: "सही: 'My name is Rahul. I am studying in Kopargaon.'" },
        hasQuestion: true,
        question: {
          en: "Which sentence is grammatically correct for introducing yourself?",
          mr: "स्वतःचा परिचय देण्यासाठी कोणते वाक्य व्याकरणदृष्ट्या अचूक आहे?",
          hi: "अपना परिचय देने के लिए कौन सा वाक्य व्याकरण की दृष्टि से सही है?"
        },
        options: [
          { id: "e2-a", text: { en: "My name is Priya and I am a Class 10 student.", mr: "My name is Priya and I am a Class 10 student.", hi: "My name is Priya and I am a Class 10 student." }, isCorrect: true, explanation: { en: "Correct! 'My name is...' is formal and grammatically precise.", mr: "बरोबर! 'My name is...' हे अचूक आणि शिष्टाचारपूर्ण आहे.", hi: "सही! 'My name is...' सटीक और विनम्र है।" } },
          { id: "e2-b", text: { en: "Myself Priya coming from Kopargaon.", mr: "Myself Priya coming from Kopargaon.", hi: "Myself Priya coming from Kopargaon." }, isCorrect: false, explanation: { en: "'Myself' should not be used as the subject of an introduction.", mr: "'Myself' ने परिचय सुरू करू नये.", hi: "'Myself' से वाक्य शुरू नहीं करना चाहिए।" } }
        ],
        xpReward: 30
      },
      {
        id: "eng-mod-3",
        moduleNumber: 3,
        moduleLabel: { en: "MODULE 3 — Polite Requests", mr: "मॉड्यूल ३ — नम्र विनंती", hi: "मॉड्यूल 3 — विनम्र निवेदन" },
        title: { en: "Using Modal Verbs: Could & Would", mr: "Could आणि Would चा वापर", hi: "Could और Would का प्रयोग" },
        conceptText: {
          en: "To make polite requests, use modal auxiliary verbs like 'Could you please...' or 'Would you mind...'. This sounds much more respectful than imperative commands.",
          mr: "नम्र विनंती करण्यासाठी 'Could you please...' किंवा 'Would you mind...' वापरावे.",
          hi: "विनम्र निवेदन के लिए 'Could you please...' या 'Would you mind...' का प्रयोग करें।"
        },
        exampleText: { en: "'Could you please help me find the laboratory?' instead of 'Tell me where the lab is.'", mr: "'Could you please help me find the lab?' (कृपया मला लॅब दाखवाल का?)", hi: "'Could you please guide me to the lab?'" },
        hasQuestion: true,
        question: {
          en: "How should you politely ask a teacher to repeat an explanation?",
          mr: "शिक्षकांना एखादा मुद्दा पुन्हा समजावून सांगण्याची विनंती कशी करावी?",
          hi: "शिक्षक से किसी बिंदु को दोबारा समझाने का विनम्र निवेदन कैसे करें?"
        },
        options: [
          { id: "e3-a", text: { en: "Could you please explain that concept once again, Sir?", mr: "Could you please explain that concept once again, Sir?", hi: "Could you please explain that concept once again, Sir?" }, isCorrect: true, explanation: { en: "Correct! Polite, respectful, and crystal clear.", mr: "बरोबर! नम्र आणि आदरयुक्त इंग्रजी वाक्य.", hi: "सही! अत्यंत विनम्र और स्पष्ट वाक्य।" } },
          { id: "e3-b", text: { en: "Repeat it now.", mr: "Repeat it now.", hi: "Repeat it now." }, isCorrect: false, explanation: { en: "Direct commands sound impolite in academic settings.", mr: "आज्ञावजा वाक्य उद्धट वाटते.", hi: "यह वाक्य असभ्य प्रतीत होता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "eng-mod-4",
        moduleNumber: 4,
        moduleLabel: { en: "MODULE 4 — Connecting Words", mr: "मॉड्यूल ४ — जोडशब्द (Conjunctions)", hi: "मॉड्यूल 4 — संयोजक (Conjunctions)" },
        title: { en: "Using However, Because & Therefore", mr: "Because, Therefore आणि However चा वापर", hi: "Because, Therefore और However का उपयोग" },
        conceptText: {
          en: "Connecting words join ideas logically. 'Because' shows reason, 'Therefore' shows consequence/result, and 'However' shows contrast.",
          mr: "'Because' कारण दर्शवतो, 'Therefore' परिणाम दर्शवतो, आणि 'However' विरोधाभास दर्शवतो.",
          hi: "'Because' कारण बताता है, 'Therefore' परिणाम बताता है, और 'However' विपरीत बात बताता है।"
        },
        exampleText: { en: "'We had no internet; therefore, we used Nirantar offline.'", mr: "'इंटरनेट नव्हते; म्हणून आम्ही निरंतर ऑफलाइन वापरले.'", hi: "'इंटरनेट नहीं था; इसलिए हमने निरंतर ऑफलाइन उपयोग किया।'" },
        hasQuestion: true,
        question: {
          en: "Choose the correct connecting word: 'The power went out, _______ we continued studying offline.'",
          mr: "योग्य शब्द भरा: 'The power went out, _______ we continued studying offline.'",
          hi: "सही शब्द चुनें: 'The power went out, _______ we continued studying offline.'"
        },
        options: [
          { id: "e4-a", text: { en: "therefore (shows logical outcome)", mr: "therefore (म्हणून)", hi: "therefore (अतः/इसलिए)" }, isCorrect: true, explanation: { en: "Correct! 'Therefore' connects the cause to the result.", mr: "बरोबर! 'therefore' परिणाम दर्शवतो.", hi: "सही! 'therefore' कारण और परिणाम को जोड़ता है।" } },
          { id: "e4-b", text: { en: "because", mr: "because", hi: "because" }, isCorrect: false, explanation: { en: "'Because' expresses reason, not consequence.", mr: "'because' कारण दर्शवतो.", hi: "'because' कारण बताता है।" } }
        ],
        xpReward: 40
      },
      {
        id: "eng-mod-5",
        moduleNumber: 5,
        moduleLabel: { en: "MODULE 5 — Real-World Exhibition Challenge", mr: "मॉड्यूल ५ — प्रदर्शन संवाद आव्हान", hi: "मॉड्यूल 5 — प्रदर्शनी संवाद चुनौती" },
        title: { en: "🎙️ The State Science Exhibition Presentation", mr: "🎙️ विज्ञान प्रदर्शन सादरीकरण", hi: "🎙️ विज्ञान प्रदर्शनी प्रस्तुति" },
        conceptText: {
          en: "You are presenting your offline learning project to university evaluators. Deliver a clear, confident opening statement explaining the value of Nirantar.",
          mr: "तुम्ही परीक्षकांसमोर प्रकल्पाची सुरुवात करत आहात. सर्वात प्रभावी इंग्रजी वाक्य निवडा.",
          hi: "आप परीक्षकों के सामने अपने प्रोजेक्ट की शुरुआत कर रहे हैं। सबसे उपयुक्त अंग्रेजी कथन चुनें।"
        },
        exampleText: { en: "Confident posture, clear voice, and well-structured opening.", mr: "आत्मविश्वासपूर्ण सादरीकरण आणि स्पष्ट आवाज.", hi: "आत्मविश्वास और स्पष्ट आवाज के साथ शुरुआत।" },
        hasQuestion: true,
        question: {
          en: "Which opening statement is the most impactful and professional for your presentation?",
          mr: "सादरीकरणाची सुरुवात करण्यासाठी सर्वात प्रभावी वाक्य कोणते?",
          hi: "प्रोजेक्ट प्रस्तुति शुरू करने के लिए सबसे प्रभावशाली वाक्य कौन सा है?"
        },
        options: [
          { id: "e5-a", text: { en: "Good morning esteemed judges! Today, I am proud to present our offline-first learning platform, Nirantar.", mr: "Good morning esteemed judges! Today, I am proud to present our offline-first learning platform, Nirantar.", hi: "Good morning esteemed judges! Today, I am proud to present our offline-first learning platform, Nirantar." }, isCorrect: true, explanation: { en: "Outstanding! Respectful, articulate, and commands positive attention.", mr: "उत्कृष्ट! आदरयुक्त आणि प्रभावी सादरीकरण वाक्य.", hi: "बहुत बढ़िया! अत्यंत प्रभावी और विनम्र प्रस्तुति।" } },
          { id: "e5-b", text: { en: "Hey everyone, see this app we made.", mr: "Hey everyone, see this app we made.", hi: "Hey everyone, see this app we made." }, isCorrect: false, explanation: { en: "Too informal for an academic presentation.", mr: "हे खूप अनौपचारिक वाटते.", hi: "यह शैक्षणिक प्रस्तुति के लिए बहुत अनौपचारिक है।" } }
        ],
        xpReward: 50
      }
    ]
  }
};
