import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react-native';

const MOCK_PRODUCTS = {
  '1': { name: 'Smart Blood Pressure Monitor', price: '$120' },
  '2': { name: 'Continuous Glucose Monitor', price: '$150' },
  '3': { name: 'Digital Smart Scale Pro', price: '$60' },
  '4': { name: 'Smart ECG Monitor', price: '$199' },
};

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams();
  const product = MOCK_PRODUCTS[id as keyof typeof MOCK_PRODUCTS] || MOCK_PRODUCTS['1'];
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment API call
    setTimeout(() => {
      setIsProcessing(false);
      router.replace('/order-success');
    }, 2000);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center px-6 pt-16 pb-4 bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2" disabled={isProcessing}>
          <ChevronLeft size={28} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-slate-900 font-bold text-lg ml-2">Secure Checkout</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Order Summary Form */}
        <Text className="text-slate-900 font-bold text-xl mb-4">Order Summary</Text>
        
        <View className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm shadow-slate-200/50 mb-6">
          <View className="flex-row items-center mb-4 pb-4 border-b border-slate-100">
            <View className="w-16 h-16 bg-slate-50 rounded-xl items-center justify-center mr-4">
              <ShoppingBag color="#64748b" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 font-bold text-lg">{product.name}</Text>
              <Text className="text-slate-500 text-sm">Qty: 1</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-slate-600">Subtotal</Text>
            <Text className="text-slate-900 font-medium">{product.price}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-slate-600">Shipping</Text>
            <Text className="text-emerald-600 font-medium">Free</Text>
          </View>
          <View className="flex-row justify-between items-center mt-2 pt-4 border-t border-slate-100">
            <Text className="text-slate-900 font-bold text-lg">Total</Text>
            <Text className="text-indigo-600 font-black text-2xl">{product.price}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text className="text-slate-900 font-bold text-xl mb-4">Payment Method</Text>
        <View className="bg-white p-5 rounded-2xl border border-indigo-600 bg-indigo-50/20 mb-8">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center mr-3">
                <CreditCard color="#4f46e5" size={20} />
              </View>
              <View>
                <Text className="text-slate-900 font-bold">•••• •••• •••• 4242</Text>
                <Text className="text-slate-500 text-sm">Expires 12/28</Text>
              </View>
            </View>
            <View className="w-5 h-5 rounded-full border-4 border-indigo-600 bg-white" />
          </View>
        </View>

        <View className="flex-row items-center justify-center mb-8">
          <ShieldCheck color="#10b981" size={16} className="mr-2" />
          <Text className="text-slate-500 text-sm">Payments are secure and encrypted</Text>
        </View>

      </ScrollView>

      {/* Footer CTA */}
      <View className="p-6 bg-white border-t border-slate-100 pb-10">
        <TouchableOpacity 
          className={`py-4 rounded-xl items-center flex-row justify-center ${isProcessing ? 'bg-slate-800' : 'bg-slate-900 shadow-lg shadow-slate-900/20'}`}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator color="white" className="mr-3" />
              <Text className="text-white font-bold text-lg">Processing...</Text>
            </>
          ) : (
            <Text className="text-white font-bold text-lg">Pay {product.price}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
