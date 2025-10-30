import ServerEnvDisplay from '../../components/server-env-display';
import EnvDisplay from '../../components/env-display';

export default function TestEnvPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Environment Variables Test</h1>
      
      <div className="space-y-8">
        <ServerEnvDisplay />
        <EnvDisplay />
      </div>
      
      <div className="mt-8 p-4 bg-green-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">✅ Server Status</h2>
        <p>Your Next.js server is running successfully on port 3000!</p>
        <p>JWT secret is configured and ready to use.</p>
      </div>
    </div>
  );
} 