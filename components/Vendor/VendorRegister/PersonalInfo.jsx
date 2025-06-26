import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"

function PersonalInformation() {
	const [ showPassword, setShowPassword ] = useState(false)
	const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)
	const [ formData, setFormData ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	})

	return (
		<>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Personal Information</h3>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="John"
								value={formData.firstName}
								onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
								className="pl-10 border-2 focus:border-purple-500"
								required
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Doe"
								value={formData.lastName}
								onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
								className="pl-10 border-2 focus:border-purple-500"
								required
							/>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							type="email"
							placeholder="john@example.com"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							className="pl-10 border-2 focus:border-purple-500"
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="+91 98765 43210"
							value={formData.phone}
							onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
							className="pl-10 border-2 focus:border-purple-500"
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Password <span className="text-red-500">*</span></label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							type={showPassword ? "text" : "password"}
							placeholder="Create a strong password"
							value={formData.password}
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							className="pl-10 pr-10 border-2 focus:border-purple-500"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Confirm Password <span className="text-red-500">*</span></label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm your password"
							value={formData.confirmPassword}
							onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
							className="pl-10 pr-10 border-2 focus:border-purple-500"
							required
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PersonalInformation