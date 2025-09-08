/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Models } from "node-appwrite";

 export declare type FileType = "document" | "image" | "video" | "audio" | "other";

export declare type TypeFile = Models.Document & {
  bucketId: string;
  name: string;
  extension: string;
  sizeOriginal: number;
  mimeType: string;
  type: string,
  url: string,
  size: number,
  users: string[],
  owner: {
    $id: string,
    accountId: string,
    fullName: string,
    email: string,
    avatar: string,
  }
}

 export declare interface ActionType {
  label: string;
  icon: string;
  value: string;
}

// export declare interface SearchParamProps {
//   params?: Promise<SegmentParams>;
//   searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
// }



export declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}
export declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
export declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}
export declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}
export declare interface DeleteFileProps {
  fileId: string;
  bucketId: string;
  path: string;
}

export declare interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

export declare interface MobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}
export declare interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

export declare interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

export declare interface ShareInputProps {
  file: Models.Document;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (email: string) => void;
}