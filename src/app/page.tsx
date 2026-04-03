import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <Marquee />
        <About />
        <Benefits />
        <Portfolio />
        <Services />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
