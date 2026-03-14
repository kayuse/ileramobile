import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Clock, CheckCircle } from 'lucide-react-native';

export default function LoanSuccessScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="w-24 h-24 bg-indigo-50 rounded-full items-center justify-center mb-8 animate-pulse">
        <CheckCircle size={48} color="#4f46e5" />
      </View>
      
      <Text className="text-4xl font-extrabold text-slate-900 mb-4 text-center">Application Received</Text>
      
      <Text className="text-slate-500 text-base text-center mb-10 leading-6">
        We&apos;ve successfully received your financing application and documents. Our banking partners are reviewing your profile.
      </Text>

      <View className="bg-slate-50 w-full p-5 rounded-2xl flex-row items-center border border-slate-100 mb-10">
        <View className="bg-indigo-100 p-3 rounded-xl mr-4">
          <Clock color="#4f46e5" size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-slate-900 font-bold mb-1">Under Review</Text>
          <Text className="text-slate-500 text-sm">Decisions typically take 1-2 hours. We will notify you via email.</Text>
        </View>
      </View>

      <TouchableOpacity 
        className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-lg shadow-slate-900/20"
        onPress={() => router.replace('/(tabs)/market')}
      >
        <Text className="text-white font-bold text-lg">Return to Marketplace</Text>
      </TouchableOpacity>
    </View>
  );
}
