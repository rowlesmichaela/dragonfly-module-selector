
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomerSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddCustomer: () => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onAddCustomer 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <Button onClick={onAddCustomer} size="sm" className="flex items-center gap-1">
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default CustomerSearch;
