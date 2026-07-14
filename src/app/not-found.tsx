"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, TriangleExclamation } from "@gravity-ui/icons";

export default function NotFound(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-[#07070a] flex items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-8">
        
        {/* Animated Error Code */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-transparent"
        >
          404
        </motion.div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <TriangleExclamation className="size-8 text-blue-500" />
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable in our system.
          </p>
        </div>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all"
          >
            <ArrowLeft className="size-5" />
            Back to NexusGear
          </Link>
        </motion.div>

      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -z-0" />
    </div>
  );
}