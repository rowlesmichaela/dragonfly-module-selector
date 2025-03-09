
import { ContactData } from './ContactDialog';

export class Customer {
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
  customerSince: string; // Date when they became a customer
  status: 'active' | 'inactive' | 'lead';
  value: number; // Customer lifetime value
  lastPurchase?: string; // Date of last purchase
  preferredContactMethod?: 'email' | 'phone' | 'mail';
  contactType: 'individual' | 'company';

  constructor(contactData: ContactData, customerData?: Partial<Customer>) {
    // Copy contact data
    this.id = contactData.id;
    this.name = contactData.name;
    this.email = contactData.email;
    this.phone = contactData.phone;
    this.address = contactData.address;
    this.company = contactData.company;
    this.title = contactData.title;
    this.category = contactData.category;
    this.notes = contactData.notes;
    this.tags = contactData.tags;
    this.contactType = contactData?.contactType || contactData.contactType || 'individual';
    
    // Set customer specific data
    this.customerSince = customerData?.customerSince || new Date().toISOString().split('T')[0];
    this.status = customerData?.status || 'lead';
    this.value = customerData?.value || 0;
    this.lastPurchase = customerData?.lastPurchase;
    this.preferredContactMethod = customerData?.preferredContactMethod;
  }

  updateValue(amount: number): void {
    this.value += amount;
    if (amount > 0) {
      this.lastPurchase = new Date().toISOString().split('T')[0];
    }
  }

  activate(): void {
    this.status = 'active';
  }

  deactivate(): void {
    this.status = 'inactive';
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  // Convert Customer back to ContactData (for example, when saving to contact list)
  toContactData(): ContactData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      company: this.company,
      title: this.title,
      category: this.category,
      notes: this.notes,
      tags: this.tags,
      contactType: this.contactType
    };
  }

  // Create a Customer from existing ContactData
  static fromContact(contact: ContactData, customerData?: Partial<Customer>): Customer {
    return new Customer(contact, customerData);
  }
}
