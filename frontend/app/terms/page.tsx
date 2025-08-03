'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last Updated: June 15, 2023
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><a href="#acceptance" className="text-primary hover:underline">Acceptance of Terms</a></li>
            <li><a href="#definitions" className="text-primary hover:underline">Definitions</a></li>
            <li><a href="#account" className="text-primary hover:underline">Account Registration and Requirements</a></li>
            <li><a href="#services" className="text-primary hover:underline">Services and Bookings</a></li>
            <li><a href="#payments" className="text-primary hover:underline">Payments and Fees</a></li>
            <li><a href="#cancellations" className="text-primary hover:underline">Cancellations and Refunds</a></li>
            <li><a href="#conduct" className="text-primary hover:underline">User Conduct and Prohibited Activities</a></li>
            <li><a href="#content" className="text-primary hover:underline">User Content</a></li>
            <li><a href="#intellectual" className="text-primary hover:underline">Intellectual Property Rights</a></li>
            <li><a href="#privacy" className="text-primary hover:underline">Privacy and Data Protection</a></li>
            <li><a href="#liability" className="text-primary hover:underline">Limitation of Liability</a></li>
            <li><a href="#indemnification" className="text-primary hover:underline">Indemnification</a></li>
            <li><a href="#termination" className="text-primary hover:underline">Term and Termination</a></li>
            <li><a href="#modifications" className="text-primary hover:underline">Modifications to Terms</a></li>
            <li><a href="#governing" className="text-primary hover:underline">Governing Law and Dispute Resolution</a></li>
            <li><a href="#miscellaneous" className="text-primary hover:underline">Miscellaneous Provisions</a></li>
          </ol>
        </div>

        {/* Terms Content */}
        <div className="space-y-10">
          <section id="acceptance">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <div className="prose max-w-none">
              <p>
                Welcome to Neza, a platform that connects service providers with clients seeking various services. By accessing or using our website, mobile applications, or any other services provided by Neza (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Neza regarding your use of the Services. You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet all eligibility requirements.
              </p>
            </div>
          </section>

          <section id="definitions">
            <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
            <div className="prose max-w-none">
              <p>In these Terms, the following definitions apply:</p>
              <ul>
                <li><strong>"Neza,"</strong> "we," "us," or "our" refers to Neza, Inc., the company that operates the platform.</li>
                <li><strong>"User,"</strong> "you," or "your" refers to any individual or entity that accesses or uses our Services.</li>
                <li><strong>"Client"</strong> refers to a User who books or purchases services through our platform.</li>
                <li><strong>"Service Provider"</strong> refers to a User who offers and provides services through our platform.</li>
                <li><strong>"Content"</strong> refers to all text, images, videos, reviews, information, or other materials that Users upload, post, or share on our platform.</li>
                <li><strong>"Booking"</strong> refers to the arrangement made between a Client and a Service Provider for the provision of services.</li>
              </ul>
            </div>
          </section>

          <section id="account">
            <h2 className="text-2xl font-bold mb-4">3. Account Registration and Requirements</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
              <p>
                To use certain features of our Services, you must create an account. When you create an account, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Service Provider Verification</h3>
              <p>
                If you register as a Service Provider, you may be required to undergo a verification process, which may include providing identification documents, professional certifications, or other information as requested by Neza. You consent to our verification of your information with third parties as necessary.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Account Security</h3>
              <p>
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security. Neza will not be liable for any losses caused by unauthorized use of your account. You may be liable for the losses of Neza or others due to such unauthorized use.
              </p>
            </div>
          </section>

          <section id="services">
            <h2 className="text-2xl font-bold mb-4">4. Services and Bookings</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Platform Services</h3>
              <p>
                Neza provides a platform that enables Clients to discover, book, and pay for services offered by Service Providers. Neza is not a provider of the services listed on our platform and is not responsible for the acts or omissions of any Service Provider or Client.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Booking Process</h3>
              <p>
                When a Client books a service through our platform, a direct contractual relationship is created between the Client and the Service Provider. Neza is not a party to this contract but facilitates the transaction by providing the platform, processing payments, and offering support services.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Service Quality</h3>
              <p>
                While we strive to ensure high-quality services on our platform, Neza does not guarantee the quality, safety, or legality of services offered by Service Providers. Clients are encouraged to review Service Provider profiles, ratings, and reviews before booking services.
              </p>
            </div>
          </section>

          <section id="payments">
            <h2 className="text-2xl font-bold mb-4">5. Payments and Fees</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Payment Processing</h3>
              <p>
                Payments for services booked through our platform are processed by Neza or its authorized payment processors. By using our payment services, you agree to comply with all applicable payment terms and provide accurate payment information.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Service Fees</h3>
              <p>
                Neza charges Service Providers a commission fee for each completed booking. The fee structure is available in the Service Provider dashboard and may be updated from time to time. Clients may also be charged service fees, which will be clearly displayed before confirming a booking.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Taxes</h3>
              <p>
                Service Providers are responsible for determining and fulfilling their tax obligations related to the services they provide. Clients may be required to pay applicable taxes as part of their booking. Neza may collect and remit taxes as required by law.
              </p>
            </div>
          </section>

          <section id="cancellations">
            <h2 className="text-2xl font-bold mb-4">6. Cancellations and Refunds</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Cancellation Policies</h3>
              <p>
                Service Providers may set their own cancellation policies, which will be displayed to Clients before booking. Clients agree to abide by these policies when making a booking. Neza reserves the right to enforce minimum cancellation standards to ensure fairness on the platform.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Refund Process</h3>
              <p>
                Refunds are processed according to the applicable cancellation policy. In case of disputes, Neza may mediate between the Client and Service Provider but reserves the right to make the final decision regarding refunds.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Service Issues</h3>
              <p>
                If a Client experiences issues with a service that does not meet the described standards, they should report the problem to Neza within 48 hours of service completion. Neza will investigate and may issue refunds or credits at its discretion.
              </p>
            </div>
          </section>

          <section id="conduct">
            <h2 className="text-2xl font-bold mb-4">7. User Conduct and Prohibited Activities</h2>
            <div className="prose max-w-none">
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul>
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating any person or entity</li>
                <li>Harassing, threatening, or intimidating any other User</li>
                <li>Posting false, misleading, or deceptive content</li>
                <li>Attempting to circumvent any security features of our Services</li>
                <li>Using our Services for any illegal or unauthorized purpose</li>
                <li>Interfering with or disrupting the operation of our Services</li>
                <li>Scraping, data mining, or otherwise collecting data from our Services without permission</li>
                <li>Creating multiple accounts for abusive purposes</li>
                <li>Engaging in any activity that could damage the reputation of Neza</li>
              </ul>
              <p>
                Neza reserves the right to investigate and take appropriate action against any User who violates these provisions, including removing content, suspending or terminating accounts, and reporting to law enforcement authorities.
              </p>
            </div>
          </section>

          <section id="content">
            <h2 className="text-2xl font-bold mb-4">8. User Content</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Content Ownership</h3>
              <p>
                You retain ownership of any Content you post on our platform. By posting Content, you grant Neza a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such Content for the purpose of providing and promoting our Services.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Content Responsibility</h3>
              <p>
                You are solely responsible for any Content you post on our platform. You represent and warrant that you have all necessary rights to post such Content and that it does not violate these Terms or any applicable laws.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Content Monitoring</h3>
              <p>
                Neza reserves the right, but not the obligation, to monitor, edit, or remove any Content that violates these Terms or is otherwise objectionable. We may also disclose information as necessary to satisfy any law, regulation, or governmental request.
              </p>
            </div>
          </section>

          <section id="intellectual">
            <h2 className="text-2xl font-bold mb-4">9. Intellectual Property Rights</h2>
            <div className="prose max-w-none">
              <p>
                The Services, including all content, features, and functionality, are owned by Neza, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as permitted by these Terms or with our prior written consent.
              </p>
              <p>
                The Neza name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Neza or its affiliates. You may not use such marks without our prior written permission.
              </p>
            </div>
          </section>

          <section id="privacy">
            <h2 className="text-2xl font-bold mb-4">10. Privacy and Data Protection</h2>
            <div className="prose max-w-none">
              <p>
                Our Privacy Policy, available at <Link href="/privacy" className="text-primary hover:underline">neza.com/privacy</Link>, describes how we collect, use, and share information about you when you use our Services. By using our Services, you consent to our collection and use of your information as described in the Privacy Policy.
              </p>
              <p>
                You acknowledge that you are responsible for ensuring that your use of our Services complies with all applicable data protection and privacy laws.
              </p>
            </div>
          </section>

          <section id="liability">
            <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
            <div className="prose max-w-none">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEZA AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul>
                <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;</li>
                <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;</li>
                <li>ANY CONTENT OBTAINED FROM THE SERVICES; AND</li>
                <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT,</li>
              </ul>
              <p>
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
              <p>
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO NEZA DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
              </p>
            </div>
          </section>

          <section id="indemnification">
            <h2 className="text-2xl font-bold mb-4">12. Indemnification</h2>
            <div className="prose max-w-none">
              <p>
                You agree to indemnify, defend, and hold harmless Neza and its officers, directors, employees, agents, affiliates, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from:
              </p>
              <ul>
                <li>Your violation of these Terms;</li>
                <li>Your violation of any rights of any other person or entity; or</li>
                <li>Your use or misuse of the Services.</li>
              </ul>
              <p>
                We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.
              </p>
            </div>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-bold mb-4">13. Term and Termination</h2>
            <div className="prose max-w-none">
              <p>
                These Terms shall remain in full force and effect while you use the Services. Neza may terminate or suspend your account and access to the Services at any time, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </section>

          <section id="modifications">
            <h2 className="text-2xl font-bold mb-4">14. Modifications to Terms</h2>
            <div className="prose max-w-none">
              <p>
                Neza reserves the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website or through other communications. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
              <p>
                It is your responsibility to review these Terms periodically for changes. If you do not agree to the modified Terms, you should discontinue your use of the Services.
              </p>
            </div>
          </section>

          <section id="governing">
            <h2 className="text-2xl font-bold mb-4">15. Governing Law and Dispute Resolution</h2>
            <div className="prose max-w-none">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              <p>
                Any dispute arising from or relating to these Terms or the Services shall first be attempted to be resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association.
              </p>
              <p>
                You agree that any arbitration shall be conducted on an individual basis and not in a class, consolidated, or representative action. Any claim must be brought in your individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding.
              </p>
            </div>
          </section>

          <section id="miscellaneous">
            <h2 className="text-2xl font-bold mb-4">16. Miscellaneous Provisions</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">16.1 Entire Agreement</h3>
              <p>
                These Terms, together with the Privacy Policy and any other agreements expressly incorporated by reference herein, constitute the entire agreement between you and Neza concerning your use of the Services.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">16.2 Waiver</h3>
              <p>
                No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and Neza's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">16.3 Severability</h3>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable for any reason, such provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable. If such modification is not possible, the relevant provision shall be deemed severed from these Terms, and the remaining provisions will continue in full force and effect.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">16.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms, by operation of law or otherwise, without Neza's prior written consent. Any attempt to assign or transfer these Terms without such consent will be null and void. Neza may assign or transfer these Terms, at its sole discretion, without restriction.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">16.5 Notices</h3>
              <p>
                Any notices or other communications provided by Neza under these Terms will be given by posting to the Services or by email to the address you provide during account registration.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="mb-6">
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@neza.com" className="text-primary hover:underline">legal@neza.com</a> or through our <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}