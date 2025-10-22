import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';



export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};


export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

 interface FetchNotesResponse {
     notes: Note[];
     totalPages: number;
     
 }
 
 interface FetchNotesOptions {
   page: number;
   search?: string;
   tag?: string;
 }
 
  
export default async function fetchNotes({ page, search, tag }: FetchNotesOptions) {
  const cookieStore = await cookies();

  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

 
export async function getSingleNote(id: string) {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}