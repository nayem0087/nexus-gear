"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import ProfileView from "@/components/ProfileView";

export default function AdminProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const isAdmin = session?.user?.role === "admin";

    useEffect(() => {
        if (!isPending && (!session || !isAdmin)) {
            router.push("/");
        }
    }, [isPending, session, isAdmin, router]);

    if (isPending || !session || !isAdmin) {
        return null;
    }

    return <ProfileView accentColor="purple" />;
}