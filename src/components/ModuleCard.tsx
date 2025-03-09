
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route?: string; // Optional route property for navigation
}

interface ModuleCardProps {
  module: Module;
  index: number;
  onClick: (module: Module) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="w-full"
    >
      <div 
        className="module-card cursor-pointer p-6 h-full flex flex-col border rounded-lg hover:shadow-md dark:border-gray-800 transition-all"
        onClick={() => onClick(module)}
      >
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4",
          module.color
        )}>
          {module.icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{module.title}</h3>
        <p className="text-dragonfly-500 dark:text-dragonfly-400 text-sm flex-grow">
          {module.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
