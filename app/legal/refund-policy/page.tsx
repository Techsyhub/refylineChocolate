// app/(legal)/refund-policy/page.tsx
import { CONTACT_EMAIL } from "@/app/constants/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Refyline",
  description:
    "Understand Refyline’s refund, return, and exchange policies for NutriBites and bundles.",
};

export default function RefundPolicyPage() {
  return (
    <section className="bg-cocoa text-[#2d1a10]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#d4a657] text-center">
          Refund Policy
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
            At <strong>Refyline</strong>, we take pride in crafting premium,
            handcrafted NutriBites. Due to the nature of our products, please
            review our refund policy carefully before making a purchase.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              No Refunds, Returns, or Exchanges
            </h2>
            <p className="leading-relaxed">
              Because Refyline products are perishable food items and fall under
              hygiene-sensitive goods:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>All purchases are final.</li>
              <li>
                We do not offer refunds, returns, or exchanges once an order has
                been dispatched.
              </li>
              <li>
                Orders cannot be canceled after confirmation or dispatch.
              </li>
            </ul>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              Damaged or Incorrect Orders
            </h2>
            <p className="leading-relaxed">
              While we carefully package all orders, if you receive:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>The wrong product</li>
              <li>Severely damaged packaging upon arrival</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Please make an unboxing video of parcel and contact us within <strong>24 hours</strong> of delivery
              with clear photos of the package. Each case will be reviewed
              individually.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              Melting Disclaimer
            </h2>
            <p className="leading-relaxed">
              Our NutriBites are made using real cocoa and natural ingredients,
              making them sensitive to heat. We are not responsible for melting
              caused by:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>High temperatures during transit</li>
              <li>Delivery delays beyond our control</li>
              <li>Improper storage after delivery</li>
            </ul>
            <p className="leading-relaxed">
            Therefore we suggest to store at cool place upto 1 to 2hr before use for best experience.
            its shelf life is 2 to 3 months minimum if we store at refrigerator.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7a4a2e] mb-3">
              Shipping Issues
            </h2>
            <p className="leading-relaxed">
              Refyline is not liable for courier delays, incorrect addresses
              provided at checkout, or unsuccessful delivery attempts due to
              customer unavailability.
            </p>
          </div>

          {/* Contact */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-[#7a4a2e] mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions regarding this Refund Policy, please
              reach out to us at{" "}
              <a
                href="mailto:official@refyline.com"
                className="text-[#b88a44] underline"
              >
               {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
