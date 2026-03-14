import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, HeartPulse, Shield } from 'lucide-react-native';

const MOCK_PRODUCTS = {
  '1': { name: 'Smart Blood Pressure Monitor', price: '$120', finance: '$10/mo', rating: '4.8', desc: 'Clinically validated smart blood pressure monitor that syncs flawlessly with your health profile for continuous tracking.' },
  '2': { name: 'Continuous Glucose Monitor', price: '$150', finance: '$15/mo', rating: '4.9', desc: 'Real-time blood sugar monitoring. Get instant insights into how your diet affects your glucose levels without fingerpricks.' },
  '3': { name: 'Digital Smart Scale Pro', price: '$60', finance: '$5/mo', rating: '4.7', desc: 'Comprehensive body composition scale measuring weight, body fat %, muscle mass, and water weight. Auto uploads to your account.' },
  '4': { name: 'Smart ECG Monitor', price: '$199', finance: '$20/mo', rating: '4.9', desc: 'Medical-grade ECG recordings from your smartphone. Detect atrial fibrillation and normal sinus rhythm in just 30 seconds.' },
};

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = MOCK_PRODUCTS[id as keyof typeof MOCK_PRODUCTS] || MOCK_PRODUCTS['1'];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-4 bg-slate-50 border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft size={28} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-slate-900 font-bold text-lg ml-2">Device Details</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Product Image Area */}
        <View className="bg-slate-50 w-full aspect-square items-center justify-center">
          <View className="w-48 h-48 bg-white rounded-full items-center justify-center shadow-lg shadow-slate-200/50">
            <ShoppingBag color="#64748b" size={64} />
          </View>
        </View>

        {/* Product Info */}
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-slate-900 text-3xl font-black flex-1 pr-4">{product.name}</Text>
            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
              <Star color="#eab308" size={16} fill="#eab308" />
              <Text className="text-yellow-700 font-bold ml-1">{product.rating}</Text>
            </View>
          </View>

          <Text className="text-slate-500 text-base leading-6 mb-8">
            {product.desc}
          </Text>

          {/* Features */}
          <View className="flex-row items-center space-x-6 mb-10">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center mr-3">
                <ShieldCheck color="#10b981" size={20} />
              </View>
              <Text className="text-slate-700 font-medium">1 Year Warranty</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center mr-3">
                <HeartPulse color="#4f46e5" size={20} />
              </View>
              <Text className="text-slate-700 font-medium">Health Sync</Text>
            </View>
          </View>

          {/* Purchase Options */}
          <Text className="text-slate-900 font-bold text-xl mb-4">Choose Payment Method</Text>

          {/* Option 1: Buy Outright */}
          <TouchableOpacity 
            className="border-2 border-slate-200 rounded-3xl p-5 mb-4 active:bg-slate-50 transition-colors"
            onPress={() => router.push(`/checkout?id=${id}` as any)}
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-900 font-bold text-xl">Buy Outright</Text>
              <Text className="text-slate-900 font-black text-2xl">{product.price}</Text>
            </View>
            <Text className="text-slate-500">Pay once and own the device immediately.</Text>
          </TouchableOpacity>

          {/* Option 2: Apply for Loan */}
          <TouchableOpacity 
            className="border-2 border-indigo-600 bg-indigo-50/30 rounded-3xl p-5"
            onPress={() => router.push(`/loan-apply?id=${id}` as any)}
          >
            <View className="absolute -top-3 right-6 bg-indigo-600 px-3 py-1 rounded-full flex-row items-center">
              <Shield color="white" size={12} className="mr-1" />
              <Text className="text-white text-xs font-bold">0% Interest Available</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-900 font-bold text-xl">Device Financing</Text>
              <Text className="text-indigo-600 font-black text-2xl">{product.finance}</Text>
            </View>
            <Text className="text-slate-500">Pay over 3, 6, or 12 months. Requires ID and bank statement upload.</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}
