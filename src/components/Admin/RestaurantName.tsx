import { formatDate } from '@/utils/formRelativeDate';

export interface RestaurantNameProps {
  logoUrl: string | null;
  name: string;
  createdAt: string;
  isVisible: boolean;
}
const RestaurantName = ({
  logoUrl,
  name,
  createdAt,
  isVisible,
}: RestaurantNameProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.replace(/[^a-zA-Z]/g, ''))
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };
  return (
    <div className='flex items-center gap-3'>
      {logoUrl ? (
        <img
          src={logoUrl!}
          alt='restaurant image'
          className={`w-10 h-10 rounded-full object-cover ${
            !isVisible ? 'opacity-65' : ''
          }`}
        />
      ) : (
        <div
          className={`w-10 h-10 rounded-full flex-center font-bold text-xs text-white shadow-sm ${
            isVisible
              ? 'bg-gradient-to-br from-gray-600 to-gray-800'
              : 'bg-[#D1D5DB]'
          }`}
        >
          {getInitials(name)}
        </div>
      )}
      <div>
        <div
          className={`mb-0.5 font-bold ${
            isVisible ? 'text-[#111827] ' : 'text-[#6B7280]'
          }`}
        >
          {name}
        </div>
        <div
          className={`text-[12px] ${
            isVisible ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
          } `}
        >
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default RestaurantName;
