
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-dragonfly-950 dark:to-dragonfly-900">
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">D</span>
            </div>
            <h1 className="text-xl font-medium tracking-tight">
              DragonFly
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-24 bg-dragonfly-100 dark:bg-dragonfly-800 animate-pulse rounded-md"></div>
            ) : user ? (
              <UserMenu />
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-dragonfly-500 dark:text-dragonfly-400">
        <div className="container">
          <p>DragonFly &copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
