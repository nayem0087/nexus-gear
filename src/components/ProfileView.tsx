"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Card, Button, Input, TextField, Label } from "@heroui/react";
import { Pencil } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function getInitials(name: string | null | undefined): string {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

interface ProfileViewProps {
    /** Ring/badge accent color, so the admin and user pages can look visually distinct */
    accentColor?: "purple" | "blue";
}

const ACCENT_CLASSES = {
    purple: {
        ring: "ring-purple-500",
        badge: "bg-purple-500/20 text-purple-300",
    },
    blue: {
        ring: "ring-blue-500",
        badge: "bg-blue-500/20 text-blue-300",
    },
};

export default function ProfileView({ accentColor = "blue" }: ProfileViewProps) {
    const { data: session, isPending, refetch } = useSession();
    const user = session?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        bio: "",
        skills: "",
    });

    const accent = ACCENT_CLASSES[accentColor];

    const startEditing = () => {
        if (!user) return;
        setForm({
            name: user.name || "",
            bio: (user as any)?.bio || "",
            skills: (user as any)?.skills || "",
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await authClient.updateUser({
                name: form.name,
                bio: form.bio,
                skills: form.skills,
            } as any);

            toast.success("Profile updated!");
            setIsEditing(false);
            refetch?.();
        } catch (err) {
            toast.error("Failed to update profile.");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">
                You need to be signed in to view this page.
            </div>
        );
    }

    const bio = (user as any)?.bio as string | undefined;
    const skills = (user as any)?.skills as string | undefined;
    const role = (user as any)?.role as string | undefined;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-4xl mx-auto">
                <Card className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
                        {!isEditing && (
                            <Button
                                onPress={startEditing}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2"
                            >
                                <Pencil size={14} /> Edit Profile
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
                        {/* LEFT: AVATAR CARD */}
                        <Card className="p-6 bg-black border border-zinc-800 rounded-2xl flex flex-col items-center text-center">
                            <div
                                className={`w-24 h-24 rounded-full overflow-hidden ring-4 ${accent.ring} mb-4 flex items-center justify-center bg-zinc-800`}
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-white">
                                        {getInitials(user.name)}
                                    </span>
                                )}
                            </div>

                            {isEditing ? (
                                <TextField className="w-full mb-3">
                                    <Label className="text-xs text-gray-400">Name</Label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="mt-1 border-white/10 bg-zinc-900 rounded-xl text-center"
                                    />
                                </TextField>
                            ) : (
                                <h2 className="text-xl font-bold">{user.name}</h2>
                            )}

                            <p className="text-sm text-zinc-400 mb-3">{user.email}</p>

                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${accent.badge}`}
                            >
                                {role || "user"}
                            </span>

                            <div className="mt-5 w-full">
                                <p className="text-xs text-zinc-500 mb-1">Skills:</p>
                                {isEditing ? (
                                    <TextField className="w-full">
                                        <Input
                                            value={form.skills}
                                            onChange={(e) =>
                                                setForm({ ...form, skills: e.target.value })
                                            }
                                            placeholder="e.g. React, Node.js, MongoDB"
                                            className="border-white/10 bg-zinc-900 rounded-xl"
                                        />
                                    </TextField>
                                ) : (
                                    <p className="font-semibold text-sm">
                                        {skills && skills.trim() ? skills : "Not specified"}
                                    </p>
                                )}
                            </div>
                        </Card>

                        {/* RIGHT: ABOUT ME */}
                        <Card className="p-6 bg-black border border-zinc-800 rounded-2xl">
                            <h3 className="font-semibold mb-3">About Me</h3>
                            {isEditing ? (
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    placeholder="Tell us a little about yourself..."
                                    className="w-full min-h-[140px] rounded-xl border border-white/10 bg-zinc-900 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            ) : (
                                <p className="text-zinc-400 text-sm">
                                    {bio && bio.trim() ? bio : "No bio available."}
                                </p>
                            )}
                        </Card>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                onPress={() => setIsEditing(false)}
                                variant="bordered"
                                className="border-white/10 text-white px-5"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSave}
                                isDisabled={isSaving}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 font-semibold"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}