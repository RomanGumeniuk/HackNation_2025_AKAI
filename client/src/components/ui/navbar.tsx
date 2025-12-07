import Link from "next/link";
import Image from "next/image";
import { Wcag } from "../accesibility/Wcag";

export default function Navbar() {
  const routes = [
    { name: "Dziennik ustaw", url: "/ustawy" },
    { name: "Konsultacje", url: "/konsultacje" },
    { name: "Asystent", url: "/pdf" },
    { name: "Edukacja", url: "/edukacja" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200 group"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                width={60}
                height={60}
                alt="AKAI Logo"
                className="drop-shadow-sm"
              />
            </div>
            <div>
              <span className="text-[1.6rem] font-bold text-gray-900 tracking-tight block">
                Obywatel Prawa
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {routes.map((route, index) => (
              <Link
                key={route.name}
                href={route.url}
                className="relative text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-[#EDEFEE] hover:text-[#394788] transition-all duration-200 group"
              >
                {route.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#394788] group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
            <Wcag />
          </nav>
        </div>
      </div>
    </header>
  );
}