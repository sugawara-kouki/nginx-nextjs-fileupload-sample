'use client';

import { ImageUploader } from '@/app/components/ImageUploader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <ImageUploader />
    </main>
  );
}