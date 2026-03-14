import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Heart, ChevronRight, Activity, Phone, TrendingUp, BookOpenText } from 'lucide-react-native';
import { router } from 'expo-router';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const SCORE = 78;
const R = 72;
const C = 2 * Math.PI * R;

const BG = '#EEF2F7';
const BLUE = '#3B82F6';
const INDIGO = '#6366F1';
const ORANGE = '#FB923C';
const GREEN = '#34D399';
const NAVY = '#1E293B';
const SLATE = '#64748B';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* ── Header ── */}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
          paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20,
        }}>
          <View>
            <Text style={{ fontSize: 13, color: SLATE, fontWeight: '500', marginBottom: 2 }}>Good Morning 🌤</Text>
            <Text style={{ fontSize: 26, fontWeight: '800', color: NAVY, letterSpacing: -0.5 }}>Hello, Adebayo</Text>
            <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Saturday, March 14 · Last updated 12:12</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity style={{
              width: 40, height: 40, borderRadius: 14, backgroundColor: 'white',
              alignItems: 'center', justifyContent: 'center',
              shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
            }}>
              <Bell color={NAVY} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{
                width: 42, height: 42, borderRadius: 14, overflow: 'hidden',
                backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center',
                shadowColor: BLUE, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 15 }}>AO</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Health Score Card ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <View style={{
            backgroundColor: 'white', borderRadius: 28,
            padding: 24, shadowColor: '#94A3B8', shadowOpacity: 0.15,
            shadowRadius: 20, elevation: 4,
          }}>
            {/* Card header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart color={ORANGE} size={17} fill={ORANGE} />
                </View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: NAVY }}>Health Score</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
                <TrendingUp color={GREEN} size={13} />
                <Text style={{ color: GREEN, fontSize: 12, fontWeight: '700' }}>Good</Text>
              </View>
            </View>

            {/* Ring */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'relative', width: 188, height: 188, alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={188} height={188} viewBox="0 0 188 188" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
                  <Defs>
                    <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
                      <Stop offset="0%" stopColor={ORANGE} />
                      <Stop offset="100%" stopColor="#FBBF24" />
                    </LinearGradient>
                  </Defs>
                  <Circle cx={94} cy={94} r={R} stroke="#F1F5F9" strokeWidth={14} fill="transparent" />
                  <Circle
                    cx={94} cy={94} r={R}
                    stroke="url(#ringGrad)" strokeWidth={14} fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - SCORE / 100)}
                  />
                </Svg>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 46, fontWeight: '900', color: ORANGE, letterSpacing: -2 }}>{SCORE}</Text>
                  <Text style={{ fontSize: 13, color: SLATE }}>out of 100</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 9, color: SLATE }}>i</Text>
              </View>
              <Text style={{ fontSize: 12, color: '#94A3B8' }}>Long press for quick actions</Text>
            </View>
          </View>
        </View>

        {/* ── Quick Vital Badges ── */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 16 }}>
          {[
            { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', color: '#FFF1F2', accent: '#F43F5E', icon: '❤️' },
            { label: 'Blood Glucose', value: '95', unit: 'mg/dL', color: '#EFF6FF', accent: BLUE, icon: '🩸' },
          ].map(v => (
            <View key={v.label} style={{
              flex: 1, backgroundColor: v.color, borderRadius: 22, padding: 16,
              shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
            }}>
              <Text style={{ fontSize: 20, marginBottom: 8 }}>{v.icon}</Text>
              <Text style={{ fontSize: 11, color: v.accent, fontWeight: '600', marginBottom: 4 }}>{v.label}</Text>
              <Text style={{ fontSize: 20, fontWeight: '900', color: NAVY }}>{v.value}</Text>
              <Text style={{ fontSize: 10, color: SLATE }}>{v.unit}</Text>
            </View>
          ))}
        </View>

        {/* ── Finance Overview Card ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <View style={{
            borderRadius: 28, padding: 24, overflow: 'hidden',
            backgroundColor: NAVY,
            shadowColor: NAVY, shadowOpacity: 0.3, shadowRadius: 24, elevation: 6,
          }}>
            {/* Decorative blob */}
            <View style={{
              position: 'absolute', width: 180, height: 180, borderRadius: 90,
              backgroundColor: BLUE, opacity: 0.18, top: -50, right: -40,
            }} />
            <View style={{
              position: 'absolute', width: 130, height: 130, borderRadius: 65,
              backgroundColor: INDIGO, opacity: 0.14, bottom: -40, left: 20,
            }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpenText color="white" size={18} />
                </View>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Finance Overview</Text>
              </View>
              <ChevronRight color="rgba(255,255,255,0.5)" size={20} />
            </View>

            <Text style={{ color: '#93C5FD', fontSize: 12, marginBottom: 6 }}>Active Loan Balance</Text>
            <Text style={{ color: 'white', fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 18 }}>₦450,000.00</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
              <View>
                <Text style={{ color: '#94A3B8', fontSize: 11, marginBottom: 4 }}>Next Payment</Text>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Feb 15, 2026</Text>
                <View style={{ backgroundColor: 'rgba(251,146,60,0.2)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start', marginTop: 6 }}>
                  <Text style={{ color: ORANGE, fontSize: 11, fontWeight: '600' }}>-27 days left</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#94A3B8', fontSize: 11, marginBottom: 4 }}>Amount Due</Text>
                <Text style={{ color: 'white', fontWeight: '800', fontSize: 20 }}>₦75,000.00</Text>
              </View>
            </View>

            <TouchableOpacity style={{
              backgroundColor: BLUE, paddingVertical: 14, borderRadius: 16, alignItems: 'center',
              shadowColor: BLUE, shadowOpacity: 0.5, shadowRadius: 12, elevation: 4,
            }}>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>View Payment Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Recent Vitals Card ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{
            backgroundColor: 'white', borderRadius: 28, padding: 20,
            shadowColor: '#94A3B8', shadowOpacity: 0.12, shadowRadius: 16, elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Activity color={BLUE} size={20} />
                <Text style={{ fontSize: 16, fontWeight: '700', color: NAVY }}>Recent Vitals</Text>
              </View>
              <Text style={{ color: BLUE, fontSize: 13, fontWeight: '600' }}>See All</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart color="#F43F5E" size={20} fill="#F43F5E" />
                </View>
                <View>
                  <Text style={{ fontSize: 11, color: SLATE, marginBottom: 2 }}>Blood Pressure</Text>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: NAVY }}>
                    128/82 <Text style={{ fontSize: 12, fontWeight: '400', color: SLATE }}>mmHg</Text>
                  </Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
                <Text style={{ color: GREEN, fontSize: 12, fontWeight: '700' }}>NORMAL</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Emergency FAB ── */}
      <TouchableOpacity style={{
        position: 'absolute', bottom: 108, right: 24,
        width: 56, height: 56, borderRadius: 18, backgroundColor: '#EF4444',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#EF4444', shadowOpacity: 0.45, shadowRadius: 14, elevation: 8,
        transform: [{ rotate: '10deg' }],
      }}>
        <Phone color="white" size={24} style={{ transform: [{ rotate: '-10deg' }] }} />
      </TouchableOpacity>
    </View>
  );
}

