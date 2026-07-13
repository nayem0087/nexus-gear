"use client";

import { motion } from "framer-motion";

export default function Blogs(): JSX.Element {
  const blogs = [
    {
      title: "Optimizing Your Next-Gen Tech Rig",
      date: "July 12, 2026",
      image: "https://images.unsplash.com/photo-1582043568773-a7a2b57239f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2glMjBnZWFyc3xlbnwwfHwwfHx8MA%3D%3D",
      excerpt: "Achieving peak performance isn't just about high-end hardware; it's about the synergy between components. In this guide, we dive deep into thermal management, power distribution, and the critical balance required to keep your system running optimally under heavy professional workloads."
    },
    {
      title: "The Future of Hardware Sourcing",
      date: "July 08, 2026",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
      excerpt: "The global hardware landscape is shifting toward more transparent and efficient supply chains. We explore how centralized inventory management and real-time data integration are becoming the backbone of successful tech setups, reducing downtime and ensuring component longevity."
    },
    {
      title: "Top 5 Components for 2026",
      date: "July 01, 2026",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600",
      excerpt: "As we hit the mid-point of 2026, the industry has seen groundbreaking advancements in architecture and efficiency. We analyze the top five components that are currently redefining industry standards, offering unmatched performance for both creators and engineers alike."
    }
  ];

  return (
    <section className="w-full py-24 bg-[#07070a]">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest Insights & Trends</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            Stay ahead of the curve with our expert analysis and comprehensive guides. We bridge the gap between complex hardware engineering and practical professional application, helping you build, maintain, and scale your technology ecosystem with confidence and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8 }}
              className="group flex flex-col p-6 rounded-3xl bg-[#0c0c12] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden"
            >
              <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">{blog.date}</span>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-400 leading-relaxed flex-grow">{blog.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}