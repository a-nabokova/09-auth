
 import { getSingleNote } from '@/lib/api/serverApi'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';
 
interface Props {
    params: Promise<{ id: string }>;
}

 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
    const note = await getSingleNote(id);

 
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://08-zustand-delta-ecru.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],

    }
  }
}


const NoteDetails = async ({ params }: Props) => {
    const { id } = await params;
 
    const queryClient = new QueryClient()

     await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  })

    return <div>
         <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
    </div>
}


export default NoteDetails; 