
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ContactData } from '@/components/contacts/ContactDialog';
import { Customer } from '@/components/contacts/Customer';
import ContactFormFields from '@/components/contacts/dialog/ContactFormFields';
import TagsInput from '@/components/contacts/dialog/TagsInput';
import CustomerDialogHeader from './dialog/CustomerDialogHeader';
import CustomerDetailsFields from './dialog/CustomerDetailsFields';
import CustomerDialogFooter from './dialog/CustomerDialogFooter';

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contactData: ContactData, customerDetails: Partial<Omit<Customer, keyof ContactData>>) => void;
  editCustomer?: Customer;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave, 
  editCustomer 
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
    tags: [],
    contactType: 'individual'
  };

  const [contactData, setContactData] = useState<ContactData>(initialContactState);
  const [customerSince, setCustomerSince] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'active' | 'inactive' | 'lead'>('lead');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'email' | 'phone' | 'mail' | undefined>(undefined);

  useEffect(() => {
    if (editCustomer) {
      // Set contact data
      const contactData = editCustomer.toContactData();
      // Add the contactType property if it exists in the customer
      setContactData({
        ...contactData,
        contactType: editCustomer.contactType || 'individual'
      });
      
      // Set customer-specific fields
      setCustomerSince(editCustomer.customerSince);
      setStatus(editCustomer.status);
      setPreferredContactMethod(editCustomer.preferredContactMethod);
    } else {
      // Reset to defaults for new customer
      setContactData({
        ...initialContactState,
        id: `customer-${Date.now()}`
      });
      setCustomerSince(new Date().toISOString().split('T')[0]);
      setStatus('lead');
      setPreferredContactMethod(undefined);
    }
  }, [editCustomer, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (newTag: string) => {
    setContactData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContactData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tagToRemove) 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare customer-specific data
    const customerDetails = {
      customerSince,
      status,
      preferredContactMethod,
      contactType: contactData.contactType || 'individual',
      // We don't update the value here, it's managed separately
      value: editCustomer?.value || 0
    };
    
    onSave(contactData, customerDetails);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl overflow-y-auto max-h-[90vh]">
        <CustomerDialogHeader isEditing={!!editCustomer} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact info section */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Contact Information</h3>
            <ContactFormFields 
              contact={contactData} 
              handleInputChange={handleInputChange} 
            />
          </div>

          {/* Customer specific section */}
          <CustomerDetailsFields 
            customerSince={customerSince}
            status={status}
            preferredContactMethod={preferredContactMethod}
            editCustomer={editCustomer}
            onCustomerSinceChange={setCustomerSince}
            onStatusChange={setStatus}
            onPreferredContactMethodChange={setPreferredContactMethod}
          />

          <TagsInput 
            tags={contactData.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />

          <CustomerDialogFooter 
            isEditing={!!editCustomer} 
            onCancel={() => onOpenChange(false)} 
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
