"use client";

import { Cpu, LogoYandexTracker, ShieldCheck } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function Features(): JSX.Element {
  const features = [
    {
      icon: <Cpu className="size-8" />,
      title: "Smart Inventory",
      desc: "Manage your hardware stock in real-time with our advanced tracking system."
    },
    {
      icon: <LogoYandexTracker className="size-8" />,
      title: "Performance Tracking",
      desc: "Monitor metrics for every component to ensure peak rig performance."
    },
    {
      icon: <ShieldCheck className="size-8" />,
      title: "Secure Procurement",
      desc: "Source hardware exclusively from verified and trusted suppliers."
    }
  ];

  return (
    <section className="w-full md:py-24 py-12 bg-black">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why NexusGear Leads the Market
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Modern solutions to simplify and optimize your professional hardware management workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              // Hover Effect: কার্ডটি কিছুটা উপরে উঠবে এবং স্কেল হবে
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 rounded-3xl bg-[#0c0c12] border border-white/5 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}