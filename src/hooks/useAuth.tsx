import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export type UserRole = 'visitor' | 'editor' | 'administrator';

export interface AuthUser extends User {
  role: UserRole;
  displayName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PERMISSIONS = {
  visitor: [],
  editor: ['read', 'create_project', 'edit_project'],
  administrator: ['read', 'create_project', 'edit_project', 'delete_project', 'manage_team', 'manage_users']
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Récupérer le rôle depuis Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          const authUser: AuthUser = {
            ...firebaseUser,
            role: userData?.role || 'visitor',
            displayName: userData?.displayName || firebaseUser.displayName || 'Utilisateur'
          };
          
          setUser(authUser);
        } catch (error) {
          console.error('Erreur lors de la récupération du rôle:', error);
          // En cas d'erreur, assigner le rôle visitor par défaut
          const authUser: AuthUser = {
            ...firebaseUser,
            role: 'visitor',
            displayName: firebaseUser.displayName || 'Utilisateur'
          };
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const hasPermission = (action: string): boolean => {
    if (!user) return false;
    return PERMISSIONS[user.role].includes(action);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};