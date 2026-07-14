"use client";

import { motion } from "framer-motion";

const highlights = [
  { label: "01", title: "Unmatched Power", desc: "Pushing boundaries with cutting-edge engineering." },
  { label: "02", title: "Thermal Efficiency", desc: "Optimized airflow for sustained peak performance." },
  { label: "03", title: "Scalable Design", desc: "Hardware that evolves with your growing needs." },
  { label: "04", title: "Secure Integration", desc: "Robust protection for your critical data flows." }
];

export default function Highlights(): JSX.Element {
  return (
    <section className="w-full md:py-24 py-12 bg-black text-white">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 md:gap-16 gap-8 items-center">
        
        {/* Left Side: Impactful Text */}
        <div>
          <h3 className="text-blue-500 font-semibold tracking-widest uppercase mb-4 text-sm">Key Capabilities</h3>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Engineered for <br />
            <span className="text-gray-500">Exceptional Results</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            We don't just build systems; we curate high-performance ecosystems designed to handle the most demanding workloads with absolute precision.
          </p>
        </div>

        {/* Right Side: Unique List Layout */}
        <div className="space-y-12">
          {highlights.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 group"
            >
              <span className="text-4xl font-bold text-white/10 group-hover:text-blue-500 transition-colors duration-500">
                {item.label}
              </span>
              <div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}