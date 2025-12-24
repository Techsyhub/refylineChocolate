'use client';

import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_NO, FB_ACCOUNT, INSTAGRAM_ACCOUNT } from "../constants/main";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32">
      {/* chocolate background */}
      <div className="bg-cocoa text-cream pb-16 px-6 md:px-20 rounded-t-3xl">

        {/* logo */}
        <div className="flex justify-center ">
        <Link href={"/home"}>
          <img 
            src="/logo.png" 
            alt="Refyline Logo" 
            className="h-120 w-auto -mt-10 "
          />
        </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Policies */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Policies</h3>
            <a href="/legal/terms-and-conditions" className="block hover:text-gold">Terms & Conditions</a>
            <a href="/legal/privacy-policy" className="block hover:text-gold">Privacy & Policy</a>
            <a href="/legal/refund-policy" className="block hover:text-gold">Refund Policy</a>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Contact</h3>
            <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-gold">
              {CONTACT_EMAIL}
            </a>
            <a href={`https://wa.me/${CONTACT_NO}`} className="flex justify-center md:justify-start items-center gap-2 hover:text-gold">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>

          {/* Social Icons */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gold">Follow us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href={INSTAGRAM_ACCOUNT} target="_blank" className="hover:text-gold"><Instagram size={22} /></a>
              <a href={FB_ACCOUNT} target="_blank"  className="hover:text-gold"><Facebook size={22} /></a>
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
