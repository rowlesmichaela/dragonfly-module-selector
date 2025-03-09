import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import CustomerList from '@/components/customers/CustomerList';
import { Customer } from '@/components/contacts/Customer';
import { ContactData } from '@/components/contacts/ContactDialog';
import CustomerDialog from '@/components/customers/CustomerDialog';
import { useToast } from '@/components/ui/use-toast';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerSearch from '@/components/customers/CustomerSearch';
import { exportCustomersToCSV } from '@/utils/customerExport';

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CustomerHeader onExport={() => exportCustomersToCSV(customers)} />
      
      <CustomerSearch 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddCustomer={handleAddCustomer}
      />
      
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
