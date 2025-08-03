'use client';

import { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Filter,
  MessageSquare,
  Star,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function ClientBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock bookings data - in a real app, this would come from an API call
  const bookings = [
    {
      id: '1',
      service: 'Professional House Cleaning',
      provider: 'Jane Smith',
      providerRating: 4.8,
      date: '2023-11-15',
      time: '10:00 AM',
      duration: '2 hours',
      location: '123 Main St, Anytown',
      status: 'upcoming',
      price: 75.00,
      notes: 'Please focus on kitchen and bathrooms',
    },
    {
      id: '2',
      service: 'Lawn Mowing Service',
      provider: 'John Doe',
      providerRating: 4.5,
      date: '2023-11-10',
      time: '2:00 PM',
      duration: '1 hour',
      location: '123 Main St, Anytown',
      status: 'completed',
      price: 45.50,
      notes: '',
    },
    {
      id: '3',
      service: 'Plumbing Repair',
      provider: 'Mike Johnson',
      providerRating: 4.9,
      date: '2023-11-05',
      time: '9:30 AM',
      duration: '3 hours',
      location: '123 Main St, Anytown',
      status: 'completed',
      price: 120.00,
      notes: 'Leaking sink in master bathroom',
    },
    {
      id: '4',
      service: 'Deep Cleaning Service',
      provider: 'Jane Smith',
      providerRating: 4.8,
      date: '2023-10-25',
      time: '1:00 PM',
      duration: '4 hours',
      location: '123 Main St, Anytown',
      status: 'completed',
      price: 150.00,
      notes: '',
    },
    {
      id: '5',
      service: 'Electrical Repair',
      provider: 'Robert Williams',
      providerRating: 4.7,
      date: '2023-11-20',
      time: '11:00 AM',
      duration: '2 hours',
      location: '123 Main St, Anytown',
      status: 'upcoming',
      price: 95.00,
      notes: 'Kitchen light fixture not working',
    },
    {
      id: '6',
      service: 'Window Cleaning',
      provider: 'Sarah Johnson',
      providerRating: 4.6,
      date: '2023-11-18',
      time: '3:00 PM',
      duration: '2 hours',
      location: '123 Main St, Anytown',
      status: 'upcoming',
      price: 60.00,
      notes: '',
    },
    {
      id: '7',
      service: 'Carpet Cleaning',
      provider: 'David Brown',
      providerRating: 4.4,
      date: '2023-10-15',
      time: '10:00 AM',
      duration: '3 hours',
      location: '123 Main St, Anytown',
      status: 'cancelled',
      price: 110.00,
      notes: 'Living room and hallway carpets',
    },
  ];

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Group bookings by status for tabs
  const upcomingBookings = filteredBookings.filter(booking => booking.status === 'upcoming');
  const completedBookings = filteredBookings.filter(booking => booking.status === 'completed');
  const cancelledBookings = filteredBookings.filter(booking => booking.status === 'cancelled');

  const renderBookingCard = (booking) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">{booking.service}</h3>
            
            <div className="flex items-center text-sm text-gray-500">
              <User className="mr-2 h-4 w-4" />
              <span>{booking.provider}</span>
              <div className="ml-2 flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">{booking.providerRating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{booking.date}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-2 h-4 w-4" />
              <span>{booking.time} ({booking.duration})</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{booking.location}</span>
            </div>
            
            {booking.notes && (
              <div className="flex items-start text-sm text-gray-500">
                <FileText className="mr-2 h-4 w-4 mt-0.5" />
                <span>{booking.notes}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="text-xl font-bold">${booking.price.toFixed(2)}</div>
            
            <div className="flex flex-wrap gap-2">
              {booking.status === 'upcoming' && (
                <>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Provider
                  </Button>
                  <Button size="sm" variant="destructive">
                    Cancel Booking
                  </Button>
                </>
              )}
              
              {booking.status === 'completed' && (
                <Button size="sm" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Leave Review
                </Button>
              )}
              
              {booking.status === 'cancelled' && (
                <Button size="sm" variant="outline">
                  Rebook Service
                </Button>
              )}
            </div>
            
            <div className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search bookings..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({filteredBookings.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          ) : (
            filteredBookings.map(renderBookingCard)
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No upcoming bookings found.</p>
            </div>
          ) : (
            upcomingBookings.map(renderBookingCard)
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {completedBookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No completed bookings found.</p>
            </div>
          ) : (
            completedBookings.map(renderBookingCard)
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-6">
          {cancelledBookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No cancelled bookings found.</p>
            </div>
          ) : (
            cancelledBookings.map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}