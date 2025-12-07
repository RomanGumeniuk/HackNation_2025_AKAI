import { GraphEdge, GraphNode } from "reagraph";

export const graph_nodes: GraphNode[] = [
    // --- ROOTS: The Foundation ---
    {
        id: "1",
        label: "Polityka Energetyczna Polski do 2040 r. (PEP2040)",
        fill: "#00FF00",
        data: {
            description: "Strategiczny dokument wyznaczający kierunki transformacji energetycznej.",
            date: "2021-02-02",
            author: "Rada Ministrów"
        }
    },
    {
        id: "2",
        label: "Dyrektywa RED III (Implementacja)",
        data: { // No color - In progress
            description: "Dostosowanie prawa krajowego do nowych wymogów unijnych OZE.",
            date: "2024-01-15",
            author: "Ministerstwo Klimatu"
        }
    },

    // --- BRANCH: Nuclear Energy (Atom) ---
    {
        id: "3",
        label: "Specustawa Jądrowa (Nowelizacja)",
        fill: "#00FF00",
        data: {
            description: "Przepisy usprawniające wydawanie decyzji środowiskowych dla elektrowni.",
            date: "2023-04-14",
            author: "Sejm RP"
        }
    },
    {
        id: "4",
        label: "Ustawa o finansowaniu elektrowni jądrowej",
        data: { // No color - Still working on the model
            description: "Model finansowy SaHo dla pierwszej polskiej elektrowni.",
            date: "2024-02-20",
            author: "Skarb Państwa"
        }
    },
    {
        id: "5",
        label: "Projekt referendalny 'Stop Atom'",
        fill: "#FF0000",
        data: {
            description: "Obywatelski projekt wstrzymujący budowę elektrowni. Odrzucony w pierwszym czytaniu.",
            date: "2023-09-10",
            author: "Komitet Obywatelski"
        }
    },

    // --- BRANCH: Wind Energy (Wiatraki) ---
    {
        id: "6",
        label: "Nowelizacja Ustawy 10H",
        fill: "#00FF00",
        data: {
            description: "Zliberalizowanie zasad odległościowych dla wiatraków (700m).",
            date: "2023-03-09",
            author: "Rząd RP"
        }
    },
    {
        id: "7",
        label: "Poprawka '500 metrów'",
        fill: "#FF0000",
        data: {
            description: "Odrzucona poprawka senacka zmniejszająca dystans do 500m.",
            date: "2023-02-28",
            author: "Senat RP"
        }
    },
    {
        id: "8",
        label: "Ustawa o Morskich Farmach Wiatrowych (Offshore)",
        fill: "#00FF00",
        data: {
            description: "Ramy prawne dla budowy wiatraków na Bałtyku.",
            date: "2021-01-20",
            author: "Ministerstwo Aktywów"
        }
    },

    // --- BRANCH: Coal & Transition (Górnictwo) ---
    {
        id: "9",
        label: "Ustawa o NABE",
        fill: "#FF0000",
        data: {
            description: "Utworzenie Narodowej Agencji Bezpieczeństwa Energetycznego. Projekt wycofany.",
            date: "2023-10-10",
            author: "MAP"
        }
    },
    {
        id: "10",
        label: "Ustawa o osłonach socjalnych dla górników",
        fill: "#00FF00",
        data: {
            description: "Pakiety odpraw i urlopów górniczych w zamian za zamykanie kopalń.",
            date: "2022-05-12",
            author: "Związki Zawodowe / Rząd"
        }
    },

    // --- BRANCH: Prosumers & Households (Fotowoltaika) ---
    {
        id: "11",
        label: "Zmiana systemu rozliczeń (Net-billing)",
        fill: "#00FF00",
        data: {
            description: "Przejście z net-meteringu na system sprzedażowy.",
            date: "2022-04-01",
            author: "Ministerstwo Klimatu"
        }
    },
    {
        id: "12",
        label: "Dotacja Mój Prąd 6.0",
        data: { // Processing new edition
            description: "Nowa edycja programu obejmująca magazyny energii.",
            date: "2024-03-01",
            author: "NFOŚiGW"
        }
    },

    // --- BRANCH: Electromobility (Auta elektryczne) ---
    {
        id: "13",
        label: "Ustawa o elektromobilności",
        fill: "#00FF00",
        data: {
            description: "Wprowadzenie Stref Czystego Transportu (SCT).",
            date: "2022-12-02",
            author: "Sejm RP"
        }
    },
    {
        id: "14",
        label: "Podatek od aut spalinowych",
        data: { // Processing
            description: "Projekt opłaty rejestracyjnej uzależnionej od normy Euro.",
            date: "2024-01-20",
            author: "Ministerstwo Finansów"
        }
    },
    {
        id: "15",
        label: "Zakaz wjazdu aut LPG do centrów miast",
        fill: "#FF0000",
        data: {
            description: "Kontrowersyjna poprawka samorządowa, odrzucona przez wojewodę.",
            date: "2023-11-15",
            author: "Rada Miasta"
        }
    }
];

export const graph_edges: GraphEdge[] = [
    // Root connections
    { id: "e1-2", source: "1", target: "2" }, // PEP2040 -> EU Directive
    { id: "e1-3", source: "1", target: "3" }, // PEP2040 -> Nuclear
    { id: "e1-6", source: "1", target: "6" }, // PEP2040 -> Wind 10H
    { id: "e1-9", source: "1", target: "9" }, // PEP2040 -> Coal Agency
    { id: "e1-13", source: "1", target: "13" }, // PEP2040 -> Electromobility

    // Nuclear Branch
    { id: "e3-4", source: "3", target: "4" }, // Nuclear Act -> Financing Model
    { id: "e3-5", source: "3", target: "5" }, // Nuclear Act -> Protest Bill

    // Wind Branch
    { id: "e6-7", source: "6", target: "7" }, // 10H -> Rejected 500m amendment
    { id: "e6-8", source: "6", target: "8" }, // Wind Onshore -> Wind Offshore (Relation)

    // Coal Branch
    { id: "e9-10", source: "9", target: "10" }, // NABE -> Social Shields (Related)

    // Prosumer Branch (Connected to Wind/Renewables)
    { id: "e6-11", source: "6", target: "11" }, // Renewables -> Net Billing
    { id: "e11-12", source: "11", target: "12" }, // Net Billing -> Subsidy Program

    // Electromobility Branch
    { id: "e13-14", source: "13", target: "14" }, // Electro Act -> Combustion Tax
    { id: "e13-15", source: "13", target: "15" }, // Electro Act -> LPG Ban
];