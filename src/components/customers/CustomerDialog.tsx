
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ContactFormFields from '@/components/contacts/dialog/ContactFormFields';
import TagsInput from '@/components/contacts/dialog/TagsInput';
import { ContactData } from '@/components/contacts/ContactDialog';
import { Customer } from '@/components/contacts/Customer';
import { Calendar, Wallet, Check, UserRound } from 'lucide-react';

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
        <div className="flex items-center gap-2 mb-2">
          <UserRound className="h-5 w-5" />
          <h2 className="text-lg font-semibold">
            {editCustomer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {editCustomer 
            ? 'Update the customer information below.' 
            : 'Fill in the customer information below to add a new customer.'}
        </p>

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
                  onChange={(e) => setCustomerSince(e.target.value)} 
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
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'lead')}
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
                    setPreferredContactMethod(value ? value as 'email' | 'phone' | 'mail' : undefined);
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

          <TagsInput 
            tags={contactData.tags}
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
              {editCustomer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
