'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to our team through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-1">For general inquiries:</p>
                  <a href="mailto:info@neza.com" className="text-primary hover:underline">
                    info@neza.com
                  </a>
                  <p className="text-gray-600 mt-2 mb-1">For support:</p>
                  <a href="mailto:support@neza.com" className="text-primary hover:underline">
                    support@neza.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-1">Customer Service:</p>
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +1 (234) 567-890
                  </a>
                  <p className="text-gray-600 mt-2 mb-1">Technical Support:</p>
                  <a href="tel:+1234567891" className="text-primary hover:underline">
                    +1 (234) 567-891
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Innovation Drive<br />
                    Tech Hub, Suite 456<br />
                    San Francisco, CA 94103<br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Customer Support:</span><br />
                    24/7 via email and chat
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" />
                Send Us a Message
              </h2>
              
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              ) : null}
              
              {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading} className="flex items-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
          {/* Placeholder for map - in a real app, you would integrate Google Maps or similar */}
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Map integration would be implemented here.<br />
                Our location: 123 Innovation Drive, San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Contact Questions</h2>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">What is the typical response time for inquiries?</h3>
              <p className="text-gray-600">
                We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer service line for immediate assistance.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">How can I report a technical issue with the platform?</h3>
              <p className="text-gray-600">
                For technical issues, please email our support team at support@neza.com with details about the problem you're experiencing. Screenshots or screen recordings are helpful for faster resolution.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Do you offer in-person consultations for service providers?</h3>
              <p className="text-gray-600">
                Yes, we offer in-person consultations for service providers at our office. Please schedule an appointment by calling our business development team or using the contact form above.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">How can I provide feedback about the platform?</h3>
              <p className="text-gray-600">
                We value your feedback! You can share your thoughts and suggestions by emailing feedback@neza.com or using the contact form on this page. Your input helps us improve our services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Stay updated with our latest features, service provider spotlights, and community news by subscribing to our newsletter.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Input placeholder="Your email address" type="email" className="flex-grow" />
          <Button>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}