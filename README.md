# 🌱 AgroCast - AI-Powered Crop Disease Detection

AgroCast is a comprehensive mobile-first web application designed specifically for Indian farmers to detect crop diseases using AI technology. The app features bilingual support (English/Tamil), offline-first design, weather-based risk assessment, and voice guidance for treatment instructions.

## 🚀 Features

### 🔬 AI-Powered Disease Detection
- Upload leaf images for instant AI analysis
- Real-time disease identification with confidence scoring
- Comprehensive treatment recommendations
- Support for multiple crop diseases

### 🌍 Bilingual Support
- Full English and Tamil language support
- Seamless language switching
- Culturally appropriate interface design
- Tamil voice synthesis for treatment instructions

### 🌤️ Weather Integration
- Real-time weather data integration
- Disease risk assessment based on weather conditions
- Predictive analytics for disease prevention
- Location-based forecasting

### 🔊 Voice Guidance
- Text-to-speech in Tamil and English
- Audio treatment instructions for accessibility
- Perfect for farmers with varying literacy levels

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Offline-first architecture for rural connectivity
- Progressive Web App (PWA) capabilities
- Fast loading and smooth performance

### 🔐 User Management
- Firebase authentication
- Secure user profiles with farming details
- Scan history tracking
- Cloud data synchronization

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with custom agricultural theme
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **React Hook Form** for form management

### Backend & Services
- **Firebase** for authentication and database
- **TensorFlow.js** for on-device AI inference
- **OpenWeatherMap API** for weather data
- **Web Speech API** for text-to-speech

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code quality
- **TypeScript** for type safety
- **React Query** for data fetching

## 🎨 Design System

### Color Palette
- **AgroGreen**: Primary agricultural green theme
- **AgroBrown**: Secondary earth-tone colors
- **Responsive gradients** for visual appeal
- **High contrast** for accessibility

### Features
- **Mobile-optimized** interface
- **Tamil typography** support
- **Agricultural iconography**
- **Intuitive navigation**

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase project with authentication enabled
- OpenWeatherMap API key (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agrocast.git
   cd agrocast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Update `src/lib/firebase.ts` with your config

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173 in your browser
   - Create an account or use demo credentials

## 📱 Usage Guide

### For Farmers
1. **Sign up** with email and farming details
2. **Upload leaf images** using camera or file selection
3. **Get AI analysis** with disease detection results
4. **Listen to treatment advice** in Tamil or English
5. **Check weather-based risk levels** for preventive care
6. **Track scan history** for record keeping

### For Developers
1. **Customize disease models** in `src/hooks/useDiseaseDetection.ts`
2. **Add new languages** in `src/contexts/LanguageContext.tsx`
3. **Extend weather features** in `src/hooks/useWeather.ts`
4. **Modify UI themes** in `src/index.css`

## 🌟 Key Features Deep Dive

### AI Disease Detection
- **TensorFlow.js integration** for client-side inference
- **Image preprocessing** for optimal analysis
- **Confidence scoring** for result reliability
- **Treatment database** with proven solutions

### Weather Integration
- **Real-time data** from OpenWeatherMap
- **Risk assessment algorithms** based on humidity, temperature
- **Forecast displays** with farmer-friendly visualizations
- **Disease prevention recommendations**

### Offline Capabilities
- **Local storage** for scan history
- **Cached disease data** for offline analysis
- **Progressive loading** for poor connectivity
- **Background sync** when connection returns

### Accessibility
- **Voice guidance** in native languages
- **High contrast** design for outdoor visibility
- **Touch-friendly** interface for mobile use
- **Simple navigation** for all literacy levels

## 🔧 Configuration

### Firebase Setup
```javascript
// src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

### API Keys
- **OpenWeatherMap**: For weather data
- **Firebase**: For authentication and database
- **TensorFlow Models**: For disease detection

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Various Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository
- **Firebase Hosting**: `firebase deploy`
- **Replit**: Fork and deploy directly

## 🤝 Contributing

We welcome contributions from developers, agriculturalists, and AI researchers!

### Areas for Contribution
- **Disease model improvements**
- **New language support**
- **Weather feature enhancements**
- **UI/UX improvements**
- **Documentation updates**

### Development Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Indian farmers** for inspiration and feedback
- **TensorFlow.js team** for AI framework
- **Firebase team** for backend services
- **React team** for the frontend framework
- **Open source community** for various libraries

## 📞 Support

For support, email support@agrocast.app or join our community discussions.

---

**AgroCast** - Empowering Indian farmers with AI technology for better crop health management. 🌱🇮🇳
