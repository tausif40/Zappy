import React from 'react'
import HomeNavBar from "@/components/NavBar/HomeNavBar"

function layout({ children }) {
	return (
		<>
			<HomeNavBar />
			{children}
		</>
	)
}

export default layout