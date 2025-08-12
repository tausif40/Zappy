import React, { Suspense } from 'react'
import Login from '@/components/Login/Login'
import HomeNavBar from "@/components/NavBar/HomeNavBar"

function page() {
	return (
		<>
			<HomeNavBar />
			<Suspense fallback={<div></div>}>
				<Login />
			</Suspense>
		</>
	)
}

export default page