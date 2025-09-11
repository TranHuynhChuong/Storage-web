'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Search from './Search';
import { signOut, useSession } from 'next-auth/react';
import FileUploader from './FileUploader';

interface HeaderProps {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

const Header = ({ id, name, email, image }: HeaderProps) => {
  return (
    <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
      <Search userId={id} userEmail={email} />
      <div className="flex-center min-w-fit gap-4">
        <FileUploader ownerId={id} />
        <Button
          className="flex-center h-[44px] min-w-[46px] items-center rounded-full bg-brand/10 p-0 text-brand shadow-none transition-all hover:bg-brand/20"
          onClick={() => signOut()}>
          <Image
            src="/assets/icons/logout.svg"
            alt="logo"
            width={20}
            height={20}
            className="w-5"
          />
        </Button>
      </div>
    </header>
  );
};
export default Header;
