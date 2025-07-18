
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Reach out with any questions or for custom orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
             <form className="space-y-4">
               <div>
                 <Label htmlFor="name">Full Name</Label>
                 <Input id="name" type="text" placeholder="Your Name" />
               </div>
                <div>
                 <Label htmlFor="email">Email Address</Label>
                 <Input id="email" type="email" placeholder="you@example.com" />
               </div>
               <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={6} />
               </div>
               <Button type="submit" className="w-full">Send Message</Button>
             </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 rounded-lg bg-secondary p-8">
            <h2 className="text-2xl font-semibold">Our Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:support@naijaluxe.com" className="hover:text-primary">support@naijaluxe.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="ml-4">
                  <h3 className="font-semibold text-foreground">Phone (WhatsApp)</h3>
                  <a href="tel:+2348012345678" className="hover:text-primary">+234 801 234 5678</a>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              For custom tailoring inquiries, please reach out via WhatsApp for the quickest response. We look forward to crafting your unique piece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
