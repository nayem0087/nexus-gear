"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Spinner, Dropdown, Label } from "@heroui/react";
import { Cpu, ChevronDown, ArrowRightFromSquare } from '@gravity-ui/icons';
import { LayoutDashboard, X, Menu } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsMenuOpen(false);
    }
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    const role = (user as any)?.role;
    return role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/items" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/20">
            <span className="text-xl font-bold text-white"><Cpu /></span>
          </div>
          <div className="leading-none">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nexus<span className="text-blue-500">Gear</span>
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center gap-4">
              {isPending ? <Spinner size="sm" /> : user ? (
                <Dropdown placement="bottom-end">
                  <Dropdown.Trigger className="flex items-center gap-2 rounded-full text-white border border-white/10 bg-[#07070a] hover:bg-white/5 pl-1.5 pr-3 py-1 cursor-pointer outline-none transition-colors">
                    <Avatar size="sm" src={user?.image || undefined} name={getInitials(user?.name)} className="bg-blue-600" />
                    <span className="text-sm font-semibold text-white">{user.name?.split(" ")[0]}</span>
                    <ChevronDown className="size-3.5 text-gray-400" />
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => key === 'logout' && handleSignOut()}>
                      <Dropdown.Item id="dashboard" className="flex gap-2 text-white" href={getDashboardPath()}>
                        <LayoutDashboard className="size-4" />
                        <Label>Dashboard</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="logout" className="flex gap-2 text-white" variant="danger">
                        <ArrowRightFromSquare className="size-4" />
                        <Label>Logout</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-sm font-medium text-blue-400 hover:text-blue-300">Sign In</Link>
                  <Link href="/auth/signup" className="py-2 px-4 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition">Get Started</Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07070a] px-4 pb-6 pt-4">
          <ul className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-px w-full bg-white/10 mb-4" />

          {isPending ? (
            <div className="flex justify-center py-2">
              <Spinner size="sm" />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2">
                <Avatar size="sm" src={user?.image || undefined} name={getInitials(user?.name)} className="bg-blue-600" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <Link
                href={getDashboardPath()}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 bg-black text-white transition"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition text-left"
              >
                <ArrowRightFromSquare className="size-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/signin"
                onClick={closeMenu}
                className="text-center rounded-xl px-4 py-3 text-sm font-medium text-blue-400 border border-white/10 hover:bg-white/5 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeMenu}
                className="text-center rounded-xl px-4 py-3 bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}