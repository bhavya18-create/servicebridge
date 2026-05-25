import { cn } from '../../lib/cn';

const variants = {
  brand: 'btn-brand',
  ghost: 'btn-ghost',
  danger: 'inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]',
};

export function Button({ variant = 'brand', className, children, ...props }) {
  return (
    <button type="button" className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
