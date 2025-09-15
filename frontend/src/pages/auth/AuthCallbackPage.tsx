import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../../ui/utils/auth';
import { getCurrentUser } from '../../api/auth';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          // Save the token to localStorage temporarily
          localStorage.setItem('token', token);
          
          // Fetch user data using the token
          const userData = await getCurrentUser();
          
          // Save complete user data to localStorage
          saveAuth({
            token,
            email: userData.email,
            role: userData.role,
            userId: userData.id,
            fullName: userData.fullName
          });

          navigate('/');
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Auth callback failed:', error);
        navigate('/signin');
      }
    };

    handleGoogleAuthCallback();
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