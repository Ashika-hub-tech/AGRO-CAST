
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Phone, MapPin, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  location: string;
  farmSize: string;
}

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>();
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    setIsLoading(true);
    const success = await signup(data.email, data.password);
    setIsLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-green-600 p-3 rounded-full w-fit mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">{t('appName')}</h2>
            <p className="text-green-600">{t('createAccount')}</p>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-green-700">{t('fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="fullName"
                    placeholder={t('fullName')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('fullName', { required: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('email')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('email', { required: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-green-700">{t('phoneNumber')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="phoneNumber"
                    placeholder={t('phoneNumber')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('phoneNumber', { required: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-green-700">{t('location')}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="location"
                    placeholder={t('location')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('location', { required: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-green-700">{t('farmSize')}</Label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="farmSize"
                    placeholder={t('farmSize')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('farmSize', { required: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-700">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('password')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-green-700">{t('confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t('confirmPassword')}
                    className="pl-10 border-green-200 focus:border-green-500"
                    {...register('confirmPassword', { 
                      required: true,
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? t('loading') : t('createAccount')}
              </Button>

              <p className="text-center text-sm text-gray-600">
                {t('alreadyHaveAccount')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {t('login')}
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
