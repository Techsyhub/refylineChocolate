'use client';

import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32">
      {/* chocolate background */}
      <div className="bg-cocoa text-cream py-16 px-6 md:px-20 rounded-t-3xl">

        {/* logo */}
        <div className="flex justify-center mb-10">
          <img 
            src="/logo.png" 
            alt="Refyline Logo" 
            className="h-150 w-auto "
          />
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Policies */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Policies</h3>
            <a href="#" className="block hover:text-gold">Terms & Conditions</a>
            <a href="#" className="block hover:text-gold">Privacy Policy</a>
            <a href="#" className="block hover:text-gold">Refund Policy</a>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Contact</h3>
            <a href="mailto:hello@refyline.com" className="block hover:text-gold">
              hello@refyline.com
            </a>
            <a href="https://wa.me/923000000000" className="flex justify-center md:justify-start items-center gap-2 hover:text-gold">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>

          {/* Social Icons */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Follow us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-gold"><Instagram size={22} /></a>
              <a href="#" className="hover:text-gold"><Facebook size={22} /></a>
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-cream/80 mt-12">
          © {new Date().getFullYear()} Refyline — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
