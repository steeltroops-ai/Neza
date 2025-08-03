import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import icons
import { 
  Bell, 
  Calendar, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  Star, 
  AlertCircle,
  User,
  FileText
} from 'lucide-react';

type NotificationType = 
  | 'booking_created'
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_completed'
  | 'payment_received'
  | 'payment_refunded'
  | 'message_received'
  | 'review_received'
  | 'system'
  | 'account';

interface NotificationCardProps {
  notification: {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    createdAt: string | Date;
    read: boolean;
    actionUrl?: string;
    data?: Record<string, any>;
  };
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

const NotificationCard = ({ 
  notification, 
  onMarkAsRead,
  className = '' 
}: NotificationCardProps) => {
  const { id, type, title, message, createdAt, read, actionUrl } = notification;
  
  // Format date
  const formattedDate = typeof createdAt === 'string' 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : formatDistanceToNow(createdAt, { addSuffix: true });
  
  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'booking_created':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'booking_confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'booking_cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'booking_completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'payment_received':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'payment_refunded':
        return <CreditCard className="h-5 w-5 text-amber-500" />;
      case 'message_received':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'review_received':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'account':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Handle click
  const handleClick = () => {
    if (!read && onMarkAsRead) {
      onMarkAsRead(id);
    }
  };
  
  // Wrap content with Link if actionUrl exists
  const Content = () => (
    <CardContent className="p-4 flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium">{title}</h4>
          {!read && <Badge variant="default" className="text-xs">New</Badge>}
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{message}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          
          {actionUrl && (
            <span className="text-xs text-primary hover:underline">
              View details
            </span>
          )}
        </div>
      </div>
    </CardContent>
  );
  
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-sm ${!read ? 'border-l-4 border-l-primary' : ''} ${className}`}
      onClick={handleClick}
    >
      {actionUrl ? (
        <Link href={actionUrl}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </Card>
  );
};

export default NotificationCard;