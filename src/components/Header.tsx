import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AuthButton from "./AuthButton";


const Header = () => {
  return (
    <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">

      <div className="flex-center min-w-fit gap-4">
 <AuthButton/>
      </div>
    </header>
  );
};
export default Header;