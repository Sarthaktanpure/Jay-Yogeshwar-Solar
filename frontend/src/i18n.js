import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      brand: "Jay Yogeshwar Solar Energy System",
      nav: {
        home: "Home",
        solutions: "Farmer Solutions",
        estimator: "Pricing Estimator",
        trends: "Solar Trends",
        gallery: "Gallery",
        contact: "Contact",
        admin: "Admin",
      },
      cta: {
        call: "Call now",
        whatsapp: "WhatsApp us",
        quote: "Request a quote",
      },
      home: {
        eyebrow: "Solar for farms, homes, and village businesses",
        title: "Reliable solar setups that reduce bills and keep irrigation moving.",
        body:
          "We help farmers choose the right pump, panel size, and subsidy-ready paperwork with a simple, fast local process.",
        whyTitle: "Why farmers choose us",
        why: [
          "Pump sizing based on real field load, not guesswork",
          "Support for subsidy paperwork and site guidance",
          "Fast service response for villages around Anand and nearby districts",
        ],
      },
      estimator: {
        title: "Quick solar estimate",
        note: "This is a starting estimate with placeholder pricing bands you can tune later.",
      },
      contact: {
        title: "Talk to our team",
        success: "Your request has been sent. We will contact you soon.",
        fallback: "Could not reach the server. Your details are ready to be shared by call or WhatsApp.",
      },
    },
  },
  hi: {
    translation: {
      brand: "जय योगेश्वर सोलर एनर्जी सिस्टम",
      nav: {
        home: "होम",
        solutions: "किसान समाधान",
        estimator: "प्राइसिंग अनुमान",
        trends: "सोलर ट्रेंड्स",
        gallery: "गैलरी",
        contact: "संपर्क",
        admin: "एडमिन",
      },
      cta: {
        call: "अभी कॉल करें",
        whatsapp: "व्हाट्सएप करें",
        quote: "कोटेशन मांगें",
      },
      home: {
        eyebrow: "खेत, घर और गांव के व्यवसाय के लिए सोलर",
        title: "ऐसे सोलर सिस्टम जो बिल कम करें और सिंचाई चालू रखें।",
        body:
          "हम सही पंप, सही पैनल क्षमता और सब्सिडी के लिए जरूरी मार्गदर्शन सरल तरीके से देते हैं।",
        whyTitle: "किसान हमें क्यों चुनते हैं",
        why: [
          "असली लोड के हिसाब से पंप और सिस्टम चयन",
          "सब्सिडी डॉक्यूमेंट और साइट गाइडेंस में मदद",
          "आनंद और आसपास के गांवों में तेज सर्विस सपोर्ट",
        ],
      },
      estimator: {
        title: "जल्दी सोलर अनुमान",
        note: "यह शुरुआती अनुमान है, बाद में आप कीमत का लॉजिक बदल सकते हैं।",
      },
      contact: {
        title: "हमारी टीम से बात करें",
        success: "आपकी जानकारी भेज दी गई है। हम जल्दी संपर्क करेंगे।",
        fallback: "सर्वर से संपर्क नहीं हो सका। आपकी जानकारी कॉल या व्हाट्सएप के लिए तैयार है।",
      },
    },
  },
  mr: {
    translation: {
      brand: "जय योगेश्वर सोलर एनर्जी सिस्टम",
      nav: {
        home: "मुख्यपृष्ठ",
        solutions: "शेतकरी उपाय",
        estimator: "किंमत अंदाज",
        trends: "सोलर ट्रेंड्स",
        gallery: "गॅलरी",
        contact: "संपर्क",
        admin: "अॅडमिन",
      },
      cta: {
        call: "आत्ताच कॉल करा",
        whatsapp: "व्हॉट्सअॅप करा",
        quote: "कोटेशन मागवा",
      },
      home: {
        eyebrow: "शेती, घर आणि गावातील व्यवसायासाठी सोलर",
        title: "वीज बिल कमी करणारी आणि सिंचन सुरू ठेवणारी भरोसेमंद सोलर व्यवस्था.",
        body:
          "योग्य पंप, योग्य पॅनेल क्षमता आणि सबसिडी प्रक्रियेसाठी आम्ही सोपी आणि वेगवान मदत करतो.",
        whyTitle: "शेतकरी आम्हाला का निवडतात",
        why: [
          "अंदाजाने नाही तर प्रत्यक्ष वापरानुसार सिस्टीम निवड",
          "सबसिडी कागदपत्रे आणि साइट मार्गदर्शन",
          "आणंद आणि जवळच्या भागात जलद सेवा प्रतिसाद",
        ],
      },
      estimator: {
        title: "झटपट सोलर अंदाज",
        note: "हा प्राथमिक अंदाज आहे, नंतर किंमत लॉजिक सहज बदलता येईल.",
      },
      contact: {
        title: "आमच्या टीमशी बोला",
        success: "तुमची माहिती पाठवली आहे. आम्ही लवकर संपर्क करू.",
        fallback: "सर्व्हरशी संपर्क झाला नाही. तुमची माहिती कॉल किंवा व्हॉट्सअॅपसाठी तयार आहे.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "mr"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
