"use client";

import {
  LayoutSideContent, EyeDashed, Briefcase,
  LayoutHeaderCellsLarge, Paperclip, ListUl,
  Person, ArrowRightFromSquare
} from "@gravity-ui/icons";
import { Drawer } from "@heroui/react";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { useSession } from "@/lib/auth-client";

interface NavItem {
  icon: FC<{ className?: string }>;
  href: string;
  label: string;
}

export function DashboardSidebar(): ReactElement {
    const { data: session } = useSession();
    const role = (session?.user as any)?.role || 'user';

    const UserNavLinks: NavItem[] = [
        { icon: LayoutHeaderCellsLarge, href: '/dashboard/user', label: "Overview" },
        { icon: Paperclip, href: '/items', label: "Products" },
        { icon: Paperclip, href: '/dashboard/user/form', label: "Add-Products" },
        { icon: Person, href: '/dashboard/user/profile', label: "Profile" }
    ];

    const AdminNavLinks: NavItem[] = [
        { icon: EyeDashed, href: '/dashboard/admin', label: "Overview" },
        { icon: Person, href: '/dashboard/admin/manage-user', label: "Manage Users" },
        { icon: Person, href: '/dashboard/admin/profile', label: "Profile" }
    ];

    const navLinksMap: Record<string, NavItem[]> = {
        user: UserNavLinks,
        admin: AdminNavLinks
    };

    const navItems = navLinksMap[role] || UserNavLinks;

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                    href={item.href}
                >
                    <item.icon className="size-5" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-800 bg-black p-4 lg:block min-h-screen">
                {navContent}
            </aside>

            {/* MOBILE DRAWER SIDEBAR */}
            <Drawer>

                <Drawer.Backdrop className="bg-black/70">
                    <Drawer.Content placement="left" className="bg-black text-white">
                        <Drawer.Dialog className="bg-black text-white h-full">
                            <Drawer.CloseTrigger className="text-white hover:bg-zinc-800 rounded-lg" />
                            <Drawer.Header className="bg-black text-white border-b border-zinc-800">
                                <Drawer.Heading className="text-white font-semibold">
                                    Navigation
                                </Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body className="bg-black text-white p-4">
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}