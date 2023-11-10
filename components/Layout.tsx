import React from 'react';
import FollowBar from "@/components/layout/FollowBar"
import { MobileSidebar } from './layout/MobileSidebar';
import Sidebar from './layout/Sidebar';
import { ThemeProvider } from './theme-provider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
     <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
    >
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
            {children}
          </div>
          <div className='hidden md:block w-full'>
            <FollowBar />
          </div>
        </div>
     </div>
    </div>
    </ThemeProvider>
  )
}

export default Layout;
