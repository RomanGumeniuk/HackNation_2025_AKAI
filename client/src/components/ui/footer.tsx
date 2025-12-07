import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const sections = [
        {
            title: "Kontakt",
            links: [
                { name: "Skontaktuj się", url: "https://akai.org.pl" },
            ]
        },
        {
            title: "Źródła danych",
            links: [
                { name: "RCL API", url: "#" },
                { name: "Sejm.gov.pl", url: "#" },
                { name: "BIP Instytucji", url: "#" },
            ]
        },
        {
            title: "Informacje prawne",
            links: [
                { name: "Regulamin", url: "#" },
                { name: "Warunki", url: "#" },
                { name: "Prywatność", url: "#" },
            ]
        }
    ];

    return (
        <footer className={"w-full bg-[#EDEFEE] border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"}>
            <div className={"px-6 py-8"}>
                <div className={"flex items-center gap-3 mb-8"}>
                    <Image src={"/logo.png"} width={"50"} height={"50"} alt={"AKAI Logo"} className={"drop-shadow-sm"} />
                    <span className={"text-2xl font-bold tracking-tight text-gray-800"}>Obywatel Prawa</span>
                </div>

                <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 mb-6"}>
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className={"text-lg font-bold text-gray-800 mb-4"}>{section.title}</h3>
                            <ul className={"space-y-2"}>
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.url}
                                            className={"text-gray-700 hover:text-sky-700 transition-colors duration-300 text-sm"}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={"border-t border-gray-300 pt-6 mt-6"}>
                    <div className={"flex flex-col md:flex-row justify-between items-center gap-4"}>
                        <p className={"text-sm text-gray-600"}>
                            © {new Date().getFullYear()} Obywatel Prawa. Wszelkie prawa zastrzeżone.
                        </p>
                        <p className={"text-xs text-gray-500"}>
                            Dane pochodzą z RCL, Sejm.gov.pl oraz BIP instytucji państwowych
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
