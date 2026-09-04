import Hero from "@/app/components/Home/Hero";
import Categories from "@/app/components/Home/Categories";
import FeaturedProducts from "@/app/components/Home/Feauturedproducts";
import Testimonials from "@/app/components/Home/Tesimonials";
import VisitCTA from "@/app/components/Home/VistCTA";
import WhyChooseUs from "./Whychooseus";

export default function HomePage() {
  return (
    <main className="bg-[#F7F8FA] text-[#3C3837]">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs/>
      <Testimonials />
      <VisitCTA />
    </main>
  );
}