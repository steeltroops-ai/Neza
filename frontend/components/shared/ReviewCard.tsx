import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/star';

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string | Date;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
    serviceId?: string;
    serviceName?: string;
    images?: string[];
    reply?: {
      comment: string;
      createdAt: string | Date;
      user: {
        id: string;
        name: string;
        avatar?: string;
      };
    };
  };
  showService?: boolean;
  className?: string;
}

const ReviewCard = ({ review, showService = false, className = '' }: ReviewCardProps) => {
  const { rating, comment, createdAt, user, serviceName, images, reply } = review;
  
  // Format date
  const formattedDate = typeof createdAt === 'string' 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : formatDistanceToNow(createdAt, { addSuffix: true });
  
  // Format reply date if exists
  const formattedReplyDate = reply && (typeof reply.createdAt === 'string' 
    ? formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })
    : formatDistanceToNow(reply.createdAt, { addSuffix: true }));
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h4 className="font-medium">{user.name}</h4>
              <div className="flex items-center">
                <StarRating rating={rating} size={16} />
                <span className="text-xs text-gray-500 ml-2">{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {showService && serviceName && (
            <div className="text-sm text-gray-600">
              <span className="text-gray-400">Service:</span> {serviceName}
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4">{comment}</p>
        
        {images && images.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div key={index} className="relative h-20 w-20 flex-shrink-0">
                <Image 
                  src={image} 
                  alt={`Review image ${index + 1}`} 
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
        
        {reply && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mt-3">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <h5 className="font-medium text-sm">{reply.user.name}</h5>
                <span className="text-xs text-gray-500">{formattedReplyDate}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{reply.comment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;