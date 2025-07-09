
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, History, Camera, Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { weather, loading } = useWeather();
  const navigate = useNavigate();

  const recentScans = [
    { id: 1, date: '2024-01-15', disease: 'Leaf Blight', confidence: 89 },
    { id: 2, date: '2024-01-14', disease: 'Healthy', confidence: 95 },
    { id: 3, date: '2024-01-13', disease: 'Powdery Mildew', confidence: 82 }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-800">
          {t('welcomeBack')}, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-green-600 mt-2">
          {t('tagline')}
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-green-200">
          <CardContent className="p-6" onClick={() => navigate('/upload')}>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-3 rounded-full">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">{t('uploadNewImage')}</h3>
                <p className="text-green-600 text-sm">Scan your crops for diseases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-600 p-3 rounded-full">
                <History className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800">{t('viewHistory')}</h3>
                <p className="text-amber-600 text-sm">Check previous scans</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weather and Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Weather Card */}
        <Card className="border-blue-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-blue-800 flex items-center">
              <Thermometer className="h-5 w-5 mr-2" />
              {t('weatherForecast')}
            </h3>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-blue-600">{t('loading')}</p>
            ) : weather ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Thermometer className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <p className="text-sm text-gray-600">{t('temperature')}</p>
                    <p className="font-semibold">{weather.temperature.toFixed(1)}°C</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600">{t('humidity')}</p>
                    <p className="font-semibold">{weather.humidity.toFixed(0)}%</p>
                  </div>
                  <div className="text-center">
                    <Wind className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600">{t('windSpeed')}</p>
                    <p className="font-semibold">{weather.windSpeed.toFixed(1)} km/h</p>
                  </div>
                </div>
                <p className="text-center text-blue-700 font-medium">{weather.description}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Disease Risk Card */}
        <Card className="border-orange-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-orange-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {t('diseaseRiskLevel')}
            </h3>
          </CardHeader>
          <CardContent>
            {weather && (
              <div className="text-center">
                <Badge 
                  className={`text-lg px-4 py-2 ${getRiskColor(weather.riskLevel)}`}
                >
                  {t(`risk${weather.riskLevel.charAt(0).toUpperCase() + weather.riskLevel.slice(1)}`)}
                </Badge>
                <p className="text-sm text-gray-600 mt-3">
                  Based on current weather conditions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Scans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-purple-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-purple-800">{t('recentScans')}</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{scan.disease}</p>
                    <p className="text-sm text-gray-600">{scan.date}</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700">
                    {scan.confidence}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
