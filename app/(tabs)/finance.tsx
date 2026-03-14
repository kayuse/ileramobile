import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { RefreshCcw, Bell, HelpCircle, ChevronRight } from 'lucide-react-native';

const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const GREEN = '#34D399';
const BG = '#EEF2F7';

const loans = [
  {
    id: 'HL2025001',
    name: 'Diabetes Management Equipment',
    amount: '₦250,000.00',
    rate: '8.5%',
    nextPayment: '25/01/2026',
    amountDue: '₦27,500.00',
    progress: 0.6,
    repaid: '₦165,000.00',
    total: '₦275,000.00',
  },
  {
    id: 'HL2025002',
    name: 'Blood Pressure Monitor',
    amount: '₦85,000.00',
    rate: '7.0%',
    nextPayment: '28/01/2026',
    amountDue: '₦9,350.00',
    progress: 0.6,
    repaid: '₦56,100.00',
    total: '₦93,500.00',
  },
];

export default function FinanceScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: NAVY, letterSpacing: -0.5 }}>Finance</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
            <RefreshCcw color={NAVY} size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
            <Bell color={NAVY} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130 }}>

        {/* Balance Card */}
        <View style={{
          borderRadius: 28, padding: 26, marginBottom: 28, overflow: 'hidden',
          backgroundColor: NAVY,
          shadowColor: NAVY, shadowOpacity: 0.35, shadowRadius: 24, elevation: 8,
        }}>
          {/* Decorative blobs */}
          <View style={{ position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: BLUE, opacity: 0.2, top: -50, right: -30 }} />
          <View style={{ position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#6366F1', opacity: 0.15, bottom: -30, left: 30 }} />

          <Text style={{ color: '#93C5FD', fontSize: 13, marginBottom: 8 }}>Total Outstanding Balance</Text>
          <Text style={{ color: 'white', fontSize: 36, fontWeight: '900', letterSpacing: -1, marginBottom: 12 }}>₦147,400.00</Text>
          <Text style={{ color: '#64748B', fontSize: 12 }}>⏱  Last updated: 14/03/2026  12:45</Text>
        </View>

        {/* Active Loans Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 17, fontWeight: '800', color: NAVY }}>Active Loans</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: BLUE }}>View All</Text>
        </View>

        {/* Loan Cards */}
        {loans.map(loan => (
          <View key={loan.id} style={{
            backgroundColor: 'white', borderRadius: 24, padding: 20, marginBottom: 16,
            shadowColor: '#94A3B8', shadowOpacity: 0.12, shadowRadius: 16, elevation: 3,
          }}>
            {/* Loan header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: NAVY, lineHeight: 22, marginBottom: 4 }}>{loan.name}</Text>
                <Text style={{ fontSize: 12, color: '#94A3B8' }}>Loan ID: {loan.id}</Text>
              </View>
              <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
                <Text style={{ color: GREEN, fontSize: 12, fontWeight: '700' }}>Active</Text>
              </View>
            </View>

            {/* 2×2 grid */}
            <View style={{ flexDirection: 'row', marginBottom: 14 }}>
              {[
                { label: 'Loan Amount', value: loan.amount },
                { label: 'Interest Rate', value: loan.rate },
              ].map(item => (
                <View key={item.label} style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                    <HelpCircle color="#CBD5E1" size={12} />
                    <Text style={{ fontSize: 11, color: '#94A3B8' }}>{item.label}</Text>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: NAVY }}>{item.value}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 18 }}>
              {[
                { label: 'Next Payment', value: loan.nextPayment },
                { label: 'Amount Due', value: loan.amountDue },
              ].map(item => (
                <View key={item.label} style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                    <HelpCircle color="#CBD5E1" size={12} />
                    <Text style={{ fontSize: 11, color: '#94A3B8' }}>{item.label}</Text>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: NAVY }}>{item.value}</Text>
                </View>
              ))}
            </View>

            {/* Progress */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 12, color: SLATE }}>Repayment Progress</Text>
              <Text style={{ fontSize: 12, fontWeight: '700', color: BLUE }}>{Math.round(loan.progress * 100)}%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <View style={{ width: `${loan.progress * 100}%`, height: '100%', backgroundColor: BLUE, borderRadius: 4 }} />
            </View>
            <Text style={{ fontSize: 11, color: '#94A3B8' }}>{loan.repaid} of {loan.total} repaid</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
