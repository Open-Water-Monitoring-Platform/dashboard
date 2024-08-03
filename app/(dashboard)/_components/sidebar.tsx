'use client';

import { SidebarItem } from './sidebar-item';
import { useGlobalContext } from '@/context';

export const Sidebar = () => {
  const { devices } = useGlobalContext();

  return (
    <div className="mx-4 relative w-full h-full flex flex-col">
      <div className="flex justify-center mt-6">
        <img src="/assets/logo.svg" alt="logo" />
      </div>
      <h2 className="mt-20">Select Gateway</h2>
      <div className="flex-1 overflow-y-scroll mt-2">
        {devices.map((device) => (
          <div key={device.docId} className="mt-2 mb-2">
            <SidebarItem label={device.deviceId.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
};
