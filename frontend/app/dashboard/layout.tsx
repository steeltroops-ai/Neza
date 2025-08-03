'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Mock user data - in a real app, this would come from an auth context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'PROVIDER', // or 'CLIENT'
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  const isProvider = user.role === 'PROVIDER';

  const clientNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const providerNavItems = [
    { name: 'Dashboard', href: '/dashboard/provider', icon: Home },
    { name: 'My Services', href: '/dashboard/provider/services', icon: Briefcase },
    { name: 'Bookings', href: '/dashboard/provider/bookings', icon: Calendar },
    { name: 'Messages', href: '/dashboard/provider/messages', icon: MessageSquare },
    { name: 'Earnings', href: '/dashboard/provider/earnings', icon: CreditCard },
    { name: 'Profile', href: '/dashboard/provider/profile', icon: User },
    { name: 'Settings', href: '/dashboard/provider/settings', icon: Settings },
  ];

  const navItems = isProvider ? providerNavItems : clientNavItems;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-white"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-center h-20 border-b">
            <Link href="/" className="text-2xl font-bold text-primary">
              Neza
            </Link>
          </div>

          {/* User info */}
          <div className="flex items-center p-4 border-b">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-3">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role.charAt(0) + user.role.slice(1).toLowerCase()}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center p-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}