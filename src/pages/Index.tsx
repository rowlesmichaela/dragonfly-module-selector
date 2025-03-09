
import React from 'react';
import Layout from '@/components/Layout';
import ModuleSelector from '@/components/ModuleSelector';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <Layout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
            Welcome to DragonFly
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-4">
            Your perfect workspace
          </h1>
          <p className="text-dragonfly-500 dark:text-dragonfly-400 text-lg leading-relaxed">
            DragonFly is an elegant, intuitive platform designed to streamline your workflow with a carefully crafted user experience.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <ModuleSelector />
        ) : (
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-medium mb-2">Sign in to access modules</h2>
                <p className="text-dragonfly-500 dark:text-dragonfly-400">Please sign in or create an account to access the DragonFly modules.</p>
              </div>
              <AuthForm />
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
