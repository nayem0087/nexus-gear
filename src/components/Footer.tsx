"use client";

import Link from "next/link";
import { 
  Envelope, 
  Handset, 
  Cpu, // Star এর পরিবর্তে গিয়ার বা টেক রিলেটেড আইকন ব্যবহার করা ভালো
  LogoFacebook, 
  LogoGithub, 
  LogoLinkedin, 
  MapPin 
} from "@gravity-ui/icons";

export default function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07070a] text-gray-400 border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          
          {/* Logo & About Section */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex md:h-12 h-8 md:w-12 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md">
                <span className="text-base font-black text-white tracking-wider">
                  <Cpu />
                </span>
              </div>
              <span className="md:text-4xl text-2xl font-bold text-white tracking-tight">
                Nexus<span className="text-blue-500">Gear</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400/80 leading-relaxed max-w-sm">
              Your ultimate destination for premium tech gear. Empowering creators and professionals with top-tier hardware and innovative solutions.
            </p>
            <div className="flex items-center gap-4 pt-6">
              <SocialLink href="https://www.facebook.com/share/v/1BS7PC4kGk/" icon={<LogoFacebook className="h-5 w-5" />} />
              <SocialLink href="https://github.com/nayem0087" icon={<LogoGithub className="h-5 w-5" />} />
              <SocialLink href="https://www.linkedin.com/in/nayem-ahmmed" icon={<LogoLinkedin className="h-5 w-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition duration-200">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition duration-200">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition duration-200">Categories</Link></li>
              <li><Link href="/auth/signin" className="hover:text-white transition duration-200">My Account</Link></li>
              <li><Link href="/cart" className="hover:text-white transition duration-200">View Cart</Link></li>
            </ul>
          </div>

          {/* Inventory Management */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Management</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/items/add" className="hover:text-white transition duration-200">Add New Gear</Link></li>
              <li><Link href="/items/manage" className="hover:text-white transition duration-200">Inventory Dashboard</Link></li>
              <li><Link href="/orders" className="hover:text-white transition duration-200">Order History</Link></li>
              <li><Link href="/support" className="hover:text-white transition duration-200">Technical Support</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Envelope className="h-4 w-4 text-blue-400" />
                <a href="mailto:naymk0087@gmail.com" className="hover:text-white transition duration-200">naymk0087@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Handset className="h-4 w-4 text-blue-400" />
                <span className="hover:text-white transition duration-200">+8801888-252746</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} NexusGear. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps): JSX.Element {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-blue-600"
    >
      {icon}
    </Link>
  );
}