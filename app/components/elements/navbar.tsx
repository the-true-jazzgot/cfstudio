import { LogoComponent } from "./logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-white/50 border-b-2 border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <LogoComponent />

        <nav className="flex gap-8 text-sm uppercase tracking-wide">
          <a href="#">Home</a>
          <a href="#">Co robimy?</a>
          <a href="#">Portfolio</a>
          <a href="#">Kontakt</a>
        </nav>
      </div>
    </header>
  );
}