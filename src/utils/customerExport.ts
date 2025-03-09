
import { Customer } from '@/components/contacts/Customer';
import { toast } from '@/hooks/use-toast';

export const exportCustomersToCSV = (customers: Customer[]): void => {
  // Prepare the data for export
  const exportData = customers.map(customer => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    company: customer.company,
    title: customer.title,
    category: customer.category,
    notes: customer.notes,
    tags: customer.tags.join(', '),
    contactType: customer.contactType,
    customerSince: customer.customerSince,
    status: customer.status,
    value: customer.value,
    lastPurchase: customer.lastPurchase || '',
    preferredContactMethod: customer.preferredContactMethod || ''
  }));

  // Convert to CSV
  const headers = Object.keys(exportData[0]);
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => 
      headers.map(header => {
        const value = row[header as keyof typeof row];
        // Wrap strings with commas in quotes
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `customers-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast({
    title: "Export successful",
    description: `${customers.length} customers exported to CSV.`,
  });
};
