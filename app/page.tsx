import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Twin } from "@/components/twin";
import { Contact } from "@/components/contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Education />
      <Twin />
      <Contact />
    </main>
  );
}
