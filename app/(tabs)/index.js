import React from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { syncCartOffline } from '../../context/CartOffline';
import RootNavigator from '../../AppRoot';


export default function Index() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}