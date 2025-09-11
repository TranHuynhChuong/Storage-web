'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import Thumbnail from '@/components/Thumbnail';
import FormattedDateTime from '@/components/FormattedDateTime';
import { useDebounce } from 'use-debounce';

type FileWithType = Models.Document & {
  type: string;
  extension?: string;
  url?: string;
  name?: string;
  $createdAt?: string;
};

const Search = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [results, setResults] = useState<FileWithType[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ''));
      }
      const files = await getFiles({
        currentUser: { id: userId, email: userEmail },
        types: [],
        searchText: debouncedQuery,
      });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document & { type: string }) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?query=${query}`,
    );
  };

  return (
    <div className="relative w-full md:max-w-[480px]">
      <div className="flex h-[46px] flex-1 items-center gap-3 rounded-full px-4 border shadow-drop-3">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="body-2 h-11 w-full rounded-[8px] border-transparent bg-white placeholder:body-1 border-none p-0 shadow-none placeholder:text-light-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}>
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="body-2 text-center text-light-100">
                No files found
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
