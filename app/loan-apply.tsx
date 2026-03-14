import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { X, ShieldCheck, Landmark, CheckCircle, FileText, UploadCloud, Building, Briefcase, ChevronRight } from 'lucide-react-native';

const MOCK_PRODUCTS = {
  '1': { name: 'Smart Blood Pressure Monitor', price: 120 },
  '2': { name: 'Continuous Glucose Monitor', price: 150 },
  '3': { name: 'Digital Smart Scale Pro', price: 60 },
  '4': { name: 'Smart ECG Monitor', price: 199 },
};

export default function LoanApplyScreen() {
  const { id } = useLocalSearchParams();
  const product = MOCK_PRODUCTS[id as keyof typeof MOCK_PRODUCTS] || MOCK_PRODUCTS['1'];

  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Form State
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employer, setEmployer] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  
  // Document State
  const [docs, setDocs] = useState({
    id: false,
    bank: false,
    utility: false
  });

  const plans = [
    { id: 1, months: 3, amount: `$${Math.ceil((product.price * 1.05) / 3)}/mo`, total: `$${Math.ceil(product.price * 1.05)}` },
    { id: 2, months: 6, amount: `$${Math.ceil((product.price * 1.10) / 6)}/mo`, total: `$${Math.ceil(product.price * 1.10)}`, popular: true },
    { id: 3, months: 12, amount: `$${Math.ceil((product.price * 1.15) / 12)}/mo`, total: `$${Math.ceil(product.price * 1.15)}` },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsDeploying(true);
      setTimeout(() => {
        setIsDeploying(false);
        router.replace('/loan-success');
      }, 2500);
    }
  };

  const uploadMockDocument = (type: keyof typeof docs) => {
    // Simulate uploading a document by toggling state
    setDocs(prev => ({ ...prev, [type]: true }));
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-6 pt-16 pb-4 bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} disabled={isDeploying}>
          <X size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-slate-900 font-bold text-lg">Financing Application</Text>
        <Text className="text-slate-400 font-semibold">{step} of 4</Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-1 bg-slate-100">
        <View 
          className="h-full bg-indigo-600 transition-all duration-300" 
          style={{ width: `${(step / 4) * 100}%` }} 
        />
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* STEP 1: Income and Employment */}
        {step === 1 && (
          <View className="py-6 animate-fade-in">
            <View className="bg-indigo-50 w-16 h-16 rounded-full items-center justify-center mb-6">
              <Briefcase size={28} color="#4f46e5" />
            </View>
            <Text className="text-3xl font-extrabold text-slate-900 mb-2">Employment Info</Text>
            <Text className="text-slate-500 mb-8 leading-6 text-base">
              Help partner banks determine your eligibility for financing the {product.name}.
            </Text>

            <View className="mb-5">
              <Text className="text-slate-700 font-bold mb-2">Monthly Net Income (USD)</Text>
              <TextInput
                className="bg-white border border-slate-200 p-4 rounded-2xl text-lg font-medium shadow-sm shadow-slate-100"
                placeholder="e.g. 5000"
                keyboardType="numeric"
                value={monthlyIncome}
                onChangeText={setMonthlyIncome}
              />
            </View>
            
            <View className="mb-8">
              <Text className="text-slate-700 font-bold mb-2">Employer Name</Text>
              <TextInput
                className="bg-white border border-slate-200 p-4 rounded-2xl text-lg font-medium shadow-sm shadow-slate-100"
                placeholder="Company Name"
                value={employer}
                onChangeText={setEmployer}
              />
            </View>

            <View className="bg-emerald-50 p-4 rounded-xl flex-row items-center border border-emerald-100/50">
              <ShieldCheck color="#10b981" size={24} className="mr-3" />
              <Text className="flex-1 text-emerald-800 text-sm font-medium">Your data is securely encrypted and shared only for credit decisions.</Text>
            </View>
          </View>
        )}

        {/* STEP 2: Plan Selection */}
        {step === 2 && (
          <View className="py-6 animate-fade-in">
             <View className="bg-indigo-50 w-16 h-16 rounded-full items-center justify-center mb-6">
              <Landmark size={28} color="#4f46e5" />
            </View>
            <Text className="text-3xl font-extrabold text-slate-900 mb-2">Select a Plan</Text>
            <Text className="text-slate-500 mb-8 text-base">Choose an installment plan that works for you.</Text>

            {plans.map((plan) => (
              <TouchableOpacity 
                key={plan.id}
                className={`p-5 rounded-2xl mb-4 border-2 transition-colors ${selectedPlan === plan.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-white bg-white shadow-sm shadow-slate-200'}`}
                onPress={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <View className="absolute -top-3 right-4 bg-indigo-600 px-3 py-1 rounded-full">
                    <Text className="text-white text-[10px] font-black uppercase tracking-wider">Most Popular</Text>
                  </View>
                )}
                <View className="flex-row justify-between items-center mb-1">
                  <Text className={`font-bold text-xl ${selectedPlan === plan.id ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {plan.months} Months
                  </Text>
                  <Text className="text-indigo-600 font-black text-2xl">{plan.amount}</Text>
                </View>
                <Text className="text-slate-500 font-medium">Total payable: {plan.total}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* STEP 3: Document Uploads */}
        {step === 3 && (
          <View className="py-6 animate-fade-in">
             <View className="bg-indigo-50 w-16 h-16 rounded-full items-center justify-center mb-6">
              <FileText size={28} color="#4f46e5" />
            </View>
            <Text className="text-3xl font-extrabold text-slate-900 mb-2">Verify Identity</Text>
            <Text className="text-slate-500 mb-8 text-base leading-6">
              Upload clear photos of these documents to verify your identity and income.
            </Text>

            {/* Document 1: Govt ID */}
            <TouchableOpacity 
              className={`p-5 rounded-2xl border-2 mb-4 flex-row items-center ${docs.id ? 'border-emerald-500 bg-emerald-50/30' : 'border-dashed border-slate-300 bg-white'}`}
              onPress={() => uploadMockDocument('id')}
              disabled={docs.id}
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${docs.id ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                {docs.id ? <CheckCircle size={24} color="#10b981" /> : <UploadCloud size={24} color="#64748b" />}
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg">Government ID</Text>
                <Text className="text-slate-500 text-sm">Passport, Driver&apos;s License, or NIN</Text>
              </View>
            </TouchableOpacity>

            {/* Document 2: Bank Statement */}
            <TouchableOpacity 
              className={`p-5 rounded-2xl border-2 mb-4 flex-row items-center ${docs.bank ? 'border-emerald-500 bg-emerald-50/30' : 'border-dashed border-slate-300 bg-white'}`}
              onPress={() => uploadMockDocument('bank')}
              disabled={docs.bank}
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${docs.bank ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                {docs.bank ? <CheckCircle size={24} color="#10b981" /> : <Building size={24} color="#64748b" />}
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg">Bank Statement</Text>
                <Text className="text-slate-500 text-sm">Last 3 months showing income</Text>
              </View>
            </TouchableOpacity>

            {/* Document 3: Utility Bill */}
            <TouchableOpacity 
              className={`p-5 rounded-2xl border-2 mb-4 flex-row items-center ${docs.utility ? 'border-emerald-500 bg-emerald-50/30' : 'border-dashed border-slate-300 bg-white'}`}
              onPress={() => uploadMockDocument('utility')}
              disabled={docs.utility}
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${docs.utility ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                {docs.utility ? <CheckCircle size={24} color="#10b981" /> : <FileText size={24} color="#64748b" />}
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg">Utility Bill</Text>
                <Text className="text-slate-500 text-sm">Proof of address (within 3 months)</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 4: Review and Submit */}
        {step === 4 && (
          <View className="py-6 animate-fade-in">
             <View className="bg-emerald-50 w-16 h-16 rounded-full items-center justify-center mb-6">
              <ShieldCheck size={28} color="#10b981" />
            </View>
            <Text className="text-3xl font-extrabold text-slate-900 mb-2">Review & Submit</Text>
            <Text className="text-slate-500 mb-8 text-base leading-6">
              Please review your loan parameters before final submission.
            </Text>

            <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm shadow-slate-200/50 mb-6">
              <Text className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-3">Financing Summary</Text>
              
              <View className="flex-row justify-between py-2 border-b border-slate-100">
                <Text className="text-slate-600 font-medium">Device</Text>
                <Text className="text-slate-900 font-bold w-1/2 text-right">{product.name}</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-slate-100">
                <Text className="text-slate-600 font-medium">Loan Term</Text>
                <Text className="text-slate-900 font-bold">{plans.find(p => p.id === selectedPlan)?.months || 6} Months</Text>
              </View>
              <View className="flex-row justify-between py-2 border-b border-slate-100">
                <Text className="text-slate-600 font-medium">Monthly Repayment</Text>
                <Text className="text-indigo-600 font-black">{plans.find(p => p.id === selectedPlan)?.amount || '$26/mo'}</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-slate-600 font-medium">Total Payable</Text>
                <Text className="text-slate-900 font-bold">{plans.find(p => p.id === selectedPlan)?.total || '$156'}</Text>
              </View>
            </View>

            <Text className="text-xs text-slate-500 leading-5 px-2">
              By tapping Submit Application, you authorize our banking partners to perform a soft credit check and agree to the Terms of Service and Credit Agreement.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-6 bg-white border-t border-slate-100">
        <TouchableOpacity 
          className={`py-4 rounded-xl items-center flex-row justify-center ${isDeploying ? 'bg-slate-800' : 'bg-slate-900 shadow-lg shadow-slate-900/20'}`}
          onPress={handleNext}
          disabled={isDeploying || (step === 2 && !selectedPlan) || (step === 3 && (!docs.id || !docs.bank || !docs.utility))}
        >
          {isDeploying ? (
            <>
              <ActivityIndicator color="white" className="mr-3" />
              <Text className="text-white font-bold text-lg">Submitting...</Text>
            </>
          ) : (
             <>
               <Text className="text-white font-bold text-lg mr-2">
                 {step === 4 ? 'Submit Application' : 'Continue'}
               </Text>
               {step < 4 && <ChevronRight color="white" size={20} />}
             </>
          )}
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

