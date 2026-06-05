const API_BASE_URL = '/api/auth';

let onUnauthorizedCallback = null;
let useMockData = false; // Toggle for development

export const setOnUnauthorized = (callback) => {
  onUnauthorizedCallback = callback;
};

// Mock data for development
const mockUsers = {};

const generateMockToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Try retrieving the JWT from localStorage first, then sessionStorage
  const token = localStorage.getItem('servicebridge-token') || sessionStorage.getItem('servicebridge-token');
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    if (onUnauthorizedCallback) {
      console.warn('API client received 401 Unauthorized. Triggering auto-logout...');
      onUnauthorizedCallback();
    }
  }

  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMsg = (data && data.message) || `HTTP error! status: ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const api = {
  get: async (endpoint) => {
    // Handle mock profile endpoint
    if (endpoint === '/profile') {
      const token = localStorage.getItem('servicebridge-token') || sessionStorage.getItem('servicebridge-token');
      if (token && token.startsWith('mock-jwt-token')) {
        // Find the user based on token (simplified for mock)
        const users = Object.values(mockUsers);
        if (users.length > 0) {
          return { user: users[users.length - 1].user };
        }
        throw new Error('User not found');
      }
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, body) => {
    // Handle mock registration
    if (endpoint === '/register') {
      try {
        const mockToken = generateMockToken();
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          role: body.role,
          location: body.location,
          address: body.address,
          avatar: null,
          ...(body.role === 'provider' && {
            serviceCategory: body.serviceCategory,
            experience: body.experience,
            skills: body.skills,
            availability: body.availability
          })
        };
        
        mockUsers[body.email] = { user: mockUser, password: body.password };
        
        return {
          token: mockToken,
          user: mockUser
        };
      } catch (error) {
        throw new Error('Registration failed');
      }
    }
    
    // Handle mock login
    if (endpoint === '/login') {
      try {
        const mockUser = Object.values(mockUsers).find(u => u.user.email === body.emailOrPhone || u.user.phone === body.emailOrPhone);
        
        if (!mockUser || mockUser.password !== body.password) {
          throw new Error('Invalid credentials');
        }
        
        const mockToken = generateMockToken();
        return {
          token: mockToken,
          user: mockUser.user
        };
      } catch (error) {
        throw error;
      }
    }
    
    // Try real API for other endpoints
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    } catch (error) {
      // If backend fails and it's login/register, show a better error
      if (endpoint === '/login' || endpoint === '/register') {
        console.error('Backend unreachable, using mock data:', error);
        // Re-throw to let UI handle it
        throw error;
      }
      throw error;
    }
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
