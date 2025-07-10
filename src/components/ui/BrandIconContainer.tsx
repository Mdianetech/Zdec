import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BrandIconContainerProps {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded' | 'square';
  className?: string;
}

const BrandIconContainer: React.FC<BrandIconContainerProps> = ({ 
  icon: Icon, 
  variant = 'primary', 
  size = 'md', 
  shape = 'rounded',
  className 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  };

  const shapeClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-none'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-zdec-blue to-zdec-blue-dark text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-br from-zdec-orange to-zdec-orange-dark text-white shadow-lg hover:shadow-xl',
    accent: 'bg-gradient-to-br from-zdec-gray to-zdec-gray-dark text-white shadow-lg hover:shadow-xl',
    gradient: 'bg-gradient-to-br from-zdec-blue via-zdec-blue-light to-zdec-orange text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-zdec-blue text-zdec-blue bg-white hover:bg-zdec-blue hover:text-white'
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center transition-all duration-300 transform hover:scale-105',
        sizeClasses[size],
        shapeClasses[shape],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={iconSizeClasses[size]} />
    </div>
  );
};

export default BrandIconContainer;