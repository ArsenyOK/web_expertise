import Blog from "../components/sections/Blog";
import Clients from "../components/sections/Clients";
import Expertise from "../components/sections/Expertise";
import Hero from "../components/sections/Hero";
import Process from "../components/sections/Process";
import Projects from "../components/sections/Projects";

type HomeProps = {
  onContactOpen: () => void;
  navigateTo: (path: string, hash?: string) => void;
  currentPath: string;
};

const Home = ({ onContactOpen, navigateTo, currentPath }: HomeProps) => {
  return (
    <>
      <Hero onContactOpen={onContactOpen} />
      <Expertise />
      <Projects onNavigate={navigateTo} />
      <Clients />
      <Process />
      <Blog onNavigate={navigateTo} currentPath={currentPath} />
    </>
  );
};

export default Home;
