'use client';

import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import {Controller, useForm } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm{
    title:string;
    description:string;
}


const NewIssue = () => {
    const {register,control,handleSubmit}=useForm<IssueForm>();
    const [error,setError]=useState("")
    const router= useRouter()
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
        onSubmit={handleSubmit( async (data)=>
             {

              try {
                
                await axios.post('/api/issues',data) 
                router.push('/issues')
              } catch (error :any) {
              
                setError(error)
                
              }
        })}>
     <TextField.Root>
  <TextField.Input placeholder="Title" {...register('title')} />
  
</TextField.Root>
<Controller
name="description"
  control={control}
  render={({field })=><SimpleMDE placeholder="Description" {...field} />}
/>

<Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssue;
