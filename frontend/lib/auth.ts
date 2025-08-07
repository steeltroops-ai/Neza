// Simple authentication library to replace Clerk

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'client@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CLIENT',
  },
  {
    id: '2',
    email: 'provider@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'PROVIDER',
  },
];

// Simple authentication state
let currentUser: User | null = null;

// Sign in function
export async function signIn(email: string, password: string): Promise<User> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Create user object without password
  const { password: _, ...userWithoutPassword } = user;
  currentUser = userWithoutPassword as User;
  
  // Store in localStorage for persistence
  localStorage.setItem('user', JSON.stringify(currentUser));
  
  return currentUser;
}

// Sign in with Google
export async function signInWithGoogle(): Promise<User> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Always use the client user for Google sign-in in this mock
  const { password: _, ...userWithoutPassword } = MOCK_USERS[0];
  currentUser = userWithoutPassword as User;
  
  // Store in localStorage for persistence
  localStorage.setItem('user', JSON.stringify(currentUser));
  
  return currentUser;
}

// Sign out function
export async function signOut(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  currentUser = null;
  localStorage.removeItem('user');
}

// Get current user
export function getUser(): User | null {
  if (currentUser) return currentUser;
  
  // Try to get from localStorage
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        return currentUser;
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }
  
  return null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  // Check if currentUser is already set in memory
  if (currentUser) return true;
  
  // Only try localStorage if in browser environment
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser !== null;
  }
  
  return false;
}