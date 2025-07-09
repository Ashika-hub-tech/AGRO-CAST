
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-green-600" />
      <div className="flex rounded-lg overflow-hidden border border-green-200">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`rounded-none px-3 py-1 text-xs ${
            language === 'en' 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'text-green-600 hover:bg-green-50'
          }`}
        >
          EN
        </Button>
        <Button
          variant={language === 'ta' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('ta')}
          className={`rounded-none px-3 py-1 text-xs ${
            language === 'ta' 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'text-green-600 hover:bg-green-50'
          }`}
        >
          தமிழ்
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
