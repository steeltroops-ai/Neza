import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@neza/ui';
import React from 'react';

export function FeaturedServices() {
  const services = [
    {
      title: 'Home Cleaning',
      description: 'Professional cleaning services for your home',
      icon: '🏠',
      providers: '500+',
    },
    {
      title: 'Plumbing',
      description: 'Expert plumbers for all your plumbing needs',
      icon: '🔧',
      providers: '300+',
    },
    {
      title: 'Electrical',
      description: 'Licensed electricians for safe installations',
      icon: '⚡',
      providers: '250+',
    },
    {
      title: 'Gardening',
      description: 'Landscaping and garden maintenance services',
      icon: '🌱',
      providers: '200+',
    },
  ];

  return (
    <section className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-display-md mb-4">Popular Services</h2>
          <p className="text-body-lg mx-auto max-w-2xl text-neutral-600">
            Discover trusted professionals for all your service needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} hover animate className="text-center">
              <CardHeader>
                <div className="mb-4 text-4xl">{service.icon}</div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-primary-600 text-sm font-medium">
                  {service.providers} providers
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
