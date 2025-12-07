import { GraphEdge, GraphNode } from "reagraph";

export const graph_nodes: GraphNode[] = [
    {
        id: "init",
        label: "Projekt poselski - 15 posłów",
        fill: "#394788",
        size: 25,
        data: {
            description: "Inicjatywa ustawodawcza grupy 15 posłów Partii Liberalnej",
            date: "2024-09-15",
            author: "Grupa posłów Partii Liberalnej",
            stage: "Inicjatywa",
            details: "Projekt ustawy o zmianie ustawy – Prawo oświatowe oraz niektórych innych ustaw. Art. 1. W art. 4 po pkt 20 dodaje się pkt 20a definiujący 'społeczność szkolną' jako łącznie osoby: nauczycieli, uczniów i rodziców."
        }
    },
    {
        id: "reading-1",
        label: "I Czytanie w Sejmie",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Pierwsze czytanie na posiedzeniu plenarnym",
            date: "2024-10-08",
            stage: "I Czytanie",
            details: "Przedstawienie projektu przez wnioskodawców. Debata ogólna nad założeniami ustawy.",
            voting: {
                total: 460,
                present: 445,
                for: 312,
                against: 98,
                abstain: 35,
                result: "Przekazano do komisji"
            }
        }
    },
    {
        id: "committee-1",
        label: "Komisja Edukacji, Nauki i Młodzieży",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Szczegółowa analiza projektu przez komisję",
            date: "2024-10-15 - 2024-11-12",
            stage: "Prace komisji",
            details: "Prace komisji z udziałem ekspertów, wysłuchanie opinii, zgłoszenie poprawek"
        }
    },
    {
        id: "amendment-1",
        label: "Poprawka: Rozszerzenie definicji",
        fill: "#22C55E",
        size: 20,
        data: {
            description: "Poprawka przyjęta",
            date: "2024-10-28",
            stage: "Głosowanie nad poprawką",
            author: "Poseł Partii Konserwatywnej",
            details: "Rozszerzenie definicji społeczności szkolnej o pracowników administracji i obsługi szkół",
            voting: {
                total: 27,
                present: 27,
                for: 18,
                against: 7,
                abstain: 2,
                result: "Przyjęta"
            }
        }
    },
    {
        id: "amendment-2",
        label: "Poprawka: Rada uczniów",
        fill: "#22C55E",
        size: 20,
        data: {
            description: "Poprawka przyjęta",
            date: "2024-11-05",
            stage: "Głosowanie nad poprawką",
            author: "Poseł Partii Lewicowej",
            details: "Dodanie przepisów dotyczących obowiązkowego uczestnictwa przedstawicieli rady uczniów w posiedzeniach społeczności szkolnej",
            voting: {
                total: 27,
                present: 27,
                for: 21,
                against: 4,
                abstain: 2,
                result: "Przyjęta"
            }
        }
    },
    {
        id: "amendment-3",
        label: "Poprawka: Wyłączenie szkół prywatnych",
        fill: "#DC2626",
        size: 20,
        data: {
            description: "Poprawka odrzucona",
            date: "2024-11-08",
            stage: "Głosowanie nad poprawką",
            author: "Poseł Partii Prawicowej",
            details: "Wyłączenie szkół niepublicznych z obowiązku stosowania nowych przepisów - poprawka zakończyła proces",
            voting: {
                total: 27,
                present: 27,
                for: 5,
                against: 19,
                abstain: 3,
                result: "Odrzucona - koniec ścieżki"
            }
        }
    },
    {
        id: "reading-2",
        label: "II Czytanie w Sejmie",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Drugie czytanie z debatą nad poprawkami",
            date: "2024-11-20",
            stage: "II Czytanie",
            details: "Sprawozdawca przedstawił 47 poprawek komisji. Zgłoszono 12 nowych poprawek z sali plenarnej."
        }
    },
    {
        id: "amendment-4",
        label: "Poprawka: Finansowanie samorządów",
        fill: "#22C55E",
        size: 20,
        data: {
            description: "Poprawka przyjęta w zmienionej formie",
            date: "2024-11-25",
            stage: "Głosowanie nad poprawką",
            author: "Poseł Partii Ludowej",
            details: "Zwiększenie subwencji oświatowej dla samorządów o 350 mln zł rocznie",
            voting: {
                total: 27,
                present: 27,
                for: 19,
                against: 6,
                abstain: 2,
                result: "Przyjęta"
            }
        }
    },
    {
        id: "amendment-5",
        label: "Poprawka: Konsultacje z uczniami",
        fill: "#22C55E",
        size: 20,
        data: {
            description: "Poprawka przyjęta",
            date: "2024-11-26",
            stage: "Głosowanie nad poprawką",
            author: "Poseł Partii Liberalnej",
            details: "Wprowadzenie obowiązkowych konsultacji z radą uczniów przy zmianach w statucie szkoły i regulaminie oceniania",
            voting: {
                total: 27,
                present: 27,
                for: 23,
                against: 3,
                abstain: 1,
                result: "Przyjęta"
            }
        }
    },
    {
        id: "committee-2",
        label: "Komisja - po poprawkach",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Rozpatrzenie nowych poprawek po II czytaniu",
            date: "2024-11-25",
            stage: "Prace komisji",
            details: "Komisja zaakceptowała nowe poprawki i przygotowała projekt do III czytania"
        }
    },
    {
        id: "reading-3",
        label: "III Czytanie - Głosowanie końcowe",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Głosowanie nad całością ustawy",
            date: "2024-12-03",
            stage: "III Czytanie",
            details: "Głosowanie nad ustawą w brzmieniu przyjętym przez komisję wraz ze wszystkimi poprawkami",
            voting: {
                total: 460,
                present: 448,
                for: 385,
                against: 48,
                abstain: 15,
                result: "Ustawa uchwalona",
                votingDetails: {
                    "Partia Liberalna": { for: 145, against: 2, abstain: 1 },
                    "Partia Konserwatywna": { for: 135, against: 42, abstain: 5 },
                    "Partia Lewicowa": { for: 38, against: 0, abstain: 2 },
                    "Partia Ludowa": { for: 34, against: 1, abstain: 3 },
                    "Partia Prawicowa": { for: 3, against: 28, abstain: 4 },
                    "Inne": { for: 30, against: 2, abstain: 0 }
                }
            }
        }
    },
    {
        id: "senate-commission",
        label: "Komisja Nauki, Edukacji i Sportu Senatu",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Rozpatrzenie ustawy przez komisję senacką",
            date: "2024-12-05 - 2024-12-15",
            stage: "Prace komisji senackiej",
            details: "Komisja przeanalizowała ustawę i zaproponowała poprawki dotyczące samorządu uczniowskiego"
        }
    },
    {
        id: "senate-amendment-1",
        label: "Poprawka Senatu: Kompetencje rad uczniów",
        fill: "#22C55E",
        size: 20,
        data: {
            description: "Poprawka senacka przyjęta",
            date: "2024-12-15",
            stage: "Głosowanie nad poprawką senacką",
            author: "Senator",
            details: "Doprecyzowanie kompetencji rad uczniów w zakresie współdecydowania o życiu szkoły, w tym prawo opinii w sprawach uczniowskich",
            voting: {
                total: 100,
                present: 97,
                for: 82,
                against: 10,
                abstain: 5,
                result: "Przyjęta"
            }
        }
    },
    {
        id: "senate-vote",
        label: "Głosowanie w Senacie",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Senat wprowadził poprawki do ustawy",
            date: "2024-12-18",
            stage: "Decyzja Senatu",
            details: "Senat przyjął ustawę z poprawkami",
            voting: {
                total: 100,
                present: 97,
                for: 76,
                against: 15,
                abstain: 6,
                result: "Przyjęto z poprawkami"
            }
        }
    },
    {
        id: "sejm-senate-review",
        label: "Sejm - Rozpatrzenie poprawek Senatu",
        fill: "#5B8FA3",
        size: 25,
        data: {
            description: "Sejm rozpatruje poprawki wprowadzone przez Senat",
            date: "2024-12-20",
            stage: "Rozpatrzenie stanowiska Senatu",
            details: "Sejm przyjął wszystkie poprawki Senatu",
            voting: {
                total: 460,
                present: 441,
                for: 398,
                against: 28,
                abstain: 15,
                result: "Poprawki Senatu przyjęte"
            }
        }
    },
    {
        id: "president-wait",
        label: "Oczekiwanie na podpis Prezydenta",
        fill: "#FFA500",
        size: 25,
        data: {
            description: "Ustawa przekazana Prezydentowi do podpisu",
            date: "2024-12-21",
            stage: "U Prezydenta",
            details: "Data wpłynięcia do Prezydenta: 2024-12-21. Prezydent ma 21 dni na podjęcie decyzji (do 2025-01-11): podpisanie ustawy, skorzystanie z prawa weta lub skierowanie do Trybunału Konstytucyjnego.",
            receivedDate: "2024-12-21",
            deadline: "2025-01-11",
            daysToSign: 21
        }
    }
];

export const graph_edges: GraphEdge[] = [
    { id: "e1", source: "init", target: "reading-1" },
    { id: "e2", source: "reading-1", target: "committee-1" },
    
    { id: "e3a", source: "committee-1", target: "amendment-1" },
    { id: "e3b", source: "committee-1", target: "amendment-2" },
    { id: "e3c", source: "committee-1", target: "amendment-3" },
    
    { id: "e4a", source: "amendment-1", target: "reading-2" },
    { id: "e4b", source: "amendment-2", target: "reading-2" },
    
    { id: "e5a", source: "reading-2", target: "amendment-4" },
    { id: "e5b", source: "reading-2", target: "amendment-5" },
    
    { id: "e6a", source: "amendment-4", target: "committee-2" },
    { id: "e6b", source: "amendment-5", target: "committee-2" },
    
    { id: "e7", source: "committee-2", target: "reading-3" },
    { id: "e8", source: "reading-3", target: "senate-commission" },
    
    { id: "e9", source: "senate-commission", target: "senate-amendment-1" },
    { id: "e10", source: "senate-amendment-1", target: "senate-vote" },
    
    { id: "e11", source: "senate-vote", target: "sejm-senate-review" },
    { id: "e12", source: "sejm-senate-review", target: "president-wait" }
];
