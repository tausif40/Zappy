"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"

export default function VerifyOtpPage({ number }) {
	const { toast } = useToast();
	const [ otp, setOtp ] = useState(new Array(6).fill(""));
	const [ timer, setTimer ] = useState(0);
	// const [ mobile, setMobile ] = useState("+91 98765 43210");
	const inputsRef = useRef([]);

	useEffect(() => {
		let interval = null;

		if (timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}

		return () => clearInterval(interval);
	}, [ timer ]);

	const handleChange = (value, index) => {
		if (!/^\d*$/.test(value)) return;

		const newOtp = [ ...otp ];
		newOtp[ index ] = value;
		setOtp(newOtp);

		if (value && index < 5) {
			inputsRef.current[ index + 1 ]?.focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !otp[ index ] && index > 0) {
			inputsRef.current[ index - 1 ]?.focus();
		}
	};

	const handlePaste = (e) => {
		const pasted = e.clipboardData.getData("text");
		if (!/^\d{6}$/.test(pasted)) return;

		const newOtp = pasted.split("");
		setOtp(newOtp);

		// Autofocus last filled box
		inputsRef.current[ 5 ]?.focus();
		e.preventDefault();
	};

	const handleVerify = () => {
		const finalOtp = otp.join("");
		if (finalOtp.length !== 6) {
			toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter a 6-digit OTP." });
			return;
		}

		toast({ variant: "success", title: "OTP Verified", description: `Please follow next step.` });
	};

	const handleResend = () => {
		toast({ title: "OTP Resent", description: "OTP resend successfully." });
		setTimer(60);
	};

	const handleEditNumber = () => {

	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<Card className="w-full max-w-md shadow-lg p-4">
				<CardHeader className="pb-2">
					<CardTitle className="text-center text-2xl">Verify OTP</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-6">
						<p className="text-center text-sm text-gray-600">
							Enter the 6-digit code sent to your phone
							<br />
							<span className="font-medium">{number} </span>
							{/* <span>OTP sent to</span> */}
							<Button
								variant="link"
								className="p-0 h-auto text-blue-600 text-sm"
								onClick={handleEditNumber}
							>
								Edit
							</Button>
						</p>
					</div>

					<div className="flex justify-between gap-2">
						{otp.map((digit, index) => (
							<Input
								key={index}
								ref={(el) => (inputsRef.current[ index ] = el)}
								type="text"
								inputMode="numeric"
								maxLength={1}
								className="w-12 h-12 text-center text-lg focus:ring-1"
								value={digit}
								onChange={(e) => handleChange(e.target.value, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onPaste={handlePaste}
							/>
						))}
					</div>

					<Button className="w-full mt-4" onClick={handleVerify}>
						Verify OTP
					</Button>

					<p className="text-center text-sm text-muted-foreground mt-2">
						Didn’t receive the code?{" "}
						<button
							className="text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
							onClick={handleResend}
							disabled={timer > 0}
						>
							{timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
						</button>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
