import "./index.css";
import "./landing.css";
import Navbar from "./Navbar";
import { Hero, LogoSection } from "./Component";

export default function Landing() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf9f7]">
      <Navbar />
      <div className="mx-auto w-full max-w-[1741px] px-5 sm:px-8 xl:px-[3.2rem]">
        <Hero />
      </div>
      <LogoSection />
    </main>
  );
}
