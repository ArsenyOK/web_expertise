import Header from "./components/layout/Header";
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
    </main>
  );
};

export default App;
