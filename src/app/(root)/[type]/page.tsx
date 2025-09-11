import React from 'react';
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import Card from '@/components/Card';
import { convertFileSize, getFileTypesParams } from '@/lib/utils';
import { FileType, TypeFile } from '@/types';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || '';
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';

  const types = getFileTypesParams(type) as FileType[];

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user?.email) {
    return redirect('/sign-in');
  }

  const files = await getFiles({
    currentUser: { id: user?.id, email: user?.email },
    types,
    searchText,
    sort,
  });
  const totalSize = files.documents.reduce(
    (sum: number, doc: TypeFile) => sum + doc.size,
    0,
  );
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
          <p className="body-1">
            Total: <span className="h5">{convertFileSize(totalSize)}</span>
          </p>

          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.documents.map((file: TypeFile) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="body-1 mt-10 text-center text-light-200">
          No files uploaded
        </p>
      )}
    </div>
  );
};

export default Page;
