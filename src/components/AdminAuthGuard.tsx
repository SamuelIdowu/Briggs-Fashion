"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/admin/login");
    }
    // Optionally: verify token with backend here
  }, [router]);

  return <>{children}</>;
} 