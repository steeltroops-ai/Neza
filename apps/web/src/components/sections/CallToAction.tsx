import { Button } from '@neza/ui';
import React from 'react';

export function CallToAction() {
  return (
    <section className="bg-primary-600 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-display-md mb-4 text-white">Ready to Get Started?</h2>
        <p className="text-body-lg text-primary-100 mx-auto mb-8 max-w-2xl">
          Join thousands of satisfied customers who trust Neza for their service needs. Start
          booking today or become a verified provider.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="secondary" size="lg" className="px-8">
            Book a Service
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:text-primary-600 border-white px-8 text-white hover:bg-white"
          >
            Join as Provider
          </Button>
        </div>
      </div>
    </section>
  );
}
