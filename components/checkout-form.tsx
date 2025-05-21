"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { purchaseTickets } from "@/lib/api"

const PAYMENT_METHODS = [
	{ value: "card", label: "Credit/Debit Card" },
	{ value: "paynow", label: "Paynow" },
	{ value: "ecocash", label: "Ecocash" },
]

export function CheckoutForm({ eventId }: { eventId: string }) {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const [paymentMethod, setPaymentMethod] = useState("card")

	// Form state
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		cardName: "",
		cardNumber: "",
		expMonth: "",
		expYear: "",
		cvc: "",
		paynowNumber: "",
		ecocashNumber: "",
	})

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.id]: e.target.value })
	}

	// Handle select changes
	const handleSelect = (id: string, value: string) => {
		setForm({ ...form, [id]: value })
	}

	const handlePaymentMethodChange = (value: string) => {
		setPaymentMethod(value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Prepare payment info based on method
			let paymentInfo: Record<string, string> = {}
			if (paymentMethod === "card") {
				paymentInfo = {
					cardName: form.cardName,
					cardNumber: form.cardNumber,
					expMonth: form.expMonth,
					expYear: form.expYear,
					cvc: form.cvc,
				}
			} else if (paymentMethod === "paynow") {
				paymentInfo = {
					paynowNumber: form.paynowNumber,
				}
			} else if (paymentMethod === "ecocash") {
				paymentInfo = {
					ecocashNumber: form.ecocashNumber,
				}
			}

			await purchaseTickets({
				eventId,
				tickets: [{ typeId: "default", quantity: 1 }], // Replace with real ticket type/quantity selection
				customerInfo: {
					firstName: form.firstName,
					lastName: form.lastName,
					email: form.email,
					phone: form.phone,
					paymentMethod,
					...paymentInfo,
				},
			})

			toast({
				title: "Payment successful!",
				description: "Your tickets have been sent to your email.",
			})
			// Optionally redirect or reset form here
		} catch (error) {
			toast({
				title: "Payment failed",
				description: "There was an error processing your payment. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Contact Information</CardTitle>
					<CardDescription>Enter your details for ticket confirmation</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input id="firstName" required value={form.firstName} onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input id="lastName" required value={form.lastName} onChange={handleChange} />
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" required value={form.email} onChange={handleChange} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" type="tel" value={form.phone} onChange={handleChange} />
					</div>
				</CardContent>

				<Separator className="my-4" />

				<CardHeader>
					<CardTitle>Payment Method</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
						<SelectTrigger id="paymentMethod">
							<SelectValue placeholder="Select payment method" />
						</SelectTrigger>
						<SelectContent>
							{PAYMENT_METHODS.map((method) => (
								<SelectItem key={method.value} value={method.value}>
									{method.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardContent>

				{paymentMethod === "card" && (
					<>
						<Separator className="my-4" />
						<CardHeader>
							<CardTitle>Payment Details</CardTitle>
							<CardDescription>Enter your payment information securely</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="cardName">Name on Card</Label>
								<Input id="cardName" required value={form.cardName} onChange={handleChange} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="cardNumber">Card Number</Label>
								<Input
									id="cardNumber"
									placeholder="1234 5678 9012 3456"
									required
									value={form.cardNumber}
									onChange={handleChange}
								/>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2 col-span-1">
									<Label htmlFor="expMonth">Month</Label>
									<Select onValueChange={(value) => handleSelect("expMonth", value)}>
										<SelectTrigger id="expMonth">
											<SelectValue placeholder="MM" />
										</SelectTrigger>
										<SelectContent>
											{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
												<SelectItem key={month} value={month.toString().padStart(2, "0")}>
													{month.toString().padStart(2, "0")}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2 col-span-1">
									<Label htmlFor="expYear">Year</Label>
									<Select onValueChange={(value) => handleSelect("expYear", value)}>
										<SelectTrigger id="expYear">
											<SelectValue placeholder="YY" />
										</SelectTrigger>
										<SelectContent>
											{Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
												<SelectItem key={year} value={year.toString().slice(-2)}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2 col-span-1">
									<Label htmlFor="cvc">CVC</Label>
									<Input id="cvc" placeholder="123" required value={form.cvc} onChange={handleChange} />
								</div>
							</div>
						</CardContent>
					</>
				)}

				{paymentMethod === "paynow" && (
					<>
						<Separator className="my-4" />
						<CardHeader>
							<CardTitle>Paynow Details</CardTitle>
							<CardDescription>Enter your Paynow number</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="paynowNumber">Paynow Number</Label>
								<Input id="paynowNumber" required value={form.paynowNumber} onChange={handleChange} />
							</div>
						</CardContent>
					</>
				)}

				{paymentMethod === "ecocash" && (
					<>
						<Separator className="my-4" />
						<CardHeader>
							<CardTitle>Ecocash Details</CardTitle>
							<CardDescription>Enter your Ecocash number</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="ecocashNumber">Ecocash Number</Label>
								<Input id="ecocashNumber" required value={form.ecocashNumber} onChange={handleChange} />
							</div>
						</CardContent>
					</>
				)}

				<CardFooter>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Processing..." : "Complete Purchase"}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
