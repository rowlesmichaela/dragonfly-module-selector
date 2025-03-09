
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CustomerList from '@/components/customers/CustomerList';
import { Customer } from '@/components/contacts/Customer';
import { ContactData } from '@/components/contacts/ContactDialog';
import CustomerDialog from '@/components/customers/CustomerDialog';
import { useToast } from '@/components/ui/use-toast';

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
    tags: ['premium', 'longterm']
  }, {
    customerSince: '2023-01-15',
    status: 'active',
    value: 12500,
    preferredContactMethod: 'email'
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
    tags: ['technology', 'new']
  }, {
    customerSince: '2023-03-22',
    status: 'lead',
    value: 0,
    preferredContactMethod: 'phone'
  }),
  new Customer({
    id: 'customer-3',
    name: 'Sarah Williams',
    email: 'sarah@personal.com',
    phone: '555-9012',
    address: '789 Pine St, Meadowville',
    company: '',
    title: '',
    category: 'personal',
    notes: 'Referred by Jane Smith',
    tags: ['personal', 'referral']
  }, {
    customerSince: '2023-05-10',
    status: 'active',
    value: 3200,
    preferredContactMethod: 'email'
  })
];

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(undefined);
  const { toast } = useToast();

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
      // Update existing customer
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
      // Add new customer
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={handleAddCustomer}>Add Customer</Button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search customers by name, email, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Separator className="mb-6" />
      
      <CustomerList 
        customers={filteredCustomers} 
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
      
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
