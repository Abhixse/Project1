// Utility functions for API calls with authentication

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const apiCall = async (
  endpoint: string,
  options: RequestInit & { token?: string } = {}
) => {
  const { token, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
};

// Admin API calls
export const adminAPI = {
  register: (username: string, email: string, password: string) =>
    apiCall('/api/admin/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  login: (username: string, password: string) =>
    apiCall('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getCurrentAdmin: (token: string) =>
    apiCall('/api/admin/me', { token }),
};

// Content API calls
export const contentAPI = {
  getAll: (type?: string, isActive?: boolean) => {
    let url = '/api/content';
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (isActive !== undefined) params.append('isActive', String(isActive));
    if (params.toString()) url += `?${params.toString()}`;
    return apiCall(url);
  },

  getById: (id: string) =>
    apiCall(`/api/content/${id}`),

  create: (token: string, contentData: any) =>
    apiCall('/api/content', {
      method: 'POST',
      token,
      body: JSON.stringify(contentData),
    }),

  update: (token: string, id: string, contentData: any) =>
    apiCall(`/api/content/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(contentData),
    }),

  delete: (token: string, id: string) =>
    apiCall(`/api/content/${id}`, {
      method: 'DELETE',
      token,
    }),

  reorder: (token: string, items: Array<{ id: string; order: number }>) =>
    apiCall('/api/content/reorder', {
      method: 'POST',
      token,
      body: JSON.stringify({ items }),
    }),
};

// Contact form API
export const contactAPI = {
  send: (contactData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) =>
    apiCall('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),
};
