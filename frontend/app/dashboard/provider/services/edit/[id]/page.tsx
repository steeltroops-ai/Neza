'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Save, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Form schema
const serviceFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }).max(1000),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  duration: z.coerce.number().int().positive({ message: 'Duration must be a positive number' }),
  categoryId: z.string().min(1, { message: 'Please select a category' }),
  isRemote: z.boolean().default(false),
  location: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Mock categories data - in a real app, this would come from an API call
  const categories = [
    { id: '1', name: 'Cleaning' },
    { id: '2', name: 'Plumbing' },
    { id: '3', name: 'Electrical' },
    { id: '4', name: 'Gardening' },
    { id: '5', name: 'Tutoring' },
    { id: '6', name: 'Pet Care' },
  ];
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      duration: 60,
      categoryId: '',
      isRemote: false,
      location: '',
      isActive: true,
    },
  });
  
  useEffect(() => {
    // In a real app, you would fetch the service data from your API
    // For demo purposes, we'll use mock data and add a delay
    const timer = setTimeout(() => {
      // Mock service data
      const serviceData = {
        id: serviceId,
        title: 'Professional House Cleaning',
        description: 'Our professional house cleaning service provides a thorough cleaning of your home. We use eco-friendly products and pay special attention to detail.',
        price: 75,
        duration: 120,
        categoryId: '1', // Cleaning
        isRemote: false,
        location: 'Client location',
        isActive: true,
      };
      
      // Set form values
      form.reset(serviceData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [serviceId, form]);

  const onSubmit = async (data: ServiceFormValues) => {
    setIsSaving(true);
    
    try {
      // In a real app, you would call your API to update the service
      console.log('Updating service:', { id: serviceId, ...data });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to services list
      router.push('/dashboard/provider/services');
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      // In a real app, you would call your API to delete the service
      console.log('Deleting service:', serviceId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to services list
      router.push('/dashboard/provider/services');
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-gray-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Service
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your service and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete} 
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Update your service details below. Fields marked with an asterisk (*) are required.
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
                      <FormLabel>Service Title *</FormLabel>
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
                      <FormLabel>Category *</FormLabel>
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
                        Choose the category that best fits your service.
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
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your service in detail..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your service, including what's included and any special features.
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
                      <FormLabel>Price (USD) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="pl-7"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Set your price per hour or per service.
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
                      <FormLabel>Duration (minutes) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="60" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        How long does this service typically take to complete?
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        This service can be provided remotely
                      </FormLabel>
                      <FormDescription>
                        Check this if your service can be provided online or remotely.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {!form.watch('isRemote') && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Client's location, My office, etc." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify where this service will be provided.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Service is active and available for booking
                      </FormLabel>
                      <FormDescription>
                        Uncheck this to temporarily hide your service from search results.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pb-0 pt-6 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider/services')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}