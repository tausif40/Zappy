"use client"

import type React from "react";
import Home from "@/components/Home/Home";
import HomeNavBar from "@/components/NavBar/HomeNavBar";

function page() {
  return (
    <>
      <HomeNavBar />
      <Home />
    </>
  )
}

export default page