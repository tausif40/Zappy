import React from 'react'
import VenderNav from '@/components/NavBar/VenderNav'

function layout({ children }) {
	return (
		<>
			<VenderNav />
			{children}
		</>
	)
}

export default layout