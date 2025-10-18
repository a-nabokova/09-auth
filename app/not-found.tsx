
 import css from './page.module.css'
  
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'This page does not exist',
  openGraph: {
    title: 'Not Found',
    description: 'This page does not exist',
    url: 'https://08-zustand-delta-ecru.vercel.app/not-found/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Open Graph Image',
      }
    ],
  }
};

  const NotFound = () => {
   
    
  return (
    <div>
     <h1 className={css.title}>404 - Page not found</h1>
     <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
     </div>
  );
};

export default NotFound;