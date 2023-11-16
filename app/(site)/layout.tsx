import FollowBar from "@/components/layout/FollowBar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import EditModal from "@/components/modals/EditModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  return ( 
    <div className="h-screen ">
      <div className="h-full md:p-5 p-2">
        <MobileSidebar />
        <div className="grid grid-cols-1 md:grid-cols-4 h-full">
         <div className="hidden md:flex ">
          <Sidebar/>
          </div>
          <div
            className="
              col-span-3
              lg:col-span-2
              border-x-[1px] 
              border-neutral-800
          ">
            <EditModal/>
            <RegisterModal />
            <LoginModal />
            {children}
          </div>
          <div className='hidden md:block w-full'>
            <FollowBar />
          </div>
        </div>
     </div>
    </div>
   );
}
 
export default DashboardLayout;