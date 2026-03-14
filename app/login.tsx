import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, HeartPulse } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Mock login functionality
    if (email && password) {
      login({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        currentHealthScore: 85,
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-12">
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-emerald-500 rounded-3xl items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
            <HeartPulse size={40} color="white" strokeWidth={2.5} />
          </View>
          <Text className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</Text>
          <Text className="text-slate-500 text-base text-center">
            Sign in to continue your health and wellness journey.
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-white rounded-2xl flex-row items-center px-4 py-4 border border-slate-100 shadow-sm shadow-slate-200/50">
            <Mail color="#94a3b8" size={20} className="mr-3" />
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="flex-1 text-slate-800 text-base font-medium"
            />
          </View>

          <View className="bg-white rounded-2xl flex-row items-center px-4 py-4 border border-slate-100 shadow-sm shadow-slate-200/50">
            <Lock color="#94a3b8" size={20} className="mr-3" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="flex-1 text-slate-800 text-base font-medium"
            />
          </View>
        </View>

        <TouchableOpacity className="mt-4 mb-8 self-end">
          <Text className="text-emerald-600 font-semibold">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-slate-900 rounded-2xl py-4 items-center shadow-lg shadow-slate-900/20"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-10">
          <Text className="text-slate-500">Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="text-emerald-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
