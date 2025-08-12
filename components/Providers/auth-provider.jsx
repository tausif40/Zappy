"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { useApiRedirect } from "@/hooks/use-api-redirect";

const AuthProvider = ({ children }) => {
  // Set up API redirect handler for 401 responses
  useApiRedirect();

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
