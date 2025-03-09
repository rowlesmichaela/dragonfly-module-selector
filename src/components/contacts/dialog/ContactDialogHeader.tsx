
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Contact } from 'lucide-react';

interface ContactDialogHeaderProps {
  isEditing: boolean;
}

const ContactDialogHeader: React.FC<ContactDialogHeaderProps> = ({ isEditing }) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Contact className="h-5 w-5" />
        {isEditing ? 'Edit Contact' : 'Add New Contact'}
      </DialogTitle>
      <DialogDescription>
        {isEditing 
          ? 'Update the contact information below.' 
          : 'Fill in the contact information below to add a new contact.'}
      </DialogDescription>
    </DialogHeader>
  );
};

export default ContactDialogHeader;
