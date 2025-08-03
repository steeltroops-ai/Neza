"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategoryCard from "@/components/shared/CategoryCard";
import ServiceCard from "@/components/shared/ServiceCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import HowItWorksCard from "@/components/shared/HowItWorksCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for categories
  const categories = [
    {
      id: "1",
      name: "Web Development",
      icon: "/icons/web-dev.svg",
      count: 120,
    },
    {
      id: "2",
      name: "Mobile Development",
      icon: "/icons/mobile-dev.svg",
      count: 85,
    },
    { id: "3", name: "UI/UX Design", icon: "/icons/design.svg", count: 95 },
    {
      id: "4",
      name: "Digital Marketing",
      icon: "/icons/marketing.svg",
      count: 70,
    },
    {
      id: "5",
      name: "Content Writing",
      icon: "/icons/writing.svg",
      count: 110,
    },
    { id: "6", name: "Data Analysis", icon: "/icons/data.svg", count: 65 },
  ];

  // Mock data for featured services
  const featuredServices = [
    {
      id: "1",
      title: "Professional Web Development",
      description: "I will create a responsive website for your business",
      price: 500,
      currency: "USD",
      unit: "project",
      rating: 4.8,
      reviewCount: 24,
      provider: {
        id: "1",
        name: "John Doe",
        avatar: "/avatars/provider-1.jpg",
      },
      image: "/services/web-dev.jpg",
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "I will develop a cross-platform mobile app",
      price: 800,
      currency: "USD",
      unit: "project",
      rating: 4.9,
      reviewCount: 18,
      provider: {
        id: "2",
        name: "Jane Smith",
        avatar: "/avatars/provider-2.jpg",
      },
      image: "/services/mobile-dev.jpg",
    },
    {
      id: "3",
      title: "UI/UX Design",
      description: "I will design a modern and user-friendly interface",
      price: 300,
      currency: "USD",
      unit: "project",
      rating: 4.7,
      reviewCount: 32,
      provider: {
        id: "3",
        name: "Mike Johnson",
        avatar: "/avatars/provider-3.jpg",
      },
      image: "/services/design.jpg",
    },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      id: "1",
      content:
        "Neza helped me find the perfect developer for my project. The quality of work was outstanding!",
      author: "Sarah Williams",
      role: "Startup Founder",
      avatar: "/avatars/testimonial-1.jpg",
      rating: 5,
    },
    {
      id: "2",
      content:
        "As a freelancer, Neza has been a game-changer for me. I've been able to find consistent work and grow my client base.",
      author: "David Chen",
      role: "Freelance Designer",
      avatar: "/avatars/testimonial-2.jpg",
      rating: 5,
    },
    {
      id: "3",
      content:
        "The booking and payment process is seamless. I love how easy it is to find and hire talent on Neza.",
      author: "Lisa Johnson",
      role: "Marketing Director",
      avatar: "/avatars/testimonial-3.jpg",
      rating: 4,
    },
  ];

  // How it works steps
  const howItWorks = [
    {
      id: "1",
      title: "Create an Account",
      description: "Sign up as a client or service provider",
      icon: "/icons/user-plus.svg",
    },
    {
      id: "2",
      title: "Find Services",
      description: "Browse categories or search for specific skills",
      icon: "/icons/search.svg",
    },
    {
      id: "3",
      title: "Book & Pay",
      description: "Schedule and pay for services securely",
      icon: "/icons/calendar.svg",
    },
    {
      id: "4",
      title: "Get Work Done",
      description: "Collaborate and complete your project",
      icon: "/icons/check-circle.svg",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results page
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary px-4 py-20 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Expert Services for Your Projects
              </h1>
              <p className="text-lg mb-8">
                Connect with skilled professionals in your area for all your
                service needs
              </p>
              <form onSubmit={handleSearch} className="flex w-full max-w-md">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="What service are you looking for?"
                    className="pl-10 py-6 rounded-r-none bg-white/90 text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
                <Button type="submit" className="rounded-l-none py-6">
                  Search
                </Button>
              </form>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm">Popular:</span>
                {["Web Development", "Design", "Marketing", "Writing"].map(
                  (term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 border-white/40"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/hero-image.svg"
                  alt="Neza Platform"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Browse Categories
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Find services in these popular categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/categories">
              <Button variant="outline">View All Categories</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Featured Services
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Discover top-rated services from our providers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services">
              <Button>Explore All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
          <p className="text-gray-600 mb-10 text-center">
            Simple steps to get started with Neza
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <HowItWorksCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            What Our Users Say
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Hear from our satisfied clients and service providers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of clients and service providers on Neza today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white hover:bg-white/10"
              >
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
