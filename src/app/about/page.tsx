import { Suspense } from 'react';
import { AboutContent } from '@/components/about-content';

export default function AboutPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <AboutContent />
    </Suspense>
  );
}
