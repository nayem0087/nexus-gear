"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function Hero(): JSX.Element {
  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-[#07070a] md:py-16 py-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Content Section (Takes 7 columns on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-flex items-center gap-2 border border-blue-500/20 bg-blue-500/5 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            NEXT-GEN HARDWARE PLATFORM
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Streamline Your <br />
            <span className="text-blue-500">Hardware Lifecycle</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            NexusGear provides an enterprise-grade ecosystem for sourcing, 
            inventory management, and performance tracking. Optimize your tech 
            infrastructure with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="h-14 px-8 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-lg transition-transform hover:scale-105 flex items-center justify-center gap-1">
              Start Building <ArrowRight className="size-5" />
            </Button>
            <Button variant="bordered" className="h-14 px-8 rounded-xl text-white border-white/10 hover:bg-white/5 font-semibold text-lg">
              View Documentation
            </Button>
          </div>
        </motion.div>

        {/* Visual/Image Section (Takes 5 columns on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[400px] aspect-square bg-gradient-to-tr from-blue-900/20 to-cyan-900/20 rounded-3xl border border-white/5 p-6 backdrop-blur-sm">
            <div className="w-full h-full border-2 border-dashed border-blue-500/20 rounded-2xl flex flex-col items-center justify-center text-blue-500/50">
               <span className="text-sm uppercase tracking-widest font-bold">NexusGear System</span>
               <div className="mt-4 p-4 bg-white/5 rounded-full">
                  <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}