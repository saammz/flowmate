import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BetaSignupModal } from "@/components/beta-tester-modal"



export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {/* Header */}
            <header className="fixed border-b bg-white/80 backdrop-blur-md w-full top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3 group">
                        <Link to={"/"}>
                            <img src="/logo.png" alt="FlowMate's logo" className="w-36 h-7 md:w-48 " />
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-sm">
                        <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Features</a>
                        <a href="#teams" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform ">For Teams</a>
                        <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Pricing</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Reviews</a>
                    </nav>
                    <div className="flex space-x-3">
                        {/* <Link to="/login">
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">Login</Button>
                    </Link> */}

                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Beta Test
                        </Button>
                    </div>
                    <BetaSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            </header>
        </>
    )
}
