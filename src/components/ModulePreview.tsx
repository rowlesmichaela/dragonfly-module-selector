import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Module } from './ModuleCard';
import { CreditCard, Receipt, LineChart, PiggyBank, Folders, Plus, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';

interface ModulePreviewProps {
  module: Module;
}

// Define chart of accounts data structure
interface AccountItem {
  id: string;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

const accounts: AccountItem[] = [
  { id: '1', code: '1000', name: 'Cash', type: 'Asset', balance: 24500 },
  { id: '2', code: '1010', name: 'Accounts Receivable', type: 'Asset', balance: 5280 },
  { id: '3', code: '1020', name: 'Office Equipment', type: 'Asset', balance: 12000 },
  { id: '4', code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 3200 },
  { id: '5', code: '2010', name: 'Loans Payable', type: 'Liability', balance: 10000 },
  { id: '6', code: '3000', name: 'Owner Equity', type: 'Equity', balance: 28580 },
  { id: '7', code: '4000', name: 'Sales Revenue', type: 'Revenue', balance: 24500 },
  { id: '8', code: '5000', name: 'Rent Expense', type: 'Expense', balance: 2000 },
  { id: '9', code: '5010', name: 'Utilities Expense', type: 'Expense', balance: 450 },
  { id: '10', code: '5020', name: 'Office Supplies', type: 'Expense', balance: 245 },
  { id: '11', code: '5030', name: 'Software Subscriptions', type: 'Expense', balance: 300 },
];

const ModulePreview: React.FC<ModulePreviewProps> = ({ module }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    account.code.includes(searchTerm)
  );

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
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chart-of-accounts">Chart of Accounts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="chart-of-accounts">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Chart of Accounts</h3>
                <button className="flex items-center gap-1 bg-violet-500 hover:bg-violet-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
                  <Plus size={16} />
                  <span>New Account</span>
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-4 p-2 bg-dragonfly-50 dark:bg-dragonfly-800/30 border border-dragonfly-100 dark:border-dragonfly-700 rounded-md">
                <Search size={18} className="text-dragonfly-400" />
                <Input 
                  type="text" 
                  placeholder="Search accounts by name or code" 
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-2 p-3 bg-dragonfly-100 dark:bg-dragonfly-700 text-sm font-medium">
                  <div className="col-span-2">Code</div>
                  <div className="col-span-4">Account Name</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-3 text-right">Balance</div>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <div 
                        key={account.id} 
                        className="grid grid-cols-12 gap-2 p-3 border-b border-dragonfly-100 dark:border-dragonfly-700 hover:bg-dragonfly-100/50 dark:hover:bg-dragonfly-700/50 transition-colors cursor-pointer text-sm"
                      >
                        <div className="col-span-2 font-mono">{account.code}</div>
                        <div className="col-span-4">{account.name}</div>
                        <div className="col-span-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                            account.type === 'Asset' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            account.type === 'Liability' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                            account.type === 'Equity' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                            account.type === 'Revenue' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                            'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
                          }`}>
                            {account.type}
                          </span>
                        </div>
                        <div className={`col-span-3 text-right ${
                          account.type === 'Asset' || account.type === 'Expense' ? 'text-dragonfly-900 dark:text-dragonfly-100' :
                          account.type === 'Liability' || account.type === 'Equity' || account.type === 'Revenue' ? 'text-emerald-600 dark:text-emerald-400' : ''
                        }`}>
                          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-dragonfly-400">
                      No accounts found matching your search criteria
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-dragonfly-100/50 dark:bg-dragonfly-700/30 border-t border-dragonfly-100 dark:border-dragonfly-700 text-sm text-right">
                  <span className="font-medium">Total Accounts: {filteredAccounts.length}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
                {['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'].map((type) => {
                  const totalBalance = accounts
                    .filter(account => account.type === type)
                    .reduce((sum, account) => sum + account.balance, 0);
                    
                  return (
                    <div 
                      key={type} 
                      className="bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700 rounded-lg p-3"
                    >
                      <div className="text-sm text-dragonfly-500 dark:text-dragonfly-400 mb-1">{type} Accounts</div>
                      <div className="font-medium">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
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
