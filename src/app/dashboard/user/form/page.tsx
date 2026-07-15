"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Form, TextField, Label, Input, Button, FieldError } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";

type Priority = "low" | "medium" | "high";

export default function AddItemPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [imageUrl, setImageUrl] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect unauthenticated users. Doing this inside useEffect
    // (not directly in the render body) avoids calling router.push
    // during render, which React flags as a side-effect violation.
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/signin");
        }
    }, [isPending, session, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !shortDescription || !fullDescription || !price || !date) {
            toast.error("Please fill in all required fields!");
            return;
        }

        setIsSubmitting(true);

        const newProduct = {
            title,
            shortDescription,
            fullDescription,
            price: parseFloat(price),
            date,
            priority,
            image: imageUrl || undefined,
            createdBy: session?.user?.id,
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to add product");
            }

            toast.success("Item added successfully! 🚀");

            // reset form
            setTitle("");
            setShortDescription("");
            setFullDescription("");
            setPrice("");
            setDate("");
            setPriority("medium");
            setImageUrl("");

            router.push("/items");
            router.refresh();
        } catch (err) {
            toast.error("Something went wrong while adding the item.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // While session is loading, or if we're about to redirect, render nothing.
    if (isPending || !session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#07070a] p-6 md:p-12 text-white">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Add New Item</h1>

                <Form
                    onSubmit={handleSubmit}
                    className="bg-[#0b0b0f] p-8 rounded-2xl border border-white/10 space-y-5"
                >
                    <TextField name="title" isRequired>
                        <Label className="text-sm font-medium text-gray-300 ">Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 border-white/10 bg-black/50 rounded-xl p-2 w-full"
                            placeholder="Gaming Laptop X"
                        />
                        <FieldError />
                    </TextField>

                    <TextField name="shortDescription" isRequired>
                        <Label className="text-sm font-medium text-gray-300">
                            Short Description
                        </Label>
                        <Input
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            className="mt-2 border-white/10 bg-black/50 rounded-xl  p-2 w-full"
                            placeholder="A quick one-line summary"
                        />
                        <FieldError />
                    </TextField>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">
                            Full Description
                        </label>
                        <textarea
                            name="fullDescription"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            required
                            className="mt-2 w-full min-h-[120px] rounded-xl border border-white/10 bg-black/50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Provide detailed information..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField name="price" isRequired>
                            <Label className="text-sm font-medium text-gray-300">
                                Price ($)
                            </Label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-2 border-white/10 bg-black/50 rounded-xl p-2 ml-2"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                            <FieldError />
                        </TextField>

                        <TextField name="date" isRequired>
                            <Label className="text-sm font-medium text-gray-300">Date</Label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-2 border-white/10 bg-black/50 rounded-xl p-2 ml-2"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Priority</label>
                        <select
                            name="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            className="mt-2 w-full h-12 rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <TextField name="image">
                        <Label className="text-sm font-medium text-gray-300">
                            Image URL{" "}
                            <span className="text-gray-500 text-xs">(optional)</span>
                        </Label>
                        <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="mt-2 border-white/10 bg-black/50 rounded-xl p-2 w-full"
                            placeholder="https://..."
                        />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {isSubmitting ? "Adding..." : "Submit Item"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}