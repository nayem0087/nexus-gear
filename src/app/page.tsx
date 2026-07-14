
import AnalyticsPreview from "@/components/AnalyticsPreview";
import Blogs from "@/components/Blogs";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import HappyCustomers from "@/components/HappyCustomers";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <Features/>
      <AnalyticsPreview/>
      <Blogs/>
      <Services/>
      <Highlights/>
      <HappyCustomers/>
      <CTA/>
    </div>
  );
}
