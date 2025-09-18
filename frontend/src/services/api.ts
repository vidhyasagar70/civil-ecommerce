const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api`;

// Forgot Password API
export const forgotPasswordAPI = async (data: { email: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send reset email');
  }

  return response.json();
};

// Validate Reset Token API
export const validateResetTokenAPI = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/validate-reset-token/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Invalid reset token');
  }

  return response.json();
};

// Reset Password API - Updated to include email
export const resetPasswordAPI = async (data: { token: string; email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/${data.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reset password');
  }

  return response.json();
};

// Contact API
export const submitContactFormAPI = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/contact/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit contact form');
  }

  return response.json();
};

// For admin to get contact submissions
export const getContactSubmissionsAPI = async (token: string, page: number = 1, limit: number = 10, search: string = '') => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search })
  });

  const response = await fetch(`${API_BASE_URL}/contact/submissions?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch contact submissions');
  }

  return response.json();
};