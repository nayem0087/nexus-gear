"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Skeleton } from "@heroui/react";
import { Users, Package, DollarSign, PieChart as PieChartIcon } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const API_BASE = "http://localhost:5000/api";

interface AdminStats {
    totalUsers: number;
    totalProducts: number;
    totalRevenue: number;
    roleDistribution: Record<string, number>;
}

const ROLE_COLORS: Record<string, string> = {
    user: "#3b82f6", // blue
    admin: "#a855f7", // purple
    unknown: "#6b7280", // gray fallback
};

export default function AdminDashboard() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    const isAdmin = session?.user?.role === "admin";

    useEffect(() => {
        if (!isPending && (!session || !isAdmin)) {
            router.push("/");
        }
    }, [isPending, session, isAdmin, router]);

    useEffect(() => {
        if (!isAdmin) return;

        fetch(`${API_BASE}/admin/stats`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load stats");
                return res.json();
            })
            .then((data: AdminStats) => setStats(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [isAdmin]);

    if (isPending || !session || !isAdmin) {
        return null;
    }

    const chartData = stats
        ? Object.entries(stats.roleDistribution).map(([role, count]) => ({
              name: role.charAt(0).toUpperCase() + role.slice(1),
              value: count,
              color: ROLE_COLORS[role] || ROLE_COLORS.unknown,
          }))
        : [];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400 text-lg">
                        Overview of NexusGear&apos;s platform activity.
                    </p>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        icon={Users}
                        color="text-blue-400"
                        label="Total Users"
                        value={loading ? null : stats?.totalUsers}
                    />
                    <StatCard
                        icon={Package}
                        color="text-emerald-400"
                        label="Total Products"
                        value={loading ? null : stats?.totalProducts}
                    />
                    <StatCard
                        icon={DollarSign}
                        color="text-purple-400"
                        label="Total Revenue"
                        value={
                            loading
                                ? null
                                : `$${(stats?.totalRevenue ?? 0).toFixed(2)}`
                        }
                    />
                </div>

                {/* PLATFORM DISTRIBUTION */}
                <Card className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChartIcon size={20} className="text-zinc-400" />
                        <h2 className="text-xl font-semibold">Platform Distribution</h2>
                    </div>

                    {loading ? (
                        <Skeleton className="h-[280px] w-full rounded-xl bg-zinc-800" />
                    ) : chartData.length === 0 ? (
                        <p className="text-zinc-500 text-sm py-12 text-center">
                            No user role data available yet.
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#18181b",
                                        border: "1px solid #27272a",
                                        borderRadius: "0.75rem",
                                        color: "#fff",
                                    }}
                                />
                                <Legend
                                    formatter={(value) => (
                                        <span className="text-zinc-300 text-sm">{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </Card>
            </div>
        </div>
    );
}

function StatCard({
    icon: Icon,
    color,
    label,
    value,
}: {
    icon: React.ElementType;
    color: string;
    label: string;
    value: string | number | null | undefined;
}) {
    return (
        <Card className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {label}
                </p>
                <Icon size={18} className={color} />
            </div>
            {value === null || value === undefined ? (
                <Skeleton className="h-8 w-20 bg-zinc-800 rounded-lg" />
            ) : (
                <p className="text-3xl font-bold">{value}</p>
            )}
        </Card>
    );
}