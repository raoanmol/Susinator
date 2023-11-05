import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Header() {

    const handleGoogleLogin = () => {
        console.log("Login with Google clicked");
        // Here you can add your authentication logic
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.05,
                duration: 0.85,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="fixed top-0 left-0 w-full bg-[#1d0148] z-[200] shadow-md py-2 px-4 md:px-20"
        >
            <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <img src="./logo_square.webp" alt="Susinator Logo" width="100" height="auto"/>
                    <span className="cursor-pointer font-extrabold text-[#a98efe] text-7xl hover:text-[#95F3D9] transition duration-200">
                        Susinator
                    </span>
                </Link>

                <div className="flex space-x-16 items-center">
                    <Link href="/dashboard">
                        <span className="cursor-pointer text-bold text-[#88f8ff] text-xl hover:text-[#25D0AB] transition duration-200">
                            Dashboard
                        </span>
                    </Link>
                    <Link href="/about">
                        <span className="cursor-pointer text-[#88f8ff] text-xl hover:text-[#25D0AB] transition duration-200">
                            About
                        </span>
                    </Link>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200"
                    >
                        <FcGoogle className="text-2xl mr-2" /> {/* Google Icon */}
                        <span>Login with Google</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}