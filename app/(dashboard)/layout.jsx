import React from "react"
import { UserDashboardNav } from "@/components/NavBar/UserDashboardNav"
import HomeNavBar from "@/components/NavBar/HomeNavBar"

export default function UserDashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-background">
			{/* <UserDashboardNav /> */}
			<HomeNavBar />
			<div className="pt-20">{children}</div>
		</div>
	)
}
