
import React from 'react';
import { Customer } from '@/components/contacts/Customer';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle, Clock, XCircle } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  const getStatusIcon = (status: 'active' | 'inactive' | 'lead') => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'lead':
        return <Clock size={16} className="text-amber-500" />;
      case 'inactive':
        return <XCircle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.company || '-'}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone || '-'}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {getStatusIcon(customer.status)}
                    <span className="ml-1 text-xs">
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">${customer.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(customer)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(customer.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
