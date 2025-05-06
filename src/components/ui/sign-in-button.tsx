"use client"
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios"
import { Button } from "./button";
export default function SignInButton() {
    return (<>
        <Button onClick={() => {
            window.location.href = "http://localhost:8080/auth/google/initiate";
        }}>Sign In </Button>
    </>)
}