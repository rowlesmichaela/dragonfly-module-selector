
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (transaction: TransactionData) => void;
}

export interface TransactionData {
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account: string;
}

const categories = {
  income: ['Sales', 'Services', 'Interest', 'Investments', 'Other Income'],
  expense: ['Office Supplies', 'Rent', 'Utilities', 'Software', 'Marketing', 'Travel', 'Meals', 'Salaries', 'Other Expense']
};

const accounts = ['Cash', 'Checking Account', 'Savings Account', 'Credit Card'];

const TransactionDialog: React.FC<TransactionDialogProps> = ({ open, onOpenChange, onSave }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [description, setDescription] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [type, setType] = React.useState<'income' | 'expense'>('expense');
  const [category, setCategory] = React.useState<string>('');
  const [account, setAccount] = React.useState<string>('');

  const handleSave = () => {
    if (!description || !amount || !category || !account) {
      return; // Basic validation
    }
    
    onSave({
      date,
      description,
      amount: parseFloat(amount),
      type,
      category,
      account
    });
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setDate(new Date());
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('');
    setAccount('');
  };

  React.useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-violet-500" />
            <DialogTitle>Record New Transaction</DialogTitle>
          </div>
          <DialogDescription>
            Enter the details of your financial transaction below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="transaction-date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Type</Label>
              <Select 
                value={type} 
                onValueChange={(value) => {
                  setType(value as 'income' | 'expense');
                  setCategory(''); // Reset category when type changes
                }}
              >
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-description">Description</Label>
            <Input
              id="transaction-description"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-amount">Amount ($)</Label>
              <Input
                id="transaction-amount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transaction-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="transaction-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-account">Account</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger id="transaction-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-violet-500 hover:bg-violet-600">
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
