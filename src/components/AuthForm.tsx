"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";


const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
           className="px-4 py-2 bg-blue-500 text-white rounded"
         >
           Đăng nhập với Google
         </button>
  );
};

export default AuthForm;