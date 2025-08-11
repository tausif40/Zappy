import HomeNavBar from "@/components/NavBar/HomeNavBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale } from "lucide-react"

export default function TermsOfServicePage() {
	return (
		<>
			<HomeNavBar />
			<div className="pt-12 min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/40 dark:via-blue-900/20 dark:to-gray-900">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-4">
							<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
								<FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
							</div>
						</div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Please read these terms carefully before using our event booking platform.
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: January 2025</p>
					</div>

					<div className="max-w-6xl mx-auto space-y-8">
						{/* Acceptance of Terms */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Scale className="h-5 w-5 text-blue-600" />
									Acceptance of Terms
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									By accessing and using Zappy ("the Platform"), you accept and agree to be bound by the terms and
									provision of this agreement. If you do not agree to abide by the above, please do not use this service.
								</p>
								<p className="text-gray-600 dark:text-gray-300">
									These Terms of Service ("Terms") govern your use of our website, mobile application, and services
									(collectively, the "Service") operated by Zappy Events Inc. ("us", "we", or "our").
								</p>
							</CardContent>
						</Card>

						{/* Service Description */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5 text-green-600" />
									Service Description
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-gray-600 dark:text-gray-300">
									Zappy is an online platform that connects customers with event service providers ("Vendors") for
									children's birthday parties and themed events. We facilitate bookings, payments, and communication
									between customers and vendors.
								</p>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our Services Include:</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Event booking and scheduling platform</li>
										<li>Vendor discovery and comparison tools</li>
										<li>Secure payment processing</li>
										<li>Customer support and dispute resolution</li>
										<li>Event management and coordination tools</li>
										<li>Review and rating system</li>
									</ul>
								</div>
							</CardContent>
						</Card>

						{/* User Accounts */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5 text-purple-600" />
									User Accounts and Registration
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Creation</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>You must be at least 18 years old to create an account</li>
										<li>You must provide accurate and complete information</li>
										<li>You are responsible for maintaining account security</li>
										<li>One person may not maintain multiple accounts</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Responsibilities</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Keep your login credentials secure and confidential</li>
										<li>Notify us immediately of any unauthorized access</li>
										<li>Update your information to keep it current and accurate</li>
										<li>Comply with all applicable laws and regulations</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Termination</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent
										activity, or pose a risk to our platform or users.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Booking and Payments */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CreditCard className="h-5 w-5 text-orange-600" />
									Booking and Payment Terms
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Process</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>All bookings are subject to vendor availability and confirmation</li>
										<li>Booking details must be accurate and complete</li>
										<li>Changes to bookings may incur additional fees</li>
										<li>Some bookings may require advance notice for modifications</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Terms</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Payment is required at the time of booking confirmation</li>
										<li>We accept major credit cards and digital payment methods</li>
										<li>All prices are in USD unless otherwise specified</li>
										<li>Service fees and taxes will be clearly displayed before payment</li>
										<li>Payment processing is handled by secure third-party providers</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Refunds and Cancellations</h3>
									<div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
										<p className="text-gray-700 dark:text-gray-300 mb-2">
											<strong>Cancellation Policy:</strong>
										</p>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>
												<strong>More than 7 days:</strong> Full refund minus processing fees
											</li>
											<li>
												<strong>3-7 days:</strong> 50% refund
											</li>
											<li>
												<strong>Less than 3 days:</strong> No refund unless vendor agrees
											</li>
											<li>
												<strong>Emergency situations:</strong> Case-by-case review
											</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Vendor Terms */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5 text-red-600" />
									Vendor Terms and Responsibilities
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vendor Requirements</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Must be licensed and insured as required by local laws</li>
										<li>Provide accurate service descriptions and pricing</li>
										<li>Maintain professional standards and quality</li>
										<li>Respond to customer inquiries promptly</li>
										<li>Honor confirmed bookings and agreements</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Standards</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Arrive on time and prepared for events</li>
										<li>Provide services as described and agreed upon</li>
										<li>Maintain appropriate insurance coverage</li>
										<li>Follow safety protocols and guidelines</li>
										<li>Respect customer property and privacy</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Fees</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Vendors agree to pay platform fees as outlined in their vendor agreement. Fees are deducted from
										payments before transfer to vendor accounts.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Prohibited Uses */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<AlertTriangle className="h-5 w-5 text-red-600" />
									Prohibited Uses
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									You may not use our Service for any unlawful purpose or to solicit others to perform unlawful acts. The
									following activities are strictly prohibited:
								</p>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Illegal Activities</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Fraudulent or deceptive practices</li>
											<li>Money laundering or illegal transactions</li>
											<li>Violation of intellectual property rights</li>
											<li>Harassment or threatening behavior</li>
										</ul>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Abuse</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Creating fake accounts or reviews</li>
											<li>Attempting to bypass payment systems</li>
											<li>Spamming or unsolicited communications</li>
											<li>Interfering with platform operations</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Liability and Disclaimers */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5 text-gray-600" />
									Liability and Disclaimers
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Role</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Zappy acts as an intermediary platform connecting customers with vendors. We do not directly provide
										event services and are not responsible for the quality, safety, or legality of services provided by
										vendors.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h3>
									<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
										<p className="text-gray-600 dark:text-gray-300">
											TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZAPPY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
											SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA,
											USE, OR OTHER INTANGIBLE LOSSES.
										</p>
									</div>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Availability</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We strive to maintain platform availability but do not guarantee uninterrupted service. We may
										temporarily suspend service for maintenance, updates, or other operational needs.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Intellectual Property */}
						<Card>
							<CardHeader>
								<CardTitle>Intellectual Property Rights</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our Content</h3>
									<p className="text-gray-600 dark:text-gray-300">
										The Service and its original content, features, and functionality are owned by Zappy and are protected
										by international copyright, trademark, patent, trade secret, and other intellectual property laws.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">User Content</h3>
									<p className="text-gray-600 dark:text-gray-300">
										By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to
										use, modify, and display such content in connection with our services. You retain ownership of your
										content.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Privacy */}
						<Card>
							<CardHeader>
								<CardTitle>Privacy and Data Protection</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
									Service, to understand our practices regarding the collection, use, and disclosure of your personal
									information.
								</p>
							</CardContent>
						</Card>

						{/* Dispute Resolution */}
						<Card>
							<CardHeader>
								<CardTitle>Dispute Resolution</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customer-Vendor Disputes</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We provide mediation services for disputes between customers and vendors. Our support team will work
										to facilitate fair resolution of conflicts related to bookings, service quality, or payment issues.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Disputes</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Any disputes arising from these terms shall be resolved through binding arbitration in accordance with
										the rules of the American Arbitration Association. The arbitration shall take place in the state where
										our company is incorporated.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Modifications */}
						<Card>
							<CardHeader>
								<CardTitle>Modifications to Terms</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
									provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change
									will be determined at our sole discretion.
								</p>
							</CardContent>
						</Card>

						{/* Termination */}
						<Card>
							<CardHeader>
								<CardTitle>Termination</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									We may terminate or suspend your account and bar access to the Service immediately, without prior notice
									or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
									not limited to a breach of the Terms.
								</p>
							</CardContent>
						</Card>

						{/* Governing Law */}
						<Card>
							<CardHeader>
								<CardTitle>Governing Law</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									These Terms shall be interpreted and governed by the laws of the State of California, United States,
									without regard to its conflict of law provisions. Our failure to enforce any right or provision of these
									Terms will not be considered a waiver of those rights.
								</p>
							</CardContent>
						</Card>

						{/* Contact Information */}
						<Card>
							<CardHeader>
								<CardTitle>Contact Information</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									If you have any questions about these Terms of Service, please contact us:
								</p>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="flex items-center gap-3">
										<FileText className="h-5 w-5 text-blue-600" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">Email</p>
											<p className="text-gray-600 dark:text-gray-300">legal@zappy.com</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<Users className="h-5 w-5 text-blue-600" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">Support</p>
											<p className="text-gray-600 dark:text-gray-300">support@zappy.com</p>
										</div>
									</div>
								</div>

								<Separator className="my-4" />

								<div>
									<p className="font-semibold text-gray-900 dark:text-white mb-2">Legal Department</p>
									<p className="text-gray-600 dark:text-gray-300">
										Zappy Events Inc.
										<br />
										123 Magic Lane
										<br />
										City, CC 12345
										<br />
										India
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}
