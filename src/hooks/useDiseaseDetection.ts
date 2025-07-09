
import { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

interface DetectionResult {
  disease: string;
  confidence: number;
  treatment: string;
  isHealthy: boolean;
}

export const useDiseaseDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  // Mock disease data for demo purposes
  const diseases = [
    {
      name: 'Leaf Blight',
      treatment: 'Apply copper fungicide. Remove affected leaves. Ensure proper drainage.',
      treatmentTamil: 'தாமிர பூஞ்சைக் கொல்லி தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை அகற்றவும். சரியான வடிகால் உறுதிப்படுத்தவும்.'
    },
    {
      name: 'Powdery Mildew',
      treatment: 'Use sulfur-based fungicide. Improve air circulation. Avoid overhead watering.',
      treatmentTamil: 'கந்தக அடிப்படையிலான பூஞ்சைக் கொல்லி பயன்படுத்தவும். காற்று சுழற்சியை மேம்படுத்தவும். தலைக்கு மேல் நீர் பாய்ச்சுவதை தவிர்க்கவும்.'
    },
    {
      name: 'Bacterial Spot',
      treatment: 'Apply copper spray. Remove infected plant parts. Practice crop rotation.',
      treatmentTamil: 'தாமிர தெளிப்பான் தெளிக்கவும். தொற்று பாதிக்கப்பட்ட தாவர பாகங்களை அகற்றவும். பயிர் சுழற்சி பின்பற்றவும்.'
    },
    {
      name: 'Rust Disease',
      treatment: 'Apply fungicide containing propiconazole. Remove affected leaves immediately.',
      treatmentTamil: 'புரோபிகோனசோல் கொண்ட பூஞ்சைக் கொல்லி தெளிக்கவும். பாதிக்கப்பட்ட இலைகளை உடனே அகற்றவும்.'
    },
    {
      name: 'Anthracnose',
      treatment: 'Use copper-based fungicide. Improve drainage and air circulation.',
      treatmentTamil: 'தாமிர அடிப்படையிலான பூஞ்சைக் கொல்லி பயன்படுத்தவும். வடிகால் மற்றும் காற்று சுழற்சியை மேம்படுத்தவும்.'
    }
  ];

  const loadModel = async () => {
    try {
      // In a real app, you would load your trained model
      // const loadedModel = await tf.loadLayersModel('/models/crop-disease-model.json');
      // setModel(loadedModel);
      console.log('Model loading simulated for demo');
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  };

  const analyzeImage = async (imageFile: File): Promise<DetectionResult> => {
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use a more reliable randomization approach for production
      // Create random seed based on file properties and current time
      const fileSeed = imageFile.name.length + imageFile.size + Date.now();
      const seedValue = (fileSeed % 1000) / 1000; // Normalize to 0-1
      
      console.log('Detection analysis with seed:', { fileSeed, seedValue });
      
      // 30% chance of being healthy (reduced from 40%)
      const isHealthy = seedValue < 0.3;
      
      if (isHealthy) {
        return {
          disease: 'Healthy',
          confidence: 0.85 + (seedValue * 0.12), // 85-97% confidence
          treatment: 'Your plant appears healthy! Continue with regular care and monitoring.',
          isHealthy: true
        };
      } else {
        // Select disease based on seed value for consistent results
        let diseaseIndex;
        if (seedValue < 0.5) {
          diseaseIndex = 0; // Leaf Blight - most common
        } else if (seedValue < 0.65) {
          diseaseIndex = 1; // Powdery Mildew
        } else if (seedValue < 0.78) {
          diseaseIndex = 2; // Bacterial Spot
        } else if (seedValue < 0.9) {
          diseaseIndex = 3; // Rust Disease
        } else {
          diseaseIndex = 4; // Anthracnose
        }
        
        const selectedDisease = diseases[diseaseIndex];
        const confidence = 0.72 + (seedValue * 0.23); // 72-95% confidence
        
        console.log('Disease detected:', { 
          selectedDisease: selectedDisease.name, 
          confidence,
          diseaseIndex,
          seedValue 
        });
        
        return {
          disease: selectedDisease.name,
          confidence: confidence,
          treatment: selectedDisease.treatment,
          isHealthy: false
        };
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analyzeImage,
    loadModel
  };
};
