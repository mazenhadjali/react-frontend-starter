import { create } from 'zustand';
import { auth } from '@/api/services/auth/auth.services';

const useUserStore = create((set, get) => ({
  // State
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  // Actions
  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    error: null
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearUser: () => set({
    user: null,
    isAuthenticated: false,
    error: null
  }),

  // Fetch current user data
  fetchMe: async () => {
    try {
      set({ isLoading: true, error: null });

      // Check if user is authenticated first
      if (!auth.isAuthenticated()) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
        return null;
      }

      const userData = await auth.me();
      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);

      // If unauthorized, clear the tokens and user data
      if (error.response?.status === 401) {
        auth.logout();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Session expired. Please login again.'
        });
      } else {
        set({
          isLoading: false,
          error: error.message || 'Failed to fetch user data'
        });
      }
      return null;
    }
  },

  // Login action
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      await auth.login(credentials);

      // After successful login, fetch user data
      const userData = await auth.me();

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true, data: userData };
    } catch (error) {
      console.error('Login error:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Login failed'
      });
      return { success: false, error: error.message || 'Login failed' };
    }
  },

  // Logout action
  logout: () => {
    auth.logout();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },

  // Initialize user state (call this on app start)
  initializeAuth: async () => {
    if (auth.isAuthenticated()) {
      await get().fetchMe();
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));

export default useUserStore;
