import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Browse Services',
      description: 'Find the perfect service provider for your needs',
      icon: '🔍',
    },
    {
      step: '2',
      title: 'Book Instantly',
      description: 'Schedule your service with just a few clicks',
      icon: '📅',
    },
    {
      step: '3',
      title: 'Secure Payment',
      description: 'Pay safely with our escrow protection system',
      icon: '🔒',
    },
    {
      step: '4',
      title: 'Get Service',
      description: 'Enjoy professional service from verified providers',
      icon: '✨',
    },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-display-md mb-4">How It Works</h2>
          <p className="text-body-lg mx-auto max-w-2xl text-neutral-600">
            Get the services you need in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="bg-primary-500 absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                  {step.step}
                </div>
              </div>
              <h3 className="text-heading-sm mb-2">{step.title}</h3>
              <p className="text-body-sm text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
