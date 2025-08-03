'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Form schema validation
const serviceFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Service title must be at least 5 characters.',
  }).max(100, {
    message: 'Service title must not exceed 100 characters.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }).max(1000, {
    message: 'Description must not exceed 1000 characters.',
  }),
  price: z.coerce.number().positive({
    message: 'Price must be a positive number.',
  }),
  duration: z.coerce.number().int().positive({
    message: 'Duration must be a positive number of minutes.',
  }),
  categoryId: z.string({
    required_error: 'Please select a category.',
  }),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock categories data - in a real app, this would come from an API call
  const categories = [
    { id: '1', name: 'Cleaning' },
    { id: '2', name: 'Plumbing' },
    { id: '3', name: 'Electrical' },
    { id: '4', name: 'Gardening' },
    { id: '5', name: 'Tutoring' },
    { id: '6', name: 'Delivery' },
    { id: '7', name: 'Beauty & Wellness' },
    { id: '8', name: 'Home Repair' },
  ];

  // Default form values
  const defaultValues: Partial<ServiceFormValues> = {
    title: '',
    description: '',
    price: 0,
    duration: 60,
    isRemote: false,
  };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the service
      console.log('Service data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to services list after successful creation
      router.push('/dashboard/provider/services');
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchIsRemote = form.watch('isRemote');

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/dashboard/provider/services" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Provide detailed information about the service you want to offer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Professional House Cleaning" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, concise title for your service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The category that best describes your service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your service in detail..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of what your service includes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        The price per hour or per service.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="15" step="15" {...field} />
                      </FormControl>
                      <FormDescription>
                        How long the service typically takes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Remote Service
                      </FormLabel>
                      <FormDescription>
                        Can this service be provided remotely?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {!watchIsRemote && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Client's home, My workshop" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where the service will be provided.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end space-x-4">
                <Link href="/dashboard/provider/services">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Service
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}