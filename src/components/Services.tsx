"use client";

import { motion } from "framer-motion";
import { Gear, ShieldCheck, Sliders, Layers, Cpu, Database } from "@gravity-ui/icons";

const services = [
  { icon: <Gear />, title: "Custom Rig Building", desc: "Tailored hardware configurations designed to meet your specific computational needs." },
  { icon: <ShieldCheck />, title: "System Security Audit", desc: "Comprehensive vulnerability assessment to ensure your hardware ecosystem is protected." },
  { icon: <Sliders />, title: "Performance Tuning", desc: "Optimizing clock speeds and thermal profiles for maximum efficiency and longevity." },
  { icon: <Layers />, title: "Infrastructure Scaling", desc: "Seamlessly expanding your tech capacity as your project demands grow." },
  { icon: <Cpu />, title: "Hardware Integration", desc: "Connecting disparate hardware components into a unified, high-performing network." },
  { icon: <Database />, title: "Lifecycle Management", desc: "End-to-end tracking of hardware assets from procurement to decommissioning." },
];

export default function Services(): JSX.Element {
  return (
    <section className="w-full md:py-24 py-12 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="md:mb-20 mb-8 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Our Core <span className="text-blue-500">Services</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Beyond just hardware—we provide the structural backbone for your high-performance computing environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="w-16 h-16 mb-8 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              
              <div className="mt-8 h-1 w-12 bg-blue-500/30 group-hover:w-full transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}