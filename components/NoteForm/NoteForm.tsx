
'use client';


import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { createNote } from '../../lib/api/clientApi'; 
 import { CreateNotes } from '../../lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { NewNote, NoteTag, Note } from '@/types/note';
import { useNoteDraft } from '@/lib/store/noteStore';
 
const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm( ) {
     
  const queryClient = useQueryClient();
  const router = useRouter();
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraft();

 
  const createDraft = (event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
           setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  
  
  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title')?.toString() ?? '';
    const content = formData.get('content')?.toString() ?? '';
    const tag = formData.get('tag') as NoteTag;
    const values: NewNote = { title, content, tag };
    mutate(values);
  };

  
    const { mutate } = useMutation<Note, Error, CreateNotes>({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/All');
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });    
    },
  });
 
   const handleCancel = () => router.back();



     return (
        <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
             maxLength={50}
             value={draft?.title}
          onChange={createDraft}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
             maxLength={500}
             value={draft?.content}
          onChange={createDraft}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select} required value={draft?.tag || 'Todo'}
          onChange={createDraft}>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

 
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
    )
}