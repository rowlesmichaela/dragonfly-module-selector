
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import ContactDialogHeader from './dialog/ContactDialogHeader';
import ContactFormFields from './dialog/ContactFormFields';
import TagsInput from './dialog/TagsInput';

export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  title: string;
  category: 'personal' | 'business' | 'other';
  notes: string;
  tags: string[];
}

// Define marker interface for contacts that can be customers
export interface CustomerContact extends ContactData {
  isCustomer: boolean;
}

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: ContactData) => void;
  editContact?: ContactData;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave, 
  editContact 
}) => {
  const initialContactState: ContactData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    title: '',
    category: 'personal',
    notes: '',
    tags: []
  };

  const [contact, setContact] = useState<ContactData>(initialContactState);

  useEffect(() => {
    if (editContact) {
      setContact(editContact);
    } else {
      setContact({
        ...initialContactState,
        id: `contact-${Date.now()}`
      });
    }
  }, [editContact, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (newTag: string) => {
    setContact(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContact(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tagToRemove) 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(contact);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl overflow-y-auto max-h-[90vh]">
        <ContactDialogHeader isEditing={!!editContact} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <ContactFormFields 
            contact={contact} 
            handleInputChange={handleInputChange} 
          />

          <TagsInput 
            tags={contact.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {editContact ? 'Update Contact' : 'Save Contact'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
