// --- Hierarchiczna konfiguracja: typ -> województwo -> subregion -> operator -> URL ---
// Dane z Excela "Baza CMD Consulting 2024" (arkusze: BUR FIRMOWY + BUR INDYWIDUALNY)

const ENTRIES = [
  // =====================================================================
  //  BUR FIRMOWY
  // =====================================================================

  // --- dolnośląskie ---
  {
    type: "firmowy",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion wałbrzyski (powiat wałbrzyski, m. Wałbrzych)",
    operator: "Dolnośląska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Centrum Wsparcia Rozwoju Kompetencji Zawodowych",
    urls: ["https://www.darr.pl/9_1_c/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "dolnośląskie",
    subregion: "powiaty dzierżoniowski i świdnicki",
    operator: "Fundacja INCEPT",
    projekt: "Kompetencje i kwalifikacje - wsparcie zielonej transformacji",
    urls: ["http://fundacjaincept.pl/projekty/kompetencje-i-kwalifikacje/aktualnosci/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "dolnośląskie",
    subregion: "powiaty kłodzki i ząbkowicki",
    operator: "Sudecki Instytut Rozwoju Regionalnego",
    projekt: "Nowe kompetencje",
    urls: ["https://www.nowekompetencje.sirr.pl/o-projekcie/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion wałbrzyski (kłodzki, ząbkowicki, dzierżoniowski, wałbrzyski, świdnicki, kamiennogórski, Wałbrzych, Nowa Ruda)",
    operator: "Dolnośląska Agencja Współpracy Gospodarczej Sp. z o.o.",
    projekt: "Dotacje na usługi rozwojowe dla dolnośląskich firm",
    urls: ["https://dawg.pl/projekty/dotacje-na-uslugi-rozwojowe-dla-dolnoslskich-firm/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion legnicko-głogowski (głogowski, górowski, legnicki, m. Legnica, lubiński, polkowicki)",
    operator: "Agencja Rozwoju Regionalnego ARLEG S.A.",
    projekt: "Dotacje na usługi rozwojowe dla dolnośląskich firm",
    urls: ["https://arleg.eu/projekty/74a/"],
  },

  // --- kujawsko-pomorskie ---
  {
    type: "firmowy",
    wojewodztwo: "kujawsko-pomorskie",
    subregion: "całe województwo",
    operator: "Toruńska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Regionalny Fundusz Szkoleniowy II",
    urls: ["https://uslugirozwojowe.tarr.org.pl/aktualnosci"],
  },

  // --- lubelskie ---
  {
    type: "firmowy",
    wojewodztwo: "lubelskie",
    subregion: "powiaty lubelski, świdnicki, lubartowski, łęczyński, m. Lublin",
    operator: "Lubelski Park Naukowo-Technologiczny S.A.",
    projekt: "Park Nowych Kwalifikacji dla MŚP",
    urls: ["https://lpnt.pl/realizowane-projekty/park-nowych-kwalifikacji-dla-msp/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "lubelskie",
    subregion: "podregion bialski i chełmsko-zamojski",
    operator: "Stowarzyszenie Rozwoju Aktywności Społecznej TRIADA",
    projekt: "Usługi rozwojowe dla pracodawców w podregionie bialskim i chełmsko-zamojskim",
    urls: ["https://triada-chelm.pl/zrealizowane-projekty/uslugi-rozwojowe-dla-msp-w-podregionie-bialskim-i-chelmsko-zamojskim-2/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "lubelskie",
    subregion: "podregion puławski (janowski, kraśnicki, łukowski, opolski, puławski, rycki)",
    operator: "Fundacja Rozwoju Lubelszczyzny",
    projekt: "Finansowanie usług rozwojowych dla przedsiębiorstw z podregionu puławskiego",
    urls: ["https://fundacja.lublin.pl/finansowanie-uslug-rozwojowych-dla-mikro-malych-srednich-i-duzych-przedsiebiorstw-z-podregionu-pulawskiego-podmiotowy-system-finansowania-psf-w-oparciu-o-bur/"],
  },

  // --- lubuskie ---
  {
    type: "firmowy",
    wojewodztwo: "lubuskie",
    subregion: "podregion gorzowski (strzelecko-drezdenecki, gorzowski, słubicki, sulęciński, międzyrzecki, m. Gorzów Wlkp.)",
    operator: "Zachodnia Izba Przemysłowo-Handlowa / Agencja Rozwoju Regionalnego S.A.",
    projekt: "Lubuskie Bony Rozwojowe",
    urls: ["https://funduszeue.lubuskie.pl/nabory/"],
  },

  // --- łódzkie ---
  {
    type: "firmowy",
    wojewodztwo: "łódzkie",
    subregion: "całe województwo",
    operator: "Łódzka Agencja Rozwoju Regionalnego S.A.",
    projekt: "Bon - apetyt na rozwój 2",
    urls: ["https://bon2.larr.pl/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "łódzkie",
    subregion: "całe województwo",
    operator: "Łódzka Specjalna Strefa Ekonomiczna S.A.",
    projekt: "Strefa RozwoYou 3.0",
    urls: ["https://strefarozwoju.lodz.pl/"],
  },

  // --- małopolskie ---
  {
    type: "firmowy",
    wojewodztwo: "małopolskie",
    subregion: "subregion krakowski (miechowski, krakowski, m. Kraków, proszowicki, wielicki, bocheński, myślenicki)",
    operator: "Małopolska Agencja Rozwoju Regionalnego S.A.",
    projekt: "mbon nowa perspektywa",
    urls: ["https://mbon2024.marr.pl/o-projekcie/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "małopolskie",
    subregion: "subregion tarnowski (dąbrowski, m. Tarnów, tarnowski, brzeski)",
    operator: "Fundacja Rozwoju Regionu Rabka",
    projekt: "Tarnowskie Bony Rozwojowe",
    urls: ["https://frrr.pl/projekty/tbr.html"],
  },
  {
    type: "firmowy",
    wojewodztwo: "małopolskie",
    subregion: "subregion oświęcimski (olkuski, chrzanowski, oświęcimski, wadowicki)",
    operator: "Stowarzyszenie Społeczna Szkoła Zarządzania i Handlu",
    projekt: "NetBon2",
    urls: ["https://szih.pl/netbon2a/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "małopolskie",
    subregion: "subregion sądecki (limanowski, gorlicki, nowosądecki, m. Nowy Sącz)",
    operator: "Miasto Nowy Sącz",
    projekt: "Sądeckie Bony Szkoleniowe I",
    urls: ["https://bony2.mojszeftoja.pl/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "małopolskie",
    subregion: "subregion podhalański (nowotarski, suski, tatrzański)",
    operator: "Fundacja Rozwoju Regionu Rabka",
    projekt: "Bon dla Podhalańskiego Przedsiębiorcy 2",
    urls: ["https://frrr.pl/projekty/bony-2.html"],
  },

  // --- mazowieckie ---
  {
    type: "firmowy",
    wojewodztwo: "mazowieckie",
    subregion: "RWS (grodziski, legionowski, miński, nowodworski, otwocki, piaseczyński, pruszkowski, warszawski zachodni, wołomiński, Warszawa)",
    operator: "Wojewódzki Urząd Pracy w Warszawie",
    projekt: "Przedsiębiorco zainwestuj w swoją kadrę!",
    urls: ["https://wupwarszawa.praca.gov.pl/-/23440596-baza-uslug-rozwojowych-na-mazowszu"],
  },

  // --- opolskie ---
  {
    type: "firmowy",
    wojewodztwo: "opolskie",
    subregion: "całe województwo",
    operator: "Opolskie Centrum Rozwoju Gospodarki",
    projekt: "Adaptacyjność pracodawców i pracowników",
    urls: ["https://ocrg.opolskie.pl/dzialanie-5-5-adaptacyjnosc-pracodawcow-i-pracownikow-/"],
  },

  // --- podkarpackie ---
  {
    type: "firmowy",
    wojewodztwo: "podkarpackie",
    subregion: "subregion rzeszowski (m. Rzeszów, rzeszowski, dębicki, leżajski, łańcucki, ropczycko-sędziszowski)",
    operator: "Rzeszowska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Generator Kompetencji 3.0",
    urls: ["https://rarr.rzeszow.pl/projekty/generator-kompetencji-30/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "podkarpackie",
    subregion: "subregion krośnieński (m. Krosno, krośnieński, jasielski, brzozowski, sanocki, leski, bieszczadzki, strzyżowski)",
    operator: "Stawil Sp. z o.o.",
    projekt: "SK – program wsparcia podkarpackich pracodawców i pracowników",
    urls: ["https://programsk.stawil.pl/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "podkarpackie",
    subregion: "subregion przemyski (m. Przemyśl, przemyski, jarosławski, lubaczowski, przeworski)",
    operator: "Przemyska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Fundusz Usług Rozwojowych II",
    urls: ["https://funduszuslugrozwojowych2.parr.pl/ogloszenie-o-naborze-formularzy-zgloszeniowych-do-projektu-findusz-uslug-rozwojowych-ii-wsparcie-przedsiebiorcow-i-pracodawcow-oraz-ich-pracownikow-z-subregionu-przemyskiego"],
  },
  {
    type: "firmowy",
    wojewodztwo: "podkarpackie",
    subregion: "subregion tarnobrzeski (m. Tarnobrzeg, tarnobrzeski, stalowowolski, mielecki, niżański, kolbuszowski)",
    operator: "Agencja Rozwoju Regionalnego MARR S.A.",
    projekt: "Nowoczesne kompetencje w subregionie tarnobrzeskim",
    urls: ["https://marr.com.pl/projekt/nowoczesne-kompetencje-w-subregionie-tarnobrzeskim-2/"],
  },

  // --- podlaskie ---
  {
    type: "firmowy",
    wojewodztwo: "podlaskie",
    subregion: "całe województwo",
    operator: "Wojewódzki Urząd Pracy w Białymstoku",
    projekt: "Podmiotowy System Finansowania - realizacja usług rozwojowych",
    urls: ["https://wupbialystok.praca.gov.pl/podmiotowy-system-finansowania-uslug-rozwojowych-w-wojewodztwie-podlaskim-2024-2029"],
  },

  // --- pomorskie ---
  {
    type: "firmowy",
    wojewodztwo: "pomorskie",
    subregion: "subregion chojnicki (człuchowski, chojnicki, kościerski)",
    operator: "Centrum Edukacyjno-Wdrożeniowe w Chojnicach",
    projekt: "Usługi rozwojowe dla MŚP",
    urls: ["https://www.cewchojnice.eu/index.php/aktualnosci/item/604-projekt"],
  },
  {
    type: "firmowy",
    wojewodztwo: "pomorskie",
    subregion: "subregion nadwiślański (kwidzyński, malborski, starogardzki, sztumski, tczewski)",
    operator: "Powiatowy Urząd Pracy w Malborku",
    projekt: "Usługi rozwojowe dla MŚP",
    urls: ["https://nrk.pomorskie.pl/o-projekcie/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "pomorskie",
    subregion: "subregion metropolitalny (nowodworski, kartuski, gdański, pucki, wejherowski, m. Gdańsk, Gdynia, Sopot)",
    operator: "Agencja Rozwoju Pomorza S.A.",
    projekt: "Usługi rozwojowe dla MŚP",
    urls: ["https://www.arp.gda.pl/2518,aktualnosci"],
  },
  {
    type: "firmowy",
    wojewodztwo: "pomorskie",
    subregion: "subregion słupski (słupski, bytowski, lęborski, m. Słupsk)",
    operator: "Pomorska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Rozwój i kompetencje na miarę przyszłości subregionu słupskiego",
    urls: ["https://parr.slupsk.pl/rozwoj-i-kompetencje-na-miare-przyszlosci-subregionu-slupskiego/"],
  },

  // --- warmińsko-mazurskie ---
  {
    type: "firmowy",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "Instytut Badawczo-Szkoleniowy Sp. z o.o.",
    projekt: "Adaptacja - Usługi rozwojowe dla MŚP",
    urls: ["https://operator-msp.instytutbs.eu/rekrutacja/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "Stowarzyszenie Centrum Rozwoju Ekonomicznego Pasłęka",
    projekt: "FUR 3 - Fundusz Usług Rozwojowych",
    urls: ["https://screp.pl/uslugi-rozwojowe/fur-3-fundusz-uslug-rozwojowych/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "TECHPAL Sp. z o.o.",
    projekt: "Klucz do usług rozwojowych dla MŚP",
    urls: ["http://operator.techpal.com.pl/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "Inspire Consulting Sp. z o.o.",
    projekt: "Kompetentny region - Warmia i Mazury",
    urls: ["https://kompetentnyregion.eu/o-projekcie/"],
  },

  // --- wielkopolskie ---
  {
    type: "firmowy",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion koniński (słupecki, kolski, turecki, gnieźnieński, wrzesiński, koniński, m. Konin)",
    operator: "Agencja Rozwoju Regionalnego S.A. w Koninie",
    projekt: "Usługi rozwojowe - inwestycja w kapitał ludzki w podregionie konińskim",
    urls: ["https://uslugirozwojowe.arrkonin.org.pl/6-04-dla-przedsiebiorcow-jst-ngo/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion kaliski (jarociński, kaliski, kępiński, krotoszyński, ostrowski, ostrzeszowski, pleszewski, m. Kalisz)",
    operator: "Fundacja Kaliski Inkubator Przedsiębiorczości",
    projekt: "Subregion kaliski inwestuje w kadry!",
    urls: ["https://www.inkubator.kalisz.pl/finansujemy/dofinansowania-do-szkolen/subregion-kaliski-inwestuje-w-kadry-nowa-edycja-2024/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion poznański (m. Poznań, poznański, średzki, śremski, obornicki, szamotulski)",
    operator: "WARP / Stowarzyszenie na rzecz spółdzielni socjalnych",
    projekt: "Usługi rozwojowe dla Twojego biznesu",
    urls: ["https://warp.org.pl/dotacje/przedsiebiorca/uslugi-rozwojowe-dla-twojego-biznesu/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion pilski (chodzieski, pilski, wągrowiecki, złotowski, czarnkowsko-trzcianecki)",
    operator: "Fundusz Rozwoju i Promocji Województwa Wielkopolskiego S.A.",
    projekt: "Usługi rozwojowe w subregionie pilskim - szansą na zmianę",
    urls: ["http://rozwijamy.eu/"],
  },

  // --- zachodniopomorskie ---
  {
    type: "firmowy",
    wojewodztwo: "zachodniopomorskie",
    subregion: "całe województwo",
    operator: "Koszalińska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Usługi BUR kluczem do sukcesu przedsiębiorstwa",
    urls: ["https://uslugirozwojowe.karrsa.pl/"],
  },
  {
    type: "firmowy",
    wojewodztwo: "zachodniopomorskie",
    subregion: "całe województwo",
    operator: "Polska Fundacja Przedsiębiorczości",
    projekt: "Fundusz Usług Rozwojowych w woj. zachodniopomorskim - FUR 3",
    urls: ["https://fur.pfp.com.pl/o-projekcie"],
  },
  {
    type: "firmowy",
    wojewodztwo: "zachodniopomorskie",
    subregion: "całe województwo",
    operator: "Zachodniopomorska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Dofinansowanie usług rozwojowych dla zachodniopomorskich MMŚP III",
    urls: ["https://www.zarr.com.pl/eu_funds_category/w-realizacji/"],
  },

  // =====================================================================
  //  BUR INDYWIDUALNY
  // =====================================================================

  // --- dolnośląskie ---
  {
    type: "indywidualny",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion legnicko-głogowski (głogowski, górowski, legnicki, lubiński, polkowicki, m. Legnica)",
    operator: "ARLEG S.A.",
    projekt: "Usługi rozwojowe dla osób dorosłych z subregionu legnicko-głogowskiego",
    urls: ["https://arleg.eu/projekty/bur/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion wrocławski (milicki, oleśnicki, oławski, strzeliński, średzki, trzebnicki, wołowski, wrocławski, m. Wrocław)",
    operator: "Dolnośląska Agencja Współpracy Gospodarczej Sp. z o.o.",
    projekt: "Wsparcie rozwoju kompetencji mieszkańców subregionu wrocławskiego z wykorzystaniem BUR",
    urls: ["https://dawg.pl/projekty/wsparcie-rozwoju-kompetencji-mieszkancow-subregionu-wroclawskiego-z-wykorzystaniem-bur/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion wałbrzyski (dzierżoniowski, kłodzki, świdnicki, wałbrzyski, ząbkowicki, m. Wałbrzych)",
    operator: "AGROREG S.A.",
    projekt: "Usługi rozwojowe dla osób dorosłych z subregionu wałbrzyskiego",
    urls: ["https://www.agroreg.com.pl/index.php/joomla-pages-iii/categories-list/2-uncategorised/347-ogloszenie-o-naborze-nr-3-agroreg-2024"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "dolnośląskie",
    subregion: "subregion jeleniogórski (bolesławiecki, jaworski, jeleniogórski, kamiennogórski, lubański, lwówecki, zgorzelecki, złotoryjski, m. Jelenia Góra)",
    operator: "Karkonoska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Nowe kompetencje, nowe perspektywy",
    urls: ["https://karr.pl/nowe-kompetencje-nowe-perspektywy/"],
  },

  // --- kujawsko-pomorskie ---
  {
    type: "indywidualny",
    wojewodztwo: "kujawsko-pomorskie",
    subregion: "całe województwo",
    operator: "WUP Toruń",
    projekt: "Kierunek - rozwój",
    urls: ["https://wuptorun.praca.gov.pl/-/22387843-startujemy-z-projektem-kierunek-rozwoj-"],
  },

  // --- lubelskie ---
  {
    type: "indywidualny",
    wojewodztwo: "lubelskie",
    subregion: "podregion bialski i chełmsko-zamojski",
    operator: "Integron Plus",
    projekt: "Nastaw się na rozwój",
    urls: ["https://integronplus.pl/nastaw-sie-na-rozwoj/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "lubelskie",
    subregion: "podregion lubelski (lubartowski, lubelski, łęczyński, m. Lublin)",
    operator: "Fundacja Rozwoju Lubelszczyzny",
    projekt: "Usługi rozwojowe w podregionie lubelskim",
    urls: ["https://www.lfr.lublin.pl/kontakt/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "lubelskie",
    subregion: "podregion puławski (janowski, kraśnicki, opolski, łukowski, puławski, rycki)",
    operator: "FPCP",
    projekt: "Transformacje",
    urls: ["http://fpcp.org.pl/transformacje/"],
  },

  // --- lubuskie ---
  {
    type: "indywidualny",
    wojewodztwo: "lubuskie",
    subregion: "całe województwo",
    operator: "Urząd Marszałkowski Województwa Lubuskiego",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://urlubuskie.pl/aktualnosci/"],
  },

  // --- łódzkie ---
  {
    type: "indywidualny",
    wojewodztwo: "łódzkie",
    subregion: "obszar transformacji (bełchatowski, piotrkowski, m. Piotrków Tryb., radomszczański, pajęczański, łaski, sieradzki, wieluński)",
    operator: "Łódzka Specjalna Strefa Ekonomiczna S.A.",
    projekt: "Usługi rozwojowe - obszar transformacji",
    urls: ["https://sse.lodz.pl/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "łódzkie",
    subregion: "całe województwo",
    operator: "Centrum Rozwiązywania Problemów Społecznych",
    projekt: "Zawodowa reaktywacja",
    urls: ["https://www.crklodzkie.pl/pl/fundusze-ue/trwajace-projekty/zawodowa-reaktywacja"],
  },

  // --- małopolskie ---
  {
    type: "indywidualny",
    wojewodztwo: "małopolskie",
    subregion: "subregion krakowski (miechowski, krakowski, m. Kraków, proszowicki, wielicki, bocheński, myślenicki)",
    operator: "Małopolski Pociąg do Kariery",
    projekt: "Małopolski Pociąg do Kariery",
    urls: ["https://projekt.pociagdokariery.pl/artykul/Malopolski-Pociag-do-Kariery"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "małopolskie",
    subregion: "całe województwo",
    operator: "Małopolski Pociąg do Kariery",
    projekt: "Nowy start w Małopolsce z EURES-em",
    urls: ["https://pociagdokariery.pl/aktualnosci/1664-projekt-nowy-start-w-malopolsce-z-euresem-rekrutacja-ruszyla"],
  },

  // --- mazowieckie ---
  {
    type: "indywidualny",
    wojewodztwo: "mazowieckie",
    subregion: "całe województwo",
    operator: "Wojewódzki Urząd Pracy w Warszawie",
    projekt: "Baza Usług Rozwojowych na Mazowszu",
    urls: ["https://wupwarszawa.praca.gov.pl/-/23440596-baza-uslug-rozwojowych-na-mazowszu"],
  },

  // --- opolskie ---
  {
    type: "indywidualny",
    wojewodztwo: "opolskie",
    subregion: "całe województwo",
    operator: "Opolskie Centrum Rozwoju Gospodarki",
    projekt: "Opolskie kształcenie ustawiczne",
    urls: ["https://ocrg.opolskie.pl/dzialanie-5-11-opolskie-ksztalcenie-ustawiczne/"],
  },

  // --- podkarpackie ---
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion tarnobrzeski (tarnobrzeski grodzki i ziemski, stalowowolski, niżański)",
    operator: "Szkolenia Plus",
    projekt: "Usługi rozwojowe dla subregionu tarnobrzeskiego",
    urls: ["https://szkoleniaplus.com.pl/aktualnosci/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion dębicki (dębicki, ropczycko-sędziszowski)",
    operator: "Awalon",
    projekt: "Kuźnia kwalifikacji zawodowych",
    urls: ["https://www.awalon.com.pl/kuznia-kwalifikacji-zawodowych/#1548419551459-6cc5f7e8-ee8f"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion krośnieński (jasielski, krośnieński, m. Krosno)",
    operator: "Caritas Diecezji Rzeszowskiej",
    projekt: "Usługi rozwojowe dla subregionu krośnieńskiego",
    urls: ["http://szkolenia.caritas.rzeszow.pl/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion bieszczadzki (bieszczadzki, brzozowski, leski, sanocki)",
    operator: "Stowarzyszenie Pro Demokratia Mater",
    projekt: "Usługi rozwojowe dla subregionu bieszczadzkiego",
    urls: ["https://spdm.przemyska.pl/?page_id=1164"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "powiaty rzeszowski, łańcucki, strzyżowski",
    operator: "Operacja Edukacja",
    projekt: "Usługi rozwojowe",
    urls: ["https://operacjaedukacja.pl/dokumenty-do-pobrania/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion mielecki (mielecki, kolbuszowski)",
    operator: "Akademia Lootus",
    projekt: "Usługi rozwojowe dla subregionu mieleckiego",
    urls: ["https://akademia.lootus.pl/aktualnosci/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "powiaty jarosławski, przeworski, leżajski",
    operator: "Stawil Sp. z o.o.",
    projekt: "Usługi rozwojowe",
    urls: ["https://programsj.stawil.pl/index.php/pl/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "subregion przemyski (przemyski grodzki i ziemski, lubaczowski)",
    operator: "Przemyska Agencja Rozwoju Regionalnego S.A.",
    projekt: "AMICO",
    urls: ["https://amico.przemyska.pl/?page_id=1009"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podkarpackie",
    subregion: "m. Rzeszów",
    operator: "Postaw na siebie",
    projekt: "Usługi rozwojowe dla mieszkańców Rzeszowa",
    urls: ["https://postawnasiebie.edu.pl/aktualnosci/"],
  },

  // --- podlaskie ---
  {
    type: "indywidualny",
    wojewodztwo: "podlaskie",
    subregion: "subregion białostocki",
    operator: "Izba Przemysłowo-Handlowa w Białymstoku",
    projekt: "Podlaskie Kompetencje Przyszłości",
    urls: ["https://pkp.iph.bialystok.pl/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podlaskie",
    subregion: "subregion łomżyński",
    operator: "Bon Szkoleniowy Łomżyński",
    projekt: "Usługi rozwojowe dla subregionu łomżyńskiego",
    urls: ["https://bonszkoleniowylomzynski.pl/aktualnosci/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "podlaskie",
    subregion: "subregion suwalski",
    operator: "Bon Szkoleniowy Suwalski",
    projekt: "Usługi rozwojowe dla subregionu suwalskiego",
    urls: ["https://bonszkoleniowysuwalski.pl/"],
  },

  // --- pomorskie ---
  {
    type: "indywidualny",
    wojewodztwo: "pomorskie",
    subregion: "subregion chojnicki (człuchowski, chojnicki, kościerski)",
    operator: "Centrum Edukacyjno-Wdrożeniowe w Chojnicach",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://www.cewchojnice.eu/index.php/aktualnosci/item/604-projekt"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "pomorskie",
    subregion: "subregion nadwiślański (kwidzyński, malborski, starogardzki, sztumski, tczewski)",
    operator: "Nowe Ramy Kompetencji",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://nrk.pomorskie.pl/o-projekcie/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "pomorskie",
    subregion: "subregion metropolitalny (nowodworski, kartuski, gdański, pucki, wejherowski, m. Gdańsk, Gdynia, Sopot)",
    operator: "Agencja Rozwoju Pomorza S.A.",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://www.arp.gda.pl/2518,aktualnosci"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "pomorskie",
    subregion: "subregion słupski (słupski, bytowski, lęborski, m. Słupsk)",
    operator: "Pomorska Agencja Rozwoju Regionalnego S.A.",
    projekt: "Rozwój i kompetencje na miarę przyszłości subregionu słupskiego",
    urls: ["https://parr.slupsk.pl/rozwoj-i-kompetencje-na-miare-przyszlosci-subregionu-slupskiego/"],
  },

  // --- świętokrzyskie ---
  {
    type: "indywidualny",
    wojewodztwo: "świętokrzyskie",
    subregion: "całe województwo",
    operator: "WUP Kielce",
    projekt: "Baza Usług Rozwojowych dla osób indywidualnych",
    urls: ["https://wupkielce.praca.gov.pl/baza-uslug-rozwojowych/dla-osob-indywidualnych/aktualnosci"],
  },

  // --- warmińsko-mazurskie ---
  {
    type: "indywidualny",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "Warmińsko-Mazurski Zakład Doskonalenia Zawodowego",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://operator.wmzpp.org/rekrutacja/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "KAI Info",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://operator.kai-info.eu/aktualnosci/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "warmińsko-mazurskie",
    subregion: "całe województwo",
    operator: "Stowarzyszenie Centrum Rozwoju Ekonomicznego Pasłęka",
    projekt: "Kariera przyszłości",
    urls: ["https://screp.pl/uslugi-rozwojowe/kariera-przyszlosci/kariera-przyszlosci-opis-projektu/"],
  },

  // --- wielkopolskie ---
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion koniński - FST (słupecki, kolski, turecki, koniński, m. Konin)",
    operator: "Agencja Rozwoju Regionalnego S.A. w Koninie",
    projekt: "Wsparcie z FST na podnoszenie kompetencji i kwalifikacji",
    urls: ["https://arrkonin.org.pl/wsparcie-z-funduszu-na-rzecz-sprawiedliwej-transformacji-fst-na-podnoszenie-kompetencji-i-kwalifikacji-dla-pracodawcow-pracownikow-oraz-osob-doroslych-z-wielkopolski-wschodniej/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "całe województwo (poza podregionem konińskim)",
    operator: "WRPO",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://wrpo.wielkopolskie.pl/nabory/481"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion pilski",
    operator: "Rozwój na przyszłość",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://rozwojnaprzyszlosc.pl/?page_id=125"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion koniński",
    operator: "Agencja Rozwoju Regionalnego S.A. w Koninie",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://uslugirozwojowe.arrkonin.org.pl/6-09-dla-osob-doroslych/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion leszczyński (gostyński, grodziski, kościański, leszczyński, międzychodzki, nowotomyski, rawicki, wolsztyński, m. Leszno)",
    operator: "Leszczyński Podregion",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://leszczynskipodregion.pl/aktualnosci/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion kaliski",
    operator: "Ośrodek Doskonalenia Kadr",
    projekt: "Ewolucja umiejętności w podregionie kaliskim",
    urls: ["https://ocwp.org.pl/projekty-unijne/ewolucja-umiejetnosci-w-podregionie-kaliskim/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "podregion poznański",
    operator: "Rozwijaj się",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://www.rozwijajsie.com.pl/harmonogram/"],
  },
  {
    type: "indywidualny",
    wojewodztwo: "wielkopolskie",
    subregion: "m. Poznań",
    operator: "SEKA S.A.",
    projekt: "Usługi rozwojowe dla osób dorosłych",
    urls: ["https://www.seka.pl/uslugi/projekty-unijne/"],
  },

  // --- zachodniopomorskie ---
  {
    type: "indywidualny",
    wojewodztwo: "zachodniopomorskie",
    subregion: "całe województwo",
    operator: "WUP Szczecin",
    projekt: "Zachodniopomorskie bony szkoleniowe",
    urls: ["https://www.wup.pl/pl/projekty_wlasne/zachodniopomorskie-bony-szkoleniowe/"],
  },
];

const KEYWORDS = [
  "nabór",
  "rekrutacja",
  "trwa ciągle",
  "zapisy",
  "zgłoszenia",
  "szkolenie",
  "projekt",
];

module.exports = { ENTRIES, KEYWORDS };
