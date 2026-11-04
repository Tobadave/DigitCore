import Navbar from "./comp/Navbar";
import { Hero, LogoSection } from "./comp/Components";

const Landing = () => {
  return (
    <div className="min-h-screen p-2 sm:p-3 lg:p-4">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[18px] bg-[#faf9f7]">
        <div className="px-5 pt-6 sm:px-8 sm:pt-7 lg:px-10">
          <Navbar />
          <Hero />
        </div>
        <LogoSection />
      </div>
    </div>
  );
};

export default Landing;
