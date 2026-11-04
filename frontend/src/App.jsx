import Navbar from "./comp/Navbar";
import Hero from "./pages/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] font-['Outfit',sans-serif] text-white antialiased">
      <Navbar />
      <Hero />
    </div>
  );
}
