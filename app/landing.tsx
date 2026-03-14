import React, { useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  Smartphone, Footprints, Utensils, HeartPulse,
  ChevronRight, ArrowRight, ShoppingBag, Zap, ShieldCheck,
} from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';


const BLUE = '#3B82F6';
const INDIGO = '#6366F1';
const NAVY = '#1E293B';
const ORANGE = '#FB923C';
const GREEN = '#34D399';
const SLATE = '#64748B';

// ── Feature pill card ───────────────────────────────────────
function FeatureCard({ icon, title, desc, accent, bg }: { icon: any; title: string; desc: string; accent: string; bg: string }) {
  const Icon = icon;
  return (
    <View style={{
      backgroundColor: 'white', borderRadius: 24, padding: 20,
      marginBottom: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 16,
      shadowColor: '#94A3B8', shadowOpacity: 0.12, shadowRadius: 16, elevation: 3,
    }}>
      <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon color={accent} size={24} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '800', color: NAVY, marginBottom: 4 }}>{title}</Text>
        <Text style={{ fontSize: 13, color: SLATE, lineHeight: 20 }}>{desc}</Text>
      </View>
    </View>
  );
}

// ── Stat badge ───────────────────────────────────────────────
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: '900', color: 'white', letterSpacing: -0.5 }}>{value}</Text>
      <Text style={{ fontSize: 11, color: '#93C5FD', marginTop: 2, textAlign: 'center' }}>{label}</Text>
    </View>
  );
}

export default function LandingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const setHasSeenLanding = useAuthStore(s => s.setHasSeenLanding);

  function goRegister() {
    setHasSeenLanding();
    router.push('/register');
  }

  function goLogin() {
    setHasSeenLanding();
    router.push('/login');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#EEF2F7' }}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* ════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════ */}
        <View style={{
          backgroundColor: NAVY, paddingTop: 80, paddingBottom: 60,
          paddingHorizontal: 28, overflow: 'hidden', alignItems: 'center',
        }}>
          {/* Background decoration */}
          <View style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: BLUE, opacity: 0.18 }} />
          <View style={{ position: 'absolute', bottom: -80, left: -40, width: 200, height: 200, borderRadius: 100, backgroundColor: INDIGO, opacity: 0.15 }} />

          {/* Logo */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32,
          }}>
            <View style={{
              width: 58, height: 58, borderRadius: 18, backgroundColor: BLUE,
              alignItems: 'center', justifyContent: 'center',
              shadowColor: BLUE, shadowOpacity: 0.55, shadowRadius: 16, elevation: 6,
            }}>
              <HeartPulse color="white" size={30} strokeWidth={2.5} />
            </View>
            <View>
              <Text style={{ fontSize: 30, fontWeight: '900', color: 'white', letterSpacing: -0.5 }}>Ilera</Text>
              <Text style={{ fontSize: 13, color: '#93C5FD', fontWeight: '500', marginTop: -2 }}>Your Onestop Health App</Text>
            </View>
          </View>

          {/* Hero text */}
          <Text style={{
            fontSize: 36, fontWeight: '900', color: 'white', textAlign: 'center',
            lineHeight: 44, letterSpacing: -0.8, marginBottom: 16,
          }}>
            Health & Finance,{'\n'}
            <Text style={{ color: '#60A5FA' }}>Together.</Text>
          </Text>
          <Text style={{
            fontSize: 16, color: '#93C5FD', textAlign: 'center', lineHeight: 26,
            marginBottom: 40, maxWidth: 320,
          }}>
            Track your vitals, log meals, monitor your health score, and get medical devices on easy loan — all in one beautiful app.
          </Text>

          {/* CTA Buttons */}
          <View style={{ width: '100%', gap: 12 }}>
            <TouchableOpacity
              onPress={goRegister}
              style={{
                backgroundColor: BLUE, paddingVertical: 17, borderRadius: 20,
                alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10,
                shadowColor: BLUE, shadowOpacity: 0.5, shadowRadius: 16, elevation: 6,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 17 }}>Get Started — Free</Text>
              <ArrowRight color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goLogin}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 17,
                borderRadius: 20, alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Stats bar ── */}
        <View style={{
          backgroundColor: BLUE, paddingVertical: 22, paddingHorizontal: 24,
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <StatBadge value="50K+" label="Active Users" />
          <View style={{ width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <StatBadge value="₦2B+" label="Loans Disbursed" />
          <View style={{ width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <StatBadge value="4.9★" label="App Rating" />
        </View>

        {/* ════════════════════════════════════════
            SECTION 2 — FEATURES
        ════════════════════════════════════════ */}
        <View style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 12, color: BLUE, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>What You Can Do</Text>
            <Text style={{ fontSize: 26, fontWeight: '900', color: NAVY, letterSpacing: -0.5, lineHeight: 34 }}>Everything your health{'\n'}needs, in one place.</Text>
          </View>

          <Text style={{ fontSize: 14, color: SLATE, lineHeight: 22, marginBottom: 28, marginTop: 8 }}>
            From monitoring your daily vitals to financing life-changing medical equipment — Ilera has you covered.
          </Text>

          <FeatureCard
            icon={Smartphone}
            title="Get Health Devices on Loan"
            desc="Access glucose monitors, blood pressure cuffs, and more on affordable 0% interest installments. No upfront cost."
            accent={BLUE}
            bg="#EFF6FF"
          />
          <FeatureCard
            icon={Footprints}
            title="Track Steps & Activity"
            desc="Monitor your daily steps, workout sessions, and physical activity with smart auto-detection and goal setting."
            accent={GREEN}
            bg="#F0FDF4"
          />
          <FeatureCard
            icon={Utensils}
            title="AI Food & Nutrition Logging"
            desc="Snap a photo of your meal and our AI automatically identifies it and logs your calories, protein, and carbs."
            accent={ORANGE}
            bg="#FFF7ED"
          />
          <FeatureCard
            icon={HeartPulse}
            title="Live Health Score"
            desc="Your personalized Health Score updates in real-time based on your vitals, sleep, meals, and activity level."
            accent="#F43F5E"
            bg="#FFF1F2"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Secure Loan Management"
            desc="View active loans, track repayments, and manage payment schedules — all in your Finance dashboard."
            accent={INDIGO}
            bg="#EEF2FF"
          />
        </View>

        {/* ════════════════════════════════════════
            SECTION 3 — MARKETPLACE CTA
        ════════════════════════════════════════ */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View style={{
            backgroundColor: NAVY, borderRadius: 28, padding: 28, overflow: 'hidden',
            shadowColor: NAVY, shadowOpacity: 0.3, shadowRadius: 24, elevation: 8,
          }}>
            {/* Decorative blobs */}
            <View style={{ position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: BLUE, opacity: 0.18, top: -60, right: -40 }} />
            <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: ORANGE, opacity: 0.12, bottom: -30, left: 20 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag color="white" size={20} />
              </View>
              <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                <Text style={{ color: '#D97706', fontSize: 11, fontWeight: '700' }}>🔥 Explore Now</Text>
              </View>
            </View>

            <Text style={{ color: 'white', fontSize: 22, fontWeight: '900', lineHeight: 30, marginBottom: 10, letterSpacing: -0.3 }}>
              Browse Our Health Device Marketplace
            </Text>
            <Text style={{ color: '#93C5FD', fontSize: 14, lineHeight: 22, marginBottom: 24 }}>
              Explore hundreds of clinically-approved health devices — glucose monitors, BP cuffs, pulse oximeters, and more. Pay once or spread the cost interest-free.
            </Text>

            {/* Device pills */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {['Blood Pressure Monitors', 'Glucose Meters', 'Pulse Oximeters', 'Smart Scales', 'ECG Monitors'].map(item => (
                <View key={item} style={{ backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{item}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => router.push('/register')}
              style={{
                backgroundColor: BLUE, paddingVertical: 15, borderRadius: 18,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
                shadowColor: BLUE, shadowOpacity: 0.45, shadowRadius: 12, elevation: 5,
              }}
            >
              <ShoppingBag color="white" size={18} />
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Go to Marketplace</Text>
              <ChevronRight color="white" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ════════════════════════════════════════
            SECTION 4 — SMARTTOKEN TEASER
        ════════════════════════════════════════ */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <View style={{
            backgroundColor: ORANGE, borderRadius: 24, padding: 22, flexDirection: 'row',
            alignItems: 'center', gap: 18, overflow: 'hidden',
            shadowColor: ORANGE, shadowOpacity: 0.3, shadowRadius: 14, elevation: 4,
          }}>
            <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'white', opacity: 0.08, right: -20, top: -30 }} />
            <View style={{ width: 52, height: 52, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' }}>
              <Zap color="white" size={26} fill="white" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '800', marginBottom: 4 }}>Try SmartTokens</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 18 }}>
                Let AI log your meals instantly — just snap a photo.
              </Text>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════
            FOOTER CTA
        ════════════════════════════════════════ */}
        <View style={{ paddingHorizontal: 20, alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '900', color: NAVY, textAlign: 'center', letterSpacing: -0.5, marginBottom: 8 }}>
            Ready to take control{'\n'}of your health?
          </Text>
          <Text style={{ fontSize: 14, color: SLATE, textAlign: 'center', marginBottom: 24 }}>
            Join 50,000+ Nigerians already on their health journey with Ilera.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/register')}
            style={{
              backgroundColor: NAVY, paddingVertical: 17, paddingHorizontal: 48,
              borderRadius: 22, flexDirection: 'row', alignItems: 'center', gap: 10,
              shadowColor: NAVY, shadowOpacity: 0.25, shadowRadius: 14, elevation: 5,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>Create Free Account</Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')} style={{ marginTop: 16 }}>
            <Text style={{ color: SLATE, fontSize: 14 }}>Already have an account? <Text style={{ color: BLUE, fontWeight: '700' }}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
