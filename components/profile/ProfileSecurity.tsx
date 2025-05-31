'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: 'Iltimos, joriy parolingizni kiriting.',
  }),
  newPassword: z.string().min(8, {
    message: 'Parol kamida 8 belgidan iborat bo‘lishi kerak.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Parollar mos kelmaydi',
  path: ['confirmPassword'],
});

export function ProfileSecurity() {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsLoading(true);
    
    try {
      // Haqiqiy ilovada bu parolni API orqali yangilaydi
      console.log('Parolni o‘zgartirish so‘rovi:', values);
      
      // API chaqiruvini simulyatsiya qilish
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Parol muvaffaqiyatli yangilandi!');
      form.reset();
    } catch (error) {
      toast.error('Parolni yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Xavfsizlik Sozlamalari</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joriy Parol</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yangi Parol</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yangi Parolni Tasdiqlash</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Yangilanmoqda...' : 'Parolni Yangilash'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
