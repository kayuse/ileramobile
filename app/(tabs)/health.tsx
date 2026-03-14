import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share2, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Svg, { Circle, Polyline, Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

const SCORE = 78;
const R = 85;
const C = 2 * Math.PI * R;
const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const ORANGE = '#FB923C';
const GREEN = '#34D399';
const BG = '#EEF2F7';

const PERIODS = ['Daily', 'Weekly', 'Monthly'];

const weekData = [72, 74, 73, 76, 75, 77, 78];
const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CW = 300, CH = 130, PX = 16, PY = 12;
const MIN_V = 60, MAX_V = 100;

function px(i: number) { return PX + (i / (weekData.length - 1)) * (CW - PX * 2); }
function py(v: number) { return PY + ((MAX_V - v) / (MAX_V - MIN_V)) * (CH - PY * 2); }

const pts = weekData.map((v, i) => `${px(i)},${py(v)}`).join(' ');
const fillPts = [`${px(0)},${CH}`, pts, `${px(weekData.length - 1)},${CH}`].join(' ');

const factors = [
  { label: 'Blood Pressure', emoji: '🫀', value: '120/80', unit: 'mmHg', trend: '+', color: '#FFF1F2', accent: '#F43F5E' },
  { label: 'Glucose', emoji: '🩸', value: '95', unit: 'mg/dL', trend: '−', color: '#EFF6FF', accent: BLUE },
  { label: 'SpO₂', emoji: '💨', value: '98%', unit: '', trend: '~', color: '#F0FDF4', accent: GREEN },
  { label: 'Heart Rate', emoji: '❤️', value: '72', unit: 'bpm', trend: '+', color: '#FFF7ED', accent: ORANGE },
];

export default function HealthScreen() {
  const [period, setPeriod] = useState('Weekly');

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <ArrowLeft color={NAVY} size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '800', color: NAVY }}>Health Score</Text>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <Share2 color={NAVY} size={18} />
          </TouchableOpacity>
        </View>

        {/* Score Ring Card */}
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 28, paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', shadowColor: '#94A3B8', shadowOpacity: 0.15, shadowRadius: 20, elevation: 4 }}>
            <View style={{ position: 'relative', width: 210, height: 210, alignItems: 'center', justifyContent: 'center' }}>
              <Svg width={210} height={210} viewBox="0 0 210 210" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
                <Defs>
                  <LinearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0%" stopColor={ORANGE} />
                    <Stop offset="100%" stopColor="#FBBF24" />
                  </LinearGradient>
                </Defs>
                <Circle cx={105} cy={105} r={R} stroke="#F1F5F9" strokeWidth={16} fill="transparent" />
                <Circle cx={105} cy={105} r={R} stroke="url(#healthGrad)" strokeWidth={16} fill="transparent" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - SCORE / 100)} />
              </Svg>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 52, fontWeight: '900', color: ORANGE, letterSpacing: -2 }}>{SCORE}</Text>
                <Text style={{ fontSize: 13, color: SLATE, marginTop: 2 }}>Health Score</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', backgroundColor: 'white', borderRadius: 18, padding: 4, shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 10, elevation: 2 }}>
          {PERIODS.map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 14, alignItems: 'center', backgroundColor: period === p ? BLUE : 'transparent' }}
            >
              <Text style={{ color: period === p ? 'white' : SLATE, fontWeight: '700', fontSize: 14 }}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trend Chart */}
        <View style={{ marginHorizontal: 20, marginBottom: 20, backgroundColor: 'white', borderRadius: 28, padding: 20, shadowColor: '#94A3B8', shadowOpacity: 0.12, shadowRadius: 16, elevation: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: NAVY }}>Score Trend</Text>
            <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: BLUE, fontSize: 12, fontWeight: '600' }}>This Week</Text>
            </View>
          </View>

          <Svg width="100%" height={CH + 24} viewBox={`0 0 ${CW} ${CH + 24}`}>
            <Defs>
              <LinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={BLUE} stopOpacity="0.2" />
                <Stop offset="100%" stopColor={BLUE} stopOpacity="0.01" />
              </LinearGradient>
            </Defs>
            <Polygon points={fillPts} fill="url(#chartFill)" />
            <Polyline points={pts} fill="none" stroke={BLUE} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
            {weekData.map((v, i) => (
              <Circle key={i} cx={px(i)} cy={py(v)} r={4} fill="white" stroke={BLUE} strokeWidth={2} />
            ))}
          </Svg>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: PX }}>
            {LABELS.map(l => <Text key={l} style={{ fontSize: 10, color: '#94A3B8', textAlign: 'center' }}>{l}</Text>)}
          </View>
        </View>

        {/* Contributing Factors */}
        <View style={{ paddingLeft: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: NAVY, marginBottom: 14, paddingRight: 20 }}>Contributing Factors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20, gap: 12 }}>
            {factors.map(f => (
              <View key={f.label} style={{ width: 150, backgroundColor: 'white', borderRadius: 22, padding: 16, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 12, elevation: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: f.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{f.emoji}</Text>
                  </View>
                  <View style={{ width: 28, height: 28, borderRadius: 10, backgroundColor: f.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: f.accent, fontSize: 14, fontWeight: '800' }}>{f.trend}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 11, color: SLATE, marginBottom: 4 }}>{f.label}</Text>
                <Text style={{ fontSize: 20, fontWeight: '900', color: NAVY }}>{f.value}</Text>
                {f.unit ? <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{f.unit}</Text> : null}
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Log Data FAB */}
      <TouchableOpacity style={{
        position: 'absolute', bottom: 108, right: 24,
        backgroundColor: GREEN, paddingHorizontal: 18, paddingVertical: 14,
        borderRadius: 22, flexDirection: 'row', alignItems: 'center', gap: 8,
        shadowColor: GREEN, shadowOpacity: 0.45, shadowRadius: 14, elevation: 8,
      }}>
        <Plus color="white" size={20} />
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Log Data</Text>
      </TouchableOpacity>
    </View>
  );
}
