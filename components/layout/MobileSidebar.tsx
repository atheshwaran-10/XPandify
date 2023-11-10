import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import Sidebar from "./Sidebar";


export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition p-5  absolute">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar/>
      </SheetContent>
    </Sheet>
  )
}