'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, Award, Globe, Mail, Phone, MapPin } from 'lucide-react';

// Team member data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Sarah founded Neza with a vision to transform how people access services in their communities. With over 15 years of experience in tech and marketplace businesses.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Michael leads our engineering team, bringing 12 years of experience building scalable platforms. He previously worked at leading tech companies before joining Neza.',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'Priya oversees day-to-day operations, ensuring our platform runs smoothly for both clients and service providers. She has a background in operations management.',
  },
  {
    name: 'David Okafor',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    bio: 'David leads our marketing efforts, focusing on growing our community of users and service providers. He brings creative strategies from his 10 years in digital marketing.',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How does Neza work?',
    answer: 'Neza connects clients with skilled service providers in their area. Clients can browse services, read reviews, and book appointments directly through our platform. Service providers can list their services, manage bookings, and grow their business.',
  },
  {
    question: 'How do I sign up as a service provider?',
    answer: 'To become a service provider on Neza, click on the "Become a Provider" button and complete the registration process. You\'ll need to provide details about your services, pricing, availability, and complete our verification process.',
  },
  {
    question: 'Is there a fee to use Neza?',
    answer: 'Neza is free for clients to browse and search for services. Service providers pay a small commission on completed bookings. We believe in transparent pricing with no hidden fees.',
  },
  {
    question: 'How are service providers verified?',
    answer: 'We verify all service providers through a comprehensive process that includes identity verification, professional credentials check, and background screening where applicable. We also collect and monitor user reviews to ensure quality.',
  },
  {
    question: 'What happens if I need to cancel a booking?',
    answer: 'Both clients and service providers can cancel bookings through their dashboard. Each service provider sets their own cancellation policy, which is displayed before booking. Refunds are processed according to these policies.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team through the "Contact Us" section on our website, by emailing support@neza.com, or by calling our support line during business hours. We aim to respond to all inquiries within 24 hours.',
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Neza</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting communities with trusted service providers since 2023.
        </p>
      </div>

      {/* Mission and Vision Tabs */}
      <div className="mb-16">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'mission' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'vision' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'values' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('values')}
            >
              Our Values
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
          {activeTab === 'mission' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                At Neza, our mission is to empower communities by connecting people with skilled, trusted service providers. We believe everyone deserves access to quality services that make their lives better, easier, and more fulfilling.
              </p>
              <p className="text-gray-700">
                We're committed to creating economic opportunities for service providers while ensuring clients receive exceptional service. By building a platform that values transparency, quality, and community, we're transforming how services are discovered and delivered.
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                We envision a world where finding and booking services is seamless and stress-free. A world where skilled professionals can easily connect with those who need their expertise, creating thriving local economies and stronger communities.
              </p>
              <p className="text-gray-700">
                Neza aims to be the most trusted platform for service exchange globally, known for our commitment to quality, reliability, and positive impact on communities everywhere.
              </p>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Trust & Safety</h3>
                    <p className="text-sm text-gray-600">We prioritize creating a safe platform through verification and transparency.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Community Focus</h3>
                    <p className="text-sm text-gray-600">We build features that strengthen local connections and economies.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quality & Excellence</h3>
                    <p className="text-sm text-gray-600">We maintain high standards for both our platform and the services offered.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Inclusivity</h3>
                    <p className="text-sm text-gray-600">We create opportunities for all, regardless of background or circumstances.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-600">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-600">Verified Providers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">20+</h3>
              <p className="text-gray-600">Cities Served</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Neza team working together" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              Neza was born from a simple observation: finding reliable service providers was unnecessarily difficult, while talented professionals struggled to connect with potential clients.
            </p>
            <p className="text-gray-700">
              Our founder, Sarah Johnson, experienced this firsthand when she moved to a new city and spent weeks trying to find trusted service providers for her home. She realized there had to be a better way.
            </p>
            <p className="text-gray-700">
              In 2023, Sarah assembled a team of technology and marketplace experts who shared her vision. Together, they built Neza—a platform designed to make service discovery and booking seamless while creating opportunities for skilled professionals.
            </p>
            <p className="text-gray-700">
              Today, Neza connects thousands of clients with verified service providers across multiple cities, and we're just getting started. Our journey continues as we expand to new markets and develop innovative features to better serve our growing community.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
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

      {/* Contact Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Have questions about Neza? We're here to help. Reach out to our team using any of the methods below.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">info@neza.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Office</h4>
                  <p className="text-gray-600">123 Innovation Drive<br />San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <Button className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to experience Neza?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied users who have found the perfect service providers for their needs.
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