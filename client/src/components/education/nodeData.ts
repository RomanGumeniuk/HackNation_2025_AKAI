import { NodeInfo } from './types';

export const nodeInfos: NodeInfo[] = [
    {
        id: 'initiator-president',
        title: 'Prezydent RP',
        description: 'Projekt prezydencki - inicjatywa ustawodawcza Prezydenta',
        context: 'Prezydent Rzeczypospolitej jest jednym z podmiotów uprawnionych do występowania z inicjatywą ustawodawczą zgodnie z art. 118 Konstytucji RP. Projekty prezydenckie często dotyczą kluczowych spraw państwowych.'
    },
    {
        id: 'initiator-government',
        title: 'Rada Ministrów',
        description: 'Projekt rządowy - inicjatywa ustawodawcza rządu',
        context: 'Rada Ministrów (rząd) jest najczęściej występującym inicjatorem ustawodawczym. Projekty rządowe stanowią większość projektów ustaw wnoszonych do Sejmu i są szczegółowo opracowane przez ministerstwa.'
    },
    {
        id: 'initiator-senate',
        title: 'Senat RP',
        description: 'Projekt senacki - inicjatywa ustawodawcza Senatu',
        context: 'Senat jako izba wyższa polskiego parlamentu również posiada prawo inicjatywy ustawodawczej. Projekty senackie są zazwyczaj dobrze przemyślane i konsultowane.'
    },
    {
        id: 'initiator-deputies',
        title: 'Posłowie',
        description: 'Projekt poselski - grupa min. 15 posłów lub komisja sejmowa',
        context: 'Inicjatywę ustawodawczą może zgłosić grupa co najmniej 15 posłów lub komisja sejmowa. Projekty poselskie często są odpowiedzią na konkretne problemy społeczne lub polityczne.'
    },
    {
        id: 'initiator-citizens',
        title: 'Obywatele',
        description: 'Projekt obywatelski - inicjatywa 100 000 obywateli',
        context: 'Grupa co najmniej 100 000 obywateli mających prawo wybierania do Sejmu może wystąpić z obywatelską inicjatywą ustawodawczą. Jest to forma demokracji bezpośredniej pozwalająca obywatelom na aktywny udział w procesie legislacyjnym.'
    },
    {
        id: 'sejm-reading-1',
        title: 'Sejm - I Czytanie',
        description: 'Pierwsze czytanie projektu ustawy w Sejmie',
        context: 'Pierwsze czytanie odbywa się zazwyczaj na posiedzeniu właściwej komisji sejmowej. Dla ustaw o zmianie Konstytucji, budżetowych, podatkowych, dotyczących prawa wyborczego, regulujących ustrój i właściwość władz publicznych oraz kodeksów - na posiedzeniu plenarnym. Wnioskodawca prezentuje projekt i uzasadnienie oraz oświadczenie o zgodności z prawem UE.'
    },
    {
        id: 'sejm-committee',
        title: 'Sejm - Prace Komisji',
        description: 'Szczegółowa analiza projektu przez komisje sejmowe',
        context: 'Komisje przeprowadzają szczegółową analizę projektu, mogą wprowadzać poprawki i całkowicie zmieniać poszczególne artykuły. W pracach często uczestniczą eksperci - specjaliści w dziedzinie, której ustawa dotyczy. Posiedzenia komisji są otwarte dla mediów. Komisja wybiera sprawozdawcę, który przedstawi stanowisko na posiedzeniu plenarnym.'
    },
    {
        id: 'sejm-committee-2',
        title: 'Sejm - Komisja po II Czytaniu',
        description: 'Rozpatrzenie poprawek zgłoszonych podczas II czytania',
        context: 'Jeśli w trakcie drugiego czytania zgłoszone zostały poprawki i wnioski, co do których wcześniej komisja nie zajęła stanowiska, projekt zostaje ponownie przekazany do komisji. Komisja ocenia zgłoszone propozycje przy udziale ich autorów oraz opracowuje dodatkowe sprawozdanie.'
    },
    {
        id: 'sejm-reading-2',
        title: 'Sejm - II Czytanie',
        description: 'Drugie czytanie na posiedzeniu plenarnym Sejmu',
        context: 'Odbywa się zawsze na posiedzeniu plenarnym. Sprawozdawca przedstawia stanowisko komisji. Można zgłaszać poprawki i wnioski. Jeśli zgłoszono nowe propozycje, projekt jest ponownie kierowany do komisji w celu ich rozpatrzenia. Komisja ocenia zgłoszone propozycje i opracowuje dodatkowe sprawozdanie.'
    },
    {
        id: 'sejm-reading-3',
        title: 'Sejm - III Czytanie',
        description: 'Głosowanie nad projektem ustawy',
        context: 'Sejm głosuje nad każdym zgłoszonym wnioskiem i poprawkami do poszczególnych artykułów, a następnie nad całym projektem. Ustawa uchwalana jest zwykłą większością głosów (więcej głosów za niż przeciw) w obecności co najmniej połowy ustawowej liczby posłów (minimum 230 posłów).'
    },
    {
        id: 'senat-committee',
        title: 'Senat - Prace Komisji',
        description: 'Rozpatrywanie ustawy przez komisje senackie',
        context: 'Marszałek Senatu kieruje ustawę do właściwych komisji senackich (jednej lub kilku), które w terminie nie dłuższym niż 18 dni opracowują swoje stanowisko i przedstawiają je na forum Senatu w formie sprawozdania.'
    },
    {
        id: 'senat-decision',
        title: 'Senat - Decyzja',
        description: 'Senat podejmuje decyzję w sprawie ustawy',
        context: 'Senat ma 30 dni na podjęcie uchwały. Może: 1) przyjąć ustawę bez zmian, 2) wprowadzić poprawki do ustawy, 3) odrzucić ustawę w całości (weto senackie). Jeżeli Senat w ciągu 30 dni nie podejmie stosownej uchwały, ustawę uznaje się za uchwaloną w brzmieniu przyjętym przez Sejm.'
    },
    {
        id: 'sejm-veto-review',
        title: 'Sejm - Rozpatrzenie Stanowiska Senatu',
        description: 'Sejm rozpatruje weto lub poprawki Senatu',
        context: 'W przypadku odrzucenia ustawy lub wprowadzenia poprawek przez Senat, ustawa wraca do Sejmu. Sejm bezwzględną większością głosów (liczba głosów za jest większa niż suma głosów przeciw i wstrzymujących się) w obecności co najmniej połowy ustawowej liczby posłów może odrzucić uchwałę Senatu. Jeżeli tego nie zrobi, stanowisko Senatu uważa się za przyjęte.'
    },
    {
        id: 'president-signature',
        title: 'Prezydent - Podpisanie',
        description: 'Prezydent podpisuje ustawę',
        context: 'Marszałek Sejmu przekazuje ustawę do podpisu Prezydentowi RP. Prezydent ma 21 dni na podpisanie ustawy i zarządzenie publikacji w Dzienniku Ustaw. Zasadniczo ustawa wchodzi w życie po upływie 14 dni od dnia ogłoszenia (vacatio legis), chyba że sama określa termin dłuższy lub krótszy.'
    },
    {
        id: 'president-veto',
        title: 'Prezydent - Weto',
        description: 'Prezydent odmawia podpisania i zwraca do Sejmu',
        context: 'Prezydent może w ciągu 21 dni przekazać ustawę Sejmowi z umotywowanym wnioskiem o ponowne rozpatrzenie (weto prezydenckie). Jest to silne narzędzie kontroli, gdyż do odrzucenia weta potrzebna jest kwalifikowana większość 3/5 głosów w Sejmie.'
    },
    {
        id: 'president-tribunal',
        title: 'Trybunał Konstytucyjny',
        description: 'Prezydent kieruje ustawę do kontroli konstytucyjności',
        context: 'Prezydent może zwrócić się do Trybunału Konstytucyjnego z wnioskiem o stwierdzenie zgodności ustawy z Konstytucją. Jeśli Trybunał orzeknie o zgodności, Prezydent nie może odmówić podpisania. Jeśli stwierdzi niezgodność w całości - Prezydent odmawia podpisania. Jeśli tylko niektóre przepisy są niezgodne - Prezydent podpisuje z pominięciem tych przepisów lub zwraca do Sejmu w celu usunięcia niezgodności.'
    },
    {
        id: 'sejm-override',
        title: 'Sejm - Odrzucenie Weta Prezydenckiego',
        description: 'Sejm może odrzucić weto Prezydenta większością 3/5',
        context: 'Ostateczna decyzja należy do Sejmu, który może odrzucić stanowisko Prezydenta kwalifikowaną większością 3/5 głosów (276 głosów) w obecności co najmniej połowy ustawowej liczby posłów. Nieodrzucenie weta kończy proces legislacyjny. Odrzucenie weta oznacza, że Sejm nie zgadza się ze zgłaszanymi zastrzeżeniami i Prezydent jest zobowiązany ustawę podpisać.'
    },
    {
        id: 'publication',
        title: 'Publikacja i Wejście w Życie',
        description: 'Ustawa publikowana w Dzienniku Ustaw i wchodzi w życie',
        context: 'Po podpisaniu przez Prezydenta ustawa zostaje opublikowana w Dzienniku Ustaw Rzeczypospolitej Polskiej. Zgodnie z zasadą vacatio legis, ustawa wchodzi w życie po upływie 14 dni od dnia ogłoszenia, chyba że sama określa inny termin. Od tego momentu jest powszechnie obowiązującym aktem prawnym.'
    }
];
