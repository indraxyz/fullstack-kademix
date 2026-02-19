"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "08977774077";
const WHATSAPP_LINK = `https://wa.me/62${WHATSAPP_NUMBER.replace(/\s/g, "").replace(/^0/, "")}`;

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Get in Touch
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Have questions? Contact us on WhatsApp — we&apos;re happy to help.
        </p>
        <Button
          size="lg"
          variant="secondary"
          asChild
          className="shadow-lg hover:shadow-xl gap-2"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp 0897 7774 077
          </a>
        </Button>
      </div>
    </section>
  );
}
