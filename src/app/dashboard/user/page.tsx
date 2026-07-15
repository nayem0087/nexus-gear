"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { LayoutGrid, Package, Settings } from "lucide-react";

export default function UserDashboard() {
  const dashboardCards = [
    {
      title: "Browse Products",
      description: "Explore our latest tech collection",
      href: "/items",
      icon: LayoutGrid,
      color: "text-blue-400"
    },
    {
      title: "My Inventory",
      description: "Manage your saved items",
      href: "/items/manage",
      icon: Package,
      color: "text-emerald-400"
    },
    {
      title: "Update Profile",
      description: "Manage your personal settings",
      href: "/dashboard/profile",
      icon: Settings,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome back, Nayem 👋</h1>
        <p className="text-gray-400 text-lg">Manage your products and inventory from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Link key={index} href={card.href}>
            <Card className="p-8 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-pointer group rounded-lg">
              <div className={`mb-6 p-4 rounded-xl bg-zinc-800/50 w-fit group-hover:scale-110 transition-transform ${card.color}`}>
                <card.icon size={32} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-400">{card.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}