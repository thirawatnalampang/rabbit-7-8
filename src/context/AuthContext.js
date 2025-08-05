import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    console.log('login:', userData);
    const fullUserData = {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
      gender: userData.gender || '',
      profileImage: userData.profileImage || userData.profile_image || '',
    };
    setUser(fullUserData);
  };

  const logout = () => {
    console.log('logout called');
    setUser(null);
    localStorage.removeItem('user');
  };

  const loginWithGoogle = async () => {
    const googleUser = {
      user_id: 9999,
      username: 'google_user',
      email: 'google@example.com',
      phone: '',
      address: '',
      gender: '',
      profileImage: '',
    };
    setUser(googleUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
