import { Button } from '@neza/ui';
import React from 'react';

export function Hero() {
  return (
    <section className="from-primary-50 relative bg-gradient-to-br to-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-display-lg mb-6 text-balance">
            The <span className="text-primary-600">Uber for Local Services</span>
          </h1>
          <p className="text-body-lg mx-auto mb-8 max-w-3xl">
            Instantly connect with verified service providers through secure booking and escrow
            payments. We're digitalizing the $2.5 trillion global services economy.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8">
              Find Services
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Become a Provider
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
