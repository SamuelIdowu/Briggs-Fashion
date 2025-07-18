import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppFAB } from '@/components/whatsapp-fab';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <WhatsAppFAB />
    </>
  );
}
