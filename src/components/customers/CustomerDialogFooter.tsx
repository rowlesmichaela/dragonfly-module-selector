
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface CustomerDialogFooterProps {
  isEditing: boolean;
  onCancel: () => void;
}

const CustomerDialogFooter: React.FC<CustomerDialogFooterProps> = ({ 
  isEditing, 
  onCancel 
}) => {
  return (
    <DialogFooter>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit">
        {isEditing ? 'Update Customer' : 'Add Customer'}
      </Button>
    </DialogFooter>
  );
};

export default CustomerDialogFooter;
