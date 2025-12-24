// app/(legal)/terms-conditions/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Refyline",
  description:
    "Read Refyline's Terms & Conditions regarding purchases, shipping, refunds, and product information.",
};

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-cocoa text-[#2d1a10]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#d4a657] text-center">
          Terms & Conditions
        </h1>
        <p className="text-center text-[#f5efe9] mt-4">
          Last Updated: December 2025
        </p>
      </div>

      {/* Content Card */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#fbf8f3] rounded-3xl shadow-xl p-8 md:p-12 space-y-10">
          {/* Intro */}
          <p className="text-lg leading-relaxed text-[#3b2317]">
            Welcome to <strong>Refyline</strong>. By accessing our website and
            purchasing our NutriBites, you agree to be bound by the following
            terms and conditions. Please read them carefully.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              1. General Conditions
            </h2>
            <p className="leading-relaxed">
              By using this site, you represent that you are at least the age of
              majority in your country of residence. We reserve the right to
              refuse service to anyone for any reason at any time.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              2. Product Information & Melting Disclaimer
            </h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>
                Refyline NutriBites are handcrafted, premium chocolate-based
                products.
              </li>
              <li>
                <strong>Temperature Sensitivity:</strong> Due to the nature of
                high-quality cocoa and natural ingredients, our products are
                sensitive to heat.
              </li>
              <li>
                <strong>Storage:</strong> Upon receiving your order, please store
                it in a cool, dry place immediately.
              </li>
              <li>
                <strong>Disclaimer:</strong> We are not responsible for melting
                caused by improper storage after delivery or extreme weather
                during transit.
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              3. No Refund & No Return Policy
            </h2>
            <p className="leading-relaxed">
              Due to the perishable nature of food products and hygiene
              standards:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>All sales are final.</li>
              <li>No refunds, returns, or exchanges are offered.</li>
              <li>
                Please ensure all shipping details are correct before checkout.
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              4. Shipping & Delivery
            </h2>
            <p className="leading-relaxed">
              We deliver nationwide across Pakistan. Delivery timelines are
              estimates and not guaranteed. Refyline is not liable for delays
              caused by courier services or unforeseen logistical issues. It
              takes usually 4 to 7 days to deliver order.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              5. Health Disclaimer
            </h2>
            <p className="leading-relaxed">
              While our NutriBites support healthy indulgence (including PCOS,
              hormonal balance, and diabetic-friendly options), they are food
              products—not medical treatments. Avoid taking these chocolates if you 
              are alergic to any ingredients mentioned in the ingredient section
              such as nuts and dryfruits. Always consult your healthcare
              provider for dietary advice.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              6. Price & Product Modifications
            </h2>
            <p className="leading-relaxed">
              Prices and product availability are subject to change without
              notice. We reserve the right to modify or discontinue any product
              or bundle at any time.
            </p>
          </div>

          {/* Contact */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-[#7a4a2e] mb-2">
              Contact Us
            </h2>
            <p>
              For any questions regarding these Terms & Conditions, please
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
