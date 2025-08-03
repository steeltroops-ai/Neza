'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, BookOpen, FileText, MessageCircle, Video, HelpCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

type HelpCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

type PopularArticle = {
  id: string;
  title: string;
  category: string;
  link: string;
};

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock help categories
  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using Neza platform',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      link: '/help/getting-started',
    },
    {
      id: 'account-settings',
      title: 'Account & Settings',
      description: 'Manage your account, profile, and preferences',
      icon: <FileText className="h-8 w-8 text-green-500" />,
      link: '/help/account-settings',
    },
    {
      id: 'bookings',
      title: 'Bookings & Scheduling',
      description: 'Everything about booking and managing services',
      icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
      link: '/help/bookings',
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      description: 'Payment methods, invoices, and refunds',
      icon: <HelpCircle className="h-8 w-8 text-yellow-500" />,
      link: '/help/payments',
    },
    {
      id: 'providers',
      title: 'For Service Providers',
      description: 'Resources for service providers on Neza',
      icon: <Video className="h-8 w-8 text-red-500" />,
      link: '/help/providers',
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solutions for common issues and problems',
      icon: <HelpCircle className="h-8 w-8 text-orange-500" />,
      link: '/help/troubleshooting',
    },
  ];

  // Mock popular articles
  const popularArticles: PopularArticle[] = [
    {
      id: 'create-account',
      title: 'How to create an account',
      category: 'Getting Started',
      link: '/help/getting-started/create-account',
    },
    {
      id: 'book-service',
      title: 'How to book a service',
      category: 'Bookings & Scheduling',
      link: '/help/bookings/book-service',
    },
    {
      id: 'payment-methods',
      title: 'Supported payment methods',
      category: 'Payments & Billing',
      link: '/help/payments/payment-methods',
    },
    {
      id: 'cancel-booking',
      title: 'How to cancel or reschedule a booking',
      category: 'Bookings & Scheduling',
      link: '/help/bookings/cancel-reschedule',
    },
    {
      id: 'become-provider',
      title: 'How to become a service provider',
      category: 'For Service Providers',
      link: '/help/providers/become-provider',
    },
    {
      id: 'reset-password',
      title: 'How to reset your password',
      category: 'Account & Settings',
      link: '/help/account-settings/reset-password',
    },
    {
      id: 'refund-policy',
      title: 'Understanding our refund policy',
      category: 'Payments & Billing',
      link: '/help/payments/refund-policy',
    },
    {
      id: 'app-not-working',
      title: 'App not working properly',
      category: 'Troubleshooting',
      link: '/help/troubleshooting/app-issues',
    },
  ];

  // Filter articles based on search query
  const filteredArticles = searchQuery.trim() === ''
    ? popularArticles
    : popularArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers, guides, and resources to help you get the most out of Neza.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        {searchQuery.trim() !== '' && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="mt-2 text-sm">Try a different search term or browse our help categories below</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border divide-y">
                {filteredArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={article.link}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-gray-500">{article.category}</p>
                      </div>
                      <ChevronRight className="text-gray-400" size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Help Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Browse Help Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => (
            <Link 
              key={category.id} 
              href={category.link}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>View articles</span>
                      <ArrowRight className="ml-2" size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularArticles.slice(0, 6).map((article) => (
            <Link 
              key={article.id} 
              href={article.link}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{article.title}</h4>
                  <p className="text-sm text-gray-500">{article.category}</p>
                </div>
                <ChevronRight className="text-gray-400" size={18} />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button asChild variant="outline">
            <Link href="/help/articles">View all articles</Link>
          </Button>
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* These would be actual videos in a real implementation */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="rounded-lg overflow-hidden border">
              <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-center text-gray-500">Video Thumbnail {index}</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Getting Started Tutorial {index}</h3>
                <p className="text-sm text-gray-500">Learn how to use the basic features of Neza</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button asChild variant="outline">
            <Link href="/help/videos">View all videos</Link>
          </Button>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help. Contact us through any of these channels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm EST</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">24/7 response time</p>
                <p className="font-medium">support@neza.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <Button size="sm">Start Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Community Forum */}
      <div className="mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Connect with other Neza users, share tips, and get help from the community.
          </p>
          <Button asChild>
            <Link href="/community">Visit Community Forum</Link>
          </Button>
        </div>
      </div>

      {/* Related Links */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/faq" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">FAQ</h3>
            <p className="text-sm text-gray-500">Frequently asked questions</p>
          </Link>
          <Link 
            href="/blog" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">Blog</h3>
            <p className="text-sm text-gray-500">Tips, guides, and updates</p>
          </Link>
          <Link 
            href="/contact" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">Contact Us</h3>
            <p className="text-sm text-gray-500">Get in touch with our team</p>
          </Link>
        </div>
      </div>
    </div>
  );
}