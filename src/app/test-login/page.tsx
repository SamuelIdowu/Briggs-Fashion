'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@briggsfashion.com');
  const [password, setPassword] = useState('admin123');
  const [result, setResult] = useState('');
  const { login, user, isAuthenticated } = useAuth();

  const handleTestLogin = async () => {
    setResult('Testing login...');
    try {
      const success = await login(email, password);
      setResult(success ? '✅ Login successful!' : '❌ Login failed');
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Login Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleTestLogin}>Test Login</Button>
            <div className="p-4 bg-gray-100 rounded">
              <strong>Result:</strong> {result}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Auth State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div><strong>Is Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</div>
              {user && (
                <div>
                  <strong>User:</strong>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 