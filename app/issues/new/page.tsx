'use client'
import React, { useState, useEffect } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // Change from 'next/navigation' to 'next/router'
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    import("react-simplemde-editor").then((SimpleMDE) => {
      // Once SimpleMDE is imported, you can use it safely
      setSimpleMDE(SimpleMDE.default);
    }).catch((error) => {
      console.error("Error while dynamically importing SimpleMDE:", error);
    });
  }, []);

  const [SimpleMDE, setSimpleMDE] = useState<any>(null); // State to hold SimpleMDE component

  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root className='mb-5'>
          <Callout.Text>
            Unexpected error
          </Callout.Text>
        </Callout.Root>
      }


      <form className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {

          try {

            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error: any) {

            setError(error)

          }
        })}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />

        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        {SimpleMDE &&
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          />
        }
        {errors.title && <Text color='red' as='p'>{errors.description?.message}</Text>}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssue;
