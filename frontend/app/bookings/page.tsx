'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, Clock, Filter, Search, CheckCircle, XCircle, 
  AlertCircle, ChevronRight, Sliders 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatDate, formatCurrency } from '@/lib/utils';

// Mock bookings data for demonstration
const mockBookings = [
  {
    id: '1',
    serviceId: '101',
    serviceName: 'Professional House Cleaning',
    serviceImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '201',
    providerName: 'CleanPro Services',
    providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    startDate: '2023-08-15T10:00:00.000Z',
    endDate: '2023-08-15T12:00:00.000Z',
    status: 'confirmed', // 'pending', 'confirmed', 'completed', 'cancelled'
    price: 75,
    currency: 'USD',
    quantity: 1,
    totalAmount: 75,
    paymentStatus: 'paid', // 'pending', 'paid', 'refunded'
  },
  {
    id: '2',
    serviceId: '102',
    serviceName: 'Lawn Mowing and Garden Care',
    serviceImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '202',
    providerName: 'Green Thumb Landscaping',
    providerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    startDate: '2023-08-20T14:00:00.000Z',
    endDate: '2023-08-20T16:00:00.000Z',
    status: 'pending',
    price: 50,
    currency: 'USD',
    quantity: 1,
    totalAmount: 50,
    paymentStatus: 'pending',
  },
  {
    id: '3',
    serviceId: '103',
    serviceName: 'Plumbing Repair',
    serviceImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '203',
    providerName: 'Quick Fix Plumbing',
    providerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    startDate: '2023-07-25T09:00:00.000Z',
    endDate: '2023-07-25T11:00:00.000Z',
    status: 'completed',
    price: 120,
    currency: 'USD',
    quantity: 1,
    totalAmount: 120,
    paymentStatus: 'paid',
  },
  {
    id: '4',
    serviceId: '104',
    serviceName: 'Professional Photography Session',
    serviceImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    providerId: '204',
    providerName: 'Capture Moments Photography',
    providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    startDate: '2023-08-05T13:00:00.000Z',
    endDate: '2023-08-05T15:00:00.000Z',
    status: 'cancelled',
    price: 200,
    currency: 'USD',
    quantity: 1,
    totalAmount: 200,
    paymentStatus: 'refunded',
  },
];

// Mock user data for demonstration
const mockCurrentUser = {
  id: '301',
  role: 'client', // 'client' or 'provider'
};

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // In a real app, you would fetch bookings data from your API
    // For demo purposes, we'll use the mock data and add a delay
    const timer = setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...bookings];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.serviceName.toLowerCase().includes(query) ||
        booking.providerName.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }

    // Apply sorting
    if (sortBy === 'date-desc') {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else if (sortBy === 'date-asc') {
      result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    setFilteredBookings(result);
  }, [bookings, searchQuery, statusFilter, sortBy]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Bookings</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date-desc">Date (Newest First)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                    <option value="price-desc">Price (Highest First)</option>
                    <option value="price-asc">Price (Lowest First)</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setSortBy('date-desc');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? "No bookings match your current filters. Try adjusting your search criteria."
                : "You haven't made any bookings yet. Start by browsing available services."}
            </p>
            <Button asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <Link 
                    href={`/bookings/${booking.id}`}
                    className="block"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Service Image */}
                      <div 
                        className="w-full md:w-48 h-40 md:h-auto bg-cover bg-center" 
                        style={{ backgroundImage: `url(${booking.serviceImage})` }}
                      ></div>
                      
                      {/* Booking Details */}
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{booking.serviceName}</h3>
                            <div className="flex items-center mb-4">
                              <div 
                                className="w-6 h-6 rounded-full bg-cover bg-center mr-2" 
                                style={{ backgroundImage: `url(${booking.providerImage})` }}
                              ></div>
                              <span className="text-sm text-gray-600">{booking.providerName}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeClass(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </div>
                            <span className="text-lg font-medium mt-2">
                              {formatCurrency(booking.totalAmount, booking.currency)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(booking.startDate, 'PPP')}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatDate(booking.startDate, 'p')} - {formatDate(booking.endDate, 'p')}</span>
                          </div>
                          
                          <div className="mt-3 md:mt-0 flex items-center">
                            <span className="text-sm text-gray-500 mr-2">View Details</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}