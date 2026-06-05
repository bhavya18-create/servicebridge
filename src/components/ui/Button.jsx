import { cn } from '../../lib/cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button type="button" className={cn('btn', variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
