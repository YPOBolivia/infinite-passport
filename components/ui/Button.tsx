import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]',
          variant === 'primary' &&
            'bg-navy-900 text-ivory-50 hover:bg-navy-800 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300 shadow-gold-glow',
          variant === 'secondary' &&
            'bg-transparent border border-navy-900/15 text-navy-900 hover:border-navy-900/30 dark:border-ivory-100/15 dark:text-ivory-100 dark:hover:border-ivory-100/30',
          variant === 'ghost' &&
            'bg-transparent text-navy-900/70 hover:text-navy-900 dark:text-ivory-100/70 dark:hover:text-ivory-100',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
