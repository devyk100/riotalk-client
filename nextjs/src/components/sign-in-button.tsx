"use client"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "./ui/button";
import axios from "axios"
export default function SignInButton() {
    return (<>
        <Button onClick={() => {
            window.location.href = "http://localhost:8080/auth/google/initiate";
        }}>Sign In </Button>
    </>)
}