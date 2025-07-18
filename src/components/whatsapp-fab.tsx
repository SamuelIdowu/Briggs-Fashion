"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function WhatsAppFAB() {
  const businessNumber = "2348012345678"; // Replace with actual business number
  const message = "Hello Naija Luxe! I have a general question.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      aria-label="Chat on WhatsApp"
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <Icons.whatsapp className="h-8 w-8 fill-current" />
    </Button>
  );
}
