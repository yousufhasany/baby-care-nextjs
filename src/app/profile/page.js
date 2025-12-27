"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Try to get user from localStorage (set after login)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}
