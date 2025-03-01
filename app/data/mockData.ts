export interface Destination {
  alias: string;
  name: string;
  clues: string[];
  funFacts: string[];
}

// Remove duplicates from the mock data
const allDestinations = [
  {
    alias: "dst1",
    name: "Paris",
    clues: [
      "Home to a famous tower finished in 1889",
      "Called the City of Light",
    ],
    funFacts: [
      "The Louvre is the world's largest art museum.",
      "Famous for café culture and haute cuisine.",
    ],
  },
  {
    alias: "dst2",
    name: "Tokyo",
    clues: [
      "Capital city with over 13 million residents",
      "Known for high-tech, anime, and cherry blossoms",
    ],
    funFacts: [
      "It's the most populous metropolitan area in the world.",
      "Tsukiji once was the world's largest fish market.",
    ],
  },
  {
    alias: "dst3",
    name: "New York City",
    clues: ["The Big Apple", "Home to a famous statue gifted by France"],
    funFacts: [
      "More than 800 languages are spoken in this city.",
      "The subway system has 472 stations.",
    ],
  },
  {
    alias: "dst4",
    name: "Venice",
    clues: [
      "A city built on 118 small islands",
      "Famous for its carnival masks and gondolas",
    ],
    funFacts: [
      "There are no roads, just canals - including the Grand Canal.",
      "The city is slowly sinking at a rate of 1-2 millimeters per year.",
    ],
  },
  {
    alias: "dst5",
    name: "Dubai",
    clues: [
      "Home to the world's tallest building",
      "A city that transformed from desert to metropolis",
    ],
    funFacts: [
      "Police cars include Lamborghinis and Ferraris.",
      "Has the world's largest choreographed fountain system.",
    ],
  },
  {
    alias: "dst6",
    name: "Machu Picchu",
    clues: [
      "An ancient Incan city in the clouds",
      "Discovered by Hiram Bingham in 1911",
    ],
    funFacts: [
      "Built without the use of mortar or metal tools.",
      "The stones are so precisely cut that a knife blade cannot fit between them.",
    ],
  },
  {
    alias: "dst7",
    name: "Sydney",
    clues: [
      "Famous for its shell-shaped opera house",
      "Largest natural harbor in the world",
    ],
    funFacts: [
      "The Opera House has over one million roof tiles.",
      "Bondi Beach is one of the most famous beaches in the world.",
    ],
  },
  {
    alias: "dst8",
    name: "Cairo",
    clues: [
      "City of a thousand minarets",
      "Home to the last remaining ancient wonder",
    ],
    funFacts: [
      "The Great Pyramid was the tallest man-made structure for over 3,800 years.",
      "The city's name means 'The Victorious' in Arabic.",
    ],
  },
  {
    alias: "dst9",
    name: "Rio de Janeiro",
    clues: [
      "Watched over by Christ the Redeemer",
      "Home to the world's largest carnival",
    ],
    funFacts: [
      "The Christ the Redeemer statue was struck by lightning during a storm in 2014.",
      "Copacabana beach is 4km long.",
    ],
  },
  {
    alias: "dst10",
    name: "Amsterdam",
    clues: [
      "City with more bicycles than people",
      "Known for its narrow houses and many canals",
    ],
    funFacts: [
      "There are over 1,500 bridges in the city.",
      "Many houses are tilted forward intentionally to avoid furniture damage during moves.",
    ],
  },
  {
    alias: "dst11",
    name: "Barcelona",
    clues: [
      "Home to Sagrada Familia",
      "Famous for its unique Gaudi architecture",
    ],
    funFacts: [
      "Las Ramblas is a famous street known for its street performers.",
      "FC Barcelona is one of the most popular football clubs in the world.",
    ],
  },
  {
    alias: "dst12",
    name: "Rome",
    clues: ["Home to the Colosseum", "The capital of Italy"],
    funFacts: [
      "The Trevi Fountain tradition involves throwing coins into the fountain.",
      "Vatican City is an independent city-state located within the city.",
    ],
  },
  {
    alias: "dst13",
    name: "London",
    clues: ["Home to Big Ben", "The capital of the United Kingdom"],
    funFacts: [
      "The London Eye is a giant Ferris wheel offering panoramic views.",
      "The Tower of London has served as a palace, prison, and treasury.",
    ],
  },
  {
    alias: "dst14",
    name: "Bangkok",
    clues: ["Known for ornate temples", "Thailand's capital"],
    funFacts: [
      "It's the most visited city in the world.",
      "Home to floating markets with vendors selling from boats.",
    ],
  },
  {
    alias: "dst15",
    name: "Singapore",
    clues: [
      "A city-state with strict laws",
      "Known for its clean streets and modern architecture",
    ],
    funFacts: [
      "Gardens by the Bay features supertrees and a cloud forest.",
      "Hawker centers offer a wide variety of affordable local cuisine.",
    ],
  },
  {
    alias: "dst16",
    name: "Cape Town",
    clues: ["Home to Table Mountain", "Located on the coast of South Africa"],
    funFacts: [
      "Robben Island, where Nelson Mandela was imprisoned, is a UNESCO World Heritage Site.",
      "Kirstenbosch National Botanical Garden is one of the world's great botanical gardens.",
    ],
  },
  {
    alias: "dst17",
    name: "Moscow",
    clues: ["Home to the Red Square", "The capital of Russia"],
    funFacts: [
      "Saint Basil's Cathedral is famous for its colorful onion domes.",
      "The Moscow Metro is known for its elaborate art and architecture.",
    ],
  },
  {
    alias: "dst18",
    name: "Istanbul",
    clues: ["Straddles Europe and Asia", "Home to the Hagia Sophia"],
    funFacts: [
      "The Grand Bazaar is one of the oldest and largest covered markets in the world.",
      "The Blue Mosque is famous for its blue Iznik tiles.",
    ],
  },
  {
    alias: "dst19",
    name: "Buenos Aires",
    clues: ["Known for tango dancing", "The capital of Argentina"],
    funFacts: [
      "La Boca is a colorful neighborhood with a vibrant arts scene.",
      "Eva Perón, or Evita, is a famous historical figure.",
    ],
  },
  {
    alias: "dst20",
    name: "Kyoto",
    clues: [
      "Home to many traditional temples",
      "The former imperial capital of Japan",
    ],
    funFacts: [
      "Fushimi Inari Shrine is famous for its thousands of vermilion torii gates.",
      "Gion is a district known for geishas.",
    ],
  },
  {
    alias: "dst21",
    name: "San Francisco",
    clues: [
      "Known for the Golden Gate Bridge",
      "Famous for its steep streets and cable cars",
    ],
    funFacts: [
      "Alcatraz Island was once a notorious prison.",
      "Chinatown is the oldest Chinatown in North America.",
    ],
  },
  {
    alias: "dst22",
    name: "Toronto",
    clues: ["Home to the CN Tower", "Canada's largest city"],
    funFacts: [
      "The city is one of the most multicultural in the world.",
      "Casa Loma is a historic castle and museum.",
    ],
  },
  {
    alias: "dst23",
    name: "Seoul",
    clues: ["Capital of South Korea", "A major global city"],
    funFacts: [
      "Gyeongbokgung Palace is the largest of Seoul's five grand palaces.",
      "Myeongdong is a popular shopping district.",
    ],
  },
  {
    alias: "dst24",
    name: "Berlin",
    clues: ["Home to the Brandenburg Gate", "The capital of Germany"],
    funFacts: [
      "The Berlin Wall Memorial commemorates the division of the city.",
      "Museum Island is home to several world-renowned museums.",
    ],
  },
  {
    alias: "dst25",
    name: "Hong Kong",
    clues: [
      "A special administrative region of China",
      "Known for its skyline",
    ],
    funFacts: [
      "Victoria Peak offers stunning views of the city.",
      "Dim sum is a popular local cuisine.",
    ],
  },
  {
    alias: "dst26",
    name: "Vienna",
    clues: ["City of Music", "Home to many famous composers"],
    funFacts: [
      "Schönbrunn Palace was the summer residence of the Habsburg rulers.",
      "The Vienna State Opera is one of the world's leading opera houses.",
    ],
  },
  {
    alias: "dst27",
    name: "Prague",
    clues: [
      "Known for its Charles Bridge",
      "The capital of the Czech Republic",
    ],
    funFacts: [
      "Prague Castle is one of the largest ancient castles in the world.",
      "The Astronomical Clock is a medieval clock that puts on a show every hour.",
    ],
  },
  {
    alias: "dst28",
    name: "Lisbon",
    clues: ["Known for its historic trams", "The capital of Portugal"],
    funFacts: [
      "Jerónimos Monastery is a UNESCO World Heritage Site.",
      "Fado is a traditional Portuguese music genre.",
    ],
  },
  {
    alias: "dst29",
    name: "Auckland",
    clues: ["City of Sails", "Largest city in New Zealand"],
    funFacts: [
      "Sky Tower offers panoramic views of the city and surrounding area.",
      "Auckland Domain is the city's oldest park.",
    ],
  },
  {
    alias: "dst30",
    name: "Vancouver",
    clues: ["Surrounded by mountains and ocean", "A major Canadian city"],
    funFacts: [
      "Stanley Park is one of the largest urban parks in North America.",
      "Granville Island Market is a popular destination for food and crafts.",
    ],
  },
  {
    alias: "dst31",
    name: "Mexico City",
    clues: ["One of the largest cities in the world", "Capital of Mexico"],
    funFacts: [
      "The National Museum of Anthropology holds the world's largest collection of Mexican art.",
      "Teotihuacan, an ancient Mesoamerican city, is nearby.",
    ],
  },
  {
    alias: "dst32",
    name: "Amsterdam",
    clues: [
      "City with more bicycles than people",
      "Known for its narrow houses and many canals",
    ],
    funFacts: [
      "There are over 1,500 bridges in the city.",
      "Many houses are tilted forward intentionally to avoid furniture damage during moves.",
    ],
  },
  {
    alias: "dst33",
    name: "Copenhagen",
    clues: [
      "Home to The Little Mermaid statue",
      "Consistently ranked as one of the happiest cities in the world",
    ],
    funFacts: [
      "Tivoli Gardens is one of the oldest amusement parks in the world.",
      "The city is known for its design and architecture.",
    ],
  },
  {
    alias: "dst34",
    name: "Havana",
    clues: [
      "Known for its vintage cars",
      "The capital and largest city of Cuba",
    ],
    funFacts: [
      "Old Havana is a UNESCO World Heritage Site.",
      "The city is famous for its music and dance.",
    ],
  },
  {
    alias: "dst35",
    name: "Dublin",
    clues: [
      "Home to Guinness Storehouse",
      "The capital and largest city of Ireland",
    ],
    funFacts: [
      "Trinity College is home to the Book of Kells.",
      "The city is known for its friendly locals and pub culture.",
    ],
  },
  {
    alias: "dst36",
    name: "Reykjavik",
    clues: [
      "The northernmost capital city in the world",
      "Known for its geothermal activity and the Northern Lights",
    ],
    funFacts: [
      "The Blue Lagoon is a popular geothermal spa.",
      "Hallgrímskirkja church offers panoramic views of the city.",
    ],
  },
  {
    alias: "dst37",
    name: "Marrakech",
    clues: [
      "Known for its vibrant souks and medina",
      "A major city in Morocco",
    ],
    funFacts: [
      "Djemaa el-Fna is a bustling square with storytellers, musicians, and food stalls.",
      "The Bahia Palace is a beautiful example of Moroccan architecture.",
    ],
  },
  {
    alias: "dst38",
    name: "Kathmandu",
    clues: [
      "Gateway to the Himalayas",
      "The capital and largest city of Nepal",
    ],
    funFacts: [
      "Durbar Square is a UNESCO World Heritage Site with ancient temples and palaces.",
      "Boudhanath is one of the largest stupas in the world.",
    ],
  },
  {
    alias: "dst39",
    name: "Jaipur",
    clues: ["The Pink City", "The capital of Rajasthan, India"],
    funFacts: [
      "Hawa Mahal (Palace of Winds) is a famous landmark with intricate latticework.",
      "Amer Fort is a majestic fort overlooking the city.",
    ],
  },
  {
    alias: "dst40",
    name: "Perth",
    clues: [
      "One of the sunniest capital cities in the world",
      "The capital and largest city of Western Australia",
    ],
    funFacts: [
      "Kings Park offers stunning views of the city skyline and the Swan River.",
      "Rottnest Island is known for its quokkas.",
    ],
  },
  {
    alias: "dst41",
    name: "Buenos Aires",
    clues: [
      "Known for its passionate tango dancers and European architecture",
      "Capital and largest city of Argentina",
    ],
    funFacts: [
      "La Boca is a vibrant neighborhood with colorful buildings and street art.",
      "Recoleta Cemetery is the final resting place of Eva Perón (Evita).",
    ],
  },
  {
    alias: "dst42",
    name: "Lisbon",
    clues: [
      "Known for its historic neighborhoods, vibrant nightlife, and melancholic Fado music",
      "Capital and largest city of Portugal",
    ],
    funFacts: [
      "Jerónimos Monastery is a UNESCO World Heritage Site and a masterpiece of Manueline architecture.",
      "São Jorge Castle offers panoramic views of the city and the Tagus River.",
    ],
  },
  {
    alias: "dst43",
    name: "Oslo",
    clues: [
      "Known for its stunning fjords and Viking history",
      "Capital and largest city of Norway",
    ],
    funFacts: [
      "Vigeland Sculpture Park features over 200 sculptures by Gustav Vigeland.",
      "The Viking Ship Museum displays well-preserved Viking ships.",
    ],
  },
  {
    alias: "dst44",
    name: "Helsinki",
    clues: [
      "Known for its unique design and architecture, from Alvar Aalto to contemporary styles",
      "Capital and largest city of Finland",
    ],
    funFacts: [
      "Suomenlinna is a sea fortress and UNESCO World Heritage Site.",
      "Market Square is a bustling hub for local food and crafts.",
    ],
  },
  {
    alias: "dst45",
    name: "St. Petersburg",
    clues: [
      "Known for its opulent palaces, canals, and drawbridges",
      "Russia's cultural center",
    ],
    funFacts: [
      "The Hermitage Museum is one of the largest and most comprehensive art museums in the world.",
      "Peterhof Palace is a stunning imperial estate with elaborate fountains.",
    ],
  },
  {
    alias: "dst46",
    name: "Shanghai",
    clues: [
      "Known for its modern skyscrapers and historical districts",
      "China's largest city",
    ],
    funFacts: [
      "The Bund is a waterfront promenade with colonial-era buildings.",
      "The Yuyuan Garden is a classical Chinese garden with intricate landscapes.",
    ],
  },
  {
    alias: "dst47",
    name: "Johannesburg",
    clues: [
      "Known for its rich history and vibrant culture",
      "Largest city in South Africa",
    ],
    funFacts: [
      "The Apartheid Museum provides a powerful account of South Africa's history.",
      "Gold Reef City is an amusement park based on Johannesburg's gold rush era.",
    ],
  },
  {
    alias: "dst48",
    name: "Tel Aviv",
    clues: [
      "Known for its beaches, nightlife, and Bauhaus architecture",
      "Israel's economic and cultural hub",
    ],
    funFacts: [
      "The White City is a UNESCO World Heritage Site with Bauhaus-style buildings.",
      "Carmel Market is a bustling marketplace with a variety of goods.",
    ],
  },
  {
    alias: "dst49",
    name: "Medellín",
    clues: [
      "Known for its innovative public transportation and vibrant culture",
      "Second-largest city in Colombia",
    ],
    funFacts: [
      "The Medellín Metrocable offers access to hillside communities.",
      "The Museo de Antioquia houses a collection of works by Fernando Botero.",
    ],
  },
  {
    alias: "dst50",
    name: "Brussels",
    clues: [
      "Known for its chocolate, waffles, and beer",
      "Capital of Belgium and the de facto capital of the European Union",
    ],
    funFacts: [
      "The Grand Place is a UNESCO World Heritage Site and a stunning square.",
      "The Atomium is a unique structure built for the 1958 World's Fair.",
    ],
  },
  {
    alias: "dst51",
    name: "Budapest",
    clues: [
      "Known for its thermal baths, ruin bars, and stunning architecture",
      "Capital of Hungary",
    ],
    funFacts: [
      "The Szechenyi Thermal Baths is one of the largest medicinal baths in Europe.",
      "Fisherman's Bastion offers panoramic views of the city from Buda Castle.",
    ],
  },
  {
    alias: "dst52",
    name: "Florence",
    clues: [
      "The birthplace of the Renaissance",
      "Known for its art, architecture, and culinary traditions",
    ],
    funFacts: [
      "The Uffizi Gallery is home to masterpieces by Renaissance artists like Botticelli and Leonardo da Vinci.",
      "The Duomo (Florence Cathedral) features a stunning dome designed by Brunelleschi.",
    ],
  },
  {
    alias: "dst53",
    name: "Montreal",
    clues: [
      "Known for its European charm and vibrant arts scene",
      "Largest city in the province of Quebec, Canada",
    ],
    funFacts: [
      "Old Montreal is a historic district with cobblestone streets and charming buildings.",
      "Mount Royal Park offers panoramic views of the city.",
    ],
  },
  {
    alias: "dst54",
    name: "Queenstown",
    clues: [
      "The adventure capital of the world",
      "Known for its stunning scenery and adrenaline-pumping activities",
    ],
    funFacts: [
      "Bungy jumping was invented in Queenstown.",
      "Lake Wakatipu is a beautiful lake surrounded by mountains.",
    ],
  },
  {
    alias: "dst55",
    name: "Seville",
    clues: [
      "The heart and soul of Andalusia",
      "Known for its flamenco, tapas, and Moorish architecture",
    ],
    funFacts: [
      "The Alcázar of Seville is a royal palace with stunning gardens and architecture.",
      "The Seville Cathedral is the largest Gothic cathedral in the world.",
    ],
  },
  {
    alias: "dst56",
    name: "Taipei",
    clues: [
      "A blend of traditional Chinese culture and modern innovation",
      "Capital of Taiwan",
    ],
    funFacts: [
      "Taipei 101 was once the world's tallest building.",
      "The National Palace Museum houses a vast collection of Chinese art and artifacts.",
    ],
  },
  {
    alias: "dst57",
    name: "Bogotá",
    clues: [
      "A vibrant metropolis with a rich history and culture",
      "Capital of Colombia",
    ],
    funFacts: [
      "La Candelaria is a historic neighborhood with colorful colonial architecture.",
      "The Gold Museum houses a vast collection of pre-Columbian gold artifacts.",
    ],
  },
  {
    alias: "dst58",
    name: "Cusco",
    clues: ["Gateway to Machu Picchu", "Former capital of the Inca Empire"],
    funFacts: [
      "Sacsayhuamán is an ancient Inca fortress overlooking the city.",
      "Plaza de Armas is the main square of Cusco with beautiful colonial architecture.",
    ],
  },
  {
    alias: "dst59",
    name: "Nice",
    clues: [
      "The heart of the French Riviera",
      "Known for its beaches, sunshine, and art museums",
    ],
    funFacts: [
      "The Promenade des Anglais is a famous waterfront promenade.",
      "The Matisse Museum houses a collection of works by Henri Matisse.",
    ],
  },
  {
    alias: "dst60",
    name: "Hanoi",
    clues: [
      "A blend of colonial charm and modern bustle",
      "Capital of Vietnam",
    ],
    funFacts: [
      "The Old Quarter is a historic district with narrow streets and traditional shops.",
      "Hoan Kiem Lake is a central lake with Ngoc Son Temple on a small island.",
    ],
  },
  {
    alias: "dst61",
    name: "Lima",
    clues: [
      "A vibrant metropolis with a rich history and culture",
      "Capital of Peru",
    ],
    funFacts: [
      "Miraflores is a modern district with parks and ocean views.",
      "Huaca Pucllana is an ancient pre-Inca pyramid in the middle of the city.",
    ],
  },
  {
    alias: "dst62",
    name: "Honolulu",
    clues: [
      "Known for its beautiful beaches and surfing",
      "Capital of Hawaii, USA",
    ],
    funFacts: [
      "Waikiki Beach is a famous beach known for its surfing and nightlife.",
      "Pearl Harbor is a historic site commemorating the attack that led to the US entry into World War II.",
    ],
  },
  {
    alias: "dst63",
    name: "Nairobi",
    clues: ["The safari capital of Africa", "Capital of Kenya"],
    funFacts: [
      "Nairobi National Park is a wildlife park located just outside the city.",
      "The David Sheldrick Wildlife Trust rescues and rehabilitates orphaned elephants.",
    ],
  },
  {
    alias: "dst64",
    name: "Addis Ababa",
    clues: [
      "Known for its museums and historical sites",
      "Capital of Ethiopia",
    ],
    funFacts: [
      "The National Museum of Ethiopia houses the fossil remains of Lucy, an early hominin.",
      "Mount Entoto offers panoramic views of the city.",
    ],
  },
  {
    alias: "dst65",
    name: "Jakarta",
    clues: [
      "A sprawling metropolis with a vibrant culture",
      "Capital of Indonesia",
    ],
    funFacts: [
      "Monas (National Monument) is a towering monument symbolizing Indonesia's independence.",
      "Kota Tua (Old Town) is a historic district with Dutch colonial architecture.",
    ],
  },
  {
    alias: "dst66",
    name: "Belgrade",
    clues: [
      "Known for its nightlife, history, and confluence of two major rivers",
      "Capital of Serbia",
    ],
    funFacts: [
      "Kalemegdan Park and Fortress is a historic fortress overlooking the confluence of the Sava and Danube rivers.",
      "Skadarlija is a bohemian quarter with traditional restaurants and live music.",
    ],
  },
  {
    alias: "dst67",
    name: "Sarajevo",
    clues: [
      "Known for its rich history and blend of cultures",
      "Capital of Bosnia and Herzegovina",
    ],
    funFacts: [
      "Baščaršija is the old Ottoman bazaar with traditional crafts and food.",
      "Latin Bridge is where Archduke Franz Ferdinand was assassinated, triggering World War I.",
    ],
  },
  {
    alias: "dst68",
    name: "Tbilisi",
    clues: [
      "Known for its ancient history and natural sulfur springs",
      "Capital of Georgia",
    ],
    funFacts: [
      "Narikala Fortress is an ancient fortress overlooking the city.",
      "The Abanotubani district is famous for its sulfur bathhouses.",
    ],
  },
  {
    alias: "dst69",
    name: "Yerevan",
    clues: [
      "One of the oldest continuously inhabited cities in the world",
      "Capital of Armenia",
    ],
    funFacts: [
      "The Cascade is a giant stairway with sculptures and fountains leading to a panoramic view of the city.",
      "Republic Square is the central square with musical fountains.",
    ],
  },
  {
    alias: "dst70",
    name: "Asuncion",
    clues: ["One of South America's oldest cities", "Capital of Paraguay"],
    funFacts: [
      "The Panteón Nacional de los Héroes is a mausoleum honoring Paraguay's national heroes.",
      "The Costanera is a waterfront promenade along the Paraguay River.",
    ],
  },
  {
    alias: "dst71",
    name: "Montevideo",
    clues: [
      "A coastal city known for its beaches and architecture",
      "Capital of Uruguay",
    ],
    funFacts: [
      "Ciudad Vieja (Old City) is a historic district with colonial architecture.",
      "The Rambla is a scenic waterfront promenade along the Río de la Plata.",
    ],
  },
  {
    alias: "dst72",
    name: "La Paz",
    clues: [
      "The highest administrative capital in the world",
      "Capital of Bolivia",
    ],
    funFacts: [
      "Mi Teleférico is an aerial cable car system offering panoramic views of the city.",
      "The Witches' Market sells traditional remedies and potions.",
    ],
  },
  {
    alias: "dst73",
    name: "Panama City",
    clues: ["Known for its canal and modern skyline", "Capital of Panama"],
    funFacts: [
      "The Panama Canal is a famous engineering marvel connecting the Atlantic and Pacific Oceans.",
      "Casco Viejo (Old Quarter) is a historic district with colonial architecture.",
    ],
  },
  {
    alias: "dst74",
    name: "Aarhus",
    clues: [
      "Known for its vibrant cultural scene and museums",
      "Second-largest city in Denmark",
    ],
    funFacts: [
      "ARoS Aarhus Art Museum is a contemporary art museum with a rainbow panorama rooftop.",
      "Den Gamle By (The Old Town) is an open-air museum showcasing Danish history.",
    ],
  },
  {
    alias: "dst75",
    name: "Manchester",
    clues: [
      "Known for its music scene and football clubs",
      "Major city in Northwest England",
    ],
    funFacts: [
      "The National Football Museum celebrates the history of English football.",
      "The Northern Quarter is a bohemian district with independent shops and cafes.",
    ],
  },
  {
    alias: "dst76",
    name: "Frankfurt",
    clues: [
      "Known for its financial district and museums",
      "Major city in Germany",
    ],
    funFacts: [
      "The Römerberg is the historic city center with traditional buildings.",
      "Museumsufer (Museum Embankment) is a collection of museums along the Main River.",
    ],
  },
  {
    alias: "dst77",
    name: "Lyon",
    clues: [
      "Known for its cuisine and historic architecture",
      "Major city in France",
    ],
    funFacts: [
      "Vieux Lyon (Old Lyon) is a Renaissance district with traboules (hidden passageways).",
      "The Basilica of Notre-Dame de Fourvière offers panoramic views of the city.",
    ],
  },
  {
    alias: "dst78",
    name: "Seville",
    clues: [
      "The heart and soul of Andalusia",
      "Known for its flamenco, tapas, and Moorish architecture",
    ],
    funFacts: [
      "The Alcázar of Seville is a royal palace with stunning gardens and architecture.",
      "The Seville Cathedral is the largest Gothic cathedral in the world.",
    ],
  },
  {
    alias: "dst79",
    name: "Valencia",
    clues: [
      "Known for its City of Arts and Sciences and paella",
      "Major city in Spain",
    ],
    funFacts: [
      "The City of Arts and Sciences is a futuristic complex with an aquarium, science museum, and opera house.",
      "The Turia Gardens is a park built on the former Turia River bed.",
    ],
  },
  {
    alias: "dst80",
    name: "Hamburg",
    clues: ["Known for its harbor and canals", "Major city in Germany"],
    funFacts: [
      "The Speicherstadt is a historic warehouse district and UNESCO World Heritage Site.",
      "The Reeperbahn is a famous entertainment district.",
    ],
  },
  {
    alias: "dst81",
    name: "Zagreb",
    clues: ["Known for its museums and Christmas market", "Capital of Croatia"],
    funFacts: [
      "The Zagreb Cathedral is a landmark Gothic cathedral.",
      "The Museum of Broken Relationships is a unique museum dedicated to heartbreak.",
    ],
  },
  {
    alias: "dst82",
    name: "Geneva",
    clues: [
      "Known for its international organizations",
      "Major city in Switzerland",
    ],
    funFacts: [
      "The Jet d'Eau is a famous water fountain on Lake Geneva.",
      "The United Nations Office at Geneva is one of the largest UN offices in the world.",
    ],
  },
  {
    alias: "dst83",
    name: "Cologne",
    clues: ["Known for its cathedral and carnival", "Major city in Germany"],
    funFacts: [
      "The Cologne Cathedral is a landmark Gothic cathedral.",
      "The Cologne Carnival is a famous annual celebration.",
    ],
  },
  {
    alias: "dst84",
    name: "Naples",
    clues: ["Birthplace of pizza", "Major city in Italy"],
    funFacts: [
      "Mount Vesuvius is an active volcano overlooking the city.",
      "Pompeii is an ancient Roman city preserved by the eruption of Mount Vesuvius.",
    ],
  },
  {
    alias: "dst85",
    name: "Salzburg",
    clues: ["The Sound of Music city", "Major city in Austria"],
    funFacts: [
      "Hohensalzburg Fortress is a medieval fortress overlooking the city.",
      "Mirabell Gardens were featured in The Sound of Music movie.",
    ],
  },
  {
    alias: "dst86",
    name: "Krakow",
    clues: ["Known for its medieval old town", "Major city in Poland"],
    funFacts: [
      "Wawel Castle is a historic castle overlooking the Vistula River.",
      "The Auschwitz-Birkenau Memorial is a somber reminder of the Holocaust.",
    ],
  },
  {
    alias: "dst87",
    name: "Gdansk",
    clues: ["Known for its maritime history and amber", "Major city in Poland"],
    funFacts: [
      "The Old Town is a beautifully restored historic district.",
      "St. Mary's Church is one of the largest brick churches in the world.",
    ],
  },
];

// Filter out duplicates based on city name
export const mockDestinations: Destination[] = allDestinations.filter(
  (dest, index, self) => index === self.findIndex((d) => d.name === dest.name)
);
