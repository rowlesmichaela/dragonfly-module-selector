import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, ArrowLeft, Download, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CustomerList from '@/components/customers/CustomerList';
import { Customer } from '@/components/contacts/Customer';
import { ContactData } from '@/components/contacts/ContactDialog';
import CustomerDialog from '@/components/customers/CustomerDialog';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Sample customer data for initial state
const initialCustomers: Customer[] = [
  new Customer({
    id: 'customer-1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-1234',
    address: '123 Main St, Springfield',
    company: 'Acme Corp',
    title: 'CEO',
    category: 'business',
    notes: 'Important client',
    tags: ['premium', 'longterm'],
    contactType: 'individual'
  }, {
    customerSince: '2023-01-15',
    status: 'active',
    value: 12500,
    preferredContactMethod: 'email',
    contactType: 'individual'
  }),
  new Customer({
    id: 'customer-2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-5678',
    address: '456 Oak Ave, Riverside',
    company: 'XYZ Industries',
    title: 'CTO',
    category: 'business',
    notes: 'Technical contact',
    tags: ['technology', 'new'],
    contactType: 'individual'
  }, {
    customerSince: '2023-03-22',
    status: 'lead',
    value: 0,
    preferredContactMethod: 'phone',
    contactType: 'individual'
  }),
  new Customer({
    id: 'customer-3',
    name: 'Acme Corporation',
    email: 'info@acmecorp.com',
    phone: '555-9012',
    address: '789 Pine St, Meadowville',
    company: '',
    title: '',
    category: 'business',
    notes: 'Large enterprise client',
    tags: ['enterprise', 'priority'],
    contactType: 'company'
  }, {
    customerSince: '2023-05-10',
    status: 'active',
    value: 75000,
    preferredContactMethod: 'email',
    contactType: 'company'
  })
];

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(undefined);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    setCustomerToEdit(undefined);
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsDialogOpen(true);
  };

  const handleSaveCustomer = (customerData: ContactData, customerDetails: Partial<Omit<Customer, keyof ContactData>>) => {
    const isEditing = !!customerToEdit;
    
    if (isEditing) {
      setCustomers(prev => prev.map(c => 
        c.id === customerData.id 
          ? new Customer(customerData, { ...customerDetails, value: c.value }) 
          : c
      ));
      toast({
        title: "Customer updated",
        description: `${customerData.name}'s information has been updated.`,
      });
    } else {
      const newCustomer = new Customer(customerData, customerDetails);
      setCustomers(prev => [...prev, newCustomer]);
      toast({
        title: "Customer added",
        description: `${customerData.name} has been added as a new customer.`,
      });
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Customer deleted",
      description: "The customer has been removed from your list.",
      variant: "destructive"
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const exportCustomers = () => {
    // Prepare the data for export
    const exportData = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      company: customer.company,
      title: customer.title,
      category: customer.category,
      notes: customer.notes,
      tags: customer.tags.join(', '),
      contactType: customer.contactType,
      customerSince: customer.customerSince,
      status: customer.status,
      value: customer.value,
      lastPurchase: customer.lastPurchase || '',
      preferredContactMethod: customer.preferredContactMethod || ''
    }));

    // Convert to CSV
    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        headers.map(header => {
          const value = row[header as keyof typeof row];
          // Wrap strings with commas in quotes
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `customers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `${customers.length} customers exported to CSV.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex gap-2">
          <Button 
            onClick={exportCustomers} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 text-sm"
          >
            <Download size={14} />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <Button onClick={handleAddCustomer} size="sm" className="flex items-center gap-1">
          <Plus size={16} />
          Add Customer
        </Button>
      </div>
      
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          className="pl-9 h-9 text-sm"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-white dark:bg-slate-950 rounded-lg border shadow-sm">
        <CustomerList 
          customers={filteredCustomers} 
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      </div>
      
      <CustomerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editCustomer={customerToEdit}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default CustomersPage;
