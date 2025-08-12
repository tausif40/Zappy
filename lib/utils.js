import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getQueryParams = (filterData) => {
	const queryParams = new URLSearchParams();

	Object.entries(filterData).forEach(([ key, value ]) => {
		if (Array.isArray(value)) {
			queryParams.append(key, value.join(","));
		} else if (value !== undefined && value !== null && value !== '') {
			queryParams.append(key, value);
		}
	});
	return queryParams.toString();
};

export const getDiscountedPrice = (price, discount) => {
	if (!price || !discount) return price;

	const discountedPrice = price - (price * discount) / 100;
	return Math.round(discountedPrice);
}

export const storeReturnUrl = () => {
	if (typeof window !== 'undefined') {
		const currentPath = window.location.pathname + window.location.search;
		localStorage.setItem('returnTo', currentPath);
		console.log('Stored return URL:', currentPath);
		return currentPath;
	}
	return null;
};

export const getAndClearReturnUrl = () => {
	if (typeof window !== 'undefined') {
		const returnTo = localStorage.getItem('returnTo');
		if (returnTo) {
			localStorage.removeItem('returnTo');
			return returnTo;
		}
	}
	return null;
};

export const isAuthenticated = () => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token') || document.cookie.includes('token=');
		return !!token;
	}
	return false;
};