"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Copy,
	Facebook,
	Twitter,
	Linkedin,
	Mail,
	Send,
	MessageCircle,
	Check,
} from "lucide-react";

const ShareDrawer = forwardRef(
	(
		{
			url = typeof window !== "undefined"
				? window.location.href
				: "https://zappyeventz.com",
			text = "Check this out!",
		},
		ref
	) => {
		const [ open, setOpen ] = useState(false);
		const [ copied, setCopied ] = useState(false);

		useImperativeHandle(ref, () => ({
			openDrawer: () => setOpen(true),
			closeDrawer: () => setOpen(false),
		}));

		const handleCopy = async () => {
			try {
				await navigator.clipboard.writeText(url);
				setCopied(true);

				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error("Copy failed", err);
			}
		};

		const shareOptions = [
			{
				name: "WhatsApp",
				icon: <MessageCircle className="w-5 h-5 text-green-500" />,
				url: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
			},
			{
				name: "Twitter",
				icon: <Twitter className="w-5 h-5 text-sky-500" />,
				url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
					text
				)}&url=${encodeURIComponent(url)}`,
			},
			{
				name: "Facebook",
				icon: <Facebook className="w-5 h-5 text-blue-600" />,
				url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
					url
				)}`,
			},
			{
				name: "LinkedIn",
				icon: <Linkedin className="w-5 h-5 text-blue-700" />,
				url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
					url
				)}`,
			},
			{
				name: "Telegram",
				icon: <Send className="w-5 h-5 text-sky-600" />,
				url: `https://t.me/share/url?url=${encodeURIComponent(
					url
				)}&text=${encodeURIComponent(text)}`,
			},
			{
				name: "Email",
				icon: <Mail className="w-5 h-5 text-red-500" />,
				url: `mailto:?subject=${encodeURIComponent(
					"Check this out!"
				)}&body=${encodeURIComponent(text + " " + url)}`,
			},
		];

		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent className="p-4">
					<DrawerHeader>
						<DrawerTitle className="text-lg font-semibold">Share</DrawerTitle>
					</DrawerHeader>

					{/* Copy Link */}
					<div className="flex items-start gap-2 mb-4">
						<textarea
							value={url}
							readOnly
							rows={2}
							className="w-full border rounded-md p-2 font-light text-sm resize-none break-all scrollbar-hide"
						/>
						<Button variant="outline" size="icon" onClick={handleCopy} className={`transition-all ${copied && "bg-emerald-200 hover:bg-green-200"							}`}>
							{copied ? (
								<Check className="w-4 h-4" />
							) : (
								<Copy className="w-4 h-4" />
							)}
						</Button>
					</div>

					{/* Share Apps */}
					<div className="grid grid-cols-3 gap-4">
						{shareOptions.map((option) => (
							<a
								key={option.name}
								href={option.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition"
							>
								{option.icon}
								<span className="text-xs">{option.name}</span>
							</a>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		);
	}
);

ShareDrawer.displayName = "ShareDrawer";
export default ShareDrawer;
