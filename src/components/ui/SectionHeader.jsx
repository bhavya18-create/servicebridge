import { cn } from '../../lib/cn';

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
  compact = false,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        compact ? 'mb-8' : 'mb-10',
        className,
      )}
    >
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className={cn('page-title', eyebrow && 'mt-3')}>{title}</h2>}
        {description && (
          <p className="mt-4 max-w-2xl section-copy">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
