import React from 'react';
import { GovSchemePortal } from './gov-portal/GovSchemePortal';

interface SignInProps {
  onNavigateToSignUp?: () => void;
  onSuccess?: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onNavigateToSignUp, onSuccess }) => {
  return (
    <GovSchemePortal
      defaultView="login"
      onLaunchDashboard={onSuccess}
    />
  );
};

export default SignIn;
