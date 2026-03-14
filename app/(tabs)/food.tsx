import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import Svg, { Rect } from 'react-native-svg';

const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const ORANGE = '#FB923C';
const BG = '#EEF2F7';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CAL = [420, 490, 360, 480, 460, 510, 380];
const MAX_CAL = Math.max(...CAL);
const BAR_W = 32;
const CHART_H = 130;
const TODAY = 6;

const meals = [
  { type: 'Breakfast', typeColor: '#FEF3C7', typeText: '#D97706', time: '07:30 AM', name: 'Oatmeal with Banana', kcal: 320, protein: 8, carbs: 58, emoji: '🥣' },
  { type: 'Lunch', typeColor: '#F1F5F9', typeText: '#64748B', time: '12:45 PM', name: 'Grilled Chicken & Rice', kcal: 520, protein: 42, carbs: 48, emoji: '🍗' },
  { type: 'Snack', typeColor: '#F0FDF4', typeText: '#10B981', time: '03:15 PM', name: 'Apple & Almonds', kcal: 180, protein: 4, carbs: 22, emoji: '🍎' },
  { type: 'Dinner', typeColor: '#FAF5FF', typeText: '#A855F7', time: '07:00 PM', name: 'Jollof Rice & Fish', kcal: 320, protein: 28, carbs: 42, emoji: '🍛' },
];

export default function FoodScreen() {
  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20 }}>
        <View>
          <Text style={{ fontSize: 26, fontWeight: '900', color: NAVY, letterSpacing: -0.5 }}>Food Monitor</Text>
          <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Today · {totalKcal} kcal total</Text>
        </View>
        <TouchableOpacity style={{
          width: 42, height: 42, backgroundColor: BLUE, borderRadius: 14,
          alignItems: 'center', justifyContent: 'center',
          shadowColor: BLUE, shadowOpacity: 0.4, shadowRadius: 10, elevation: 4,
        }}>
          <Plus color="white" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* Weekly Bar Chart */}
        <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: 'white', borderRadius: 28, paddingVertical: 24, paddingHorizontal: 20, shadowColor: '#94A3B8', shadowOpacity: 0.12, shadowRadius: 16, elevation: 3 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: NAVY }}>Calorie Intake</Text>
            <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: BLUE, fontSize: 12, fontWeight: '600' }}>This Week</Text>
            </View>
          </View>

          <Svg width="100%" height={CHART_H} viewBox={`0 0 ${DAYS.length * (BAR_W + 16)} ${CHART_H}`}>
            {CAL.map((cal, i) => {
              const barH = (cal / MAX_CAL) * (CHART_H - 20);
              const x = i * (BAR_W + 16) + 4;
              const y = CHART_H - barH - 4;
              return (
                <Rect key={i} x={x} y={y} width={BAR_W} height={barH}
                  rx={10} ry={10}
                  fill={i === TODAY ? BLUE : '#E0E9F5'}
                />
              );
            })}
          </Svg>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {DAYS.map((d, i) => (
              <Text key={d} style={{ width: BAR_W + 16, fontSize: 10, textAlign: 'center', color: i === TODAY ? BLUE : '#94A3B8', fontWeight: i === TODAY ? '700' : '400' }}>{d}</Text>
            ))}
          </View>
        </View>

        {/* Today's Meals */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 17, fontWeight: '800', color: NAVY }}>Today&apos;s Meals</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: BLUE }}>View All</Text>
          </View>

          {meals.map((meal, i) => (
            <View key={i} style={{
              backgroundColor: 'white', borderRadius: 22, padding: 14, marginBottom: 12,
              flexDirection: 'row', alignItems: 'center',
              shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 12, elevation: 2,
            }}>
              <View style={{ width: 62, height: 62, borderRadius: 16, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                <Text style={{ fontSize: 30 }}>{meal.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <View style={{ backgroundColor: meal.typeColor, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>
                    <Text style={{ color: meal.typeText, fontSize: 11, fontWeight: '600' }}>{meal.type}</Text>
                  </View>
                  <Text style={{ fontSize: 12, color: '#94A3B8' }}>{meal.time}</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: '700', color: NAVY, marginBottom: 7 }}>{meal.name}</Text>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <View style={{ backgroundColor: '#F8FAFC', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ fontSize: 11, color: SLATE, fontWeight: '600' }}>{meal.kcal} kcal</Text>
                  </View>
                  <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ fontSize: 11, color: BLUE, fontWeight: '600' }}>P: {meal.protein}g</Text>
                  </View>
                  <View style={{ backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ fontSize: 11, color: ORANGE, fontWeight: '600' }}>C: {meal.carbs}g</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
