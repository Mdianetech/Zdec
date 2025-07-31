import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedActionProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
  showLoginPrompt?: boolean;
  onLoginRequired?: () => void;
}

export default function ProtectedAction({ 
  permission, 
  children, 
  fallback = null,
  showLoginPrompt = false,
  onLoginRequired 
}: ProtectedActionProps) {
  const { hasPermission, user } = useAuth();

  if (!hasPermission(permission)) {
    if (showLoginPrompt && !user) {
      return (
        <button
          onClick={onLoginRequired}
          className="btn btn-outline text-sm px-4 py-2 flex items-center gap-2"
        >
          🔒 Connexion requise
        </button>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}