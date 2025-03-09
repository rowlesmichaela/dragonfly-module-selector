
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Building, Hash, Users } from 'lucide-react';
import { ContactData } from '../ContactDialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContactFormFieldsProps {
  contact: ContactData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({ 
  contact, 
  handleInputChange 
}) => {
  const handleContactTypeChange = (value: string) => {
    const event = {
      target: {
        name: 'contactType',
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Label className="mb-2 block">Contact Type</Label>
        <Tabs 
          defaultValue={contact.contactType || 'individual'} 
          className="w-full"
          onValueChange={handleContactTypeChange}
          value={contact.contactType || 'individual'}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Individual
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" /> Company
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-1">
            {contact.contactType === 'company' ? (
              <>
                <Building className="h-4 w-4" /> Company Name
              </>
            ) : (
              <>
                <User className="h-4 w-4" /> Full Name
              </>
            )}
          </Label>
          <Input 
            id="name" 
            name="name" 
            value={contact.name} 
            onChange={handleInputChange} 
            placeholder={contact.contactType === 'company' ? "Enter company name" : "Enter full name"}
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
        
        {contact.contactType === 'individual' && (
          <>
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
          </>
        )}

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
    </div>
  );
};

export default ContactFormFields;
