import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { RefreshCcw, Star, Zap } from 'lucide-react-native';
import { router } from 'expo-router';

const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const GREEN = '#34D399';
const BG = '#EEF2F7';
const INDIGO = '#6366F1';

const TABS = ['Marketplace', 'My Devices'];

const devices = [
  {
    id: 1, category: 'Cardiovascular', inStock: true,
    name: 'Omron Blood Pressure Monitor',
    rating: 4.8, reviews: 234,
    tags: ['Bluetooth Sync', 'App Connected', 'Memory Storage'],
    price: '₦45,000', financing: '₦4,500/mo × 10',
    emoji: '🩺', bgColor: '#EFF6FF',
  },
  {
    id: 2, category: 'Metabolic', inStock: true,
    name: 'Accu-Check Glucose Monitor',
    rating: 4.7, reviews: 189,
    tags: ['Smart Reading', 'Cloud Sync', 'NFC Transfer'],
    price: '₦32,000', financing: '₦3,200/mo × 10',
    emoji: '🩸', bgColor: '#FFF0F0',
  },
  {
    id: 3, category: 'Respiratory', inStock: false,
    name: 'Smart Pulse Oximeter Pro',
    rating: 4.6, reviews: 142,
    tags: ['Wireless', 'Real-time Alerts'],
    price: '₦18,500', financing: '₦1,850/mo × 10',
    emoji: '💨', bgColor: '#F0FDF4',
  },
];

export default function DevicesScreen() {
  const [tab, setTab] = useState('Marketplace');

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: NAVY, letterSpacing: -0.5 }}>Devices</Text>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <RefreshCcw color={NAVY} size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Segment Control */}
        <View style={{ marginHorizontal: 20, marginBottom: 20, flexDirection: 'row', backgroundColor: 'white', borderRadius: 18, padding: 4, shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 10, elevation: 2 }}>
          {TABS.map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={{ flex: 1, paddingVertical: 11, borderRadius: 14, alignItems: 'center', backgroundColor: tab === t ? BLUE : 'transparent' }}
            >
              <Text style={{ color: tab === t ? 'white' : SLATE, fontWeight: '700', fontSize: 14 }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BNPL Banner */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <View style={{ borderRadius: 24, padding: 22, backgroundColor: NAVY, overflow: 'hidden', shadowColor: NAVY, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6 }}>
            <View style={{ position: 'absolute', width: 140, height: 140, borderRadius: 70, backgroundColor: BLUE, opacity: 0.2, top: -40, right: -30 }} />
            <View style={{ position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: INDIGO, opacity: 0.2, bottom: -20, left: 40 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '800', marginBottom: 6 }}>Buy Now, Pay Later</Text>
                <Text style={{ color: '#93C5FD', fontSize: 13, lineHeight: 19 }}>Get health devices with 0% interest installments</Text>
              </View>
              <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginLeft: 14 }}>
                <Zap color="white" size={24} fill="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Device List */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: '800', color: NAVY, marginBottom: 16 }}>Available Devices</Text>

          {devices.map(device => (
            <View key={device.id} style={{ backgroundColor: 'white', borderRadius: 26, marginBottom: 20, overflow: 'hidden', shadowColor: '#94A3B8', shadowOpacity: 0.13, shadowRadius: 18, elevation: 4 }}>
              {/* Image area */}
              <View style={{ height: 180, backgroundColor: device.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 90 }}>{device.emoji}</Text>
              </View>

              {/* Body */}
              <View style={{ padding: 18 }}>
                {/* Category + Stock */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
                    <Text style={{ color: BLUE, fontSize: 12, fontWeight: '600' }}>{device.category}</Text>
                  </View>
                  <View style={{ backgroundColor: device.inStock ? '#F0FDF4' : '#FFF1F2', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
                    <Text style={{ color: device.inStock ? GREEN : '#F43F5E', fontSize: 12, fontWeight: '600' }}>{device.inStock ? 'In Stock' : 'Out of Stock'}</Text>
                  </View>
                </View>

                {/* Name */}
                <Text style={{ fontSize: 17, fontWeight: '800', color: NAVY, marginBottom: 8, letterSpacing: -0.3 }}>{device.name}</Text>

                {/* Rating */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 12 }}>
                  <Star color="#F59E0B" size={14} fill="#F59E0B" />
                  <Text style={{ color: SLATE, fontSize: 13 }}>{device.rating}</Text>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>({device.reviews} reviews)</Text>
                </View>

                {/* Feature tags */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {device.tags.map(tag => (
                    <View key={tag} style={{ backgroundColor: '#F8FAFC', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' }}>
                      <Text style={{ color: SLATE, fontSize: 11, fontWeight: '500' }}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Price + CTA */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 22, fontWeight: '900', color: NAVY, letterSpacing: -0.5 }}>{device.price}</Text>
                    <Text style={{ fontSize: 12, color: GREEN, fontWeight: '600', marginTop: 2 }}>{device.financing}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push(`/device/${device.id}` as any)}
                    style={{ backgroundColor: BLUE, paddingHorizontal: 24, paddingVertical: 13, borderRadius: 16, shadowColor: BLUE, shadowOpacity: 0.35, shadowRadius: 10, elevation: 4 }}
                  >
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
