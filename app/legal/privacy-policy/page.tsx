// app/(legal)/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Refyline",
  description:
    "Learn how Refyline collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-cocoa text-[#2d1a10]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#d4a657] text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-[#f5efe9] mt-4">
          Last Updated: December 2025
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#fbf8f3] rounded-3xl shadow-xl p-8 md:p-12 space-y-10">
          {/* Intro */}
          <p className="text-lg leading-relaxed text-[#3b2317]">
            At <strong>Refyline</strong>, we value your trust and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect basic information that you voluntarily provide during
              checkout or account creation, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Shipping and billing address</li>
              <li>Email address (for order updates and newsletters)</li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              2. Why We Collect This Data
            </h2>
            <p className="leading-relaxed">
              We use your information solely to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide a better, faster, and personalized shopping experience</li>
              <li>Process and deliver your orders accurately</li>
              <li>
                Share important brand updates and special bundle offers (if
                subscribed)
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              3. Payment Security (No Card Storage)
            </h2>
            <p className="leading-relaxed">
              Your security is our priority.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                We do <strong>not</strong> store credit card, debit card, or bank
                account details on our servers.
              </li>
              <li>
                All payments are processed via secure, third-party encrypted
                payment gateways.
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              4. Data Protection
            </h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your
              personal data. We do not sell, trade, or transfer your personally
              identifiable information to external parties.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              5. Cookies
            </h2>
            <p className="leading-relaxed">
              Our website uses cookies to enhance user experience, remember cart
              items, and analyze site usage. You may disable cookies through
              your browser settings at any time.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              6. Third-Party Links
            </h2>
            <p className="leading-relaxed">
              Occasionally, we may include links to third-party products or
              services. These websites have independent privacy policies, and
              Refyline holds no responsibility for their content or practices.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              7. Your Consent
            </h2>
            <p className="leading-relaxed">
              By using our website, you consent to this Privacy Policy.
            </p>
          </div>

          {/* Contact */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-[#7a4a2e] mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:official@refyline.com"
                className="text-[#b88a44] underline"
              >
                official@refyline.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
