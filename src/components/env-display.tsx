'use client';

import { useEffect, useState } from 'react';

export default function EnvDisplay() {
  const [envVars, setEnvVars] = useState<any>(null);

  useEffect(() => {
    // Only NEXT_PUBLIC_ variables are available on client-side
    const publicEnvVars = {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    };

    setEnvVars(publicEnvVars);
  }, []);

  if (!envVars) return <div>Loading environment variables...</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Public Environment Variables</h2>
      <pre className="bg-white p-4 rounded border">
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
} 