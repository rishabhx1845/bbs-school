import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('bbs_token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('bbs_token', action.payload.token);
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      localStorage.removeItem('bbs_token');
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'USER_LOADED':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'AUTH_ERROR':
      localStorage.removeItem('bbs_token');
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('bbs_token');
      if (!token) {
        dispatch({ type: 'AUTH_ERROR' });
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        dispatch({ type: 'USER_LOADED', payload: data.user });
      } catch {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      toast.success(`Welcome back, ${data.user.name}!`);
      return { success: true, role: data.user.role };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
