import React from 'react';
import { useStorageState } from './src/expo-auth/useStorage';

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  sessionLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  sessionLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[sessionLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          console.log('User is attempting to sign in')
          setSession('xxx');
        },
        signOut: () => {
          console.log('User is attempting to sign out. ')
          setSession(null);
        },
        session,
        sessionLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
