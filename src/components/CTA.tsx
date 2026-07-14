"use client";

import { motion } from "framer-motion";

export default function CTA(): JSX.Element {
  return (
    <section className="w-full md:py-24 py-12 bg-black relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[300px] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-[1000px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white">
            Ready to Upgrade Your <br />
            <span className="text-blue-500">Tech Infrastructure?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Join our newsletter for exclusive hardware insights and project updates. 
            Or let's discuss your next custom build today.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
            <input 
              type="email" 
              placeholder="Enter your professional email" 
              className="w-full md:w-96 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-all"
            />
            <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}