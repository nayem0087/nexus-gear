"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import ProfileView from "@/components/ProfileView";

export default function UserProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/signin");
        }
    }, [isPending, session, router]);

    if (isPending || !session) {
        return null;
    }

    return <ProfileView accentColor="blue" />;
}