
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      // Mock weather data for demo
      // In production, you would use OpenWeatherMap API
      const mockWeather: WeatherData = {
        temperature: 28 + Math.random() * 10,
        humidity: 60 + Math.random() * 30,
        windSpeed: 5 + Math.random() * 10,
        description: 'Partly cloudy',
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
      };
      
      setWeather(mockWeather);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, loading, refetch: fetchWeather };
};
