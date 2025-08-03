'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, DollarSign, User, Settings, LogOut, Bell, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for demonstration
const mockBookings = [
  {
    id: '1',
    serviceName: 'House Cleaning',
    providerName: 'Clean Pro Services',
    date: '2023-12-15',
    time: '14:00',
    status: 'CONFIRMED',
    price: 75.00,
  },
  {
    id: '2',
    serviceName: 'Plumbing Repair',
    providerName: 'Quick Fix Plumbers',
    date: '2023-12-18',
    time: '10:30',
    status: 'PENDING',
    price: 120.00,
  },
];

const mockServices = [
  {
    id: '1',
    title: 'Professional Web Development',
    bookings: 12,
    rating: 4.8,
    earnings: 2400.00,
  },
  {
    id: '2',
    title: 'Mobile App Design',
    bookings: 8,
    rating: 4.6,
    earnings: 1800.00,
  },
];

const mockNotifications = [
  {
    id: '1',
    message: 'Your booking for House Cleaning has been confirmed',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    message: 'New message from Quick Fix Plumbers',
    time: '1 day ago',
    read: true,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState('CLIENT'); // Default to CLIENT, would be fetched from auth state
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading user data
  useEffect(() => {
    // In a real app, you would fetch user data and set the role
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll randomly set the role
      setUserRole(Math.random() > 0.5 ? 'CLIENT' : 'PROVIDER');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // In a real app, you would call your logout API
    console.log('Logging out...');
    // Redirect to home page
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-500">{userRole === 'CLIENT' ? 'Client' : 'Service Provider'}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button
                  className={`flex items-center space-x-2 px-6 py-4 text-left ${activeTab === 'overview' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FileText className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                
                {userRole === 'CLIENT' ? (
                  <button
                    className={`flex items-center space-x-2 px-6 py-4 text-left ${activeTab === 'bookings' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>My Bookings</span>
                  </button>
                ) : (
                  <button
                    className={`flex items-center space-x-2 px-6 py-4 text-left ${activeTab === 'services' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('services')}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>My Services</span>
                  </button>
                )}
                
                <button
                  className={`flex items-center space-x-2 px-6 py-4 text-left ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  {mockNotifications.some(n => !n.read) && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {mockNotifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {userRole === 'CLIENT' ? mockBookings.length : mockServices.reduce((acc, s) => acc + s.bookings, 0)}
                    </CardTitle>
                    <p className="text-gray-500 text-sm">{userRole === 'CLIENT' ? 'Active Bookings' : 'Total Bookings'}</p>
                  </CardContent>
                </Card>
                
                {userRole === 'PROVIDER' && (
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">
                        ${mockServices.reduce((acc, s) => acc + s.earnings, 0).toFixed(2)}
                      </CardTitle>
                      <p className="text-gray-500 text-sm">Total Earnings</p>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {mockNotifications.filter(n => !n.read).length}
                    </CardTitle>
                    <p className="text-gray-500 text-sm">Unread Notifications</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-bold mt-8">
                {userRole === 'CLIENT' ? 'Recent Bookings' : 'Recent Services'}
              </h2>
              
              {userRole === 'CLIENT' ? (
                <div className="space-y-4">
                  {mockBookings.map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{booking.serviceName}</h3>
                            <p className="text-gray-500 text-sm">Provider: {booking.providerName}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm">{booking.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm">{booking.time}</span>
                            </div>
                            <div>
                              <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">${booking.price.toFixed(2)}</span>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="text-center">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/bookings">View All Bookings</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockServices.map(service => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{service.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm">{service.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm">{service.bookings} bookings</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm">${service.earnings.toFixed(2)} earned</span>
                            </div>
                          </div>
                          <div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/services/${service.id}`}>Manage</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="text-center">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/services">View All Services</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && userRole === 'CLIENT' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <Button asChild>
                  <Link href="/services">Book New Service</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{booking.serviceName}</h3>
                          <p className="text-gray-500 text-sm">Provider: {booking.providerName}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">${booking.price.toFixed(2)}</span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/bookings/${booking.id}`}>View</Link>
                            </Button>
                            {booking.status === 'PENDING' && (
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && userRole === 'PROVIDER' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Services</h1>
                <Button asChild>
                  <Link href="/dashboard/services/new">Add New Service</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockServices.map(service => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{service.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{service.bookings} bookings</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">${service.earnings.toFixed(2)} earned</span>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/services/${service.id}`}>Manage</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/services/${service.id}/edit`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Notifications</h1>
              
              <div className="space-y-4">
                {mockNotifications.length > 0 ? (
                  mockNotifications.map(notification => (
                    <Card key={notification.id} className={notification.read ? 'opacity-75' : ''}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <div className={`h-2 w-2 mt-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                            <div>
                              <p className={notification.read ? 'text-gray-600' : 'font-medium'}>{notification.message}</p>
                              <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                            </div>
                          </div>
                          {!notification.read && (
                            <Button size="sm" variant="ghost">
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-500">No notifications yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}