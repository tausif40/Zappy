"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCurrentUrl() {
	const pathname = usePathname();
	const [ origin, setOrigin ] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setOrigin(window.location.origin);
		}
	}, []);

	return origin ? `${origin}${pathname}` : "";
}
