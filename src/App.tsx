import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Blog from "./components/sections/Blog";
import Clients from "./components/sections/Clients";
import Contact from "./components/sections/Contact";
import Expertise from "./components/sections/Expertise";
import Hero from "./components/sections/Hero";
import Process from "./components/sections/Process";
import Projects from "./components/sections/Projects";

const App = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Expertise />
      <Projects />
      <Clients />
      <Process />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
