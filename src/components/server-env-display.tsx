export default function ServerEnvDisplay() {
  // Server-side environment variables (all variables available)
  const serverEnvVars = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URI_PROD: process.env.MONGODB_URI_PROD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Server Environment Variables</h2>
      <pre className="bg-white p-4 rounded border overflow-auto">
        {JSON.stringify(serverEnvVars, null, 2)}
      </pre>
    </div>
  );
} 