import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, ArrowLeft } from 'lucide-react';
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

  return (
    <div className="container mx-auto p-6">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Home Page</span>
      </button>
      
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
