import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BirthdaySkeleton() {
	return (
		<Card className="group overflow-hidden bg-white dark:bg-card">
			{/* Image Placeholder */}
			<div className="relative">
				<Skeleton className="w-full h-48" />
				<Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-md" />
				<Skeleton className="absolute top-3 right-3 h-5 w-5 rounded-full" />
				<Skeleton className="absolute bottom-3 right-3 h-5 w-20 rounded-md" />
			</div>

			<CardContent className="px-6 pt-3 space-y-3">
				<Skeleton className="h-6 w-3/4" /> {/* Title */}
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />

				{/* Price and Discount */}
				<div className="flex items-center justify-between">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-6 w-16" />
				</div>

				{/* Age & Rating */}
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-16" />
				</div>

				{/* Features */}
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-4 w-2/3" />

				{/* Button */}
				<Skeleton className="h-10 w-full rounded-md mt-4" />
			</CardContent>
		</Card>
	)
}
