import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDiseaseDetection } from '@/hooks/useDiseaseDetection';
import { useTTS } from '@/hooks/useTTS';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Play, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface DetectionResult {
  disease: string;
  confidence: number;
  treatment: string;
  isHealthy: boolean;
}

const UploadPage = () => {
  const { t, language } = useLanguage();
  const { analyzeImage, isAnalyzing } = useDiseaseDetection();
  const { speak } = useTTS();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileSelect = (file: File) => {
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error(t('uploadError'));
      return;
    }

    try {
      const analysisResult = await analyzeImage(selectedImage);
      setResult(analysisResult);
      toast.success(t('uploadSuccess'));
    } catch (error) {
      toast.error(t('uploadError'));
    }
  };

  const getTreatmentInTamil = (disease: string) => {
    const treatments: Record<string, string> = {
      'Leaf Blight': 'தாமிர பூஞ்சைக் கொல்லி தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை அகற்றவும். சரியான வடிகால் உறுதிப்படுத்தவும்.',
      'Powdery Mildew': 'கந்தக அடிப்படையிலான பூஞ்சைக் கொல்லி பயன்படுத்தவும். காற்று சுழற்சியை மேம்படுத்தவும். தலைக்கு மேல் நீர் பாய்ச்சுவதை தவிர்க்கவும்.',
      'Bacterial Spot': 'தாமிர தெளிப்பான் தெளிக்கவும். தொற்று பாதிக்கப்பட்ட தாவர பாகங்களை அகற்றவும். பயிர் சுழற்சி பின்பற்றவும்.',
      'Rust Disease': 'புரோபிகோனசோல் கொண்ட பூஞ்சைக் கொல்லி தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை உடனே அகற்றவும்.',
      'Anthracnose': 'தாமிர அடிப்படையிலான பூஞ்சைக் கொல்லி பயன்படுத்தவும். வடிகால் மற்றும் காற்று சுழற்சியை மேம்படுத்தவும்.',
      'Healthy': 'உங்கள் தாவரம் ஆரோக்கியமாக தெரிகிறது! வழக்கமான பராமரிப்பை தொடரவும்.'
    };
    return treatments[disease] || result?.treatment || '';
  };

  const handleSpeak = () => {
    if (result) {
      const textToSpeak = language === 'ta' 
        ? getTreatmentInTamil(result.disease)
        : result.treatment;
      
      console.log('Speaking text:', { 
        language, 
        disease: result.disease,
        textToSpeak: textToSpeak.substring(0, 50) + '...'
      });
      
      speak(textToSpeak);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-green-800">{t('uploadLeafImage')}</h1>
        <p className="text-green-600 mt-2">
          Take a photo or upload an image of a plant leaf for AI analysis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-green-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-green-800">Upload Image</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected crop"
                    className="w-full h-64 object-cover rounded-lg border-2 border-green-200"
                  />
                </div>
              )}

              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t('chooseFile')}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // In a real app, this would open camera
                    fileInputRef.current?.click();
                  }}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {t('takePhoto')}
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Analyze Button */}
              {selectedImage && (
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-blue-200">
            <CardHeader>
              <h3 className="text-lg font-semibold text-blue-800">{t('detectionResult')}</h3>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center py-8 text-gray-500">
                  Upload and analyze an image to see results
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Disease Status */}
                  <div className="flex items-center space-x-3">
                    {result.isHealthy ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">
                        {result.isHealthy ? t('healthyPlant') : t('diseaseDetected')}
                      </h4>
                      <p className="text-gray-600">{result.disease}</p>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('confidence')}</p>
                    <Badge 
                      variant="outline" 
                      className={`${
                        result.confidence > 0.8 
                          ? 'border-green-300 text-green-700' 
                          : 'border-yellow-300 text-yellow-700'
                      }`}
                    >
                      {(result.confidence * 100).toFixed(1)}%
                    </Badge>
                  </div>

                  {/* Treatment */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">{t('treatment')}</h5>
                    <p className="text-blue-700 text-sm mb-3">
                      {language === 'ta' ? getTreatmentInTamil(result.disease) : result.treatment}
                    </p>
                    
                    {/* TTS Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSpeak}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {language === 'ta' ? 'தமிழில் கேளுங்கள்' : 'Listen'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
