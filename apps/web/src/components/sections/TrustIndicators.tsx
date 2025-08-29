import React from 'react';

export function TrustIndicators() {
  const stats = [
    { label: 'Verified Providers', value: '10,000+' },
    { label: 'Completed Services', value: '50,000+' },
    { label: 'Customer Rating', value: '4.9/5' },
    { label: 'Cities Covered', value: '25+' },
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-primary-600 mb-2 text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
