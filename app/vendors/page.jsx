import React from 'react'
import VendorsList from '@/components/VendorsList/VendorsList'
import HomeNavBar from '@/components/NavBar/HomeNavBar'

function page() {
	return (
		<>
			<HomeNavBar />
			<VendorsList />
		</>
	)
}

export default page;