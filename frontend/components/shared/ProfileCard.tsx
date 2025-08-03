import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Calendar, Shield, Award } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    role: 'client' | 'provider' | 'admin';
    location?: string;
    bio?: string;
    rating?: number;
    reviewCount?: number;
    memberSince?: string | Date;
    verified?: boolean;
    badges?: string[];
    stats?: {
      completedServices?: number;
      cancelRate?: number;
      responseRate?: number;
      responseTime?: string;
    };
  };
  variant?: 'default' | 'compact';
  showActions?: boolean;
  className?: string;
}

const ProfileCard = ({ 
  user, 
  variant = 'default', 
  showActions = true,
  className = '' 
}: ProfileCardProps) => {
  const { 
    id, 
    name, 
    avatar, 
    role, 
    location, 
    bio, 
    rating, 
    reviewCount, 
    memberSince, 
    verified, 
    badges = [],
    stats 
  } = user;
  
  const isCompact = variant === 'compact';
  
  // Format member since date
  const formattedMemberSince = memberSince ? new Date(memberSince).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }) : null;
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className={`p-4 ${isCompact ? 'flex items-center gap-4' : ''}`}>
        <div className={`${isCompact ? '' : 'flex flex-col items-center mb-4'}`}>
          <Avatar className={isCompact ? 'h-12 w-12' : 'h-20 w-20 mb-3'}>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          {!isCompact && (
            <div className="text-center">
              <h3 className="font-semibold text-lg">{name}</h3>
              
              <div className="flex items-center justify-center mt-1">
                <Badge variant={role === 'provider' ? 'default' : 'secondary'} className="text-xs">
                  {role === 'provider' ? 'Service Provider' : 'Client'}
                </Badge>
                
                {verified && (
                  <Badge variant="outline" className="ml-2 text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-green-500" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className={isCompact ? 'flex-1' : ''}>
          {isCompact && (
            <div className="mb-2">
              <h3 className="font-semibold">{name}</h3>
              <div className="flex items-center">
                <Badge variant={role === 'provider' ? 'default' : 'secondary'} className="text-xs">
                  {role === 'provider' ? 'Service Provider' : 'Client'}
                </Badge>
                
                {verified && (
                  <Badge variant="outline" className="ml-2 text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-green-500" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {location && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
          
          {bio && !isCompact && (
            <p className="text-sm text-gray-700 mb-3 text-center">{bio}</p>
          )}
          
          {rating !== undefined && (
            <div className="flex items-center text-sm mb-2">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              {reviewCount !== undefined && (
                <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
              )}
            </div>
          )}
          
          {formattedMemberSince && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Member since {formattedMemberSince}</span>
            </div>
          )}
          
          {badges.length > 0 && !isCompact && (
            <div className="flex flex-wrap gap-1 mb-3 justify-center">
              {badges.map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs flex items-center">
                  <Award className="h-3 w-3 mr-1 text-primary" />
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          
          {stats && role === 'provider' && !isCompact && (
            <div className="grid grid-cols-2 gap-2 text-center text-sm mb-3">
              {stats.completedServices !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div className="font-medium">{stats.completedServices}</div>
                  <div className="text-gray-500 text-xs">Completed</div>
                </div>
              )}
              
              {stats.responseRate !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div className="font-medium">{stats.responseRate}%</div>
                  <div className="text-gray-500 text-xs">Response Rate</div>
                </div>
              )}
              
              {stats.responseTime !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div className="font-medium">{stats.responseTime}</div>
                  <div className="text-gray-500 text-xs">Response Time</div>
                </div>
              )}
              
              {stats.cancelRate !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <div className="font-medium">{stats.cancelRate}%</div>
                  <div className="text-gray-500 text-xs">Cancel Rate</div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0 flex justify-center border-t">
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/profile/${id}`}>View Profile</Link>
            </Button>
            
            {role === 'provider' && (
              <Button asChild size="sm">
                <Link href={`/messages/new?recipient=${id}`}>Contact</Link>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileCard;