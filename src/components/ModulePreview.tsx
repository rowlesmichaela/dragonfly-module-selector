
import React from 'react';
import { motion } from 'framer-motion';
import { Module } from './ModuleCard';
import { CreditCard, Receipt, LineChart, PiggyBank } from 'lucide-react';

interface ModulePreviewProps {
  module: Module;
}

const ModulePreview: React.FC<ModulePreviewProps> = ({ module }) => {
  // Render specialized content for the Accounting module
  if (module.id === 'accounting') {
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
            <h3 className="text-lg font-medium mb-3">Financial Overview</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-dragonfly-600 dark:text-dragonfly-300">Total Revenue</span>
                <span className="font-medium">$24,500.00</span>
              </div>
              <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-2 rounded-full">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-dragonfly-600 dark:text-dragonfly-300">Total Expenses</span>
                <span className="font-medium">$16,320.00</span>
              </div>
              <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-2 rounded-full">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-dragonfly-600 dark:text-dragonfly-300">Net Profit</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">$8,180.00</span>
              </div>
              <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <CreditCard size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <h4 className="text-md font-medium">Quick Actions</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors">
                  Record New Transaction
                </li>
                <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors">
                  Create Invoice
                </li>
                <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors">
                  Manage Expenses
                </li>
                <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors">
                  Run Financial Reports
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Receipt size={16} className="text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="text-md font-medium">Recent Transactions</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-dragonfly-100 dark:border-dragonfly-700">
                  <span className="text-dragonfly-600 dark:text-dragonfly-300">Office Supplies</span>
                  <span className="text-rose-600 dark:text-rose-400">-$245.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dragonfly-100 dark:border-dragonfly-700">
                  <span className="text-dragonfly-600 dark:text-dragonfly-300">Client Payment</span>
                  <span className="text-emerald-600 dark:text-emerald-400">+$1,200.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-dragonfly-600 dark:text-dragonfly-300">Software Subscription</span>
                  <span className="text-rose-600 dark:text-rose-400">-$49.99</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <LineChart size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-md font-medium">Financial Health</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dragonfly-600 dark:text-dragonfly-300">Profit Margin</span>
                  <span className="text-sm font-medium">33.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dragonfly-600 dark:text-dragonfly-300">Cash Flow</span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Positive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dragonfly-600 dark:text-dragonfly-300">Outstanding Invoices</span>
                  <span className="text-sm font-medium">$5,280.00</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <PiggyBank size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-md font-medium">Budget Status</h4>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Marketing</span>
                    <span>$3,500 / $5,000</span>
                  </div>
                  <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-1.5 rounded-full">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Operations</span>
                    <span>$8,200 / $10,000</span>
                  </div>
                  <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-1.5 rounded-full">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Development</span>
                    <span>$4,300 / $6,000</span>
                  </div>
                  <div className="w-full bg-dragonfly-100 dark:bg-dragonfly-700 h-1.5 rounded-full">
                    <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default render for other modules
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
