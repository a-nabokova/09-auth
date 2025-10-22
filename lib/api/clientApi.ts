import type { User } from "@/types/user";
 import type { Note, NoteTag } from "../../types/note";
import { nextServer } from './api';

 

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    
}

interface FetchNotesOptions {
  page: number;
   search?: string;
  tag?: string;
}

 
export default async function fetchNotes({ page, perPage, search, tag }: FetchNotesOptions) {
     const res = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage,
             search,  
            ...(tag ? { tag } : {})
        }
       
    });

    return res.data; 
}


export interface CreateNotes {
     title: string;
    content: string;
    tag: NoteTag; 
    
}

export  async function createNote(note: CreateNotes) {
    const res = await nextServer.post<Note>('/notes', note )
        return res.data; 
}


export  async function deleteNote(id: string) {
    const res = await nextServer.delete<Note>(`/notes/${id}` )
        return res.data; 
}
 
 export async function getSingleNote(id: string) {
    const res = await nextServer.get<Note>(`/notes/${id}` )
        return res.data; 
}
 


export type RegisterRequest = {
     email: string
  username: string,
      password: string;

}

 

export const register = async (body: RegisterRequest) => {
    const { data } = await nextServer.post<User>('/auth/register', body)
    
    return data; 
}

export type LoginRequest = {
  email: string;
  password: string;
};
 
export const login = async (body: LoginRequest) => {
    const { data } = await nextServer.post<User>('/auth/login', body);
  return data;
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const {data} = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};


export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};


export type UpdateUserRequest = {
  username: string;
 };


export const updateMe =  async (payload: UpdateUserRequest) => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};