
import { useLanguage } from '@/contexts/LanguageContext';

export const useTTS = () => {
  const { language } = useLanguage();

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language-specific voice settings
      if (language === 'ta') {
        utterance.lang = 'ta-IN';
        // Try to find a Tamil voice
        const voices = speechSynthesis.getVoices();
        const tamilVoice = voices.find(voice => 
          voice.lang.includes('ta') || 
          voice.lang.includes('Tamil') ||
          voice.name.includes('Tamil')
        );
        if (tamilVoice) {
          utterance.voice = tamilVoice;
        }
      } else {
        utterance.lang = 'en-US';
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      console.log('TTS Settings:', {
        language,
        lang: utterance.lang,
        voice: utterance.voice?.name,
        text: text.substring(0, 50) + '...'
      });
      
      // Add error handling
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported');
    }
  };

  return { speak };
};
