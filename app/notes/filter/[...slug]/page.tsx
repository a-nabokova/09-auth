

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import fetchNotes from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';


interface PageProps {
  params: { slug?: string[] };
  searchParams: { search?: string; page?: string };
}

export async function generateMetadata(propsPromise: Promise<PageProps>): Promise<Metadata> {
  const { params } = await propsPromise;
    const tag = params.slug?.[0] ?? 'All';


 
  return {
    title: `${tag}`,
    description: `List of notes for a category ${tag}`,
    openGraph: {
      title: `${tag}`,
      description: `List of notes for a category ${tag}`,
      url: `https://08-zustand-delta-ecru.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],

    }
  }
}


export default async function NotesPage(propsPromise: Promise<PageProps>) {
    const { params, searchParams } = await propsPromise;

  const queryClient = new QueryClient();

  const search = searchParams.search ?? '';
  const page = Number(searchParams.page ?? '1');
  const perPage = 12;

   const tag = params.slug?.[0];  

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage, tag],
    queryFn: () =>
      fetchNotes({
        search,
        page,
        perPage,
        ...(tag && tag !== 'All' ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

 