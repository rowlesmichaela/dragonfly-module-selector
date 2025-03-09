
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface TagsInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ 
  tags, 
  onAddTag, 
  onRemoveTag 
}) => {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onAddTag(tag.trim());
      setTag('');
    }
  };

  return (
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
        {tags.map((tagItem) => (
          <span 
            key={tagItem} 
            className="bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            {tagItem}
            <button 
              type="button" 
              onClick={() => onRemoveTag(tagItem)} 
              className="ml-1 hover:text-blue-600 dark:hover:text-blue-100"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
