import { useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Blog from "./components/sections/Blog";
import Clients from "./components/sections/Clients";
import Expertise from "./components/sections/Expertise";
import Hero from "./components/sections/Hero";
import Process from "./components/sections/Process";
import Projects from "./components/sections/Projects";
import CustomCursor from "./components/ui-tools/CustomCursor";
import SmoothScroll from "./components/ui-tools/SmoothScroll";
import ContactModal from "./components/ui-tools/ContactModal";

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <SmoothScroll />
      <CustomCursor />
      <Header onContactOpen={() => setIsContactOpen(true)} />
      <Hero />
      <Expertise />
      <Projects />
      <Clients />
      <Process />
      <Blog />
      <Footer />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
};

export default App;
