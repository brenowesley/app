import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon' | 'sm' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    let variantStyles = "";
    if (variant === 'default') variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90";
    if (variant === 'ghost') variantStyles = "hover:bg-accent hover:text-accent-foreground";
    if (variant === 'outline') variantStyles = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";

    let sizeStyles = "h-10 px-4 py-2";
    if (size === 'icon') sizeStyles = "h-10 w-10";
    if (size === 'sm') sizeStyles = "h-9 rounded-md px-3";
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";