import Header from "./components/layout/Header";
import Clients from "./components/sections/Clients";
import Expertise from "./components/sections/Expertise";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";

const App = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Expertise />
      <Projects />
      <Clients />
    </main>
  );
};

export default App;
