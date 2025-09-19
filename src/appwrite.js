const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;  // Renamed from COLLECTION_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;  // Renamed for clarity

import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const databases = new Databases(client);  // Standard service (replaces TablesDB)

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Check if the search term exists
    const result = await databases.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: TABLE_ID,
      queries: [Query.equal('searchTerm', searchTerm)]
    });

    // 2. If it exists, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await databases.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: TABLE_ID,
        documentId: doc.$id,
        data: { count: doc.count + 1 }
      });
    } else {
      // 3. If not, create a new document
      await databases.createDocument({
        databaseId: DATABASE_ID,
        collectionId: TABLE_ID,
        documentId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    // Optionally, throw or handle (e.g., show toast in UI)
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: TABLE_ID,
      queries: [
        Query.limit(5),
        Query.orderDesc('count')
      ]
    });
    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];  // Return empty array on error to avoid crashes
  }
};