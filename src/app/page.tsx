import HeroV2 from '@/components/v2/HeroV2';
import WorkGridV2 from '@/components/v2/WorkGridV2';
import AboutV2 from '@/components/v2/AboutV2';
import ContactV2 from '@/components/v2/ContactV2';
import { projects } from '@/data/projects';

export default function Page() {
  const featuredProjects = projects.filter((project) => project.aspectRatio === 'horizontal').slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white selection:bg-[#E5A93B]/30">
      <div className="film-grain opacity-60" />
      <HeroV2 featuredProjects={featuredProjects} />
      <WorkGridV2 projects={projects} />
      <AboutV2 />
      <ContactV2 />
    </main>
  );
}
