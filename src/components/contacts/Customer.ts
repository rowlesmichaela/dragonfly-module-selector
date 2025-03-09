
import { ContactData } from './ContactDialog';

export interface CustomerData extends ContactData {
  customerSince: string; // Date when they became a customer
  status: 'active' | 'inactive' | 'lead';
  value: number; // Customer lifetime value
  lastPurchase?: string; // Date of last purchase
  preferredContactMethod?: 'email' | 'phone' | 'mail';
}

export class Customer {
  data: CustomerData;

  constructor(contactData: ContactData, customerData?: Partial<Omit<CustomerData, keyof ContactData>>) {
    this.data = {
      ...contactData,
      customerSince: customerData?.customerSince || new Date().toISOString().split('T')[0],
      status: customerData?.status || 'lead',
      value: customerData?.value || 0,
      lastPurchase: customerData?.lastPurchase,
      preferredContactMethod: customerData?.preferredContactMethod
    };
  }

  updateValue(amount: number): void {
    this.data.value += amount;
    if (amount > 0) {
      this.data.lastPurchase = new Date().toISOString().split('T')[0];
    }
  }

  activate(): void {
    this.data.status = 'active';
  }

  deactivate(): void {
    this.data.status = 'inactive';
  }

  isActive(): boolean {
    return this.data.status === 'active';
  }

  // Convert Customer back to ContactData (for example, when saving to contact list)
  toContactData(): ContactData {
    const { 
      customerSince, 
      status, 
      value, 
      lastPurchase, 
      preferredContactMethod, 
      ...contactData 
    } = this.data;
    
    return contactData;
  }

  // Create a Customer from existing ContactData
  static fromContact(contact: ContactData, customerData?: Partial<Omit<CustomerData, keyof ContactData>>): Customer {
    return new Customer(contact, customerData);
  }
}
