"use client";

import { motion } from "framer-motion";
import { Star } from "@gravity-ui/icons"; // অথবা আপনার পছন্দসই আইকন

const testimonials = [
  { 
    name: "Rahat Chowdhury", 
    role: "Tech Lead at AlphaTech", 
    quote: "NexusGear provided the exact infrastructure we needed. The hardware reliability is simply unmatched in the market.", 
    rating: 5 
  },
  { 
    name: "Sania Mirza", 
    role: "Founder, GreenDrive", 
    quote: "Their team went above and beyond to ensure our setup was optimized for peak performance. Truly a game-changer.", 
    rating: 5 
  },
  { 
    name: "Arif Khan", 
    role: "CTO at HealthSync", 
    quote: "I've worked with many vendors, but the support and technical precision at NexusGear are on another level.", 
    rating: 5 
  }
];

export default function HappyCustomers(): JSX.Element {
  return (
    <section className="w-full md:py-24 py-12 bg-black text-white">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Impactful Text */}
        <div className="lg:sticky lg:top-24 h-fit">
          <p className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Trusted by Experts</p>
          <h2 className="text-5xl font-bold mb-6">Loved by <br />Industry Leaders.</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">See what our partners and happy customers have to say about their experience with the NexusGear ecosystem.</p>
          
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex gap-1 text-blue-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-6 fill-current" />)}
            </div>
            <p className="text-lg italic mb-4">"The best investment we made for our tech stack. NexusGear defines professional excellence."</p>
            <p className="text-white font-bold text-sm">— 4.9/5 Average Rating</p>
          </div>
        </div>

        {/* Right Side: Testimonial Cards */}
        <div className="relative border-l border-white/10 ml-4 lg:ml-0 pl-8 space-y-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full border-4 border-[#07070a] bg-blue-500" />
              
              <div className="p-8 rounded-2xl bg-[#0c0c12] border border-white/5 hover:border-blue-500/30 transition-all">
                <p className="text-gray-400 mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}