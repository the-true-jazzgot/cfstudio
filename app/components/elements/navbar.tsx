import { LogoComponent } from "./logo";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
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