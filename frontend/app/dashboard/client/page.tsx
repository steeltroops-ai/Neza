'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ClientDashboardPage() {
  // Mock data - in a real app, this would come from an API call
  const stats = {
    totalBookings: 12,
    upcomingBookings: 3,
    completedBookings: 9,
    totalSpent: 850.75,
  };

  const recentBookings = [
    {
      id: '1',
      service: 'Professional House Cleaning',
      provider: 'Jane Smith',
      date: '2023-11-15',
      time: '10:00 AM',
      status: 'Upcoming',
      price: 75.00,
    },
    {
      id: '2',
      service: 'Lawn Mowing Service',
      provider: 'John Doe',
      date: '2023-11-10',
      time: '2:00 PM',
      status: 'Completed',
      price: 45.50,
    },
    {
      id: '3',
      service: 'Plumbing Repair',
      provider: 'Mike Johnson',
      date: '2023-11-05',
      time: '9:30 AM',
      status: 'Completed',
      price: 120.00,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Lifetime bookings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingBookings}</div>
            <p className="text-xs text-muted-foreground">Scheduled services</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime spending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedBookings}</div>
            <p className="text-xs text-muted-foreground">Services received</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Your most recent service bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.service}</TableCell>
                  <TableCell>{booking.provider}</TableCell>
                  <TableCell>{booking.date} at {booking.time}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>${booking.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/client/bookings">
            <Button variant="outline" size="sm" className="ml-auto">
              View all bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Find Services</CardTitle>
            <CardDescription>
              Discover services that match your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start space-y-2">
            <p>Browse through our extensive catalog of professional services.</p>
          </CardContent>
          <CardFooter>
            <Link href="/services">
              <Button>
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your profile and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start space-y-2">
            <p>Update your personal information, payment methods, and notification settings.</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/client/settings">
              <Button variant="outline">
                Manage Settings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}