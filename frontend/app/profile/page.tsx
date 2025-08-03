'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, MapPin, Shield, Edit2, Save, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

// Mock user data for demonstration
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA',
  role: 'client', // 'client' or 'provider'
  createdAt: '2023-01-15T00:00:00.000Z',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // In a real app, you would fetch user data from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setUser(mockUser);
      setFormData({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        address: mockUser.address,
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Validate phone (optional but must be valid if provided)
    if (formData.phone.trim() && !/^\+?[\d\s()-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In a real app, you would send the updated data to your API
    // For demo purposes, we'll just update the local state
    setUser(prev => ({
      ...prev,
      ...formData,
    }));

    setIsEditing(false);
    
    // Show success message (in a real app, you might use a toast notification)
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    // In a real app, you would implement proper logout logic
    // For demo purposes, we'll just redirect to the login page
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div 
                    className="w-full h-full rounded-full bg-cover bg-center border-4 border-white shadow-md" 
                    style={{ backgroundImage: `url(${user.profileImage})` }}
                  ></div>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center mt-1">
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="capitalize">{user.role}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-sm">{user.address}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Profile Edit Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                          address: user.address,
                        });
                        setErrors({
                          name: '',
                          email: '',
                          phone: '',
                          address: '',
                        });
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>

                    {isEditing && (
                      <div className="pt-4">
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email notifications about your account activity</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="email-notifications" 
                        defaultChecked 
                      />
                      <label 
                        htmlFor="email-notifications" 
                        className="absolute inset-0 rounded-full bg-primary cursor-pointer transition-colors duration-200 ease-in-out"
                      ></label>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive text messages about your bookings and services</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="sms-notifications" 
                      />
                      <label 
                        htmlFor="sms-notifications" 
                        className="absolute inset-0 rounded-full bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out"
                      ></label>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="mt-6 border-red-100">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="font-medium">Delete Account</h3>
                      <p className="text-sm text-gray-500">Permanently delete your account and all associated data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}