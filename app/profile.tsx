import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, Alert, Switch,
} from 'react-native';
import {
  ArrowLeft, User, ShieldCheck, Zap, ChevronRight,
  Edit3, Camera, CheckCircle2, Lock, Bell, LogOut,
  Star, Coins,
} from 'lucide-react-native';
import { router } from 'expo-router';

const BLUE = '#3B82F6';
const NAVY = '#1E293B';
const SLATE = '#64748B';
const GREEN = '#34D399';
const ORANGE = '#FB923C';
const INDIGO = '#6366F1';
const BG = '#EEF2F7';

// ── Reusable Section Header ─────────────────────────────────
function SectionHeader({ icon, label, color }: { icon: any; label: string; color: string }) {
  const Icon = icon;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }}>
        <Icon color={color} size={17} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: '800', color: NAVY }}>{label}</Text>
    </View>
  );
}

// ── Reusable Labeled Input ──────────────────────────────────
function LabeledInput({
  label, placeholder, value, onChangeText, secure = false, keyboardType = 'default',
  icon, verified,
}: {
  label: string; placeholder: string; value: string;
  onChangeText: (t: string) => void;
  secure?: boolean; keyboardType?: any;
  icon?: any; verified?: boolean;
}) {
  const Icon = icon;
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 12, color: SLATE, fontWeight: '600', marginBottom: 6, marginLeft: 2 }}>{label}</Text>
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14,
        borderWidth: 1.5, borderColor: verified ? '#A7F3D0' : '#E2E8F0',
        shadowColor: '#94A3B8', shadowOpacity: 0.07, shadowRadius: 8, elevation: 1,
      }}>
        {Icon && <Icon color={SLATE} size={16} style={{ marginRight: 10 }} />}
        <TextInput
          style={{ flex: 1, fontSize: 15, color: NAVY, fontWeight: '500' }}
          placeholder={placeholder}
          placeholderTextColor="#CBD5E1"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          keyboardType={keyboardType}
        />
        {verified && <CheckCircle2 color={GREEN} size={18} />}
      </View>
    </View>
  );
}

// ── SmartToken Package Card ─────────────────────────────────
function TokenPackage({
  tokens, price, tag, selected, onSelect,
}: {
  tokens: number; price: string; tag?: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        flex: 1, backgroundColor: selected ? NAVY : 'white',
        borderRadius: 20, padding: 16, alignItems: 'center',
        borderWidth: 2, borderColor: selected ? BLUE : '#E2E8F0',
        shadowColor: selected ? NAVY : '#94A3B8',
        shadowOpacity: selected ? 0.25 : 0.1,
        shadowRadius: selected ? 14 : 8, elevation: selected ? 5 : 2,
      }}
    >
      {tag && (
        <View style={{ backgroundColor: BLUE, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>{tag}</Text>
        </View>
      )}
      <Text style={{ fontSize: 26, fontWeight: '900', color: selected ? 'white' : NAVY }}>{tokens}</Text>
      <Text style={{ fontSize: 11, color: selected ? '#93C5FD' : SLATE, marginBottom: 8 }}>tokens</Text>
      <Text style={{ fontSize: 14, fontWeight: '800', color: selected ? BLUE : NAVY }}>{price}</Text>
    </TouchableOpacity>
  );
}

// ── Main Screen ─────────────────────────────────────────────
export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('Adebayo');
  const [lastName, setLastName] = useState('Okafor');
  const [email, setEmail] = useState('adebayo.okafor@gmail.com');
  const [phone, setPhone] = useState('+234 801 234 5678');
  const [nin, setNIN] = useState('');
  const [bvn, setBVN] = useState('');
  const [ninVerified, setNinVerified] = useState(false);
  const [bvnVerified, setBvnVerified] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [notifications, setNotifications] = useState(true);

  const tokenPackages = [
    { tokens: 30, price: '₦2,500', tag: undefined },
    { tokens: 100, price: '₦6,500', tag: '🔥 Popular' },
    { tokens: 250, price: '₦14,000', tag: 'Best Value' },
  ];

  const handleVerifyNIN = () => {
    if (nin.length < 11) {
      Alert.alert('Invalid NIN', 'Please enter a valid 11-digit NIN.');
      return;
    }
    setNinVerified(true);
  };

  const handleVerifyBVN = () => {
    if (bvn.length < 11) {
      Alert.alert('Invalid BVN', 'Please enter a valid 11-digit BVN.');
      return;
    }
    setBvnVerified(true);
  };

  const handlePurchaseToken = () => {
    const pkg = tokenPackages[selectedPackage];
    Alert.alert(
      'Confirm Purchase',
      `Purchase ${pkg.tokens} SmartTokens for ${pkg.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Purchase', style: 'default', onPress: () => Alert.alert('Success 🎉', `You&apos;ve purchased ${pkg.tokens} SmartTokens!`) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* ── Header ── */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20,
        backgroundColor: BG,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
        >
          <ArrowLeft color={NAVY} size={20} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '800', color: NAVY }}>My Profile</Text>
        <TouchableOpacity
          style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
        >
          <Edit3 color={NAVY} size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

        {/* ── Avatar Section ── */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View style={{ position: 'relative' }}>
            <View style={{
              width: 100, height: 100, borderRadius: 32,
              backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center',
              shadowColor: NAVY, shadowOpacity: 0.35, shadowRadius: 20, elevation: 6,
            }}>
              <Text style={{ color: 'white', fontWeight: '900', fontSize: 34, letterSpacing: 1 }}>AO</Text>
            </View>
            <TouchableOpacity style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 32, height: 32, borderRadius: 12,
              backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center',
              borderWidth: 2, borderColor: BG,
              shadowColor: BLUE, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
            }}>
              <Camera color="white" size={15} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '800', color: NAVY, marginTop: 14 }}>Adebayo Okafor</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <CheckCircle2 color={GREEN} size={13} />
              <Text style={{ color: GREEN, fontSize: 12, fontWeight: '600' }}>Verified Member</Text>
            </View>
            <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: BLUE, fontSize: 12, fontWeight: '600' }}>Premium</Text>
            </View>
          </View>
        </View>

        {/* ── SmartToken Balance Banner ── */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <View style={{
            backgroundColor: NAVY, borderRadius: 24, padding: 20, flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden',
            shadowColor: NAVY, shadowOpacity: 0.3, shadowRadius: 20, elevation: 5,
          }}>
            <View style={{ position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: BLUE, opacity: 0.18, top: -30, right: -20 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Zap color="#FCD34D" size={24} fill="#FCD34D" />
              </View>
              <View>
                <Text style={{ color: '#93C5FD', fontSize: 12, marginBottom: 2 }}>SmartToken Balance</Text>
                <Text style={{ color: 'white', fontSize: 26, fontWeight: '900' }}>48 <Text style={{ fontSize: 14, fontWeight: '500', color: '#93C5FD' }}>tokens</Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#94A3B8', fontSize: 11, marginBottom: 4 }}>~AI meals left</Text>
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>48</Text>
            </View>
          </View>
        </View>

        {/* ── Personal Info ── */}
        <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: 'white', borderRadius: 28, padding: 22, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 14, elevation: 3 }}>
          <SectionHeader icon={User} label="Personal Information" color={BLUE} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <LabeledInput label="First Name" placeholder="First name" value={firstName} onChangeText={setFirstName} />
            </View>
            <View style={{ flex: 1 }}>
              <LabeledInput label="Last Name" placeholder="Last name" value={lastName} onChangeText={setLastName} />
            </View>
          </View>
          <LabeledInput label="Email Address" placeholder="you@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <LabeledInput label="Phone Number" placeholder="+234 800 000 0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <TouchableOpacity style={{
            backgroundColor: BLUE, paddingVertical: 14, borderRadius: 16, alignItems: 'center',
            shadowColor: BLUE, shadowOpacity: 0.35, shadowRadius: 10, elevation: 4,
          }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* ── KYC / Identity Verification ── */}
        <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: 'white', borderRadius: 28, padding: 22, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 14, elevation: 3 }}>
          <SectionHeader icon={ShieldCheck} label="Identity Verification (KYC)" color={INDIGO} />

          {/* KYC explanation */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#EFF6FF', borderRadius: 16, padding: 14, marginBottom: 18 }}>
            <Lock color={BLUE} size={16} style={{ marginTop: 2 }} />
            <Text style={{ flex: 1, fontSize: 12, color: SLATE, lineHeight: 18 }}>
              Your NIN and BVN are encrypted and used only to verify your identity for loan applications and SmartToken purchases.
            </Text>
          </View>

          {/* NIN */}
          <LabeledInput
            label="National Identification Number (NIN)"
            placeholder="Enter 11-digit NIN"
            value={nin}
            onChangeText={text => { setNIN(text.replace(/\D/, '')); setNinVerified(false); }}
            keyboardType="numeric"
            verified={ninVerified}
            icon={ShieldCheck}
          />
          {!ninVerified && (
            <TouchableOpacity
              onPress={handleVerifyNIN}
              style={{ backgroundColor: ninVerified ? '#F0FDF4' : INDIGO + '18', paddingVertical: 12, borderRadius: 14, alignItems: 'center', marginTop: -6, marginBottom: 14 }}
            >
              <Text style={{ color: INDIGO, fontWeight: '700', fontSize: 14 }}>Verify NIN</Text>
            </TouchableOpacity>
          )}

          {/* BVN */}
          <LabeledInput
            label="Bank Verification Number (BVN)"
            placeholder="Enter 11-digit BVN"
            value={bvn}
            onChangeText={text => { setBVN(text.replace(/\D/, '')); setBvnVerified(false); }}
            keyboardType="numeric"
            verified={bvnVerified}
            icon={ShieldCheck}
            secure
          />
          {!bvnVerified && (
            <TouchableOpacity
              onPress={handleVerifyBVN}
              style={{ backgroundColor: INDIGO + '18', paddingVertical: 12, borderRadius: 14, alignItems: 'center', marginTop: -6 }}
            >
              <Text style={{ color: INDIGO, fontWeight: '700', fontSize: 14 }}>Verify BVN</Text>
            </TouchableOpacity>
          )}

          {(ninVerified && bvnVerified) && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F0FDF4', padding: 14, borderRadius: 16, marginTop: 14 }}>
              <CheckCircle2 color={GREEN} size={18} />
              <Text style={{ color: GREEN, fontWeight: '700', fontSize: 14 }}>Identity fully verified</Text>
            </View>
          )}
        </View>

        {/* ── SmartToken Purchase ── */}
        <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: 'white', borderRadius: 28, padding: 22, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 14, elevation: 3 }}>
          <SectionHeader icon={Zap} label="Buy SmartTokens" color={ORANGE} />

          <Text style={{ fontSize: 13, color: SLATE, lineHeight: 20, marginBottom: 20 }}>
            SmartTokens power AI food logging. Point your camera at any meal and our AI instantly logs calories, protein, and carbs — no manual entry needed. 1 token = 1 AI scan.
          </Text>

          {/* Feature highlights */}
          {[
            { icon: '📸', text: 'Instant AI photo recognition' },
            { icon: '📊', text: 'Automatic macro & calorie logging' },
            { icon: '🔄', text: 'Tokens never expire' },
          ].map(f => (
            <View key={f.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <Text style={{ fontSize: 18 }}>{f.icon}</Text>
              <Text style={{ fontSize: 13, color: NAVY, fontWeight: '500' }}>{f.text}</Text>
            </View>
          ))}

          {/* Package selector */}
          <Text style={{ fontSize: 14, fontWeight: '700', color: NAVY, marginTop: 16, marginBottom: 12 }}>Choose a Package</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {tokenPackages.map((pkg, i) => (
              <TokenPackage
                key={i}
                tokens={pkg.tokens}
                price={pkg.price}
                tag={pkg.tag}
                selected={selectedPackage === i}
                onSelect={() => setSelectedPackage(i)}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handlePurchaseToken}
            style={{
              backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 18, alignItems: 'center',
              flexDirection: 'row', justifyContent: 'center', gap: 10,
              shadowColor: ORANGE, shadowOpacity: 0.4, shadowRadius: 14, elevation: 5,
            }}
          >
            <Zap color="white" size={20} fill="white" />
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>
              Purchase {tokenPackages[selectedPackage].tokens} Tokens · {tokenPackages[selectedPackage].price}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Preferences ── */}
        <View style={{ marginHorizontal: 20, marginBottom: 24, backgroundColor: 'white', borderRadius: 28, padding: 22, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 14, elevation: 3 }}>
          <SectionHeader icon={Bell} label="Preferences" color={SLATE} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: NAVY }}>Push Notifications</Text>
              <Text style={{ fontSize: 12, color: SLATE, marginTop: 2 }}>Reminders, payments, health alerts</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E2E8F0', true: BLUE }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* ── Log Out ── */}
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/login') },
            ])}
            style={{
              backgroundColor: '#FFF1F2', paddingVertical: 16, borderRadius: 18,
              alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10,
              borderWidth: 1.5, borderColor: '#FECDD3',
            }}
          >
            <LogOut color="#F43F5E" size={20} />
            <Text style={{ color: '#F43F5E', fontWeight: '700', fontSize: 16 }}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
