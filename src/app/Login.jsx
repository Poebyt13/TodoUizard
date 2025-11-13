import React from 'react'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import axios from 'axios'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

function Login() {

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    // chiamata al backend per loggarsi
    try {
      const res = await axios.post('http://localhost:5000/auth/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (res.status === 201) {
        console.log('Login successful:', res.data)
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === 'Invalid email'){
          form.setError('email', { message: 'Email not found' })
        }
        if (err.response.data.message === 'Invalid password') {
          form.setError('password', { message: 'Invalid password' })
        }
      } else {
        console.log("Request Failed:", err);

      }
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* passo tutto il context React Hook Form a tutti i componenti figli */}
      <Form {...form}>
        <form className='w-[17rem]' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 mb-4'>

          {/* controller per gestire campi (sempre dal form) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black !important">Email</FormLabel>

              {/* tutte le funzione Field vengono usate nel input */}
              <FormControl>
                <input className={`p-1.5 rounded-sm border-2 text-[.9rem] focus:outline-2 focus:[#A1A1AA] ${form.formState.errors.email ? 'border-red-500' : ''}`} type="email" {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <input className={`p-1.5 rounded-sm border-2 text-[.9rem] focus:outline-2 focus:[#A1A1AA] ${form.formState.errors.password ? 'border-red-500' : ''}`} type="password" {...field} placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <button className='bg-black text-white rounded-sm px-3 py-1.5 text-sm border-2 border-transparent cursor-pointer hover:bg-white hover:border-2 hover:border-black hover:text-black duration-200' type="submit">Login</button>
        <div className='flex flex-col gap-1 mt-4'>
          <FormDescription>
            Don't have an account? <Link to="/signup" className='underline duration-200 hover:font-semibold'>Register</Link>
          </FormDescription>
          <FormDescription>
            Forgot your password? <Link to="/forgot-password" className='underline duration-200 hover:font-semibold'>Reset Password</Link>
          </FormDescription>
        </div>
        </form>
      </Form>
    </div>
  )
}

export default Login