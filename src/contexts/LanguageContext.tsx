
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation & General
    appName: 'AgroCast',
    tagline: 'AI-Powered Crop Disease Detection',
    dashboard: 'Dashboard',
    upload: 'Upload Image',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    signup: 'Sign Up',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    location: 'Location',
    farmSize: 'Farm Size (acres)',
    createAccount: 'Create Account',
    signInAccount: 'Sign In to Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Dashboard
    welcomeBack: 'Welcome back',
    recentScans: 'Recent Scans',
    weatherForecast: 'Weather Forecast',
    diseaseRiskLevel: 'Disease Risk Level',
    riskLow: 'Low Risk',
    riskMedium: 'Medium Risk',
    riskHigh: 'High Risk',
    uploadNewImage: 'Upload New Image',
    viewHistory: 'View History',
    
    // Upload & Detection
    uploadLeafImage: 'Upload Leaf Image',
    takePhoto: 'Take Photo',
    chooseFile: 'Choose File',
    analyzing: 'Analyzing...',
    detectionResult: 'Detection Result',
    diseaseDetected: 'Disease Detected',
    healthyPlant: 'Healthy Plant',
    confidence: 'Confidence',
    treatment: 'Recommended Treatment',
    listenInTamil: 'Listen in Tamil',
    
    // Weather
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    forecast: 'Forecast',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    retry: 'Retry',
    close: 'Close',
    loading: 'Loading...',
    
    // Error Messages
    loginError: 'Login failed. Please check your credentials.',
    uploadError: 'Failed to upload image. Please try again.',
    networkError: 'Network error. Please check your connection.',
    
    // Success Messages
    loginSuccess: 'Login successful!',
    uploadSuccess: 'Image uploaded successfully!',
    accountCreated: 'Account created successfully!'
  },
  ta: {
    // Navigation & General
    appName: 'அக்ரோகாஸ்ட்',
    tagline: 'AI-இயங்கும் பயிர் நோய் கண்டறிதல்',
    dashboard: 'முதன்மை பக்கம்',
    upload: 'படம் பதிவேற்று',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    login: 'உள்நுழை',
    signup: 'பதிவு செய்',
    
    // Authentication
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல் உறுதிப்படுத்தல்',
    fullName: 'முழு பெயர்',
    phoneNumber: 'தொலைபேசி எண்',
    location: 'இடம்',
    farmSize: 'பண்ணை அளவு (ஏக்கர்)',
    createAccount: 'கணக்கை உருவாக்கு',
    signInAccount: 'கணக்கில் உள்நுழை',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    
    // Dashboard
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    recentScans: 'சமீபத்திய ஸ்கேன்கள்',
    weatherForecast: 'வானிலை முன்னறிவிப்பு',
    diseaseRiskLevel: 'நோய் ஆபத்து நிலை',
    riskLow: 'குறைந்த ஆபத்து',
    riskMedium: 'நடுத்தர ஆபத்து',
    riskHigh: 'அதிக ஆபத்து',
    uploadNewImage: 'புதிய படம் பதிவேற்று',
    viewHistory: 'வரலாற்றைப் பார்க்க',
    
    // Upload & Detection
    uploadLeafImage: 'இலை படம் பதிவேற்று',
    takePhoto: 'புகைப்படம் எடு',
    chooseFile: 'கோப்பைத் தேர்வுசெய்',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    detectionResult: 'கண்டறிதல் முடிவு',
    diseaseDetected: 'நோய் கண்டறியப்பட்டது',
    healthyPlant: 'ஆரோக்கியமான தாவரம்',
    confidence: 'நம்பிக்கை',
    treatment: 'பரிந்துரைக்கப்பட்ட சிகிச்சை',
    listenInTamil: 'தமிழில் கேளுங்கள்',
    
    // Weather
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    windSpeed: 'காற்றின் வேகம்',
    forecast: 'முன்னறிவிப்பு',
    
    // Common Actions
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    submit: 'சமர்ப்பி',
    retry: 'மீண்டும் முயற்சி',
    close: 'மூடு',
    loading: 'ஏற்றுகிறது...',
    
    // Error Messages
    loginError: 'உள்நுழைவு தோல்வி. உங்கள் சான்றுகளைச் சரிபார்க்கவும்.',
    uploadError: 'படம் பதிவேற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    networkError: 'நெட்வொர்க் பிழை. உங்கள் இணைப்பைச் சரிபார்க்கவும்.',
    
    // Success Messages
    loginSuccess: 'உள்நுழைவு வெற்றிகரமாக!',
    uploadSuccess: 'படம் வெற்றிகரமாக பதிவேற்றப்பட்டது!',
    accountCreated: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('agrocast-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('agrocast-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
