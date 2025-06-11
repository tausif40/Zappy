import React from 'react'
import Products from '@/components/Products/Products'
import HomeNavBar from "@/components/NavBar/HomeNavBar"

function page() {
	return (
		<>
			<HomeNavBar />
			<Products />
		</>
	)
}

export default page