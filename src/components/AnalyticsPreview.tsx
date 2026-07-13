"use client";

import { motion } from "framer-motion";
import { ChartAreaStacked, Activity, Server } from "@gravity-ui/icons";

export default function AnalyticsPreview(): JSX.Element {
  return (
    <section className="w-full md:py-24 py-12 bg-black border-t border-white/5">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-6">
          <div className="text-blue-500 font-bold tracking-widest uppercase text-xs">Real-Time Insights</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Advanced Analytics at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Your Fingertips</span>
          </h2>
          <p className="text-gray-400 text-lg">
            NexusGear’s live dashboard gives you a panoramic view of your hardware health. 
            Analyze thermal loads, power efficiency, and component longevity in a single, 
            unified interface.
          </p>
          <div className="flex gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">98%</span>
              <span className="text-sm text-gray-500">Uptime Efficiency</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="text-sm text-gray-500">System Monitoring</span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Graphic */}
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-[#07070a] border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-600/20 text-blue-500 rounded-xl"><ChartAreaStacked /></div>
              <div>
                <h4 className="text-white font-semibold">Live System Load</h4>
                <p className="text-xs text-gray-500">Updating every 2 seconds</p>
              </div>
            </div>
            
            {/* Mock Graph Bars */}
            <div className="flex items-end gap-3 h-40">
              {[40, 70, 55, 90, 65, 80, 50].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-blue-600 rounded-t-lg hover:bg-cyan-500 transition-colors"
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-6 text-xs text-gray-500">
              <span>CPU</span>
              <span>GPU</span>
              <span>RAM</span>
              <span>SSD</span>
              <span>PSU</span>
              <span>FAN</span>
              <span>NET</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}