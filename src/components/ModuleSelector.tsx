
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ModuleCard, { Module } from './ModuleCard';
import ModulePreview from './ModulePreview';
import { Grid3X3, Settings, FileText, BarChart4, Database, Users, Code, ArrowLeft, Wallet, Contact } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const modules: Module[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview of your system performance and metrics.',
    icon: <Grid3X3 className="text-white" size={20} />,
    color: 'bg-blue-500'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure system preferences and options.',
    icon: <Settings className="text-white" size={20} />,
    color: 'bg-gray-700'
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Access and manage your files and documents.',
    icon: <FileText className="text-white" size={20} />,
    color: 'bg-emerald-500'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Review data insights and performance metrics.',
    icon: <BarChart4 className="text-white" size={20} />,
    color: 'bg-amber-500'
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Manage your database connections and data.',
    icon: <Database className="text-white" size={20} />,
    color: 'bg-purple-500'
  },
  {
    id: 'customers',
    title: 'Customers',
    description: 'Manage your customer contacts and information.',
    icon: <Users className="text-white" size={20} />,
    color: 'bg-teal-600',
    route: '/customers'
  },
  {
    id: 'developer',
    title: 'Developer',
    description: 'Access developer tools and APIs.',
    icon: <Code className="text-white" size={20} />,
    color: 'bg-teal-500'
  },
  {
    id: 'accounting',
    title: 'Accounting',
    description: 'Manage financial records and transactions.',
    icon: <Wallet className="text-white" size={20} />,
    color: 'bg-violet-500'
  },
  {
    id: 'contacts',
    title: 'Contacts',
    description: 'Manage your contacts and communication.',
    icon: <Contact className="text-white" size={20} />,
    color: 'bg-blue-400'
  }
];

const ModuleSelector: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const navigate = useNavigate();

  const handleSelectModule = (module: Module) => {
    if (module.route) {
      navigate(module.route);
    } else {
      setSelectedModule(module);
    }
  };

  const handleBack = () => {
    setSelectedModule(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {selectedModule ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Home Page</span>
            </button>
            <ModulePreview module={selectedModule} />
          </motion.div>
        ) : (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-medium mb-3 tracking-tight"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Select a module
              </motion.h2>
              <motion.p 
                className="text-dragonfly-500 dark:text-dragonfly-400 max-w-md mx-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Choose from the available modules to get started with your DragonFly experience.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {modules.map((module, index) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  index={index}
                  onClick={handleSelectModule}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSelector;
