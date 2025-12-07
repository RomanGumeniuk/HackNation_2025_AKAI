import Link from "next/link";
import Image from "next/image";

export default function Navbar(){

    const routes = [
        {name: "Dziennik ustaw", url : "/dziennik_ustaw"},
        {name: "Konsultacje", url : "/konsultacje"},
        {name: "Asystent", url : "/asystent"},
    ]

    return (
        <>
            <header className={"flex justify-between items-center w-full h-20 px-6 bg-[#EDEFEE] shadow-md"}>
                <Link href={"/"} className={"flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"}>
                    <Image src={"/logo.png"} width={"70"} height={"70"} alt={"AKAI Logo"} className={"drop-shadow-sm"} />
                    <span className={"text-3xl font-bold text-black"}>Obywatel Prawa</span>
                </Link>

                <nav className={"flex items-center gap-8 mr-20"}>
                    {routes.map(route => (
                        <Link 
                            key={route.name} 
                            href={route.url} 
                            className={"text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-white/50 hover:text-sky-700 transition-all duration-300 hover:shadow-sm"}
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    )
}