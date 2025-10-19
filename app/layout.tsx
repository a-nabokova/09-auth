
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider/AuthProvider';


export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Responsive note-taking app for organizing your tasks',
  openGraph: {
    title: 'NoteHub',
    description: 'Responsive note-taking app for organizing your tasks',
    url: 'https://08-zustand-delta-ecru.vercel.app/',
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





const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} >
        <TanStackProvider> 
          <AuthProvider> 
        <Header />
         
          {children}
          {modal}
           <div id="modal-root" />
            <Footer />
            </AuthProvider>
          </TanStackProvider>
      </body>
    </html>
  );
}