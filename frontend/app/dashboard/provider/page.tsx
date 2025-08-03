'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProviderDashboard() {
  // Mock data - in a real app, this would come from API calls
  const stats = [
    { title: 'Total Services', value: '12', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Bookings', value: '8', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { title: 'Total Earnings', value: '$2,450', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
    { title: 'Average Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const recentBookings = [
    {
      id: '1',
      service: 'House Cleaning',
      client: 'Jane Smith',
      date: '2023-08-15',
      time: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      amount: '$75',
    },
    {
      id: '2',
      service: 'House Cleaning',
      client: 'Mike Johnson',
      date: '2023-08-17',
      time: '2:00 PM - 4:00 PM',
      status: 'pending',
      amount: '$75',
    },
    {
      id: '3',
      service: 'House Cleaning',
      client: 'Sarah Williams',
      date: '2023-08-20',
      time: '9:00 AM - 11:00 AM',
      status: 'confirmed',
      amount: '$75',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <Link href="/dashboard/provider/services/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your latest service bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.service}</p>
                    <p className="text-sm text-gray-500">{booking.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.date}</p>
                  <p className="text-sm text-gray-500">{booking.time}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{booking.amount}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/provider/bookings" className="w-full">
            <Button variant="outline" className="w-full">
              View All Bookings
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Services Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Overview of your listed services</CardDescription>
        </CardHeader>
        <CardContent>
          {/* This would be populated with actual service data */}
          <div className="text-center py-8">
            <p className="text-gray-500">You have 12 active services</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/provider/services" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Services
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}