import React from "react";
import Navbar from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div
      className="min-h-screen min-w-full flex gap-x-3 bg-[radial-gradient(ellipsis_at_top, _var(--tw-gradient-stops))] from-sky-400 to-blue-800 py-3 px-3"
      style={{ background: "rgba(30,31,36,255)" }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
