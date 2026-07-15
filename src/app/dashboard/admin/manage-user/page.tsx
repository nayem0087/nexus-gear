"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Skeleton, Button, Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:5000/api";

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    blocked?: boolean;
    createdAt?: string;
    image?: string;
}

function getInitials(name: string | null | undefined): string {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function ManageUsersPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const isAdmin = session?.user?.role === "admin";

    useEffect(() => {
        if (!isPending && (!session || !isAdmin)) {
            router.push("/");
        }
    }, [isPending, session, isAdmin, router]);

    const fetchUsers = () => {
        setLoading(true);
        fetch(`${API_BASE}/admin/users`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load users");
                return res.json();
            })
            .then((data: AdminUser[]) => setUsers(data))
            .catch((err) => {
                console.error(err);
                toast.error("Could not load users.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!isAdmin) return;
        fetchUsers();
    }, [isAdmin]);

    const handleToggleBlock = async (user: AdminUser) => {
        const nextBlocked = !user.blocked;

        setUpdatingId(user._id);
        try {
            const res = await fetch(`${API_BASE}/admin/users/${user._id}/block`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocked: nextBlocked }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === user._id ? { ...u, blocked: nextBlocked } : u
                )
            );

            toast.success(
                nextBlocked
                    ? `${user.name} has been blocked.`
                    : `${user.name} has been unblocked.`
            );
        } catch (err) {
            toast.error("Failed to update user status.");
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

    if (isPending || !session || !isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
                    <p className="text-gray-400 text-lg">
                        View all registered users and control their access.
                    </p>
                </div>

                <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 bg-zinc-800/50 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        <span>User</span>
                        <span>Role</span>
                        <span>Joined</span>
                        <span>Status</span>
                        <span className="text-right">Action</span>
                    </div>

                    {/* TABLE ROWS */}
                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-14 w-full bg-zinc-800 rounded-lg" />
                            ))}
                        </div>
                    ) : users.length === 0 ? (
                        <p className="text-zinc-500 text-sm py-12 text-center">
                            No users found.
                        </p>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-t border-zinc-800 items-center"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar
                                        size="sm"
                                        src={user.image || undefined}
                                        name={getInitials(user.name)}
                                        className="bg-blue-600 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{user.name}</p>
                                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                                    </div>
                                </div>

                                <span className="text-sm capitalize text-zinc-300">
                                    {user.role || "user"}
                                </span>

                                <span className="text-sm text-zinc-400">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "—"}
                                </span>

                                <span>
                                    {user.blocked ? (
                                        <span className="inline-block px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium">
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="inline-block px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                                            Active
                                        </span>
                                    )}
                                </span>

                                <div className="text-right">
                                    <Button
                                        onPress={() => handleToggleBlock(user)}
                                        isDisabled={updatingId === user._id || user.role === "admin"}
                                        className={`text-xs font-semibold px-4 py-1.5 rounded-lg ${
                                            user.blocked
                                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                : "bg-red-600 hover:bg-red-700 text-white"
                                        }`}
                                    >
                                        {updatingId === user._id
                                            ? "..."
                                            : user.blocked
                                            ? "Unblock"
                                            : "Block"}
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </Card>
            </div>
        </div>
    );
}