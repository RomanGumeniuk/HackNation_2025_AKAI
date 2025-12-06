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
            <header className={"flex justify-between w-full h-20 max-h-20 bg-[#EDEFEE]"}>
                <Link href={"/"} className={"flex items-center gap-3 "}>
                    <Image src={"/logo.png"} width={"80"} height={"80"} alt={"AKAI Logo"}  />
                    <span className={"text-3xl font-semibold"}>Obywatel Prawa</span>
                </Link>

                <div className={"flex items-center gap-10 mr-40"}>
                    {routes.map(route => (
                        <Link key={route.name} href={route.url} className={"hover:text-sky-700 transition"}>{route.name}</Link>
                    ))}
                </div>
            </header>
        </>
    )
}