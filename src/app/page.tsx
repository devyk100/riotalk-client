'use client';
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <div className="flex gap-2 flex-col">
        <div className="text-2xl font-semibold">
          In progress....
        </div>
        <div>
          Checkout Custom Auth (Google): <Button onClick={() => router.push('/login')}>Log In</Button>
        </div>
        <div>
          After logging in you can check <Button onClick={() => router.push("/chat")}>Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
