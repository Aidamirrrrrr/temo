import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Stack } from "@/components/sections/stack";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact, Footer } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <I18nProvider>
      <CustomCursor />
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          <Stack />
          <Projects />
          <Testimonials />
          <Blog />
          <Faq />
          <CtaBanner />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
