
import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CustomerHeaderProps {
  onExport: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ onExport }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>
      
      <div className="flex gap-2">
        <Button 
          onClick={onExport} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 text-sm"
        >
          <Download size={14} />
          Export
        </Button>
      </div>
    </div>
  );
};

export default CustomerHeader;
