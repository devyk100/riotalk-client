import { DarkModeToggle } from "@/components/dark-mode-toggle";
import SignInButton from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      Hello 
      <Button>Hello</Button>
      <DarkModeToggle />
      <SignInButton/>
    </div>
  );
}
