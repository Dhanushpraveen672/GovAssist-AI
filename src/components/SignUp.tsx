import React from 'react';
import { GovSchemePortal } from './gov-portal/GovSchemePortal';

interface SignUpProps {
  onNavigateToSignIn?: () => void;
  onSuccess?: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigateToSignIn, onSuccess }) => {
  return (
    <GovSchemePortal
      defaultView="register"
      onLaunchDashboard={onSuccess}
    />
  );
};

export default SignUp;
