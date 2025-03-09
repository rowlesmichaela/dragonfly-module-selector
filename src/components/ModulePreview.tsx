import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Module } from './ModuleCard';
import { 
  CreditCard, Receipt, LineChart, PiggyBank, Plus, Search, FileText, 
  Trash2, Edit, Send, Contact, Mail, Phone, MapPin, Filter, Users, Tag,
  FolderClosed
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import TransactionDialog, { TransactionData } from './accounting/TransactionDialog';
import InvoiceDialog, { InvoiceData } from './accounting/InvoiceDialog';
import ContactDialog from './contacts/ContactDialog';
import type { ContactData } from './contacts/ContactDialog';
import { Customer } from './contacts/Customer';

interface ModulePreviewProps {
  module: Module;
}

interface AccountItem {
  id: string;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account: string;
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
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceData | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date(2023, 6, 15),
      description: 'Office Supplies',
      amount: 245.00,
      type: 'expense',
      category: 'Office Supplies',
      account: 'Checking Account'
    },
    {
      id: '2',
      date: new Date(2023, 6, 20),
      description: 'Client Payment',
      amount: 1200.00,
      type: 'income',
      category: 'Services',
      account: 'Checking Account'
    },
    {
      id: '3',
      date: new Date(2023, 6, 25),
      description: 'Software Subscription',
      amount: 49.99,
      type: 'expense',
      category: 'Software',
      account: 'Credit Card'
    },
  ]);

  const [invoices, setInvoices] = useState<InvoiceData[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2023-0001',
      date: new Date(2023, 5, 20),
      dueDate: new Date(2023, 6, 20),
      customer: new Customer({
        id: 'cust-1',
        name: 'Acme Corporation',
        email: 'billing@acmecorp.com',
        phone: '',
        address: '',
        company: 'Acme Corporation',
        title: '',
        category: 'business',
        notes: '',
        tags: []
      }),
      items: [
        { id: '1', description: 'Website Development', quantity: 1, rate: 1500, amount: 1500 },
        { id: '2', description: 'SEO Optimization', quantity: 10, rate: 75, amount: 750 }
      ],
      notes: 'Payment due in 30 days',
      total: 2250,
      status: 'sent'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2023-0002',
      date: new Date(2023, 6, 15),
      dueDate: new Date(2023, 7, 15),
      customer: new Customer({
        id: 'cust-2',
        name: 'TechStart Inc.',
        email: 'accounts@techstart.io',
        phone: '',
        address: '',
        company: 'TechStart Inc.',
        title: '',
        category: 'business',
        notes: '',
        tags: []
      }),
      items: [
        { id: '1', description: 'UI/UX Design', quantity: 20, rate: 85, amount: 1700 }
      ],
      notes: 'Net 30',
      total: 1700,
      status: 'paid'
    }
  ]);

  const [searchContactTerm, setSearchContactTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactData | undefined>(undefined);
  const [contacts, setContacts] = useState<ContactData[]>([
    {
      id: 'contact-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 94521',
      company: 'Acme Corporation',
      title: 'Marketing Director',
      category: 'business',
      notes: 'Met at the tech conference in March.',
      tags: ['client', 'tech', 'marketing']
    },
    {
      id: 'contact-2',
      name: 'Jane Smith',
      email: 'jane.smith@techstart.io',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Somewhere, CA 90210',
      company: 'TechStart Inc.',
      title: 'CEO',
      category: 'business',
      notes: 'Potential investor for the new project.',
      tags: ['investor', 'tech', 'CEO']
    },
    {
      id: 'contact-3',
      name: 'Michael Johnson',
      email: 'michael@gmail.com',
      phone: '(555) 555-1212',
      address: '789 Pine St, Elsewhere, CA 92101',
      company: '',
      title: '',
      category: 'personal',
      notes: 'College friend. Birthday on July 15th.',
      tags: ['friend', 'personal']
    }
  ]);

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    account.code.includes(searchTerm)
  );

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchContactTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchContactTerm.toLowerCase()) ||
      contact.phone.includes(searchContactTerm) ||
      contact.company.toLowerCase().includes(searchContactTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || contact.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveTransaction = (transactionData: TransactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `tx-${Date.now()}`,
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    toast.success(`${transactionData.type === 'income' ? 'Income' : 'Expense'} recorded successfully`, {
      description: `$${transactionData.amount.toFixed(2)} - ${transactionData.description}`
    });
  };

  const handleSaveInvoice = (invoiceData: InvoiceData) => {
    const isEditing = invoices.some(inv => inv.id === invoiceData.id);
    
    if (isEditing) {
      setInvoices(invoices.map(inv => 
        inv.id === invoiceData.id ? invoiceData : inv
      ));
      toast.success("Invoice updated successfully", {
        description: `Invoice #${invoiceData.invoiceNumber} for ${invoiceData.customer.name}`
      });
    } else {
      setInvoices([invoiceData, ...invoices]);
      toast.success("Invoice created successfully", {
        description: `Invoice #${invoiceData.invoiceNumber} for ${invoiceData.customer.name}`
      });
    }
    
    setEditingInvoice(undefined);
  };

  const handleEditInvoice = (invoice: InvoiceData) => {
    setEditingInvoice(invoice);
    setIsInvoiceDialogOpen(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(inv => inv.id !== invoiceId));
    toast.success("Invoice deleted", {
      description: "The invoice has been permanently deleted"
    });
  };

  const handleUpdateInvoiceStatus = (invoiceId: string, status: 'draft' | 'sent' | 'paid') => {
    setInvoices(invoices.map(inv => 
      inv.id === invoiceId ? { ...inv, status } : inv
    ));
    
    const statusLabels = {
      draft: 'Marked as draft',
      sent: 'Marked as sent',
      paid: 'Marked as paid'
    };
    
    toast.success(statusLabels[status], {
      description: `Invoice status has been updated`
    });
  };

  const handleSaveContact = (contactData: ContactData) => {
    const isEditing = contacts.some(c => c.id === contactData.id);
    
    if (isEditing) {
      setContacts(contacts.map(c => 
        c.id === contactData.id ? contactData : c
      ));
      toast.success("Contact updated successfully", {
        description: `${contactData.name}'s information has been updated`
      });
    } else {
      setContacts([contactData, ...contacts]);
      toast.success("Contact added successfully", {
        description: `${contactData.name} has been added to your contacts`
      });
    }
    
    setEditingContact(undefined);
  };

  const handleEditContact = (contact: ContactData) => {
    setEditingContact(contact);
    setIsContactDialogOpen(true);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
    toast.success("Contact deleted", {
      description: "The contact has been permanently removed"
    });
  };

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
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
                  <li 
                    className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors flex items-center gap-2"
                    onClick={() => setIsTransactionDialogOpen(true)}
                  >
                    <Plus size={14} className="text-violet-600 dark:text-violet-400" />
                    Record New Transaction
                  </li>
                  <li 
                    className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors flex items-center gap-2"
                    onClick={() => {
                      setEditingInvoice(undefined);
                      setIsInvoiceDialogOpen(true);
                    }}
                  >
                    <FileText size={14} className="text-violet-600 dark:text-violet-400" />
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
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Receipt size={16} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <h4 className="text-md font-medium">Recent Transactions</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setIsTransactionDialogOpen(true)}
                  >
                    <Plus size={14} className="mr-1" /> New
                  </Button>
                </div>
                <div className="space-y-3 text-sm">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex justify-between py-1 border-b border-dragonfly-100 dark:border-dragonfly-700"
                    >
                      <span className="text-dragonfly-600 dark:text-dragonfly-300">
                        {transaction.description}
                      </span>
                      <span className={transaction.type === 'income' 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-rose-600 dark:text-rose-400"}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
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
                        className="grid grid-cols-12 gap-2 p-3 border-b border-dragonfly-100 dark:border-dragonfly-700 hover:bg-dragonfly-100/50 dark:hover:bg-dragonfly-700/50 transition-colors text-sm"
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
          
          <TabsContent value="invoices">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Invoices</h3>
                <Button 
                  variant="default" 
                  className="bg-violet-500 hover:bg-violet-600 text-white"
                  onClick={() => {
                    setEditingInvoice(undefined);
                    setIsInvoiceDialogOpen(true);
                  }}
                >
                  <Plus size={16} className="mr-1" />
                  New Invoice
                </Button>
              </div>
              
              <div className="bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-2 p-3 bg-dragonfly-100 dark:bg-dragonfly-700 text-sm font-medium">
                  <div className="col-span-2">Invoice #</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-3">Client</div>
                  <div className="col-span-2 text-right">Amount</div>
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                      <div 
                        key={invoice.id} 
                        className="grid grid-cols-12 gap-2 p-3 border-b border-dragonfly-100 dark:border-dragonfly-700 hover:bg-dragonfly-100/50 dark:hover:bg-dragonfly-700/50 transition-colors text-sm"
                      >
                        <div className="col-span-2 font-medium">{invoice.invoiceNumber}</div>
                        <div className="col-span-2">{invoice.date.toLocaleDateString()}</div>
                        <div className="col-span-3">
                          <div>{invoice.customer.name}</div>
                          <div className="text-xs text-dragonfly-500 dark:text-dragonfly-400">{invoice.customer.email}</div>
                        </div>
                        <div className="col-span-2 text-right font-medium">
                          ${invoice.total.toFixed(2)}
                        </div>
                        <div className="col-span-1 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                            invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                            invoice.status === 'sent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-dragonfly-100 text-dragonfly-800 dark:bg-dragonfly-900/30 dark:text-dragonfly-300'
                          }`}>
                            {invoice.status === 'paid' ? 'Paid' : 
                             invoice.status === 'sent' ? 'Sent' : 'Draft'}
                          </span>
                        </div>
                        <div className="col-span-2 text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-dragonfly-600 dark:text-dragonfly-300"
                            onClick={() => handleEditInvoice(invoice)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {invoice.status !== 'sent' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-blue-600 dark:text-blue-400"
                              onClick={() => handleUpdateInvoiceStatus(invoice.id, 'sent')}
                              title="Mark as sent"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {invoice.status !== 'paid' && invoice.status === 'sent' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-emerald-600 dark:text-emerald-400"
                              onClick={() => handleUpdateInvoiceStatus(invoice.id, 'paid')}
                              title="Mark as paid"
                            >
                              <PiggyBank className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-dragonfly-400">
                      No invoices found. Click "New Invoice" to create one.
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-dragonfly-100/50 dark:bg-dragonfly-700/30 border-t border-dragonfly-100 dark:border-dragonfly-700 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Total Invoices: {invoices.length}</span>
                    <span className="font-medium">
                      Total Amount: ${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                {(['draft', 'sent', 'paid'] as const).map((status) => {
                  const statusInvoices = invoices.filter(inv => inv.status === status);
                  const statusTotal = statusInvoices.reduce((sum, inv) => sum + inv.total, 0);
                  
                  return (
                    <div 
                      key={status} 
                      className="bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700 rounded-lg p-3"
                    >
                      <div className="text-sm text-dragonfly-500 dark:text-dragonfly-400 mb-1 capitalize">
                        {status} Invoices
                      </div>
                      <div className="flex justify-between">
                        <div className="font-medium">${statusTotal.toFixed(2)}</div>
                        <div className="text-dragonfly-500 dark:text-dragonfly-400">{statusInvoices.length} invoices</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <TransactionDialog 
          open={isTransactionDialogOpen} 
          onOpenChange={setIsTransactionDialogOpen} 
          onSave={handleSaveTransaction}
        />
        
        <InvoiceDialog 
          open={isInvoiceDialogOpen} 
          onOpenChange={setIsInvoiceDialogOpen} 
          onSave={handleSaveInvoice}
          editInvoice={editingInvoice}
        />
      </div>
    );
  }

  if (module.id === 'contacts') {
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
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 p-2 bg-dragonfly-50 dark:bg-dragonfly-800/30 border border-dragonfly-100 dark:border-dragonfly-700 rounded-md">
            <Search size={18} className="text-dragonfly-400" />
            <Input 
              type="text" 
              placeholder="Search contacts..." 
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
              value={searchContactTerm}
              onChange={(e) => setSearchContactTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 bg-dragonfly-50 dark:bg-dragonfly-800/30 border border-dragonfly-100 dark:border-dragonfly-700 rounded-md">
              <Filter size={16} className="text-dragonfly-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-sm"
              >
                <option value="all">All Categories</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <Button 
              variant="default" 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                setEditingContact(undefined);
                setIsContactDialogOpen(true);
              }}
            >
              <Plus size={16} className="mr-1" />
              Add Contact
            </Button>
          </div>
        </div>
        
        <div className="bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-dragonfly-100 dark:bg-dragonfly-700 text-sm font-medium">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Contact Information</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="grid grid-cols-12 gap-2 p-3 border-b border-dragonfly-100 dark:border-dragonfly-700 hover:bg-dragonfly-100/50 dark:hover:bg-dragonfly-700/50 transition-colors text-sm"
                >
                  <div className="col-span-3">
                    <div className="font-medium">{contact.name}</div>
                    {contact.title && <div className="text-xs text-dragonfly-500 dark:text-dragonfly-400">{contact.title}</div>}
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-dragonfly-400" />
                      <span>{contact.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3 text-dragonfly-400" />
                      <span>{contact.phone || 'No phone'}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    {contact.company || 'N/A'}
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      contact.category === 'business' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      contact.category === 'personal' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      'bg-dragonfly-100 text-dragonfly-800 dark:bg-dragonfly-900/30 dark:text-dragonfly-300'
                    }`}>
                      {contact.category === 'business' ? 'Business' : 
                       contact.category === 'personal' ? 'Personal' : 'Other'}
                    </span>
                    {contact.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Tag className="h-3 w-3 text-dragonfly-400" />
                        <span className="text-xs">{contact.tags.slice(0, 2).join(', ')}{contact.tags.length > 2 ? `... +${contact.tags.length - 2}` : ''}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-dragonfly-600 dark:text-dragonfly-300"
                      onClick={() => handleEditContact(contact)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-dragonfly-400">
                {searchContactTerm 
                  ? "No contacts found matching your search criteria" 
                  : "No contacts found. Click 'Add Contact' to create one."}
              </div>
            )}
          </div>
          
          <div className="p-3 bg-dragonfly-100/50 dark:bg-dragonfly-700/30 border-t border-dragonfly-100 dark:border-dragonfly-700 text-sm">
            <div className="flex justify-between items-center">
              <span>Total Contacts: {filteredContacts.length}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span>Personal: {contacts.filter(c => c.category === 'personal').length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span>Business: {contacts.filter(c => c.category === 'business').length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-dragonfly-400"></div>
                  <span>Other: {contacts.filter(c => c.category === 'other').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div 
            className="p-4 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-md font-medium">Contact Overview</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-dragonfly-500 dark:text-dragonfly-400">Total Contacts</span>
                <span className="font-medium">{contacts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-dragonfly-500 dark:text-dragonfly-400">Business Contacts</span>
                <span className="font-medium">{contacts.filter(c => c.category === 'business').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-dragonfly-500 dark:text-dragonfly-400">Personal Contacts</span>
                <span className="font-medium">{contacts.filter(c => c.category === 'personal').length}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-4 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Tag size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-md font-medium">Popular Tags</h4>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from(new Set(contacts.flatMap(c => c.tags)))
                .slice(0, 8)
                .map(tag => (
                  <span 
                    key={tag} 
                    className="bg-emerald-100 dark:bg-emerald-800/30 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="p-4 rounded-lg bg-dragonfly-50 dark:bg-dragonfly-800/50 border border-dragonfly-100 dark:border-dragonfly-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <Contact size={16} className="text-violet-600 dark:text-violet-400" />
              </div>
              <h4 className="text-md font-medium">Quick Actions</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li 
                className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors flex items-center gap-2"
                onClick={() => {
                  setEditingContact(undefined);
                  setIsContactDialogOpen(true);
                }}
              >
                <Plus size={14} className="text-violet-600 dark:text-violet-400" />
                Add New Contact
              </li>
              <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors flex items-center gap-2">
                <Mail size={14} className="text-violet-600 dark:text-violet-400" />
                Send Group Email
              </li>
              <li className="p-2 rounded hover:bg-dragonfly-100 dark:hover:bg-dragonfly-700/50 cursor-pointer transition-colors flex items-center gap-2">
                <FileText size={14} className="text-violet-600 dark:text-violet-400" />
                Export Contacts
              </li>
            </ul>
          </motion.div>
        </div>

        <ContactDialog 
          open={isContactDialogOpen} 
          onOpenChange={setIsContactDialogOpen} 
          onSave={handleSaveContact}
          editContact={editingContact}
        />
      </div>
    );
  }

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
      
      <div className="p-12 flex flex-col items-center justify-center border border-dashed border-dragonfly-200 dark:border-dragonfly-700 rounded-xl">
        <FolderClosed className="h-12 w-12 text-dragonfly-300 dark:text-dragonfly-600 mb-4" />
        <h3 className="text-xl font-medium mb-2">Module under development</h3>
        <p className="text-dragonfly-500 dark:text-dragonfly-400 text-center max-w-md">
          This module is currently being developed. Check back soon for updates.
        </p>
      </div>
    </div>
  );
};

export default ModulePreview;
