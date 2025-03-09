
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AuthForm from './AuthForm';
import { LogIn } from 'lucide-react';

interface AuthModalProps {
  triggerClassName?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ triggerClassName }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName} variant="default">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
