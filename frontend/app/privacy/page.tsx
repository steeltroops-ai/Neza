'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last Updated: June 15, 2023
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><a href="#introduction" className="text-primary hover:underline">Introduction</a></li>
            <li><a href="#information" className="text-primary hover:underline">Information We Collect</a></li>
            <li><a href="#usage" className="text-primary hover:underline">How We Use Your Information</a></li>
            <li><a href="#sharing" className="text-primary hover:underline">Information Sharing and Disclosure</a></li>
            <li><a href="#choices" className="text-primary hover:underline">Your Choices and Rights</a></li>
            <li><a href="#security" className="text-primary hover:underline">Data Security</a></li>
            <li><a href="#retention" className="text-primary hover:underline">Data Retention</a></li>
            <li><a href="#international" className="text-primary hover:underline">International Data Transfers</a></li>
            <li><a href="#children" className="text-primary hover:underline">Children's Privacy</a></li>
            <li><a href="#changes" className="text-primary hover:underline">Changes to This Privacy Policy</a></li>
            <li><a href="#contact" className="text-primary hover:underline">Contact Us</a></li>
          </ol>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-10">
          <section id="introduction">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <div className="prose max-w-none">
              <p>
                Neza ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
              </p>
              <p>
                This Privacy Policy applies to all users of our Services, including service providers and clients. If you have any questions or concerns about our Privacy Policy or data practices, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>
          </section>

          <section id="information">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Information You Provide to Us</h3>
              <p>We may collect the following types of information that you voluntarily provide to us:</p>
              <ul>
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, password, and user role (client or service provider).</li>
                <li><strong>Profile Information:</strong> If you are a service provider, we may collect additional information such as professional qualifications, certifications, skills, experience, profile photo, and service descriptions.</li>
                <li><strong>Identity Verification Information:</strong> We may collect government-issued identification documents, address verification, and other information to verify your identity and comply with regulatory requirements.</li>
                <li><strong>Payment Information:</strong> We collect payment method information, such as credit card or bank account details, to process transactions. Full payment information is stored by our payment processors, not by Neza.</li>
                <li><strong>Communications:</strong> We collect information you provide when you contact our customer support, participate in surveys, or communicate with other users through our platform.</li>
                <li><strong>Booking Information:</strong> We collect details about the services you book or provide, including dates, times, locations, and special requests.</li>
                <li><strong>Reviews and Ratings:</strong> We collect the content of reviews, ratings, and feedback you provide about services or service providers.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Information We Collect Automatically</h3>
              <p>When you use our Services, we may automatically collect certain information, including:</p>
              <ul>
                <li><strong>Device Information:</strong> We collect information about the device you use to access our Services, including device type, operating system, unique device identifiers, IP address, and mobile network information.</li>
                <li><strong>Usage Information:</strong> We collect information about how you use our Services, including the pages you visit, the time and duration of your visits, the links you click, and the searches you conduct.</li>
                <li><strong>Location Information:</strong> With your consent, we may collect precise location information from your device to provide location-based services, such as matching you with nearby service providers.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar technologies to collect information about your browsing behavior and preferences. For more information, please see our Cookie Policy.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Information from Third Parties</h3>
              <p>We may receive information about you from third parties, including:</p>
              <ul>
                <li><strong>Social Media Platforms:</strong> If you choose to link your social media accounts to our Services, we may receive information from those platforms, such as your profile information and friends list.</li>
                <li><strong>Business Partners:</strong> We may receive information about you from our business partners, such as payment processors, identity verification services, and marketing partners.</li>
                <li><strong>Public Sources:</strong> We may collect information about you from publicly available sources, such as public records and social media profiles.</li>
              </ul>
            </div>
          </section>

          <section id="usage">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <div className="prose max-w-none">
              <p>We use the information we collect for various purposes, including:</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Providing and Improving Our Services</h3>
              <ul>
                <li>To create and maintain your account</li>
                <li>To facilitate bookings and transactions between clients and service providers</li>
                <li>To process payments and manage billing</li>
                <li>To provide customer support and respond to your inquiries</li>
                <li>To improve and optimize our Services</li>
                <li>To develop new features and services</li>
                <li>To monitor and analyze usage patterns and trends</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Communication</h3>
              <ul>
                <li>To send you service-related notifications, such as booking confirmations and reminders</li>
                <li>To communicate with you about your account or transactions</li>
                <li>To send you marketing communications, subject to your preferences</li>
                <li>To facilitate communication between clients and service providers</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Safety and Security</h3>
              <ul>
                <li>To verify your identity</li>
                <li>To detect and prevent fraud, spam, abuse, and other harmful activities</li>
                <li>To enforce our Terms of Service and other policies</li>
                <li>To protect the safety and security of our users and Services</li>
                <li>To debug and fix issues with our Services</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Legal Compliance</h3>
              <ul>
                <li>To comply with applicable laws, regulations, and legal processes</li>
                <li>To respond to lawful requests from public and governmental authorities</li>
                <li>To protect our rights, privacy, safety, or property, or that of our users or others</li>
              </ul>
            </div>
          </section>

          <section id="sharing">
            <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
            <div className="prose max-w-none">
              <p>We may share your information with the following categories of recipients:</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Other Users</h3>
              <p>
                When you use our Services, certain information may be visible to other users:
              </p>
              <ul>
                <li>If you are a service provider, your profile information, services, availability, pricing, ratings, and reviews may be visible to clients.</li>
                <li>If you are a client, your name, profile photo, and booking details may be shared with service providers you book.</li>
                <li>Public reviews and ratings you submit may be visible to all users.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Service Providers and Business Partners</h3>
              <p>
                We may share your information with third-party service providers and business partners who help us deliver our Services, such as:
              </p>
              <ul>
                <li>Payment processors to facilitate transactions</li>
                <li>Cloud storage providers to store your information</li>
                <li>Analytics providers to help us understand how users interact with our Services</li>
                <li>Marketing partners to help us promote our Services</li>
                <li>Customer support providers to assist with user inquiries</li>
                <li>Identity verification services to verify user identities</li>
              </ul>
              <p>
                These service providers are contractually obligated to use your information only as necessary to provide services to us and in accordance with this Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Legal Requirements</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests from public authorities (e.g., a court or government agency). We may also disclose your information to:
              </p>
              <ul>
                <li>Enforce our Terms of Service and other agreements</li>
                <li>Protect and defend our rights or property</li>
                <li>Prevent or investigate possible wrongdoing in connection with our Services</li>
                <li>Protect the personal safety of users of our Services or the public</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.4 Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, financing, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Services of any change in ownership or uses of your information, as well as any choices you may have regarding your information.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.5 With Your Consent</h3>
              <p>
                We may share your information with third parties when you have given us your consent to do so.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.6 Aggregated or De-identified Data</h3>
              <p>
                We may share aggregated or de-identified information, which cannot reasonably be used to identify you, with third parties for research, marketing, analytics, and other purposes.
              </p>
            </div>
          </section>

          <section id="choices">
            <h2 className="text-2xl font-bold mb-4">5. Your Choices and Rights</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Account Information</h3>
              <p>
                You can review and update your account information by logging into your account settings. If you need assistance, please contact our customer support.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Communication Preferences</h3>
              <p>
                You can opt out of receiving promotional emails from us by following the unsubscribe instructions in those emails. You may not opt out of service-related communications (e.g., booking confirmations, payment receipts, and account notifications) that are necessary for the functioning of our Services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Location Information</h3>
              <p>
                You can control whether we collect precise location information through your device settings. However, disabling location services may limit your ability to use certain features of our Services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Cookies and Tracking Technologies</h3>
              <p>
                Most web browsers are set to accept cookies by default. You can usually change your browser settings to remove or reject cookies. Please note that removing or rejecting cookies could affect the availability and functionality of our Services.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5.5 Data Subject Rights</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li><strong>Access:</strong> You may request access to the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You may request that we correct inaccurate or incomplete information about you.</li>
                <li><strong>Deletion:</strong> You may request that we delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You may request that we restrict the processing of your personal information in certain circumstances.</li>
                <li><strong>Data Portability:</strong> You may request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Objection:</strong> You may object to our processing of your personal information in certain circumstances.</li>
                <li><strong>Withdrawal of Consent:</strong> You may withdraw your consent at any time where we rely on consent to process your personal information.</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below. Please note that these rights may be limited in some circumstances, as provided by applicable laws.
              </p>
            </div>
          </section>

          <section id="security">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <div className="prose max-w-none">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, destruction, or damage. These measures include encryption, access controls, regular security assessments, and employee training.
              </p>
              <p>
                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security. If you have reason to believe that your interaction with us is no longer secure, please contact us immediately.
              </p>
            </div>
          </section>

          <section id="retention">
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <div className="prose max-w-none">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
              </p>
              <ul>
                <li>The length of time we have an ongoing relationship with you and provide our Services to you</li>
                <li>Whether there is a legal obligation to which we are subject</li>
                <li>Whether retention is advisable in light of our legal position (e.g., in connection with statutes of limitations, litigation, or regulatory investigations)</li>
              </ul>
              <p>
                When we no longer need to use your personal information, we will either delete it or anonymize it so that it can no longer be associated with you.
              </p>
            </div>
          </section>

          <section id="international">
            <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
            <div className="prose max-w-none">
              <p>
                We may transfer your personal information to countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. However, we will take appropriate measures to ensure that any such transfers comply with applicable data protection laws and that your personal information remains protected according to the standards described in this Privacy Policy.
              </p>
              <p>
                By using our Services, you consent to the transfer of your personal information to countries outside your country of residence, including the United States, where our primary servers are located.
              </p>
            </div>
          </section>

          <section id="children">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <div className="prose max-w-none">
              <p>
                Our Services are not directed to children under the age of 18, and we do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information as quickly as possible. If you believe that we might have any information from or about a child under 18, please contact us immediately.
              </p>
            </div>
          </section>

          <section id="changes">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <div className="prose max-w-none">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website and changing the "Last Updated" date at the top of this policy.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about our data practices. Your continued use of our Services after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <div className="prose max-w-none">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Neza, Inc.</strong><br />
                123 Main Street<br />
                San Francisco, CA 94105<br />
                United States<br />
                <a href="mailto:privacy@neza.com" className="text-primary hover:underline">privacy@neza.com</a><br />
                Phone: +1 (555) 123-4567
              </p>
              <p className="mt-4">
                For users in the European Union, we have appointed a data protection officer who can be contacted at <a href="mailto:dpo@neza.com" className="text-primary hover:underline">dpo@neza.com</a>.
              </p>
              <p className="mt-4">
                We will respond to your request within a reasonable timeframe and in accordance with applicable data protection laws.
              </p>
            </div>
          </section>
        </div>

        {/* Additional Resources Section */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
              <p className="mb-4">Review our Terms of Service to understand the rules governing the use of our platform.</p>
              <Button asChild variant="outline">
                <Link href="/terms">View Terms of Service</Link>
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p className="mb-4">Have questions or need assistance with privacy-related matters?</p>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}