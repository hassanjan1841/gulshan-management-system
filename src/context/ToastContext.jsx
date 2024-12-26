import { createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast'; // Import useToast from @shadcn/ui

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { toast } = useToast(); // Get the toast function from shadcn

  const showToast = (message, type = 'success') => {
    toast({
      title: message,
      variant: type, 
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
