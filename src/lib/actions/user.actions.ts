'use server';

import { createAdminClient } from '@/lib/appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { Query, ID } from 'node-appwrite';
import { parseStringify } from '@/lib/utils';

export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersTable,
    [Query.equal('email', [email])],
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const createUser = async ({
  accountId,
  fullName,
  email,
  avatar,
}: {
  accountId: string;
  fullName: string;
  email: string;
  avatar?: string | null;
}) => {
  try {
    const existingUser = await getUserByEmail(email);
    let user;

    if (existingUser) {
      // Kiểm tra khác biệt
      const needUpdate =
        existingUser.fullName !== fullName || existingUser.avatar !== avatar;

      if (needUpdate) {
        const { databases } = await createAdminClient();

        user = await databases.updateDocument({
          databaseId: appwriteConfig.databaseId,
          collectionId: appwriteConfig.usersTable,
          documentId: existingUser.$id,
          data: {
            accountId,
            fullName,
            email,
            avatar,
          },
        });
      } else {
        user = existingUser;
      }
    } else {
      const { databases } = await createAdminClient();

      user = await databases.createDocument({
        databaseId: appwriteConfig.databaseId,
        collectionId: appwriteConfig.usersTable,
        documentId: ID.unique(),
        data: {
          accountId,
          fullName,
          email,
          avatar,
        },
      });
    }

    return parseStringify({ userId: user.$id });
  } catch (error) {
    handleError(error, 'Failed to create or update user');
  }
};
