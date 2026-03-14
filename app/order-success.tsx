import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle, Package } from 'lucide-react-native';

export default function OrderSuccessScreen() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-6">
      <View className="w-24 h-24 bg-emerald-100 rounded-full items-center justify-center mb-8 animate-bounce">
        <CheckCircle size={48} color="#10b981" />
      </View>
      
      <Text className="text-4xl font-extrabold text-slate-900 mb-4 text-center">Order Confirmed!</Text>
      
      <Text className="text-slate-500 text-base text-center mb-8 leading-6">
        Thank you for your purchase. Your new digital health device is being prepared for shipping and will arrive in 2-3 business days.
      </Text>

      <View className="bg-white w-full p-5 rounded-2xl flex-row items-center border border-slate-100 shadow-sm shadow-slate-200 mb-10">
        <View className="bg-indigo-50 p-3 rounded-xl mr-4">
          <Package color="#4f46e5" size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-slate-900 font-bold mb-1">Track Your Shipment</Text>
          <Text className="text-slate-500 text-sm">Order #ORD-849201</Text>
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
