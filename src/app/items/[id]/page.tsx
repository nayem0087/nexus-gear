"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
    Button,
    Card,
    Skeleton,
    TextField,
    Label,
    Input,
    TextArea,
} from "@heroui/react";
import NextImage from "next/image";
import { CloudCheck, PencilToLine, SquareDashedText, TrashBin } from "@gravity-ui/icons";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<any>({});
    const [saving, setSaving] = useState(false);

    // অথেন্টিকেশন রিডাইরেক্ট লজিক
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/signin");
        }
    }, [session, isPending, router]);

    // ডাটা ফেচিং লজিক
    useEffect(() => {
        if (!session) return;

        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setForm(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, session]);

    const handleChange = (field: string, value: string) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const updated = await res.json();
            setProduct(updated);
            setIsEditing(false);
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
            });
            router.push("/items");
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    if (isPending || loading) {
        return (
            <div className="w-full bg-black text-white p-6 md:p-12">
                <div className="max-w-[900px] mx-auto">
                    <Skeleton className="h-10 w-1/2 mb-6 rounded-lg bg-zinc-700" />
                    <Skeleton className="h-[300px] w-full rounded-xl mb-6 bg-zinc-700" />
                    <Skeleton className="h-4 w-full mb-2 bg-zinc-700" />
                    <Skeleton className="h-4 w-3/4 bg-zinc-700" />
                </div>
            </div>
        );
    }

    if (!session) return null;

    if (!product) {
        return (
            <div className="w-full bg-black text-white p-12 text-center">
                <p className="text-xl text-zinc-400">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-black text-white p-6 md:p-12">
            <div className="max-w-[900px] mx-auto">
                <Button
                    variant="light"
                    className="mb-6 text-zinc-400"
                    onClick={() => router.push("/items")}
                >
                    ← Back to Collection
                </Button>

                <Card className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden rounded-xl mb-8">
                        <NextImage
                            src={product.image || "/fallback.jpg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <TextField className="w-full" value={form.title || ""} onChange={(value) => handleChange("title", value)}>
                                <Label>Title</Label>
                                <Input />
                            </TextField>

                            <TextField className="w-full" value={form.location || ""} onChange={(value) => handleChange("location", value)}>
                                <Label>Location</Label>
                                <Input />
                            </TextField>

                            <TextField className="w-full" type="number" value={form.price || ""} onChange={(value) => handleChange("price", value)}>
                                <Label>Price</Label>
                                <Input />
                            </TextField>

                            <TextField className="w-full" value={form.description || ""} onChange={(value) => handleChange("description", value)}>
                                <Label>Description</Label>
                                <TextArea rows={5} />
                            </TextField>

                            <div className="flex gap-10 pt-4">
                                <Button className='flex gap-1 items-center bg-cyan-800 py-1 px-3 text-white rounded-full text-sm' isLoading={saving} onClick={handleSave}>
                                   <CloudCheck/> Save Changes
                                </Button>
                                <Button className='flex gap-1 items-center bg-red-800 py-1 px-3 text-white rounded-full text-sm' onClick={() => { setIsEditing(false); setForm(product); }}>
                                   <SquareDashedText/> Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                <h1 className="text-3xl md:text-4xl font-extrabold">{product.title}</h1>
                                <span className="text-2xl font-bold text-blue-400">${product.price}</span>
                            </div>

                            <p className="text-zinc-500 mb-6">{product.location}</p>

                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                                <p className="text-zinc-400 leading-relaxed">{product.description}</p>
                            </section>

                            {product.specifications && (
                                <section className="mb-8">
                                    <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                                    <ul className="text-zinc-400 space-y-1">
                                        {Object.entries(product.specifications).map(([key, value]: any) => (
                                            <li key={key}>
                                                <span className="text-zinc-500">{key}:</span> {value}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <div className="flex gap-10 pt-4 border-t border-zinc-800 mt-6">
                                <Button className='flex gap-1 items-center bg-cyan-800 py-1 px-3 text-white rounded-full text-sm' onClick={() => setIsEditing(true)}>
                                    <PencilToLine/> Edit
                                </Button>
                                <Button className='flex gap-1 items-center bg-red-800 py-1 px-3 text-white rounded-full text-sm' onClick={handleDelete}>
                                    <TrashBin/> Delete
                                </Button>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}