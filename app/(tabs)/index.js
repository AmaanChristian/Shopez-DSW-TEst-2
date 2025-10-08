import React from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { syncCartOffline } from '../../context/CartOffline';
import RootNavigator from '../../AppRoot';

// WRAP FIRST, then render navigator
export default function Index() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}