import React from 'react'
import CuratedEvent from '@/components/Events/CuratedEvent/CuratedEvent'
import HomeNavBar from "@/components/NavBar/HomeNavBar"

function page() {
	return (
		<>
			<HomeNavBar />
			<CuratedEvent />
		</>
	)
}

export default page