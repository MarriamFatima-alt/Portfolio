import { getProfile } from "@/lib/data";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import EducationCerts from "@/components/EducationCerts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Revalidate periodically so edits to the FastAPI-backed profile data show
// up without a full redeploy.
export const revalidate = 60;

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen">
      <Nav name={profile.name} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills profile={profile} />
      <Experience profile={profile} />
      <Projects profile={profile} />
      <EducationCerts profile={profile} />
      <Contact profile={profile} />
      <Footer name={profile.name} />
    </main>
  );
}
