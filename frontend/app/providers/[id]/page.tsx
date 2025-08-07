"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  Heart, 
  Share2, 
  MessageSquare, 
  Calendar,
  Clock,
  Award,
  Shield,
  Users,
  ArrowLeft,
  Camera,
  Phone,
  Mail,
  Globe,
  Briefcase,
  DollarSign,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Play,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { CTAButton } from "@/components/ui/cta-button";
import Link from "next/link";

// Mock provider data
const mockProvider = {
  id: "1",
  name: "Sarah Nakamya",
  service: "Professional House Cleaning & Organization",
  tagline: "Creating spotless homes with eco-friendly solutions",
  rating: 4.9,
  reviews: 147,
  location: "Kampala Central, Uganda",
  price: 35,
  hourlyRange: { min: 25, max: 45 },
  verified: true,
  available: true,
  responseTime: "~30 minutes",
  completedJobs: 298,
  memberSince: "2021",
  languages: ["English", "Luganda"],
  avatar: "/api/placeholder/120/120",
  coverImage: "/api/placeholder/800/400",
  gallery: [
    "/api/placeholder/300/200",
    "/api/placeholder/300/200", 
    "/api/placeholder/300/200",
    "/api/placeholder/300/200"
  ],
  specialties: [
    "Deep Cleaning",
    "Eco-Friendly Products", 
    "Same Day Service",
    "Organization",
    "Post-Construction Cleanup",
    "Move-in/Move-out Cleaning"
  ],
  description: `I'm Sarah, a professional house cleaner with over 5 years of experience serving families across Kampala. I specialize in thorough, eco-friendly cleaning services that leave your home spotless and fresh.

My approach combines traditional cleaning wisdom with modern, environmentally safe products. I take pride in attention to detail and always go the extra mile to ensure customer satisfaction.

I offer flexible scheduling including same-day service and can work around your busy schedule. All my cleaning supplies are provided, and I'm fully insured for your peace of mind.`,
  
  services: [
    {
      name: "Standard House Cleaning",
      description: "Regular weekly/bi-weekly cleaning service",
      price: 35,
      duration: "2-3 hours",
      includes: ["Kitchen cleaning", "Bathroom sanitization", "Living areas", "Dusting", "Vacuuming"]
    },
    {
      name: "Deep Cleaning Service", 
      description: "Comprehensive top-to-bottom cleaning",
      price: 45,
      duration: "4-5 hours",
      includes: ["Everything in standard", "Inside appliances", "Window cleaning", "Baseboards", "Light fixtures"]
    },
    {
      name: "Move-in/Move-out Cleaning",
      description: "Complete cleaning for relocations",
      price: 55,
      duration: "5-6 hours", 
      includes: ["Deep clean all rooms", "Cabinet interiors", "Appliance deep clean", "Wall washing"]
    }
  ],

  reviews: [
    {
      id: 1,
      author: "Alice Namirembe",
      rating: 5,
      date: "2 weeks ago",
      content: "Sarah is absolutely amazing! She transformed my home and pays attention to every detail. Highly recommend her services.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      author: "John Sekandi",
      rating: 5,
      date: "1 month ago", 
      content: "Reliable, professional, and thorough. Sarah has been cleaning our home for 6 months and we couldn't be happier.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      author: "Mary Akello",
      rating: 4,
      date: "2 months ago",
      content: "Great service and very trustworthy. Only minor issue was running a bit late, but the quality of work was excellent.",
      verified: true,
      helpful: 5
    }
  ],

  availability: {
    monday: { available: true, slots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
    tuesday: { available: true, slots: ["10:00 AM", "2:00 PM"] },
    wednesday: { available: true, slots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"] },
    thursday: { available: false, slots: [] },
    friday: { available: true, slots: ["9:00 AM", "1:00 PM"] },
    saturday: { available: true, slots: ["10:00 AM", "2:00 PM"] },
    sunday: { available: false, slots: [] }
  },

  stats: {
    responseRate: 98,
    onTimeRate: 96,
    satisfactionRate: 99,
    repeatCustomers: 85
  }
};

// Gallery Component
const Gallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => {
              setCurrentImage(index);
              setShowLightbox(true);
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                ✕
              </button>
              
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video rounded-xl flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/50" />
              </div>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Reviews Section
const ReviewsSection = ({ reviews }: { reviews: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {displayedReviews.map((review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-modern p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white">
              {review.author.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-bold text-gray-900">{review.author}</h4>
                {review.verified && (
                  <TrustBadge type="verified" value="✓" label="Verified" variant="compact" />
                )}
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="hover:text-primary transition-colors">
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {reviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
};

// Provider Profile Page
export default function ProviderProfilePage() {
  const params = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const provider = mockProvider; // In real app, fetch by params.id

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${provider.name} - ${provider.service}`,
          text: provider.tagline,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <Link href="/services" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>
        </div>
      </div>

      {/* Cover Section */}
      <section className="relative">
        <div className="h-64 lg:h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-gray-400" />
        </div>
        
        <div className="container">
          <div className="relative -mt-16 lg:-mt-24">
            <div className="card-glass p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar & Basic Info */}
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center flex-1">
                  <div className="relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white text-2xl lg:text-3xl shadow-lg">
                      {provider.name.charAt(0)}
                    </div>
                    {provider.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {provider.available && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{provider.name}</h1>
                      <TrustBadge type="verified" value="✓" label="Verified" />
                    </div>
                    
                    <h2 className="text-xl text-gray-600 mb-3">{provider.service}</h2>
                    <p className="text-gray-600 mb-4">{provider.tagline}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-900">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Responds in {provider.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.slice(0, 4).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {provider.specialties.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-full">
                          +{provider.specialties.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="text-center lg:text-right">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary">${provider.price}/hr</div>
                    <div className="text-gray-500">Starting from ${provider.hourlyRange.min}</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <CTAButton
                      variant="primary"
                      size="lg"
                      fullWidth
                      glow
                      icon={<Calendar className="w-5 h-5" />}
                      onClick={() => setShowBookingModal(true)}
                    >
                      Book Now
                    </CTAButton>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFavorited(!isFavorited)}
                        className={`px-3 ${isFavorited ? 'text-red-500 border-red-200' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="px-3"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {provider.name}</h2>
                <div className="card-modern p-6">
                  <div className="prose prose-gray max-w-none">
                    {provider.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Pricing</h2>
                <div className="space-y-4">
                  {provider.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card-modern p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="text-sm text-gray-500">Duration: {service.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${service.price}</div>
                          <div className="text-sm text-gray-500">per session</div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-gray-600">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <CTAButton
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedService(index);
                            setShowBookingModal(true);
                          }}
                        >
                          Book This Service
                        </CTAButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
                <Gallery images={provider.gallery} />
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reviews ({provider.reviews})
                </h2>
                <ReviewsSection reviews={provider.reviews} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="card-modern p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-bold text-primary">{provider.stats.responseRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-Time Rate</span>
                    <span className="font-bold text-green-600">{provider.stats.onTimeRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Satisfaction Rate</span>
                    <span className="font-bold text-primary">{provider.stats.satisfactionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Repeat Customers</span>
                    <span className="font-bold text-secondary">{provider.stats.repeatCustomers}%</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="card-modern p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{provider.completedJobs} jobs completed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Member since {provider.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Speaks {provider.languages.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="card-modern p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trust & Safety</h3>
                <div className="space-y-3">
                  <TrustBadge type="verified" value="✓" label="Identity Verified" />
                  <TrustBadge type="completed" value={provider.completedJobs} label="jobs completed" />
                  <TrustBadge type="rating" value={provider.rating} label="average rating" />
                  <TrustBadge type="response" value={provider.responseTime} label="response time" />
                </div>
              </div>

              {/* Contact Info */}
              <div className="card-modern p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <CTAButton
                    variant="primary"
                    fullWidth
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Send Message
                  </CTAButton>
                  <CTAButton
                    variant="outline"
                    fullWidth
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Request Call
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}