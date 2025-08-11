import HomeNavBar from "@/components/NavBar/HomeNavBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Lock, Users, Mail, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
	return (
		<>
			<HomeNavBar />
			<div className="pt-12 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
				<div className="container mx-auto px-4 py-12">
					{/* Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-4">
							<div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
								<Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
							</div>
						</div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Your privacy is important to us. This policy explains how we collect, use, and protect your information.
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: January 2025</p>
					</div>

					<div className="max-w-6xl mx-auto space-y-8">
						{/* Information We Collect */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Eye className="h-5 w-5 text-blue-600" />
									Information We Collect
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Name, email address, and phone number</li>
										<li>Billing and shipping addresses</li>
										<li>Payment information (processed securely through third-party providers)</li>
										<li>Profile information and preferences</li>
										<li>Communication history and support interactions</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Event Information</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>Event details, dates, and locations</li>
										<li>Guest information and special requirements</li>
										<li>Photos and videos from events (with consent)</li>
										<li>Feedback and reviews</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Information</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>IP address, browser type, and device information</li>
										<li>Usage data and website interactions</li>
										<li>Cookies and similar tracking technologies</li>
										<li>Location data (with permission)</li>
									</ul>
								</div>
							</CardContent>
						</Card>

						{/* How We Use Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5 text-green-600" />
									How We Use Your Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Delivery</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Process bookings and payments</li>
											<li>Coordinate with vendors</li>
											<li>Send booking confirmations and updates</li>
											<li>Provide customer support</li>
										</ul>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Improvement</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Analyze usage patterns</li>
											<li>Improve our services</li>
											<li>Develop new features</li>
											<li>Prevent fraud and abuse</li>
										</ul>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Communication</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Send important updates</li>
											<li>Marketing communications (with consent)</li>
											<li>Event reminders and notifications</li>
											<li>Respond to inquiries</li>
										</ul>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Compliance</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Comply with legal obligations</li>
											<li>Resolve disputes</li>
											<li>Enforce our terms</li>
											<li>Protect rights and safety</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Information Sharing */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Lock className="h-5 w-5 text-orange-600" />
									Information Sharing and Disclosure
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">With Vendors</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We share necessary booking information with vendors to fulfill your event requirements. Vendors are
										contractually obligated to protect your information.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Providers</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We work with trusted third-party service providers for payment processing, email delivery, analytics,
										and other business functions. They only access information necessary for their services.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Requirements</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We may disclose information when required by law, to protect our rights, or in response to legal
										processes such as court orders or government requests.
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Business Transfers</h3>
									<p className="text-gray-600 dark:text-gray-300">
										In the event of a merger, acquisition, or sale of assets, your information may be transferred as part
										of the business transaction.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Data Security */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5 text-red-600" />
									Data Security and Retention
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Security Measures</h3>
									<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
										<li>SSL encryption for data transmission</li>
										<li>Secure data storage with encryption at rest</li>
										<li>Regular security audits and updates</li>
										<li>Access controls and authentication</li>
										<li>Employee training on data protection</li>
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Retention</h3>
									<p className="text-gray-600 dark:text-gray-300">
										We retain your information for as long as necessary to provide our services, comply with legal
										obligations, resolve disputes, and enforce our agreements. You can request deletion of your account
										and associated data at any time.
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Your Rights */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5 text-purple-600" />
									Your Rights and Choices
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access and Control</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Access your personal information</li>
											<li>Update or correct your data</li>
											<li>Delete your account</li>
											<li>Export your data</li>
										</ul>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 dark:text-white mb-2">Communication Preferences</h3>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
											<li>Opt out of marketing emails</li>
											<li>Manage notification settings</li>
											<li>Control cookie preferences</li>
											<li>Limit data processing</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Cookies */}
						<Card>
							<CardHeader>
								<CardTitle>Cookies and Tracking Technologies</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-gray-600 dark:text-gray-300">
									We use cookies and similar technologies to enhance your experience, analyze usage, and provide
									personalized content. You can control cookie settings through your browser preferences.
								</p>

								<div className="grid md:grid-cols-3 gap-4">
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white mb-1">Essential Cookies</h4>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Required for basic website functionality and security.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white mb-1">Analytics Cookies</h4>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Help us understand how visitors use our website.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white mb-1">Marketing Cookies</h4>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Used to deliver relevant advertisements and content.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Children's Privacy */}
						<Card>
							<CardHeader>
								<CardTitle>Children's Privacy</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									Our services are not directed to children under 13. We do not knowingly collect personal information
									from children under 13. If we become aware that we have collected such information, we will take steps
									to delete it promptly. Parents who believe their child has provided information to us should contact us
									immediately.
								</p>
							</CardContent>
						</Card>

						{/* International Users */}
						<Card>
							<CardHeader>
								<CardTitle>International Users</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									If you are accessing our services from outside the United States, please note that your information may
									be transferred to, stored, and processed in the United States where our servers are located. By using
									our services, you consent to this transfer.
								</p>
							</CardContent>
						</Card>

						{/* Changes to Policy */}
						<Card>
							<CardHeader>
								<CardTitle>Changes to This Privacy Policy</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300">
									We may update this Privacy Policy from time to time. We will notify you of any material changes by
									posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to
									review this Privacy Policy periodically for any changes.
								</p>
							</CardContent>
						</Card>

						{/* Contact Information */}
						<Card>
							<CardHeader>
								<CardTitle>Contact Us</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									If you have any questions about this Privacy Policy or our privacy practices, please contact us:
								</p>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="flex items-center gap-3">
										<Mail className="h-5 w-5 text-purple-600" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">Email</p>
											<p className="text-gray-600 dark:text-gray-300">privacy@zappy.com</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<Phone className="h-5 w-5 text-purple-600" />
										<div>
											<p className="font-semibold text-gray-900 dark:text-white">Phone</p>
											<p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
										</div>
									</div>
								</div>

								<Separator className="my-4" />

								<div>
									<p className="font-semibold text-gray-900 dark:text-white mb-2">Mailing Address</p>
									<p className="text-gray-600 dark:text-gray-300">
										Zappy Events Inc.
										<br />
										123 Magic Lane
										<br />
										Celebration City, CC 12345
										<br />
										United States
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
