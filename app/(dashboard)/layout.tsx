import React from "react";
import { Sidebar } from "./_components/sidebar";
import Navbar from "@/components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full bg-white">

        <div className="flex w-full bg-white lg:hidden " >
          <Navbar />
        </div>
  
        <div className=" flex h-full flex-row">
          <div className="hidden h-screen bg-white lg:w-1/4 xl:w-1/5 lg:flex ">
            <Sidebar />
          </div>
          <div className="bg-customDashboard mt-20 lg:mt-0 overflow-y-scroll w-full h-screen ">
            {children}
            </div>
        </div>
      </div>
    );
  };
  
  export default DashboardLayout;
  