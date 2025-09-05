"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


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
    <>
     
    </>
  );
};

export default AuthForm;