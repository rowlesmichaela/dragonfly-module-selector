
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Contact, Mail, Phone, MapPin, Building, User, Hash } from 'lucide-react';

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
  const [tag, setTag] = useState('');

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

  const handleAddTag = () => {
    if (tag.trim() && !contact.tags.includes(tag.trim())) {
      setContact(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
      setTag('');
    }
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
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Contact className="h-5 w-5" />
            {editContact ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
          <DialogDescription>
            {editContact 
              ? 'Update the contact information below.' 
              : 'Fill in the contact information below to add a new contact.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User className="h-4 w-4" /> Name
              </Label>
              <Input 
                id="name" 
                name="name" 
                value={contact.name} 
                onChange={handleInputChange} 
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={contact.email} 
                onChange={handleInputChange} 
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              <Input 
                id="phone" 
                name="phone" 
                value={contact.phone} 
                onChange={handleInputChange} 
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-1">
                <Hash className="h-4 w-4" /> Category
              </Label>
              <select
                id="category"
                name="category"
                value={contact.category}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-1">
                <Building className="h-4 w-4" /> Company
              </Label>
              <Input 
                id="company" 
                name="company" 
                value={contact.company} 
                onChange={handleInputChange} 
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-1">
                <User className="h-4 w-4" /> Job Title
              </Label>
              <Input 
                id="title" 
                name="title" 
                value={contact.title} 
                onChange={handleInputChange} 
                placeholder="Job title"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Address
              </Label>
              <Input 
                id="address" 
                name="address" 
                value={contact.address} 
                onChange={handleInputChange} 
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes" className="flex items-center gap-1">
                Notes
              </Label>
              <textarea 
                id="notes" 
                name="notes" 
                value={contact.notes} 
                onChange={handleInputChange} 
                placeholder="Add notes about this contact"
                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
                placeholder="Add a tag"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={handleAddTag}
                variant="secondary"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {contact.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)} 
                    className="ml-1 hover:text-blue-600 dark:hover:text-blue-100"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

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
