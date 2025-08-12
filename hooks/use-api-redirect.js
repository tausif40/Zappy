import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { setRedirectHandler } from '../lib/apiClient';

/**
 * Custom hook to set up API redirect handler for 401 responses
 * This prevents page reload when redirecting to login page
 */
export const useApiRedirect = () => {
	const router = useRouter();

	const handleRedirect = useCallback((path) => {
		try {
			console.log(`Redirecting to: ${path}`);
			router.push(path);
		} catch (error) {
			console.error('Error during redirect:', error);
			// Fallback to window.location if router.push fails
			if (typeof window !== 'undefined') {
				window.location.href = path;
			}
		}
	}, [ router ]);

	useEffect(() => {
		// Set the redirect handler to use Next.js router
		setRedirectHandler(handleRedirect);

		// Cleanup function to remove the handler when component unmounts
		return () => {
			setRedirectHandler(null);
		};
	}, [ handleRedirect ]);

	return null;
};
