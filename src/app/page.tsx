import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
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
          <Projects />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
