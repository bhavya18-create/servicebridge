import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, setOnUnauthorized } from '../lib/api';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Normalize role to lowercase to avoid mismatches
  const normalizeRole = useCallback((role) => {
    if (!role) return role;
    if (role === 'Provider') return 'provider';
    if (role === 'Seeker') return 'service_seeker';
    return role.toString().toLowerCase();
  }, []);

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem('servicebridge-token');
      sessionStorage.removeItem('servicebridge-token');
      localStorage.removeItem('servicebridge-user');
      setUser(null);
    } catch (error) {
      console.error('Failed to clear user tokens from storage:', error);
    }
  }, []);

  // Initialize and check for existing token on mount
  useEffect(() => {
    // Register the 401 auto-logout callback
    setOnUnauthorized(signOut);

    const checkAuth = async () => {
      const token = localStorage.getItem('servicebridge-token') || sessionStorage.getItem('servicebridge-token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.get('/profile');
        if (data && data.user) {
          const profile = data.user;
          profile.role = normalizeRole(profile.role);
          setUser(profile);
          // Sync backup copy
          localStorage.setItem('servicebridge-user', JSON.stringify(profile));
        } else {
          signOut();
        }
      } catch (err) {
        console.error('Session validation failed or token expired:', err.message);
        signOut();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [normalizeRole, signOut]);

  // Sign In using backend credentials
  const signIn = async (emailOrPhone, password, rememberMe = false) => {
    try {
      const data = await api.post('/login', { emailOrPhone, password });
      if (data && data.token && data.user) {
        const profile = data.user;
        profile.role = normalizeRole(profile.role);
        
        // Save token to appropriate storage depending on Remember Me
        if (rememberMe) {
          localStorage.setItem('servicebridge-token', data.token);
        } else {
          sessionStorage.setItem('servicebridge-token', data.token);
        }
        
        localStorage.setItem('servicebridge-user', JSON.stringify(profile));
        setUser(profile);
        return profile;
      }
      throw new Error('Invalid login response payload');
    } catch (error) {
      console.error('Login action failed:', error.message);
      throw error; // Let page capture the error message for displaying toasts
    }
  };

  // Sign Up / Registration
  const signUp = async (userData) => {
    try {
      const data = await api.post('/register', userData);
      if (data && data.token && data.user) {
        const profile = data.user;
        profile.role = normalizeRole(profile.role);
        
        // Default login context on signup uses persistent local storage
        localStorage.setItem('servicebridge-token', data.token);
        localStorage.setItem('servicebridge-user', JSON.stringify(profile));
        
        setUser(profile);
        return profile;
      }
      throw new Error('Invalid registration response payload');
    } catch (error) {
      console.error('Registration action failed:', error.message);
      throw error;
    }
  };

  // Update Profile details
  const updateUser = async (updates) => {
    try {
      const data = await api.put('/profile', updates);
      if (data && data.user) {
        const profile = data.user;
        profile.role = normalizeRole(profile.role);
        localStorage.setItem('servicebridge-user', JSON.stringify(profile));
        setUser(profile);
        return profile;
      }
      throw new Error('Invalid update response payload');
    } catch (error) {
      console.error('Profile update failed:', error.message);
      throw error;
    }
  };

  // Change Password
  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const data = await api.post('/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });
      return data;
    } catch (error) {
      console.error('Change password failed:', error.message);
      throw error;
    }
  };

  // Forgot Password: Triggers OTP code generation
  const forgotPassword = async (emailOrPhone) => {
    try {
      const data = await api.post('/forgot-password', { emailOrPhone });
      return data; // Will contain testOtp in development mode
    } catch (error) {
      console.error('Forgot password failed:', error.message);
      throw error;
    }
  };

  // Verify OTP
  const verifyOtp = async (emailOrPhone, otp) => {
    try {
      const data = await api.post('/verify-otp', { emailOrPhone, otp });
      return data;
    } catch (error) {
      console.error('OTP verification failed:', error.message);
      throw error;
    }
  };

  // Reset Password using verified OTP
  const resetPassword = async (emailOrPhone, otp, newPassword, confirmPassword) => {
    try {
      const data = await api.post('/reset-password', {
        emailOrPhone,
        otp,
        newPassword,
        confirmPassword
      });
      return data;
    } catch (error) {
      console.error('Reset password failed:', error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
        changePassword,
        forgotPassword,
        verifyOtp,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
