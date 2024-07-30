'use client';

import { SidebarItem } from './sidebar-item';
import { useGlobalContext } from '@/context';

export const Sidebar = () => {
  const {devices} = useGlobalContext()

  return (
    <div className="mx-4 relative w-full">

        <div className='h-[90%]' >
          <img className='mt-6' src="/assets/logo.svg" alt="logo" />
          <h2 className='mt-20'>Select Gateway</h2>
          <div className='overflow-y-scroll devices max-h-[60%] mt-2' >
            {devices.map((device) => (
              <div key={device.docId} className="mt-2 mb-2">
                <SidebarItem
                  label={device.deviceId.toString()}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
  );
};
