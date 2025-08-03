'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  faqs: FAQ[];
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('general');

  // Mock FAQ data
  const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      name: 'General Questions',
      icon: <span className="text-blue-500">🔍</span>,
      faqs: [
        {
          id: 'what-is-neza',
          question: 'What is Neza?',
          answer: 'Neza is a platform that connects clients with service providers for various services. Our mission is to make it easy for people to find, book, and pay for services they need, while helping service providers grow their business.'
        },
        {
          id: 'how-to-use',
          question: 'How do I use Neza?',
          answer: 'Using Neza is simple! Create an account, browse through available services or service providers, select the one you like, choose a date and time, and book your appointment. You can pay through our secure payment system and leave reviews after the service is completed.'
        },
        {
          id: 'service-areas',
          question: 'Where is Neza available?',
          answer: 'Neza is currently available in major cities across the United States, with plans to expand to more locations soon. You can check if Neza is available in your area by entering your location on our homepage.'
        },
        {
          id: 'account-types',
          question: 'What types of accounts can I create?',
          answer: 'You can create either a client account to book services or a service provider account to offer services. Each account type has different features tailored to their specific needs.'
        },
      ],
    },
    {
      id: 'clients',
      name: 'For Clients',
      icon: <span className="text-green-500">👤</span>,
      faqs: [
        {
          id: 'how-to-book',
          question: 'How do I book a service?',
          answer: 'To book a service, browse through our categories or search for a specific service, select a service provider, choose an available date and time slot, provide any additional details, and confirm your booking. You can pay immediately or at the time of service, depending on the provider\'s settings.'
        },
        {
          id: 'cancel-booking',
          question: 'How do I cancel a booking?',
          answer: 'You can cancel a booking by going to your dashboard, selecting the booking you wish to cancel, and clicking the "Cancel Booking" button. Please note that cancellation policies vary by service provider, and fees may apply for late cancellations.'
        },
        {
          id: 'payment-methods',
          question: 'What payment methods are accepted?',
          answer: 'We accept major credit and debit cards, PayPal, and in some cases, bank transfers. All payments are processed securely through our platform to protect your financial information.'
        },
        {
          id: 'leave-review',
          question: 'How do I leave a review?',
          answer: 'After your service is completed, you\'ll receive a notification to leave a review. You can rate your experience and write a review directly from your dashboard or through the link in the notification email.'
        },
      ],
    },
    {
      id: 'providers',
      name: 'For Service Providers',
      icon: <span className="text-purple-500">🛠️</span>,
      faqs: [
        {
          id: 'become-provider',
          question: 'How do I become a service provider?',
          answer: 'To become a service provider, create a service provider account, complete your profile with your services, pricing, availability, and qualifications, and submit any required verification documents. Once approved, you can start receiving booking requests.'
        },
        {
          id: 'set-availability',
          question: 'How do I set my availability?',
          answer: 'You can set your availability in your provider dashboard under "Availability Settings." You can define your working hours, block out dates when you\'re unavailable, and set buffer times between appointments.'
        },
        {
          id: 'receive-payments',
          question: 'How and when do I receive payments?',
          answer: 'Payments are processed after the service is completed and the client confirms satisfaction. Funds are typically transferred to your linked bank account within 3-5 business days, minus our service fee.'
        },
        {
          id: 'provider-fees',
          question: 'What fees does Neza charge service providers?',
          answer: 'Neza charges a commission fee of 10-15% on each completed booking, depending on your service category and volume. There are no monthly fees or charges for listing your services.'
        },
      ],
    },
    {
      id: 'bookings',
      name: 'Bookings & Scheduling',
      icon: <span className="text-orange-500">📅</span>,
      faqs: [
        {
          id: 'reschedule',
          question: 'How do I reschedule a booking?',
          answer: 'To reschedule a booking, go to your dashboard, find the booking you want to change, and click "Reschedule." You\'ll be able to select a new date and time based on the provider\'s availability. Some providers may have policies regarding rescheduling.'
        },
        {
          id: 'booking-confirmation',
          question: 'How do I know if my booking is confirmed?',
          answer: 'Once a booking is confirmed, you\'ll receive a confirmation email and notification. You can also check the status of your booking in your dashboard. The status will show as "Confirmed" once the service provider accepts the booking.'
        },
        {
          id: 'booking-reminders',
          question: 'Will I receive reminders about my upcoming bookings?',
          answer: 'Yes, we send automatic reminders 24 hours before your scheduled service. You can adjust your notification preferences in your account settings.'
        },
      ],
    },
    {
      id: 'payments',
      name: 'Payments & Refunds',
      icon: <span className="text-yellow-500">💰</span>,
      faqs: [
        {
          id: 'payment-security',
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers.'
        },
        {
          id: 'refund-policy',
          question: 'What is the refund policy?',
          answer: 'Refund policies vary by service provider. You can view a provider\'s specific refund policy on their profile before booking. In general, cancellations made at least 24 hours in advance are eligible for a full refund, while late cancellations may be subject to fees.'
        },
        {
          id: 'payment-issues',
          question: 'What if I have issues with a payment?',
          answer: 'If you experience any issues with payments, please contact our customer support team immediately. We\'ll work with you to resolve the issue as quickly as possible.'
        },
      ],
    },
    {
      id: 'account',
      name: 'Account & Profile',
      icon: <span className="text-red-500">👤</span>,
      faqs: [
        {
          id: 'update-profile',
          question: 'How do I update my profile information?',
          answer: 'You can update your profile information by going to your account settings. From there, you can edit your personal details, contact information, and preferences.'
        },
        {
          id: 'delete-account',
          question: 'How do I delete my account?',
          answer: 'To delete your account, go to your account settings and select "Delete Account" at the bottom of the page. Please note that this action is permanent and will remove all your data from our platform.'
        },
        {
          id: 'change-password',
          question: 'How do I change my password?',
          answer: 'To change your password, go to your account settings, select "Security," and then "Change Password." You\'ll need to enter your current password and then your new password.'
        },
      ],
    },
  ];

  // Toggle FAQ expansion
  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId) 
        : [...prev, faqId]
    );
  };

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === '' 
    ? faqCategories
    : faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about Neza. If you can't find what you're looking for, feel free to contact our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center space-x-2"
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto">
        {searchQuery.trim() !== '' ? (
          // Search Results
          <div>
            <h2 className="text-xl font-semibold mb-6">Search Results</h2>
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="mt-2">Try a different search term or browse by category</p>
              </div>
            ) : (
              filteredFAQs.map((category) => (
                <div key={category.id} className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </h3>
                  <div className="space-y-4">
                    {category.faqs.map((faq) => (
                      <div 
                        key={faq.id} 
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          {expandedFAQs.includes(faq.id) ? (
                            <ChevronUp className="flex-shrink-0 text-gray-500" size={20} />
                          ) : (
                            <ChevronDown className="flex-shrink-0 text-gray-500" size={20} />
                          )}
                        </button>
                        {expandedFAQs.includes(faq.id) && (
                          <div className="p-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Category View
          <div>
            {faqCategories
              .filter(category => category.id === activeCategory)
              .map((category) => (
                <div key={category.id}>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq) => (
                      <div 
                        key={faq.id} 
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          {expandedFAQs.includes(faq.id) ? (
                            <ChevronUp className="flex-shrink-0 text-gray-500" size={20} />
                          ) : (
                            <ChevronDown className="flex-shrink-0 text-gray-500" size={20} />
                          )}
                        </button>
                        {expandedFAQs.includes(faq.id) && (
                          <div className="p-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Still Have Questions */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find the answer you're looking for? Please contact our friendly support team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="default">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/help">Help Center</Link>
          </Button>
        </div>
      </div>

      {/* Related Links */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">You May Also Find Helpful</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/terms" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">Terms of Service</h3>
            <p className="text-sm text-gray-500">Review our terms and conditions</p>
          </Link>
          <Link 
            href="/privacy" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">Privacy Policy</h3>
            <p className="text-sm text-gray-500">Learn how we protect your data</p>
          </Link>
          <Link 
            href="/how-it-works" 
            className="p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <h3 className="font-medium mb-2">How It Works</h3>
            <p className="text-sm text-gray-500">Understand our platform process</p>
          </Link>
        </div>
      </div>
    </div>
  );
}