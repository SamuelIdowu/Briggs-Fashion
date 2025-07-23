import Link from "next/link";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Icons.logo className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-foreground/60">The Essence of Nigerian Elegance.</p>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/products" className="text-foreground/60 hover:text-primary">All Products</Link></li>
                <li><Link href="/about" className="text-foreground/60 hover:text-primary">About Us</Link></li>
                <li><Link href="/size-guide" className="text-foreground/60 hover:text-primary">Size Guide</Link></li>
                <li><Link href="/contact" className="text-foreground/60 hover:text-primary">Contact Us</Link></li>
                <li><Link href="/admin" className="text-foreground/60 hover:text-primary">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Connect With Us</h3>
              <div className="flex items-center space-x-4 mt-4">
                 <Link href="#" className="text-foreground/60 hover:text-primary">
                    <span className="sr-only">Instagram</span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </Link>
                 <Link href="#" className="text-foreground/60 hover:text-primary">
                    <span className="sr-only">Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </Link>
                 <Link href="#" className="text-foreground/60 hover:text-primary">
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4.1-2.4.1c.7 2.3-1.3 4.8-3.2 6.3-1.5 1.2-3.4 1.9-5.2 1.9-1.2 0-2.3-.3-3.2-.8.5 1.8 2.6 3.2 5.2 3.2 2.7 0 5-1.4 6-3.2 1.2-2.2 1-5.2 1-5.2s-2.9.4-4.8 1.5c.3-1 .4-2.3.4-3.4 0-2.2-1-4-2.3-5.3-.8-.8-1.7-1.2-2.7-1.2-1.3 0-2.5.8-3.2 1.8.1-.1.3-.2.5-.2.4 0 .8.1 1.2.2-.4-.1-.8-.2-1.2-.2s-.8.1-1.2.2c-.4-.1-.8-.2-1.2-.2-.5 0-1 .1-1.4.3l.1-.1c-.3 0-.6.1-.9.2.2-.2.4-.3.6-.5.1-.1.2-.2.3-.3.1-.1.2-.2.2-.3.1-.2.2-.4.2-.6 0-.2-.1-.4-.2-.6 0-.1-.1-.2-.2-.3s-.1-.2-.2-.3c0-.1-.1-.1-.1-.2-.1-.1-.1-.1-.2-.2 0 0 0-.1-.1-.1-.3-.2-.6-.3-.9-.3s-.6.1-.9.2c-.3.1-.6.2-.8.4-.2.1-.4.3-.6.5-.2.2-.3.4-.5.6-.1.2-.2.4-.2.6s.1.4.2.6c.1.2.2.4.4.5.2.1.4.2.6.3l.1.1c.1.1.2.1.3.2 0 .1.1.1.1.2.1.1.1.1.2.2 0 .1.1.1.1.2.1.1.2.2.3.3.1.1.2.2.3.3s.2.2.3.3.2.2.3.3c.4.4.8.8 1.2 1.2.4.4.8.8 1.3 1.1s1 .6 1.6.8c.6.2 1.2.3 1.8.3.1 0 .3 0 .4-.1.1 0 .2 0 .3-.1.1 0 .2-.1.3-.1.3-.1.6-.2.9-.4.3-.2.6-.4.8-.6.5-.5.9-1.1 1.2-1.7.3-.7.5-1.4.5-2.2s-.1-1.5-.4-2.2c-.3-.7-.7-1.3-1.2-1.8-.5-.5-1.1-.9-1.7-1.2-.7-.3-1.4-.5-2.2-.5.1 0 .3 0 .4.1.1 0 .2.1.3.1.2.1.5.2.7.3.2.1.5.3.7.4.3.2.5.4.8.7.2.3.5.6.7.9.2.3.4.7.6 1 .2.4.3.8.4 1.2s.1.8.1 1.2-.1.8-.2 1.2-.2.8-.4 1.2-.3.8-.6 1.2c-1.8 2.2-4.5 3.5-7.5 3.5-1.5 0-2.8-.4-4-1.2-1.8-1.1-3-3-3.4-5.2-.1-.5-.1-1-.1-1.5 0-.1 0-.2.1-.3s.1-.2.2-.3c.1-.1.2-.2.3-.3.3-.3.6-.5.9-.7.3-.2.6-.4.9-.5s.6-.2.9-.2.6.1.9.2c.3.1.6.2.8.4.2.1.4.3.6.5.2.2.3.4.5.6.1.2.2.4.2.6s-.1.4-.2.6c-.1.2-.2-.4-.4-.5-.2-.1-.4-.2-.6-.3l-.1-.1c-.1-.1-.2-.1-.3-.2 0-.1-.1-.1-.1-.2-.1-.1-.1-.1-.2-.2 0 0 0 .1-.1.1-.1.1-.2.2-.3.3-.1.1-.2.2-.3.3-.1.1-.2.2-.2.3-.1.2-.2.4-.2.6 0 .2.1.4.2.6 0 .1.1.2.2.3s.1.2.2.3c0 .1.1.1.1.2.1.1.1.1.2.2 0 0 .1.1.1.1.3.2.6.3.9.3s.6-.1.9-.2c-.3-.1-.6-.2-.8-.4-.2-.1-.4-.3-.6-.5-.2-.2-.3-.4-.5-.6-.1-.2-.2-.4-.2-.6s.1-.4.2-.6c-.1-.2-.2-.4-.4-.5-.2-.1-.4-.2-.6-.3l-.1-.1c-.1-.1-.2-.1-.3-.2 0-.1-.1-.1-.1-.2-.1-.1-.1-.1-.2-.2l-.1-.1c-.3-.2-.6-.3-.9-.3s-.6.1-.9.2c-.3.1-.6.2-.8.4-.2.1-.4.3-.6.5-.2.2-.3.4-.5.6-.1.2-.2.4-.2-.6s.1-.4.2-.6c.1-.2.2-.4.4-.5.2-.1.4-.2.6-.3l.1-.1c.1-.1.2-.1.3-.2 0-.1.1-.1.1-.2.1-.1.1-.1.2-.2l.1-.1c.3-.2.6-.3.9-.3.2 0 .4 0 .6-.1.2 0 .4-.1.6-.1.2-.1.4-.2.6-.3.2-.1.4-.2.6-.4.2-.1.4-.3.5-.5.2-.2.3-.4.4-.6.1-.2.2-.5.2-.7s-.1-.5-.1-.7z"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-foreground/10 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Brigg's Fashion and Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
