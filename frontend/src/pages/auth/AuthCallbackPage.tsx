import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../../ui/utils/auth';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Decode token to get user info (you might want to verify it properly)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      saveAuth({
        token,
        email: payload.email,
        role: payload.role || 'user',
        userId: payload.userId,
        fullName: payload.fullName
      });

      navigate('/');
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Completing login...</h2>
        <p className="text-gray-600 mt-2">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}