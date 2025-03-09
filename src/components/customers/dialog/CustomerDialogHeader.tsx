
import React from 'react';
import { UserRound } from 'lucide-react';

interface CustomerDialogHeaderProps {
  isEditing: boolean;
}

const CustomerDialogHeader: React.FC<CustomerDialogHeaderProps> = ({ isEditing }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <UserRound className="h-5 w-5" />
        <h2 className="text-lg font-semibold">
          {isEditing ? 'Edit Customer' : 'Add New Customer'}
        </h2>
      </div>
      <p className="text-sm text-gray-500">
        {isEditing 
          ? 'Update the customer information below.' 
          : 'Fill in the customer information below to add a new customer.'}
      </p>
    </div>
  );
};

export default CustomerDialogHeader;
