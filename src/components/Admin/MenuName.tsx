import { formatRelativeDate } from '@/utils/formRelativeDate';

export interface MenuNameProps {
  name: string;
  description: string;
  createdAt: string;
  isVisible: boolean;
}
const MenuName = ({
  name,
  description,
  createdAt,
  isVisible,
}: MenuNameProps) => {
  return (
    <div className='space-y-1.5'>
      <div
        className={`font-bold ${
          isVisible ? 'text-[#111827] ' : 'text-[#6B7280]'
        }`}
      >
        {name}
      </div>
      <div className={`text-gray-600`}>{description}</div>
      <div
        className={`text-[12px] text-end ${
          isVisible ? 'text-[#6b7280]' : 'text-[#9CA3AF]'
        } `}
      >
        Created: {formatRelativeDate(createdAt)}
      </div>
    </div>
  );
};

export default MenuName;
