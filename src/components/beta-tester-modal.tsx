import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, ValidationError } from '@formspree/react';

interface BetaSignupModalProps {
    isOpen: boolean
    onClose: () => void
}

export function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
    const [state, handleSubmit] = useForm("mdkdbejb");
    const formRef = useRef<HTMLFormElement>(null)

 
    useEffect(() => {
        if (state.succeeded) {
            const timer = setTimeout(() => {
                formRef.current?.reset()
                onClose()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [state.succeeded, onClose])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
                <DialogHeader className="relative pb-4">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent text-left">Join the Beta Test</DialogTitle>
                    <p className="text-gray-600 text-sm text-left mt-2">
                        Be among the first to experience the future of project management. We'll reach out to you soon!
                    </p>
                </DialogHeader>

                {state.succeeded ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">You're in!</h3>
                        <p className="text-gray-600 text-sm">Thanks for joining our beta program. We'll be in touch soon!</p>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                className="border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                            />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                                WhatsApp Number
                            </Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                name="tel"
                                placeholder="+1 (555) 123-4567"
                                required
                                className="border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                            />
                            <ValidationError
                                prefix="Whatsapp Number"
                                field="whatsapp"
                                errors={state.errors}
                            />
                        </div>

                        {/* Show general form errors */}
                        <ValidationError errors={state.errors} />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={state.submitting} 
                                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {state.submitting ? "Joining..." : "Join Beta →"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}