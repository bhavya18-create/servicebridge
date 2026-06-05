import { cn } from '../../lib/cn';

const GRADIENTS = [
  'from-sky-505 to-blue-600',
  'from-indigo-500 to-violet-650',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-slate-600 to-slate-800',
];

const getGradient = (name) => {
  if (!name) return GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
};

const getInitials = (name) => {
  if (!name) return 'SB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const isValidUploadedPhoto = (src) => {
  if (!src) return false;
  if (src.includes('unsplash.com')) return false;
  if (src.includes('dicebear.com')) return false;
  if (src.includes('ui-avatars.com')) return false;
  if (src.includes('placeholder.com')) return false;
  if (src.includes('via.placeholder.com')) return false;
  return true;
};

const sizeClasses = {
  xs: 'h-6 w-6 text-[9px] font-bold',
  sm: 'h-8 w-8 text-xs font-bold',
  md: 'h-10 w-10 text-sm font-semibold',
  lg: 'h-14 w-14 text-lg font-bold',
  xl: 'h-20 w-20 text-2xl font-bold',
};

export function Avatar({ name = 'SB', src = '', size = 'md', className = '' }) {
  const initials = getInitials(name);
  const sizeClass = sizeClasses[size] || size; // Allow custom sizing strings directly
  const isPhoto = isValidUploadedPhoto(src);

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden flex items-center justify-center select-none shadow-sm flex-shrink-0',
        !isPhoto && `bg-gradient-to-br ${getGradient(name)} text-white`,
        sizeClass,
        className
      )}
    >
      {isPhoto ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover rounded-full"
          onError={(e) => {
            // Safe fallback if the image fails to load
            e.target.style.display = 'none';
            const gradClasses = getGradient(name).split(' ');
            e.target.parentElement.classList.add('bg-gradient-to-br', ...gradClasses, 'text-white');
            e.target.parentElement.innerHTML = initials;
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
