import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BrandIconProps {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const BrandIcon: React.FC<BrandIconProps> = ({ 
  icon: Icon, 
  variant = 'primary', 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const variantClasses = {
    primary: 'text-zdec-blue',
    secondary: 'text-zdec-orange',
    accent: 'text-zdec-gray',
    gradient: 'text-transparent bg-gradient-to-r from-zdec-blue to-zdec-orange bg-clip-text'
  };

  return (
    <Icon 
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        'transition-all duration-300',
        className
      )} 
    />
  );
};

export default BrandIcon;