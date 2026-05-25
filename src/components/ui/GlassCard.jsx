import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export function GlassCard({
  children,
  className,
  hover = false,
  as: Component = 'div',
  ...props
}) {
  const classes = cn('glass-card p-6 md:p-8', hover && 'transition-transform duration-300 hover:-translate-y-1', className);

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
