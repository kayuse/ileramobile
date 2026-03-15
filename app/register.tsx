import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, HeartPulse } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';

const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const ORANGE = '#FB923C';
const BG = '#F0F4F8';
const INPUT_BG = '#F1F5F9';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleRegister = () => {
    if (!fullName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (!agreed) {
      Alert.alert('Terms Required', 'Please agree to the Terms and Privacy Policy to continue.');
      return;
    }
    const parts = fullName.trim().split(' ');
    login({
      id: Date.now().toString(),
      firstName: parts[0] ?? 'User',
      lastName: parts.slice(1).join(' ') || '',
      email,
      currentHealthScore: 75,
    });
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: BG }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Background curve ── */}
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 260, backgroundColor: NAVY, borderBottomLeftRadius: 48, borderBottomRightRadius: 48,
        }} />
        {/* Decorative blob */}
        <View style={{ position: 'absolute', top: -70, right: -60, width: 240, height: 240, borderRadius: 120, backgroundColor: BLUE, opacity: 0.18 }} />
        <View style={{ position: 'absolute', top: 140, left: -50, width: 160, height: 160, borderRadius: 80, backgroundColor: ORANGE, opacity: 0.12 }} />

        {/* ── Back button ── */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: Platform.OS === 'ios' ? 60 : 40,
            marginLeft: 24,
            width: 42, height: 42, borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center',
            alignSelf: 'flex-start',
          }}
        >
          <ArrowLeft color="white" size={20} />
        </TouchableOpacity>

        {/* ── Brand mark ── */}
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 24 }}>
          <View style={{
            width: 64, height: 64, borderRadius: 20,
            backgroundColor: BLUE,
            alignItems: 'center', justifyContent: 'center',
            shadowColor: BLUE, shadowOpacity: 0.5, shadowRadius: 18, elevation: 8,
            marginBottom: 12,
          }}>
            <HeartPulse color="white" size={32} strokeWidth={2.5} />
          </View>
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '600', letterSpacing: 1, opacity: 0.8 }}>ILERA HEALTH</Text>
        </View>

        {/* ── White card ── */}
        <View style={{
          backgroundColor: 'white', marginHorizontal: 20,
          borderRadius: 32, padding: 28,
          shadowColor: '#1E293B', shadowOpacity: 0.1, shadowRadius: 30, elevation: 10,
        }}>
          {/* Title */}
          <Text style={{ fontSize: 26, fontWeight: '900', color: NAVY, letterSpacing: -0.5, marginBottom: 6 }}>
            Create an Account
          </Text>
          <Text style={{ fontSize: 13, color: SLATE, lineHeight: 20, marginBottom: 26 }}>
            Sign up now to start your health journey. It&apos;s simple, fast, and free.
          </Text>

          {/* Full Name */}
          <Text style={{ fontSize: 13, fontWeight: '700', color: NAVY, marginBottom: 8 }}>Full Name</Text>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: INPUT_BG, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14,
            marginBottom: 18,
          }}>
            <User color={SLATE} size={18} style={{ marginRight: 12 }} />
            <TextInput
              style={{ flex: 1, fontSize: 15, color: NAVY, fontWeight: '500' }}
              placeholder="Enter your full name.."
              placeholderTextColor="#94A3B8"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <Text style={{ fontSize: 13, fontWeight: '700', color: NAVY, marginBottom: 8 }}>Email</Text>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: INPUT_BG, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14,
            marginBottom: 18,
          }}>
            <Mail color={SLATE} size={18} style={{ marginRight: 12 }} />
            <TextInput
              style={{ flex: 1, fontSize: 15, color: NAVY, fontWeight: '500' }}
              placeholder="Enter your email address.."
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <Text style={{ fontSize: 13, fontWeight: '700', color: NAVY, marginBottom: 8 }}>Password</Text>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: INPUT_BG, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14,
            marginBottom: 22,
          }}>
            <Lock color={SLATE} size={18} style={{ marginRight: 12 }} />
            <TextInput
              style={{ flex: 1, fontSize: 15, color: NAVY, fontWeight: '500' }}
              placeholder="Create a strong password.."
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={{ padding: 4 }}>
              {showPassword
                ? <EyeOff color={SLATE} size={18} />
                : <Eye color={SLATE} size={18} />}
            </TouchableOpacity>
          </View>

          {/* Terms checkbox */}
          <TouchableOpacity
            onPress={() => setAgreed(v => !v)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 26 }}
          >
            <View style={{
              width: 22, height: 22, borderRadius: 8, marginTop: 1,
              backgroundColor: agreed ? BLUE : INPUT_BG,
              borderWidth: 2, borderColor: agreed ? BLUE : '#CBD5E1',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {agreed && <Text style={{ color: 'white', fontSize: 12, fontWeight: '900' }}>✓</Text>}
            </View>
            <Text style={{ flex: 1, fontSize: 13, color: SLATE, lineHeight: 20 }}>
              By creating an account, you agree to the{' '}
              <Text style={{ color: BLUE, fontWeight: '700' }}>Terms & Conditions</Text>
              {' '}and{' '}
              <Text style={{ color: BLUE, fontWeight: '700' }}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: NAVY, paddingVertical: 17, borderRadius: 20,
              alignItems: 'center', marginBottom: 24,
              shadowColor: NAVY, shadowOpacity: 0.35, shadowRadius: 14, elevation: 6,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>Create Account</Text>
          </TouchableOpacity>

          {/* Social divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
            <Text style={{ color: '#94A3B8', fontSize: 13, marginHorizontal: 14 }}>Or sign up with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
          </View>

          {/* Social buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'G', bg: '#FFF', border: '#E2E8F0', text: '#EA4335' },
              { label: '🍎', bg: '#FFF', border: '#E2E8F0', text: NAVY },
              { label: 'f', bg: '#1877F2', border: '#1877F2', text: '#FFF' },
            ].map((s, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  width: 56, height: 56, borderRadius: 18,
                  backgroundColor: s.bg, borderWidth: 1.5, borderColor: s.border,
                  alignItems: 'center', justifyContent: 'center',
                  shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
                }}
              >
                <Text style={{ color: s.text, fontWeight: '800', fontSize: 18 }}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign in link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: SLATE, fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={{ color: BLUE, fontWeight: '700', fontSize: 14 }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
