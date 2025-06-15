"use client"
import { useState } from "react"
import {
	CreditCard,
	Calendar,
	CheckCircle,
	XCircle,
	Clock,
	Download,
	Eye,
	Search,
	Plus,
	Wallet,
	Building,
	Smartphone,
	RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserPayments() {
	const [ searchQuery, setSearchQuery ] = useState("")
	const [ statusFilter, setStatusFilter ] = useState("all")

	const paymentHistory = [
		{
			id: "PAY001",
			bookingId: "BK001",
			eventTitle: "Princess Theme Party",
			vendor: "Magic Moments Events",
			amount: 8999,
			status: "completed",
			method: "UPI",
			methodIcon: Smartphone,
			date: "2024-01-20",
			time: "3:45 PM",
			transactionId: "TXN123456789",
			refundable: false,
		},
		{
			id: "PAY002",
			bookingId: "BK002",
			eventTitle: "Science Explorer Workshop",
			vendor: "Curious Minds",
			amount: 7499,
			status: "completed",
			method: "Credit Card",
			methodIcon: CreditCard,
			date: "2024-01-18",
			time: "2:30 PM",
			transactionId: "TXN123456790",
			refundable: false,
		},
		{
			id: "PAY003",
			bookingId: "BK003",
			eventTitle: "Sports Adventure Camp",
			vendor: "Active Kids",
			amount: 8499,
			status: "pending",
			method: "Net Banking",
			methodIcon: Building,
			date: "2024-01-15",
			time: "11:20 AM",
			transactionId: "TXN123456791",
			refundable: true,
		},
		{
			id: "PAY004",
			bookingId: "BK004",
			eventTitle: "Art & Craft Workshop",
			vendor: "Creative Minds",
			amount: 5999,
			status: "failed",
			method: "Wallet",
			methodIcon: Wallet,
			date: "2024-01-10",
			time: "4:15 PM",
			transactionId: "TXN123456792",
			refundable: false,
		},
		{
			id: "PAY005",
			bookingId: "BK005",
			eventTitle: "Jungle Safari Party",
			vendor: "Wild Celebrations",
			amount: 7999,
			status: "refunded",
			method: "UPI",
			methodIcon: Smartphone,
			date: "2024-01-05",
			time: "1:10 PM",
			transactionId: "TXN123456793",
			refundable: false,
			refundAmount: 7999,
			refundDate: "2024-01-08",
		},
	]

	const paymentMethods = [
		{
			id: 1,
			type: "Credit Card",
			details: "**** **** **** 1234",
			brand: "Visa",
			expiry: "12/26",
			isDefault: true,
			icon: CreditCard,
		},
		{
			id: 2,
			type: "UPI",
			details: "priya@paytm",
			brand: "Paytm",
			isDefault: false,
			icon: Smartphone,
		},
		{
			id: 3,
			type: "Net Banking",
			details: "HDFC Bank",
			brand: "HDFC",
			isDefault: false,
			icon: Building,
		},
	]

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-700 border-green-200"
			case "pending":
				return "bg-yellow-100 text-yellow-700 border-yellow-200"
			case "failed":
				return "bg-red-100 text-red-700 border-red-200"
			case "refunded":
				return "bg-blue-100 text-blue-700 border-blue-200"
			default:
				return "bg-gray-100 text-gray-700 border-gray-200"
		}
	}

	const getStatusIcon = (status) => {
		switch (status) {
			case "completed":
				return <CheckCircle className="h-4 w-4" />
			case "pending":
				return <Clock className="h-4 w-4" />
			case "failed":
				return <XCircle className="h-4 w-4" />
			case "refunded":
				return <RefreshCw className="h-4 w-4" />
			default:
				return <Clock className="h-4 w-4" />
		}
	}

	const filteredPayments = paymentHistory.filter((payment) => {
		const matchesSearch =
			payment.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesStatus = statusFilter === "all" || payment.status === statusFilter
		return matchesSearch && matchesStatus
	})

	const totalSpent = paymentHistory.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

	const totalRefunded = paymentHistory
		.filter((p) => p.status === "refunded")
		.reduce((sum, p) => sum + (p.refundAmount || 0), 0)

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
						Payment History 💳
					</h1>
					<p className="text-muted-foreground">Track your payments and manage payment methods</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card className="border-0 shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground mb-1">Total Spent</p>
									<p className="text-2xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</p>
									<p className="text-xs text-muted-foreground">Lifetime</p>
								</div>
								<div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
									<CreditCard className="h-6 w-6 text-green-600" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-0 shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
									<p className="text-2xl font-bold text-blue-600">{paymentHistory.length}</p>
									<p className="text-xs text-muted-foreground">All time</p>
								</div>
								<div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
									<Calendar className="h-6 w-6 text-blue-600" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-0 shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground mb-1">Total Refunded</p>
									<p className="text-2xl font-bold text-purple-600">₹{totalRefunded.toLocaleString()}</p>
									<p className="text-xs text-muted-foreground">Lifetime</p>
								</div>
								<div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
									<RefreshCw className="h-6 w-6 text-purple-600" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Payment Tabs */}
				<Tabs defaultValue="history" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2 lg:w-96">
						<TabsTrigger value="history" className="flex items-center">
							<Calendar className="h-4 w-4 mr-2" />
							Payment History
						</TabsTrigger>
						<TabsTrigger value="methods" className="flex items-center">
							<CreditCard className="h-4 w-4 mr-2" />
							Payment Methods
						</TabsTrigger>
					</TabsList>

					<TabsContent value="history">
						{/* Filters */}
						<Card className="border-0 shadow-lg mb-6">
							<CardContent className="p-6">
								<div className="flex flex-col md:flex-row gap-4">
									<div className="flex-1">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
											<Input
												placeholder="Search payments..."
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
												className="pl-10"
											/>
										</div>
									</div>
									<Select value={statusFilter} onValueChange={setStatusFilter}>
										<SelectTrigger className="w-full md:w-48">
											<SelectValue placeholder="Filter by status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Status</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
											<SelectItem value="pending">Pending</SelectItem>
											<SelectItem value="failed">Failed</SelectItem>
											<SelectItem value="refunded">Refunded</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* Payment History */}
						<div className="space-y-4">
							{filteredPayments.map((payment) => (
								<Card key={payment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
									<CardContent className="p-6">
										<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
											<div className="flex items-start space-x-4">
												<div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
													<payment.methodIcon className="h-6 w-6" />
												</div>
												<div className="flex-1">
													<div className="flex items-center space-x-3 mb-2">
														<h3 className="font-semibold text-lg">{payment.eventTitle}</h3>
														<Badge className={`${getStatusColor(payment.status)} border`}>
															{getStatusIcon(payment.status)}
															<span className="ml-1 capitalize">{payment.status}</span>
														</Badge>
													</div>
													<p className="text-sm text-muted-foreground mb-2">by {payment.vendor}</p>
													<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
														<div>
															<span className="text-muted-foreground">Payment ID:</span>
															<div className="font-medium">{payment.id}</div>
														</div>
														<div>
															<span className="text-muted-foreground">Transaction ID:</span>
															<div className="font-medium font-mono text-xs">{payment.transactionId}</div>
														</div>
														<div>
															<span className="text-muted-foreground">Method:</span>
															<div className="font-medium">{payment.method}</div>
														</div>
														<div>
															<span className="text-muted-foreground">Date:</span>
															<div className="font-medium">
																{payment.date} at {payment.time}
															</div>
														</div>
													</div>
													{payment.status === "refunded" && payment.refundAmount && (
														<div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
															<div className="text-sm text-blue-700">
																<strong>Refunded:</strong> ₹{payment.refundAmount.toLocaleString()} on{" "}
																{payment.refundDate}
															</div>
														</div>
													)}
												</div>
											</div>
											<div className="flex flex-col lg:items-end space-y-3">
												<div className="text-right">
													<div className="text-2xl font-bold text-purple-600">₹{payment.amount.toLocaleString()}</div>
													<div className="text-sm text-muted-foreground">Booking: {payment.bookingId}</div>
												</div>
												<div className="flex space-x-2">
													<Button size="sm" variant="outline">
														<Eye className="h-3 w-3 mr-1" />
														View
													</Button>
													<Button size="sm" variant="outline">
														<Download className="h-3 w-3 mr-1" />
														Receipt
													</Button>
													{payment.refundable && (
														<Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
															Request Refund
														</Button>
													)}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="methods">
						<div className="grid md:grid-cols-2 gap-6">
							{/* Saved Payment Methods */}
							<div className="space-y-6">
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="flex items-center justify-between">
											<span>Saved Payment Methods</span>
											<Button
												size="sm"
												className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
											>
												<Plus className="h-3 w-3 mr-1" />
												Add New
											</Button>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{paymentMethods.map((method) => (
												<div
													key={method.id}
													className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
												>
													<div className="flex items-center space-x-4">
														<div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
															<method.icon className="h-5 w-5" />
														</div>
														<div>
															<div className="font-medium">{method.type}</div>
															<div className="text-sm text-muted-foreground">{method.details}</div>
															{method.expiry && (
																<div className="text-xs text-muted-foreground">Expires {method.expiry}</div>
															)}
														</div>
													</div>
													<div className="flex items-center space-x-2">
														{method.isDefault && (
															<Badge className="bg-green-100 text-green-700 border-green-200">Default</Badge>
														)}
														<Button size="sm" variant="outline">
															Edit
														</Button>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Payment Security */}
							<div className="space-y-6">
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle>Payment Security</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
												<CheckCircle className="h-5 w-5 text-green-600" />
												<div>
													<div className="font-medium text-green-700">SSL Encrypted</div>
													<div className="text-sm text-green-600">Your payments are secure</div>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
												<CheckCircle className="h-5 w-5 text-blue-600" />
												<div>
													<div className="font-medium text-blue-700">PCI Compliant</div>
													<div className="text-sm text-blue-600">Industry standard security</div>
												</div>
											</div>
											<div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
												<CheckCircle className="h-5 w-5 text-purple-600" />
												<div>
													<div className="font-medium text-purple-700">24/7 Monitoring</div>
													<div className="text-sm text-purple-600">Fraud protection active</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
									<CardContent className="p-6">
										<h3 className="font-semibold mb-3">Need Help?</h3>
										<div className="space-y-2 text-sm">
											<div>📞 Call us: 1800-123-4567</div>
											<div>📧 Email: payments@zappy.com</div>
											<div>💬 Live chat available 24/7</div>
										</div>
										<Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
											Contact Support
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
