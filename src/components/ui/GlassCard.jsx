import { cn } from '../../lib/cn';

export function GlassCard({ children, className, hover = false, as: Component = 'div', ...props }) {
  const classes = cn(
    'card p-6 md:p-8 transition-all duration-300',
    hover && 'transform-gpu hover:-translate-y-1 hover:shadow-lg',
    className,
  );
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
