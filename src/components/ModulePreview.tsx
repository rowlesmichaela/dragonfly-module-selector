
import React from 'react';
import { motion } from 'framer-motion';
import { Module } from './ModuleCard';

interface ModulePreviewProps {
  module: Module;
}

const ModulePreview: React.FC<ModulePreviewProps> = ({ module }) => {
  return (
    <div className="bg-white dark:bg-dragonfly-900 rounded-xl p-8 shadow-sm border border-dragonfly-200 dark:border-dragonfly-800">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${module.color}`}>
          <div className="text-white">{module.icon}</div>
        </div>
        <div>
          <h2 className="text-2xl font-medium">{module.title}</h2>
          <p className="text-dragonfly-500 dark:text-dragonfly-400">{module.description}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <motion.div 
          className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h3 className="text-lg font-medium mb-3">Module Content</h3>
          <div className="h-32 flex items-center justify-center text-dragonfly-400">
            <p>This is a preview of the {module.title} module.</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
            <h4 className="text-md font-medium mb-2">Features</h4>
            <ul className="space-y-1 text-sm text-dragonfly-600 dark:text-dragonfly-300">
              <li>• Feature one</li>
              <li>• Feature two</li>
              <li>• Feature three</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
            <h4 className="text-md font-medium mb-2">Statistics</h4>
            <div className="space-y-2 text-sm text-dragonfly-600 dark:text-dragonfly-300">
              <div className="flex justify-between">
                <span>Usage:</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400">Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModulePreview;
