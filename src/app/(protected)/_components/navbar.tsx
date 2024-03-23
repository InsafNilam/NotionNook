"use client";

import { Sidebar, SiderBarItem } from "@/components/sidebar";
import { PlusCircle } from "lucide-react";

const Navbar = () => {
  return (
    <Sidebar>
      <SiderBarItem
        icon={<PlusCircle size={20} />}
        text="Notes"
        mode="modal"
        active
        alert
        asChild
      />
    </Sidebar>
  );
};

export default Navbar;
