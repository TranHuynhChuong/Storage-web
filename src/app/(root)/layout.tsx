import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="flex h-screen">
      <Sidebar  />
      <section className="flex h-full flex-1 flex-col">
              <MobileNavigation />
              <Header />
        <div className="h-full flex-1 overflow-auto bg-light-400 px-5 py-7 sm:mr-7 sm:rounded-[30px] md:mb-7 md:px-9 md:py-10">{children}</div>
      </section>


      <Toaster />
    </main>
  );
};
export default Layout;