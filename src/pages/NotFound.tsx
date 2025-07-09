
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: '404 - Page Not Found',
      message: 'The page you are looking for does not exist.',
      backHome: 'Back to Home'
    },
    ta: {
      title: '404 - பக்கம் கிடைக்கவில்லை',
      message: 'நீங்கள் தேடும் பக்கம் இல்லை.',
      backHome: 'முகப்புக்கு திரும்பு'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {content[language].title}
        </h2>
        <p className="text-gray-600 mb-8">
          {content[language].message}
        </p>
        <Button asChild>
          <Link to="/dashboard">
            {content[language].backHome}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
