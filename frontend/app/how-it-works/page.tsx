'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, Search, Calendar, CreditCard, MessageSquare, Star, Shield } from 'lucide-react';

// Process steps data
const clientSteps = [
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Search for Services',
    description: 'Browse through our extensive catalog of services. Filter by category, location, price, and ratings to find exactly what you need.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: 'Book an Appointment',
    description: 'Select your preferred date and time, specify your requirements, and book your service with just a few clicks.',
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: 'Secure Payment',
    description: 'Pay securely through our platform. Your payment is only released to the provider after you confirm satisfaction with the service.',
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: 'Rate and Review',
    description: 'After the service is completed, share your experience by rating and reviewing the provider to help others in the community.',
  },
];

const providerSteps = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Create Your Profile',
    description: 'Sign up and complete your profile with your skills, experience, and credentials. Get verified to build trust with potential clients.',
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'List Your Services',
    description: 'Add detailed descriptions of the services you offer, including pricing, availability, and any special requirements.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: 'Manage Bookings',
    description: 'Receive booking requests, manage your schedule, and communicate with clients through our platform.',
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: 'Get Paid',
    description: 'Receive secure payments through our platform after completing services. Track your earnings and manage your business growth.',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How do I get started as a client?',
    answer: 'Getting started is easy! Simply create an account, browse available services in your area, and book the ones you need. You can pay securely through our platform and communicate directly with service providers.',
  },
  {
    question: 'What are the requirements to become a service provider?',
    answer: 'To become a service provider, you need to create an account, complete your profile with relevant skills and experience, and go through our verification process. Depending on your service category, you may need to provide professional certifications or licenses.',
  },
  {
    question: 'How does the payment system work?',
    answer: 'When a client books a service, the payment is securely held by Neza. Once the service is completed and the client confirms their satisfaction, the payment is released to the provider. This ensures protection for both parties.',
  },
  {
    question: 'What happens if I need to cancel a booking?',
    answer: 'Both clients and providers can cancel bookings through their dashboard. Each provider sets their own cancellation policy, which is displayed before booking. Refunds are processed according to these policies.',
  },
  {
    question: 'How does Neza ensure quality and safety?',
    answer: 'We verify all service providers through a comprehensive process that includes identity verification and credential checks. We also have a review system that allows clients to rate their experience, helping maintain high standards across our platform.',
  },
  {
    question: 'What fees does Neza charge?',
    answer: 'Neza is free for clients to use. Service providers pay a small commission on completed bookings. The exact fee structure is available in our Terms of Service.',
  },
];

// Benefits data
const clientBenefits = [
  {
    title: 'Verified Providers',
    description: 'All service providers undergo a thorough verification process to ensure quality and reliability.',
  },
  {
    title: 'Secure Payments',
    description: 'Your payment is held securely until you confirm the service has been completed to your satisfaction.',
  },
  {
    title: 'Transparent Pricing',
    description: 'See upfront pricing for all services with no hidden fees or surprises.',
  },
  {
    title: 'Reviews & Ratings',
    description: 'Make informed decisions based on genuine reviews from other clients.',
  },
];

const providerBenefits = [
  {
    title: 'Grow Your Business',
    description: 'Reach more clients and expand your customer base through our platform.',
  },
  {
    title: 'Flexible Schedule',
    description: 'Set your own availability and work on your terms.',
  },
  {
    title: 'Secure Income',
    description: 'Get paid reliably for your services through our secure payment system.',
  },
  {
    title: 'Build Your Reputation',
    description: 'Collect reviews and ratings to showcase your quality work and attract more clients.',
  },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('clients');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How Neza Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Neza makes it easy to connect service providers with clients. Learn how our platform works for both sides of the marketplace.
        </p>
      </div>

      {/* Tabs for Client/Provider Views */}
      <div className="mb-16">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'clients' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('clients')}
            >
              For Clients
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'providers' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('providers')}
            >
              For Service Providers
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {activeTab === 'clients' ? 'How to Book a Service' : 'How to Offer Your Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'clients' ? clientSteps : providerSteps).map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">{index + 1}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {activeTab === 'clients' ? 'Benefits for Clients' : 'Benefits for Service Providers'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {(activeTab === 'clients' ? clientBenefits : providerBenefits).map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Explanation */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">See Neza in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={activeTab === 'clients' 
                  ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                } 
                alt={activeTab === 'clients' ? "Client using Neza app" : "Service provider using Neza platform"} 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">
              {activeTab === 'clients' 
                ? "Booking Made Simple" 
                : "Growing Your Business"}
            </h3>
            <p className="text-gray-700">
              {activeTab === 'clients'
                ? "Neza's intuitive interface makes finding and booking services a breeze. Browse through categories, compare providers, read reviews, and book appointments all in one place. Our secure platform ensures a smooth experience from search to service completion."
                : "With Neza, you can focus on what you do best while we handle the business side. Our platform helps you manage bookings, communicate with clients, process payments, and build your reputation through reviews. It's like having a business manager in your pocket."}
            </p>
            <div className="pt-4">
              <Button>
                {activeTab === 'clients' ? 'Find Services Now' : 'Become a Provider'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="p-4 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Communication Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">Seamless Communication</h3>
            <p className="text-gray-700 mb-4">
              Our platform facilitates direct communication between clients and service providers. Discuss requirements, ask questions, and clarify details before, during, and after service delivery.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-gray-600">In-app messaging system</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-gray-600">Booking updates and notifications</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-gray-600">Service completion confirmation</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Communication between client and service provider" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a busy professional, finding reliable home services used to be a hassle. Neza has completely changed that. I can quickly find verified providers, book services, and pay securely all in one place. It's saved me countless hours!"
              </p>
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                    alt="Client" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="font-medium">Jessica T.</p>
                  <p className="text-sm text-gray-600">Client</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Joining Neza as a service provider has transformed my business. I've been able to reach new clients, manage my schedule efficiently, and grow my revenue. The platform handles all the administrative work so I can focus on delivering quality service."
              </p>
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                    alt="Service Provider" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="font-medium">Marcus J.</p>
                  <p className="text-sm text-gray-600">Service Provider</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our growing community of clients and service providers. Experience the easiest way to book services or grow your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg">
            Find Services
          </Button>
          <Button size="lg" variant="outline">
            Become a Provider
          </Button>
        </div>
      </div>
    </div>
  );
}