import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'operator';
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addUser: (email: string, password: string, role: 'admin' | 'operator') => boolean;
  removeUser: (userId: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'v2x_auth';
const USERS_KEY = 'v2x_users';

// Default admin account
const DEFAULT_USERS = [
  { id: '1', email: 'admin@v2x.com', password: 'admin123', role: 'admin' as const },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Array<User & { password: string }>>([]);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      setUsers(DEFAULT_USERS);
    }

    // Check if user is logged in
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, role: foundUser.role };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addUser = (email: string, password: string, role: 'admin' | 'operator'): boolean => {
    if (user?.role !== 'admin') return false;
    if (users.some(u => u.email === email)) return false;
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      role,
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return true;
  };

  const removeUser = (userId: string): boolean => {
    if (user?.role !== 'admin' || userId === user.id) return false;
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      users: users.map(({ password, ...user }) => user),
      login,
      logout,
      addUser,
      removeUser,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};