import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { User, Mail, Lock, HeartPulse } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleRegister = () => {
    // Mock registration functionality
    if (firstName && email && password) {
      login({
        id: Math.random().toString(),
        firstName,
        lastName,
        email,
        currentHealthScore: 70, // Baseline score
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
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-emerald-500 rounded-2xl items-center justify-center mb-4 shadow-md shadow-emerald-500/30">
            <HeartPulse size={32} color="white" strokeWidth={2.5} />
          </View>
          <Text className="text-3xl font-bold text-slate-900 mb-2">Create Account</Text>
          <Text className="text-slate-500 text-base text-center">
            Join the premium digital health ecosystem today.
          </Text>
        </View>

        <View className="space-y-4">
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white rounded-2xl flex-row items-center px-4 py-4 border border-slate-100 shadow-sm shadow-slate-200/50">
              <User color="#94a3b8" size={20} className="mr-2" />
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#94a3b8"
                value={firstName}
                onChangeText={setFirstName}
                className="flex-1 text-slate-800 text-base font-medium"
              />
            </View>
            <View className="flex-1 bg-white rounded-2xl flex-row items-center px-4 py-4 border border-slate-100 shadow-sm shadow-slate-200/50">
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#94a3b8"
                value={lastName}
                onChangeText={setLastName}
                className="flex-1 text-slate-800 text-base font-medium"
              />
            </View>
          </View>

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

        <TouchableOpacity
          className="bg-slate-900 rounded-2xl py-4 items-center shadow-lg shadow-slate-900/20 mt-8"
          onPress={handleRegister}
        >
          <Text className="text-white text-lg font-bold">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-10">
          <Text className="text-slate-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-emerald-600 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
