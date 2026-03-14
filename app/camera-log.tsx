import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { X, Camera as CameraIcon, UploadCloud, CheckCircle2 } from 'lucide-react-native';

export default function CameraLogScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center px-6">
        <Text className="text-white text-xl text-center mb-6">We need your permission to show the camera</Text>
        <TouchableOpacity 
          className="bg-emerald-500 px-6 py-3 rounded-xl"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const analyzePhoto = () => {
    setIsAnalyzing(true);
    // Mock the AI Request
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        food: 'Grilled Salmon with Quinoa & Asparagus',
        calories: 450,
        protein: '42g',
        carbs: '30g',
        fat: '18g',
        sugar: '2g',
        sodium: '320mg'
      });
    }, 2500);
  };

  const saveMealLog = () => {
    // Return to Health Dash or Home
    router.back();
  };

  if (photoUri) {
    return (
      <View className="flex-1 bg-slate-900">
        <Image source={{ uri: photoUri }} className="flex-1" />
        
        {/* Top Controls */}
        <View className="absolute top-12 left-6">
          <TouchableOpacity onPress={() => setPhotoUri(null)} className="bg-black/50 p-3 rounded-full">
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Panel */}
        <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6 min-h-[300px]">
          {!isAnalyzing && !analysisResult ? (
            <View className="items-center justify-center flex-1">
              <Text className="text-slate-900 font-bold text-2xl mb-2">Analyze Meal?</Text>
              <Text className="text-slate-500 text-center mb-8">
                Our AI will identify the food and calculate macronutrients.
              </Text>
              <TouchableOpacity 
                className="bg-emerald-600 w-full py-4 rounded-2xl items-center flex-row justify-center"
                onPress={analyzePhoto}
              >
                <UploadCloud size={20} color="white" className="mr-2" />
                <Text className="text-white text-lg font-bold">Yes, Analyze Menu</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mt-4" onPress={() => setPhotoUri(null)}>
                <Text className="text-slate-500 font-semibold text-lg">Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : isAnalyzing ? (
            <View className="items-center justify-center flex-1">
              <View className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
              <Text className="text-slate-900 font-bold text-xl">Analyzing with AI...</Text>
              <Text className="text-slate-500 mt-2 text-center">Detecting ingredients and estimating portions.</Text>
            </View>
          ) : (
            <View className="flex-1 leading-tight">
              <View className="flex-row items-center mb-4">
                <CheckCircle2 color="#10b981" size={28} className="mr-2" />
                <Text className="text-slate-900 font-black text-2xl flex-1">{analysisResult.food}</Text>
              </View>
              
              <View className="flex-row flex-wrap justify-between mt-2">
                <View className="bg-slate-50 p-3 rounded-xl w-[48%] mb-3 border border-slate-100">
                  <Text className="text-slate-500 text-sm font-medium">Calories</Text>
                  <Text className="text-slate-900 text-xl font-bold">{analysisResult.calories} kcal</Text>
                </View>
                <View className="bg-slate-50 p-3 rounded-xl w-[48%] mb-3 border border-slate-100">
                  <Text className="text-slate-500 text-sm font-medium">Protein</Text>
                  <Text className="text-slate-900 text-xl font-bold">{analysisResult.protein}</Text>
                </View>
                <View className="bg-slate-50 p-3 rounded-xl w-[48%] mb-3 border border-slate-100">
                  <Text className="text-slate-500 text-sm font-medium">Carbs</Text>
                  <Text className="text-slate-900 text-xl font-bold">{analysisResult.carbs}</Text>
                </View>
                <View className="bg-slate-50 p-3 rounded-xl w-[48%] mb-3 border border-slate-100">
                  <Text className="text-slate-500 text-sm font-medium">Fat</Text>
                  <Text className="text-slate-900 text-xl font-bold">{analysisResult.fat}</Text>
                </View>
              </View>

              <TouchableOpacity 
                className="bg-emerald-600 w-full py-4 rounded-2xl items-center mt-4"
                onPress={saveMealLog}
              >
                <Text className="text-white text-lg font-bold">Save Log to Health Diary</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView style={StyleSheet.absoluteFillObject} facing="back" ref={cameraRef}>
        <View className="flex-1 justify-between p-6 pb-12">
          {/* Header */}
          <View className="flex-row justify-between items-center mt-12 bg-black/40 p-2 rounded-full px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <X size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg">AI Meal Log</Text>
            <View className="w-7 h-7" />
          </View>

          {/* Guidelines Overlay */}
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-64 border-2 border-white/50 rounded-3xl" />
            <Text className="text-white bg-black/50 px-4 py-2 rounded-full mt-6 overflow-hidden">
              Center your meal in the frame
            </Text>
          </View>

          {/* Controls */}
          <View className="flex-row justify-center items-center h-24">
            <TouchableOpacity 
              onPress={takePicture}
              className="w-20 h-20 rounded-full border-4 border-emerald-500 bg-white items-center justify-center shadow-lg shadow-emerald-500/20"
            >
              <View className="w-16 h-16 rounded-full border-2 border-slate-200" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
