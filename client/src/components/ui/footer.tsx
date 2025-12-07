import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const sections = [
        {
            title: "O Projekcie",
            links: [
                { name: "O nas", url: "#" },
                { name: "Jak to działa", url: "#" },
                { name: "FAQ", url: "#" },
            ]
        },
        {
            title: "Źródła danych",
            links: [
                { name: "RCL API", url: "#" },
                { name: "Sejm.gov.pl", url: "https://sejm.gov.pl" },
                { name: "BIP Instytucji", url: "#" },
            ]
        },
        {
            title: "Społeczność",
            links: [
                { name: "GitHub", url: "https://github.com/akai-org" },
                { name: "Newsletter", url: "#" },
                { name: "Zgłoś błąd", url: "#" },
            ]
        },
        {
            title: "Kontakt",
            links: [
                { name: "Skontaktuj się", url: "https://akai.org.pl" },
                { name: "Email", url: "mailto:kontakt@akai.org.pl" },
            ]
        }
    ];

    return (
        <footer className="w-full bg-gray-200 bg-white border-t-1 ">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex items-center gap-3 mb-10">
                    <Image 
                        src="/logo.png" 
                        width={50} 
                        height={50} 
                        alt="AKAI Logo" 
                        className="drop-shadow-sm" 
                    />
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                        Obywatel Prawa
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.url}
                                            className="inline-block text-gray-600 hover:text-[#394788] hover:bg-gray-100 transition-all duration-200 text-sm px-2 py-1 rounded"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Loga partnerów */}
                <div className="border-t border-[#394788] pt-8 mb-8">
                    <p className="text-xs text-[#394788] font-semibold uppercase tracking-wider mb-6 text-center">Partnerzy i źródła danych</p>
                    <div className="flex justify-center items-center gap-10 flex-wrap">
                        <Link href="https://akai.org.pl" target="_blank" className="group">
                            <Image 
                                src="/logo.png" 
                                width={50} 
                                height={50} 
                                alt="AKAI Logo" 
                                className="opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                            />
                        </Link>
                        <Link href="https://sejm.gov.pl" target="_blank" className="group">
                            <Image 
                                src="/Sejm_logo.svg" 
                                width={90} 
                                height={45} 
                                alt="Sejm RP Logo" 
                                className="opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                            />
                        </Link>
                        <Link href="https://bip.gov.pl" target="_blank" className="group">
                            <Image 
                                src="/Logo_BIP_uproszczone.svg.png" 
                                width={70} 
                                height={45} 
                                alt="BIP Logo" 
                                className="opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
                            />
                        </Link>
                    </div>
                </div>

                {/* Dolna sekcja */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-400">
                                © {new Date().getFullYear()} Obywatel Prawa
                            </p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </footer>
    );
}
