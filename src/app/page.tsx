import { AuroraBackground } from "@/components/AuroraBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <AuroraBackground />
      <div className="grain" aria-hidden />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Process />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
