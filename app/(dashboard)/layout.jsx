import React from "react"
import { UserDashboardNav } from "@/components/NavBar/UserDashboardNav"

export default function UserDashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-background">
			<UserDashboardNav />
			<div className="pt-20">{children}</div>
		</div>
	)
}
