
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  clientName: string;
  clientEmail: string;
  items: InvoiceItem[];
  notes: string;
  total: number;
  status: 'draft' | 'sent' | 'paid';
}

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (invoiceData: InvoiceData) => void;
  editInvoice?: InvoiceData;
}

const InvoiceDialog: React.FC<InvoiceDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave,
  editInvoice 
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState(editInvoice?.invoiceNumber || `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
  const [date, setDate] = useState<string>(editInvoice?.date ? new Date(editInvoice.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(editInvoice?.dueDate ? new Date(editInvoice.dueDate).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [clientName, setClientName] = useState(editInvoice?.clientName || '');
  const [clientEmail, setClientEmail] = useState(editInvoice?.clientEmail || '');
  const [notes, setNotes] = useState(editInvoice?.notes || '');
  const [items, setItems] = useState<InvoiceItem[]>(editInvoice?.items || [
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `${Date.now()}`,
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate amount if quantity or rate changed
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName) {
      toast.error("Please enter a client name");
      return;
    }
    
    if (items.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return;
    }
    
    if (items.some(item => !item.description || item.amount <= 0)) {
      toast.error("Please fill in all item details with values greater than zero");
      return;
    }

    const invoiceData: InvoiceData = {
      id: editInvoice?.id || `inv-${Date.now()}`,
      invoiceNumber,
      date: new Date(date),
      dueDate: new Date(dueDate),
      clientName,
      clientEmail,
      items,
      notes,
      total: calculateTotal(),
      status: editInvoice?.status || 'draft'
    };
    
    onSave(invoiceData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {editInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {editInvoice ? 'update the' : 'create a new'} invoice.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input 
                id="invoice-number" 
                value={invoiceNumber} 
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Invoice Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input 
                id="client-name" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input 
                id="due-date" 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="client-email">Client Email</Label>
              <Input 
                id="client-email" 
                type="email" 
                value={clientEmail} 
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium">Invoice Items</h3>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={handleAddItem}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-dragonfly-50 dark:bg-dragonfly-800/50">
                  <tr className="border-b">
                    <th className="py-2 pl-4 pr-2 text-left">Description</th>
                    <th className="py-2 px-2 text-center w-20">Qty</th>
                    <th className="py-2 px-2 text-center w-24">Rate</th>
                    <th className="py-2 px-2 text-right w-28">Amount</th>
                    <th className="py-2 pl-2 pr-4 text-center w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 pl-4 pr-2">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                          className="border-0 p-1 h-8 focus-visible:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Input 
                          type="number" 
                          min="1"
                          value={item.quantity} 
                          onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                          className="border-0 p-1 h-8 text-center focus-visible:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Input 
                          type="number" 
                          min="0"
                          step="0.01"
                          value={item.rate} 
                          onChange={(e) => handleItemChange(item.id, 'rate', Number(e.target.value))}
                          className="border-0 p-1 h-8 text-center focus-visible:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 text-right font-medium">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                      <td className="py-2 pl-2 pr-4 text-center">
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-7 w-7 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-dragonfly-50 dark:bg-dragonfly-800/50">
                    <td colSpan={3} className="py-2 pl-4 pr-2 text-right font-medium">Total:</td>
                    <td className="py-2 px-2 text-right font-medium">${calculateTotal().toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes/Terms</Label>
            <Input 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, notes to client, etc."
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600">
              {editInvoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
