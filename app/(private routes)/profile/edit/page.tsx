'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types/user';
import { getMe, updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css'
 import { useAuthStore } from '@/lib/store/authStore';
 
export default  function EditPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const setUserInStore = useAuthStore((state) => state.setUser); 

 useEffect(() => {
    const fetchUser = async () => {
      try {
          const res = await getMe();
        setUser(res);
        setUsername(res.username);
      } catch (err) {
        console.error('Could not load user data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
 }, []);
    
    const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

   try {
     const updatedUser = await updateMe({ username }); 
     setUserInStore(updatedUser);
      router.push('/profile');
    } catch (err) {
      console.error('Could not update profile', err);
    }
  };

  const handleCancel = () => {
     router.back();
  };

  if (loading || !user) return <p>Loading...</p>;


    return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={user.avatar}
      alt={user.avatar}
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSave}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
        type="text"
        className={css.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <p>Email: {user.email} </p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
        </main>
    )
}


 