'use client';

import { cn } from '@/utils/utils';
import { useGlobalContext } from '@/context';

interface SidebarItemProps {
  label: string;
}

export const SidebarItem = ({ label}: SidebarItemProps) => {
  const {handleSelectChange, selectedDevice} = useGlobalContext()

  const checkActivePath = (path: string) => {
    if (path === selectedDevice?.deviceId.toString()) {
      return false;
    }
    return true;
  };

  const onClick = () => {
    handleSelectChange(label)
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex w-full border rounded-lg bg-customWhiteGrey items-center gap-x-2 text-customGrey transition-all hover:border-customBlue',
        {'text-customBlue border-customBlue ':checkActivePath(label)}
      )}
    >
      <div className="space-y-0.5 text-left p-2.5">
        <h2>Device ID</h2>
        <h3 className='font-black' >{label}</h3>
      </div>
    </button>
  );
};
