
import React from 'react';
import { Calendar, Check, Wallet } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Customer } from '@/components/contacts/Customer';

interface CustomerDetailsFieldsProps {
  customerSince: string;
  status: 'active' | 'inactive' | 'lead';
  preferredContactMethod: 'email' | 'phone' | 'mail' | undefined;
  editCustomer?: Customer;
  onCustomerSinceChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive' | 'lead') => void;
  onPreferredContactMethodChange: (value: 'email' | 'phone' | 'mail' | undefined) => void;
}

const CustomerDetailsFields: React.FC<CustomerDetailsFieldsProps> = ({
  customerSince,
  status,
  preferredContactMethod,
  editCustomer,
  onCustomerSinceChange,
  onStatusChange,
  onPreferredContactMethodChange
}) => {
  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-md font-medium">Customer Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerSince" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Customer Since
          </Label>
          <Input 
            id="customerSince" 
            name="customerSince" 
            type="date" 
            value={customerSince} 
            onChange={(e) => onCustomerSinceChange(e.target.value)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status" className="flex items-center gap-1">
            <Check className="h-4 w-4" /> Status
          </Label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'active' | 'inactive' | 'lead')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferredContactMethod" className="flex items-center gap-1">
            Preferred Contact Method
          </Label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            value={preferredContactMethod || ''}
            onChange={(e) => {
              const value = e.target.value;
              onPreferredContactMethodChange(value ? value as 'email' | 'phone' | 'mail' : undefined);
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">No preference</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="mail">Mail</option>
          </select>
        </div>
        
        {editCustomer && (
          <div className="space-y-2">
            <Label htmlFor="value" className="flex items-center gap-1">
              <Wallet className="h-4 w-4" /> Customer Value
            </Label>
            <Input 
              id="value" 
              name="value" 
              type="text" 
              value={`$${editCustomer.value.toLocaleString()}`} 
              readOnly
              className="bg-gray-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailsFields;
