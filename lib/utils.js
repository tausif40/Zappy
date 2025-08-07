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