import css from './profile.module.css'
import { getServerMe } from '@/lib/api/serverApi'
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: `Profile of ${user.username}`,
    description: `This is the profile page of ${user.username}. Email: ${user.email}`,
    openGraph: {
      title: `Profile of ${user.username}`,
      description: `This is the profile page of ${user.username}.`,
      url: 'https://08-zustand-delta-ecru.vercel.app/profile',
      images: [
        {
          url: user.avatar,
          width: 600,
          height: 600,
          alt: `${user.username}'s avatar`,
        },
      ],
    },
  };
}


export default async function ProfilePage() {

  const user = await getServerMe()
  console.log(user);



    return (
        <>
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href='/profile/edit' className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt={user.avatar}
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main></>
    )
}