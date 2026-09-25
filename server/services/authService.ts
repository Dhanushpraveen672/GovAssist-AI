import { User, AuthResponse, SignInData, SignUpData } from '../../src/types/auth';

// Mock in-memory user database
const USERS_DB: User[] = [
  {
    id: 'usr-1',
    name: 'Ramesh Kumar',
    email: 'ramesh@govassist.in',
    phone: '+919876543210',
    state: 'Tamil Nadu',
    category: 'Farmers',
    role: 'citizen',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    email: 'priya@govassist.in',
    phone: '+919812345678',
    state: 'Maharashtra',
    category: 'Women',
    role: 'citizen',
    createdAt: new Date().toISOString(),
  }
];

// Active OTP database
const OTP_STORE: Record<string, string> = {};

// Helper: Generate simple JWT token representation
function generateJwtToken(user: User): string {
  const payload = Buffer.from(JSON.stringify({ id: user.id, email: user.email, exp: Date.now() + 86400000 })).toString('base64');
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.signature`;
}

export function handleSignIn(data: SignInData): AuthResponse {
  const { identifier, password } = data;
  if (!identifier) {
    return { success: false, message: 'Email or Username is required' };
  }

  // Find user by email or phone
  let user = USERS_DB.find(u =>
    u.email.toLowerCase() === identifier.toLowerCase() ||
    u.phone === identifier
  );

  // If user doesn't exist, create a default citizen user session
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      name: identifier.split('@')[0] || 'Citizen User',
      email: identifier.includes('@') ? identifier : `${identifier}@govassist.in`,
      phone: identifier.startsWith('+') ? identifier : undefined,
      state: 'All India',
      category: 'General',
      role: 'citizen',
      createdAt: new Date().toISOString(),
    };
    USERS_DB.push(user);
  }

  const token = generateJwtToken(user);

  return {
    success: true,
    message: 'Signed in successfully',
    token,
    user,
  };
}

export function handleSignUp(data: SignUpData): AuthResponse {
  const { name, email, phone, state, category } = data;

  if (!name || !email) {
    return { success: false, message: 'Name and Email are required fields' };
  }

  const existingUser = USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return { success: false, message: 'An account with this email address already exists' };
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name,
    email,
    phone,
    state: state || 'Central',
    category: category || 'General',
    role: 'citizen',
    createdAt: new Date().toISOString(),
  };

  USERS_DB.push(newUser);
  const token = generateJwtToken(newUser);

  return {
    success: true,
    message: 'Citizen account created successfully',
    token,
    user: newUser,
  };
}

export function handleSendOtp(phone: string): { success: boolean; message: string; otpCode?: string } {
  if (!phone) {
    return { success: false, message: 'Mobile number is required' };
  }

  // Demo 6-digit OTP
  const otpCode = '123456';
  OTP_STORE[phone] = otpCode;

  console.log(`📱 [SMS Gateway Simulator] OTP for rural mobile ${phone}: ${otpCode}`);

  return {
    success: true,
    message: `OTP sent successfully to ${phone}. (Demo OTP: 123456)`,
    otpCode,
  };
}

export function handleVerifyOtp(phone: string, otp: string): AuthResponse {
  const storedOtp = OTP_STORE[phone] || '123456';

  if (otp !== storedOtp && otp !== '123456') {
    return { success: false, message: 'Invalid or expired OTP code' };
  }

  let user = USERS_DB.find(u => u.phone === phone);
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      name: `Rural Citizen (${phone.slice(-4)})`,
      email: `citizen_${phone.replace(/[^0-9]/g, '')}@govassist.in`,
      phone,
      state: 'Central',
      category: 'Farmers',
      role: 'citizen',
      createdAt: new Date().toISOString(),
    };
    USERS_DB.push(user);
  }

  const token = generateJwtToken(user);

  return {
    success: true,
    message: 'Mobile OTP verified successfully',
    token,
    user,
  };
}

export function getUserFromToken(tokenHeader?: string): User | null {
  if (!tokenHeader) return null;
  try {
    const token = tokenHeader.replace('Bearer ', '');
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      return USERS_DB.find(u => u.id === payload.id) || USERS_DB[0];
    }
  } catch (e) {
    return USERS_DB[0];
  }
  return USERS_DB[0];
}
