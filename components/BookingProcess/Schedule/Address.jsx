"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addressSchema } from "@/schema/userSchema"
import { addAddresses } from "@/store/features/Purchase-slice"
import { useDispatch } from "react-redux"

export default function Address({ popup }) {
	const dispatch = useDispatch();
	const [ loading, setLoading ] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			addressType: "",
		},
	})

	const handleGetLocation = () => {
		if (!navigator.geolocation) {
			toast({ title: "Error", description: "Geolocation not supported", variant: "destructive" })
			return
		}
		setLoading(true)
	}

	const onSubmit = async (data) => {
		console.log("Address Data:", data)
		const newAddress = Object.fromEntries(
			Object.entries(data).filter(([ _, value ]) => value !== "")
		)
		console.log("cleanedData : ", newAddress)

		try {
			setLoading(true)
			const res = await dispatch(addAddresses(newAddress)).unwrap();
			console.log(res);
			if (res?.status === 201) {
				toast({ title: "Success", description: "Address added successfully!" })
				popup(false)
			}
		} catch (error) {
			console.log("Error adding to cart:", error);
			if (error?.status === 401) {
				toast({ variant: "destructive", title: "Please Login", description: "If you are already account, Signup" });
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="w-full max-w-2xl pr-3">
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
					{/* Name */}
					<div>
						<Label className="required">Name</Label>
						<Input {...register("name")} placeholder="Enter your name" />
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>

					{/* Mobile */}
					<div>
						<Label>Mobile</Label>
						<Input {...register("mobile")} placeholder="Enter mobile number" />
						{errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
					</div>

					{/* City */}
					<div>
						<Label className="required">City</Label>
						<Input {...register("city")} placeholder="Enter city" />
						{errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
					</div>

					{/* State */}
					<div>
						<Label className="required">State</Label>
						<Input {...register("state")} placeholder="Enter state" />
						{errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
					</div>

					{/* Pincode */}
					<div>
						<Label className="required">Pincode</Label>
						<Input {...register("pincode")} placeholder="Enter 6 digit pincode" />
						{errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
					</div>

					{/* Address Type */}
					<div>
						<Label className="required">Address Type</Label>
						<Select
							onValueChange={(val) => setValue("addressType", val, { shouldValidate: true, shouldDirty: true })}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="home">Home</SelectItem>
								<SelectItem value="office">Office</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
						{errors.addressType && <p className="text-red-500 text-sm">{errors.addressType.message}</p>}
					</div>

					{/* Address */}
					<div className="col-span-2">
						<Label className="required">Address</Label>
						<Textarea {...register("address")} placeholder="Enter your address" />
						{errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
					</div>

					{/* Street */}
					<div>
						<Label>Street</Label>
						<Input {...register("street")} placeholder="Street (optional)" />
					</div>

					{/* Landmark */}
					<div>
						<Label>Landmark</Label>
						<Input {...register("landMark")} placeholder="Near landmark (optional)" />
					</div>

					{/* GSTIN */}
					<div>
						<Label>GSTIN</Label>
						<Input {...register("gstin")} placeholder="GSTIN (optional)" />
					</div>

					{/* Company Name */}
					<div>
						<Label>Company Name</Label>
						<Input {...register("companyName")} placeholder="Company name (optional)" />
					</div>

					{/* Buttons */}
					<div className="col-span-2 flex justify-between mt-4">
						<Button type="button" variant="outline" onClick={handleGetLocation} disabled={loading}>
							Get Location
						</Button>
						<Button type="submit" variant='highlight' disabled={loading}>
							{loading ? "Saving..." : "Save Address"}
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}
