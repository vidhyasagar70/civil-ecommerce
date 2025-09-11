import React from 'react';
import { Link } from 'react-router-dom';

const FormFooter: React.FC = () => {
  return (
    <div className="mt-8 text-center space-y-4">
      {/* Sign in link */}
      <p className="text-gray-600 text-sm">
        Already have an account?{' '}
        <Link 
          to="/signin" 
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          Sign in
        </Link>
      </p>

      {/* Terms and policies */}
      <p className="text-xs text-gray-500 leading-relaxed">
        By creating an account, you agree to our{' '}
        <Link 
          to="/terms" 
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          Terms of Service
        </Link>
        ,{' '}
        <Link 
          to="/privacy" 
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          Privacy Policy
        </Link>
        , and{' '}
        <Link 
          to="/refund" 
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          Refund Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default FormFooter;
