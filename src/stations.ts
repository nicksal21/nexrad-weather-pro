export interface Station {
  icao: string;
  name: string;
  state: string;
  location: {
    lat: number;
    lon: number;
    elevationFt: number;
  };
}

export const NEXRAD_STATIONS: Station[] = [
  {
    icao: "KABR",
    name: "ABERDEEN",
    state: "SD",
    location: { lat: 45.455833, lon: -98.413333, elevationFt: 1383 }
  },
  {
    icao: "KABX",
    name: "ALBUQUERQUE",
    state: "NM",
    location: { lat: 35.149722, lon: -106.82388, elevationFt: 5951 }
  },
  {
    icao: "KAKQ",
    name: "NORFOLK RICH",
    state: "VA",
    location: { lat: 36.98405, lon: -77.007361, elevationFt: 255 }
  },
  {
    icao: "KAMA",
    name: "AMARILLO",
    state: "TX",
    location: { lat: 35.233333, lon: -101.70927, elevationFt: 3703 }
  },
  {
    icao: "KAMX",
    name: "MIAMI",
    state: "FL",
    location: { lat: 25.611083, lon: -80.412667, elevationFt: 111 }
  },
  {
    icao: "KAPX",
    name: "GAYLORD",
    state: "MI",
    location: { lat: 44.90635, lon: -84.719533, elevationFt: 1561 }
  },
  {
    icao: "KARX",
    name: "LA CROSSE",
    state: "WI",
    location: { lat: 43.822778, lon: -91.191111, elevationFt: 1357 }
  },
  {
    icao: "KATX",
    name: "SEATTLE",
    state: "WA",
    location: { lat: 48.194611, lon: -122.49569, elevationFt: 642 }
  },
  {
    icao: "KBBX",
    name: "BEALE AFB",
    state: "CA",
    location: { lat: 39.495639, lon: -121.63161, elevationFt: 221 }
  },
  {
    icao: "KBGM",
    name: "BINGHAMTON",
    state: "NY",
    location: { lat: 42.199694, lon: -75.984722, elevationFt: 1703 }
  },
  {
    icao: "KBHX",
    name: "EUREKA",
    state: "CA",
    location: { lat: 40.498583, lon: -124.29216, elevationFt: 2516 }
  },
  {
    icao: "KBIS",
    name: "BISMARCK",
    state: "ND",
    location: { lat: 46.770833, lon: -100.76055, elevationFt: 1755 }
  },
  {
    icao: "KBLX",
    name: "BILLINGS",
    state: "MT",
    location: { lat: 45.853778, lon: -108.6068, elevationFt: 3703 }
  },
  {
    icao: "KBMX",
    name: "BIRMINGHAM",
    state: "AL",
    location: { lat: 33.172417, lon: -86.770167, elevationFt: 759 }
  },
  {
    icao: "KBOX",
    name: "BOSTON",
    state: "MA",
    location: { lat: 41.955778, lon: -71.136861, elevationFt: 232 }
  },
  {
    icao: "KBRO",
    name: "BROWNSVILLE",
    state: "TX",
    location: { lat: 25.916, lon: -97.418967, elevationFt: 88 }
  },
  {
    icao: "KBUF",
    name: "BUFFALO",
    state: "NY",
    location: { lat: 42.948789, lon: -78.736781, elevationFt: 790 }
  },
  {
    icao: "KBYX",
    name: "KEY WEST",
    state: "FL",
    location: { lat: 24.5975, lon: -81.703167, elevationFt: 89 }
  },
  {
    icao: "KCAE",
    name: "COLUMBIA",
    state: "SC",
    location: { lat: 33.948722, lon: -81.118278, elevationFt: 345 }
  },
  {
    icao: "KCBW",
    name: "HOULTON",
    state: "ME",
    location: { lat: 46.03925, lon: -67.806431, elevationFt: 860 }
  },
  {
    icao: "KCBX",
    name: "BOISE",
    state: "ID",
    location: { lat: 43.490217, lon: -116.23603, elevationFt: 3172 }
  },
  {
    icao: "KCCX",
    name: "STATE COLLEGE",
    state: "PA",
    location: { lat: 40.923167, lon: -78.003722, elevationFt: 2486 }
  },
  {
    icao: "KCLE",
    name: "CLEVELAND",
    state: "OH",
    location: { lat: 41.413217, lon: -81.859867, elevationFt: 860 }
  },
  {
    icao: "KCLX",
    name: "CHARLESTON",
    state: "SC",
    location: { lat: 32.655528, lon: -81.042194, elevationFt: 229 }
  },
  {
    icao: "KCRI",
    name: "ROC FAA REDUNDANT RDA 1",
    state: "OK",
    location: { lat: 35.238333, lon: -97.46, elevationFt: 1315 }
  },
  {
    icao: "KCRP",
    name: "CORPUS CHRISTI",
    state: "TX",
    location: { lat: 27.784017, lon: -97.51125, elevationFt: 142 }
  },
  {
    icao: "KCXX",
    name: "BURLINGTON",
    state: "VT",
    location: { lat: 44.511, lon: -73.166431, elevationFt: 431 }
  },
  {
    icao: "KCYS",
    name: "CHEYENNE",
    state: "WY",
    location: { lat: 41.151919, lon: -104.80603, elevationFt: 6193 }
  },
  {
    icao: "KDAX",
    name: "SACRAMENTO",
    state: "CA",
    location: { lat: 38.501111, lon: -121.67783, elevationFt: 144 }
  },
  {
    icao: "KDDC",
    name: "DODGE CITY",
    state: "KS",
    location: { lat: 37.760833, lon: -99.968889, elevationFt: 2671 }
  },
  {
    icao: "KDFX",
    name: "LAUGHLIN AFB",
    state: "TX",
    location: { lat: 29.273139, lon: -100.28033, elevationFt: 1196 }
  },
  {
    icao: "KDGX",
    name: "JACKSON BRANDON",
    state: "MS",
    location: { lat: 32.279944, lon: -89.984444, elevationFt: 609 }
  },
  {
    icao: "KDIX",
    name: "PHILADELPHIA",
    state: "NJ",
    location: { lat: 39.947089, lon: -74.410731, elevationFt: 230 }
  },
  {
    icao: "KDLH",
    name: "DULUTH",
    state: "MN",
    location: { lat: 46.836944, lon: -92.209722, elevationFt: 1542 }
  },
  {
    icao: "KDMX",
    name: "DES MOINES",
    state: "IA",
    location: { lat: 41.7312, lon: -93.722869, elevationFt: 1095 }
  },
  {
    icao: "KDOX",
    name: "DOVER AFB",
    state: "DE",
    location: { lat: 38.825767, lon: -75.440117, elevationFt: 164 }
  },
  {
    icao: "KDTX",
    name: "DETROIT",
    state: "MI",
    location: { lat: 42.7, lon: -83.471667, elevationFt: 1216 }
  },
  {
    icao: "KDVN",
    name: "DAVENPORT",
    state: "IA",
    location: { lat: 41.611667, lon: -90.580833, elevationFt: 851 }
  },
  {
    icao: "KDYX",
    name: "DYESS AFB",
    state: "TX",
    location: { lat: 32.5385, lon: -99.254333, elevationFt: 1582 }
  },
  {
    icao: "KEAX",
    name: "KANSAS CITY",
    state: "MO",
    location: { lat: 38.81025, lon: -94.264472, elevationFt: 1092 }
  },
  {
    icao: "KEMX",
    name: "TUCSON",
    state: "AZ",
    location: { lat: 31.89365, lon: -110.63025, elevationFt: 5319 }
  },
  {
    icao: "KENX",
    name: "ALBANY",
    state: "NY",
    location: { lat: 42.586556, lon: -74.064083, elevationFt: 1935 }
  },
  {
    icao: "KEOX",
    name: "FORT RUCKER",
    state: "AL",
    location: { lat: 31.460556, lon: -85.459389, elevationFt: 537 }
  },
  {
    icao: "KEPZ",
    name: "EL PASO",
    state: "NM",
    location: { lat: 31.873056, lon: -106.698, elevationFt: 4218 }
  },
  {
    icao: "KESX",
    name: "LAS VEGAS",
    state: "NV",
    location: { lat: 35.70135, lon: -114.89165, elevationFt: 4948 }
  },
  {
    icao: "KEVX",
    name: "EGLIN AFB",
    state: "FL",
    location: { lat: 30.565033, lon: -85.921667, elevationFt: 221 }
  },
  {
    icao: "KEWX",
    name: "AUSTIN SAN ANTONIO",
    state: "TX",
    location: { lat: 29.704056, lon: -98.028611, elevationFt: 767 }
  },
  {
    icao: "KEYX",
    name: "EDWARDS",
    state: "CA",
    location: { lat: 35.09785, lon: -117.56075, elevationFt: 2873 }
  },
  {
    icao: "KFCX",
    name: "ROANOKE",
    state: "VA",
    location: { lat: 37.0244, lon: -80.273969, elevationFt: 2965 }
  },
  {
    icao: "KFDR",
    name: "ALTUS AFB",
    state: "OK",
    location: { lat: 34.362194, lon: -98.976667, elevationFt: 1315 }
  },
  {
    icao: "KFDX",
    name: "CANNON AFB",
    state: "NM",
    location: { lat: 34.634167, lon: -103.61888, elevationFt: 4698 }
  },
  {
    icao: "KFFC",
    name: "ATLANTA",
    state: "GA",
    location: { lat: 33.36355, lon: -84.56595, elevationFt: 972 }
  },
  {
    icao: "KFSD",
    name: "SIOUX FALLS",
    state: "SD",
    location: { lat: 43.587778, lon: -96.729444, elevationFt: 1495 }
  },
  {
    icao: "KFSX",
    name: "FLAGSTAFF",
    state: "AZ",
    location: { lat: 34.574333, lon: -111.19844, elevationFt: 7514 }
  },
  {
    icao: "KFTG",
    name: "DENVER FRONT RANGE AP",
    state: "CO",
    location: { lat: 39.786639, lon: -104.5458, elevationFt: 5611 }
  },
  {
    icao: "KFWS",
    name: "DALLAS",
    state: "TX",
    location: { lat: 32.573, lon: -97.30315, elevationFt: 777 }
  },
  {
    icao: "KGGW",
    name: "GLASGOW",
    state: "MT",
    location: { lat: 48.206361, lon: -106.62469, elevationFt: 2384 }
  },
  {
    icao: "KGJX",
    name: "GRAND JUNCTION",
    state: "CO",
    location: { lat: 39.062169, lon: -108.21376, elevationFt: 10101 }
  },
  {
    icao: "KGLD",
    name: "GOODLAND",
    state: "KS",
    location: { lat: 39.366944, lon: -101.70027, elevationFt: 3716 }
  },
  {
    icao: "KGRB",
    name: "GREEN BAY",
    state: "WI",
    location: { lat: 44.498633, lon: -88.111111, elevationFt: 823 }
  },
  {
    icao: "KGRK",
    name: "FORT HOOD",
    state: "TX",
    location: { lat: 30.721833, lon: -97.382944, elevationFt: 603 }
  },
  {
    icao: "KGRR",
    name: "GRAND RAPIDS",
    state: "MI",
    location: { lat: 42.893889, lon: -85.544889, elevationFt: 875 }
  },
  {
    icao: "KGSP",
    name: "GREER",
    state: "SC",
    location: { lat: 34.883306, lon: -82.219833, elevationFt: 1069 }
  },
  {
    icao: "KGWX",
    name: "COLUMBUS AFB",
    state: "MS",
    location: { lat: 33.896917, lon: -88.329194, elevationFt: 590 }
  },
  {
    icao: "KGYX",
    name: "PORTLAND",
    state: "ME",
    location: { lat: 43.891306, lon: -70.256361, elevationFt: 474 }
  },
  {
    icao: "KHDC",
    name: "HAMMOND MUNICIPAL AIRPORT",
    state: "LA",
    location: { lat: 30.5193, lon: -90.4074, elevationFt: 43 }
  },
  {
    icao: "KHDX",
    name: "HOLLOMAN AFB",
    state: "NM",
    location: { lat: 33.077, lon: -106.12003, elevationFt: 4270 }
  },
  {
    icao: "KHGX",
    name: "HOUSTON",
    state: "TX",
    location: { lat: 29.4719, lon: -95.078733, elevationFt: 115 }
  },
  {
    icao: "KHNX",
    name: "SAN JOAQUIN VALLEY",
    state: "CA",
    location: { lat: 36.314181, lon: -119.63213, elevationFt: 340 }
  },
  {
    icao: "KHPX",
    name: "FORT CAMPBELL",
    state: "KY",
    location: { lat: 36.736972, lon: -87.285583, elevationFt: 613 }
  },
  {
    icao: "KHTX",
    name: "HUNTSVILLE",
    state: "AL",
    location: { lat: 34.930556, lon: -86.083611, elevationFt: 1859 }
  },
  {
    icao: "KICT",
    name: "WICHITA",
    state: "KS",
    location: { lat: 37.654444, lon: -97.443056, elevationFt: 1400 }
  },
  {
    icao: "KICX",
    name: "CEDAR CITY",
    state: "UT",
    location: { lat: 37.59105, lon: -112.86218, elevationFt: 10757 }
  },
  {
    icao: "KILN",
    name: "CINCINNATI",
    state: "OH",
    location: { lat: 39.420483, lon: -83.82145, elevationFt: 1170 }
  },
  {
    icao: "KILX",
    name: "LINCOLN",
    state: "IL",
    location: { lat: 40.1505, lon: -89.336792, elevationFt: 731 }
  },
  {
    icao: "KIND",
    name: "INDIANAPOLIS",
    state: "IN",
    location: { lat: 39.7075, lon: -86.280278, elevationFt: 887 }
  },
  {
    icao: "KINX",
    name: "TULSA",
    state: "OK",
    location: { lat: 36.175131, lon: -95.564161, elevationFt: 749 }
  },
  {
    icao: "KIWA",
    name: "PHOENIX",
    state: "AZ",
    location: { lat: 33.289233, lon: -111.66991, elevationFt: 1426 }
  },
  {
    icao: "KIWX",
    name: "FORT WAYNE",
    state: "IN",
    location: { lat: 41.358611, lon: -85.7, elevationFt: 1056 }
  },
  {
    icao: "KJAX",
    name: "JACKSONVILLE",
    state: "FL",
    location: { lat: 30.484633, lon: -81.7019, elevationFt: 160 }
  },
  {
    icao: "KJGX",
    name: "ROBINS AFB",
    state: "GA",
    location: { lat: 32.675683, lon: -83.350833, elevationFt: 618 }
  },
  {
    icao: "KJKL",
    name: "JACKSON",
    state: "KY",
    location: { lat: 37.590833, lon: -83.313056, elevationFt: 1461 }
  },
  {
    icao: "KLBB",
    name: "LUBBOCK",
    state: "TX",
    location: { lat: 33.654139, lon: -101.81416, elevationFt: 3378 }
  },
  {
    icao: "KLCH",
    name: "LAKE CHARLES",
    state: "LA",
    location: { lat: 30.125306, lon: -93.215889, elevationFt: 137 }
  },
  {
    icao: "KLGX",
    name: "LANGLEY HILL NW WASHINGTON",
    state: "WA",
    location: { lat: 47.116944, lon: -124.10666, elevationFt: 366 }
  },
  {
    icao: "KLIX",
    name: "NEW ORLEANS",
    state: "LA",
    location: { lat: 30.336667, lon: -89.825417, elevationFt: 179 }
  },
  {
    icao: "KLNX",
    name: "NORTH PLATTE",
    state: "NE",
    location: { lat: 41.957944, lon: -100.57622, elevationFt: 3113 }
  },
  {
    icao: "KLOT",
    name: "CHICAGO",
    state: "IL",
    location: { lat: 41.604444, lon: -88.084444, elevationFt: 760 }
  },
  {
    icao: "KLRX",
    name: "ELKO",
    state: "NV",
    location: { lat: 40.73955, lon: -116.8027, elevationFt: 6895 }
  },
  {
    icao: "KLSX",
    name: "ST LOUIS",
    state: "MO",
    location: { lat: 38.698611, lon: -90.682778, elevationFt: 722 }
  },
  {
    icao: "KLTX",
    name: "WILMINGTON",
    state: "NC",
    location: { lat: 33.98915, lon: -78.429108, elevationFt: 145 }
  },
  {
    icao: "KLVX",
    name: "LOUISVILLE",
    state: "KY",
    location: { lat: 37.975278, lon: -85.943889, elevationFt: 833 }
  },
  {
    icao: "KLWX",
    name: "STERLING",
    state: "VA",
    location: { lat: 38.976111, lon: -77.4875, elevationFt: 404 }
  },
  {
    icao: "KLZK",
    name: "LITTLE ROCK",
    state: "AR",
    location: { lat: 34.8365, lon: -92.262194, elevationFt: 649 }
  },
  {
    icao: "KMAF",
    name: "MIDLAND ODESSA",
    state: "TX",
    location: { lat: 31.943461, lon: -102.18925, elevationFt: 2962 }
  },
  {
    icao: "KMAX",
    name: "MEDFORD",
    state: "OR",
    location: { lat: 42.081169, lon: -122.71736, elevationFt: 7561 }
  },
  {
    icao: "KMBX",
    name: "MINOT AFB",
    state: "ND",
    location: { lat: 48.393056, lon: -100.86444, elevationFt: 1590 }
  },
  {
    icao: "KMHX",
    name: "MOREHEAD CITY",
    state: "NC",
    location: { lat: 34.775908, lon: -76.876189, elevationFt: 145 }
  },
  {
    icao: "KMKX",
    name: "MILWAUKEE",
    state: "WI",
    location: { lat: 42.9679, lon: -88.550667, elevationFt: 1023 }
  },
  {
    icao: "KMLB",
    name: "MELBOURNE",
    state: "FL",
    location: { lat: 28.113194, lon: -80.654083, elevationFt: 149 }
  },
  {
    icao: "KMOB",
    name: "MOBILE",
    state: "AL",
    location: { lat: 30.679444, lon: -88.24, elevationFt: 289 }
  },
  {
    icao: "KMPX",
    name: "MINNEAPOLIS",
    state: "MN",
    location: { lat: 44.848889, lon: -93.565528, elevationFt: 1101 }
  },
  {
    icao: "KMQT",
    name: "MARQUETTE",
    state: "MI",
    location: { lat: 46.531111, lon: -87.548333, elevationFt: 1525 }
  },
  {
    icao: "KMRX",
    name: "KNOXVILLE",
    state: "TN",
    location: { lat: 36.168611, lon: -83.401944, elevationFt: 1434 }
  },
  {
    icao: "KMSX",
    name: "MISSOULA",
    state: "MT",
    location: { lat: 47.041, lon: -113.98622, elevationFt: 7978 }
  },
  {
    icao: "KMTX",
    name: "SALT LAKE CITY",
    state: "UT",
    location: { lat: 41.262778, lon: -112.44777, elevationFt: 6594 }
  },
  {
    icao: "KMUX",
    name: "SAN FRANCISCO",
    state: "CA",
    location: { lat: 37.155222, lon: -121.89844, elevationFt: 3550 }
  },
  {
    icao: "KMVX",
    name: "GRAND FORKS",
    state: "ND",
    location: { lat: 47.527778, lon: -97.325556, elevationFt: 1083 }
  },
  {
    icao: "KMXX",
    name: "MAXWELL AFB",
    state: "AL",
    location: { lat: 32.53665, lon: -85.78975, elevationFt: 560 }
  },
  {
    icao: "KNKX",
    name: "SAN DIEGO",
    state: "CA",
    location: { lat: 32.919017, lon: -117.0418, elevationFt: 1052 }
  },
  {
    icao: "KNQA",
    name: "MEMPHIS",
    state: "TN",
    location: { lat: 35.344722, lon: -89.873333, elevationFt: 435 }
  },
  {
    icao: "KOAX",
    name: "OMAHA",
    state: "NE",
    location: { lat: 41.320369, lon: -96.366819, elevationFt: 1262 }
  },
  {
    icao: "KOHX",
    name: "NASHVILLE",
    state: "TN",
    location: { lat: 36.247222, lon: -86.5625, elevationFt: 676 }
  },
  {
    icao: "KOKX",
    name: "NEW YORK CITY",
    state: "NY",
    location: { lat: 40.865528, lon: -72.863917, elevationFt: 199 }
  },
  {
    icao: "KOTX",
    name: "SPOKANE",
    state: "WA",
    location: { lat: 47.680417, lon: -117.62677, elevationFt: 2449 }
  },
  {
    icao: "KOUN",
    name: "NORMAN NSSL",
    state: "OK",
    location: { lat: 35.236058, lon: -97.46235, elevationFt: 1284 }
  },
  {
    icao: "KPAH",
    name: "PADUCAH",
    state: "KY",
    location: { lat: 37.068333, lon: -88.771944, elevationFt: 506 }
  },
  {
    icao: "KPBZ",
    name: "PITTSBURGH",
    state: "PA",
    location: { lat: 40.531717, lon: -80.217967, elevationFt: 1266 }
  },
  {
    icao: "KPDT",
    name: "PENDLETON",
    state: "OR",
    location: { lat: 45.69065, lon: -118.85293, elevationFt: 1580 }
  },
  {
    icao: "KPOE",
    name: "FORT POLK",
    state: "LA",
    location: { lat: 31.155278, lon: -92.976111, elevationFt: 473 }
  },
  {
    icao: "KPUX",
    name: "PUEBLO",
    state: "CO",
    location: { lat: 38.45955, lon: -104.18135, elevationFt: 5363 }
  },
  {
    icao: "KRAX",
    name: "RALEIGH DURHAM",
    state: "NC",
    location: { lat: 35.665519, lon: -78.48975, elevationFt: 462 }
  },
  {
    icao: "KRGX",
    name: "RENO",
    state: "NV",
    location: { lat: 39.754056, lon: -119.46202, elevationFt: 8396 }
  },
  {
    icao: "KRIW",
    name: "RIVERTON",
    state: "WY",
    location: { lat: 43.066089, lon: -108.4773, elevationFt: 5633 }
  },
  {
    icao: "KRLX",
    name: "CHARLESTON",
    state: "WV",
    location: { lat: 38.311111, lon: -81.722778, elevationFt: 1213 }
  },
  {
    icao: "KRTX",
    name: "PORTLAND",
    state: "OR",
    location: { lat: 45.715039, lon: -122.965, elevationFt: 1728 }
  },
  {
    icao: "KSFX",
    name: "POCATELLO",
    state: "ID",
    location: { lat: 43.1056, lon: -112.68613, elevationFt: 4539 }
  },
  {
    icao: "KSGF",
    name: "SPRINGFIELD",
    state: "MO",
    location: { lat: 37.235239, lon: -93.400419, elevationFt: 1375 }
  },
  {
    icao: "KSHV",
    name: "SHREVEPORT",
    state: "LA",
    location: { lat: 32.450833, lon: -93.84125, elevationFt: 387 }
  },
  {
    icao: "KSJT",
    name: "SAN ANGELO",
    state: "TX",
    location: { lat: 31.371278, lon: -100.4925, elevationFt: 2004 }
  },
  {
    icao: "KSOX",
    name: "SANTA ANA MOUNTAINS",
    state: "CA",
    location: { lat: 33.817733, lon: -117.636, elevationFt: 3106 }
  },
  {
    icao: "KSRX",
    name: "FORT SMITH",
    state: "AR",
    location: { lat: 35.290417, lon: -94.361889, elevationFt: 737 }
  },
  {
    icao: "KTBW",
    name: "TAMPA",
    state: "FL",
    location: { lat: 27.7055, lon: -82.401778, elevationFt: 122 }
  },
  {
    icao: "KTFX",
    name: "GREAT FALLS",
    state: "MT",
    location: { lat: 47.459583, lon: -111.38533, elevationFt: 3805 }
  },
  {
    icao: "KTLH",
    name: "TALLAHASSEE",
    state: "FL",
    location: { lat: 30.397583, lon: -84.328944, elevationFt: 177 }
  },
  {
    icao: "KTLX",
    name: "OKLAHOMA CITY",
    state: "OK",
    location: { lat: 35.333361, lon: -97.277761, elevationFt: 1278 }
  },
  {
    icao: "KTWX",
    name: "TOPEKA",
    state: "KS",
    location: { lat: 38.99695, lon: -96.23255, elevationFt: 1415 }
  },
  {
    icao: "KTYX",
    name: "FORT DRUM",
    state: "NY",
    location: { lat: 43.755694, lon: -75.679861, elevationFt: 1960 }
  },
  {
    icao: "KUDX",
    name: "RAPID CITY",
    state: "SD",
    location: { lat: 44.124722, lon: -102.83, elevationFt: 3195 }
  },
  {
    icao: "KUEX",
    name: "HASTINGS",
    state: "NE",
    location: { lat: 40.320833, lon: -98.441944, elevationFt: 2057 }
  },
  {
    icao: "KVAX",
    name: "MOODY AFB",
    state: "GA",
    location: { lat: 30.890278, lon: -83.001806, elevationFt: 330 }
  },
  {
    icao: "KVBX",
    name: "VANDENBERG AFB",
    state: "CA",
    location: { lat: 34.83855, lon: -120.39791, elevationFt: 1354 }
  },
  {
    icao: "KVNX",
    name: "VANCE AFB",
    state: "OK",
    location: { lat: 36.740617, lon: -98.127717, elevationFt: 1258 }
  },
  {
    icao: "KVTX",
    name: "LOS ANGELES",
    state: "CA",
    location: { lat: 34.412017, lon: -119.17875, elevationFt: 2807 }
  },
  {
    icao: "KVWX",
    name: "EVANSVILLE",
    state: "IN",
    location: { lat: 38.26025, lon: -87.724528, elevationFt: 625 }
  },
  {
    icao: "KYUX",
    name: "YUMA",
    state: "AZ",
    location: { lat: 32.495281, lon: -114.65671, elevationFt: 239 }
  },
  {
    icao: "LPLA",
    name: "LAJES AB",
    state: null,
    location: { lat: 38.73028, lon: -27.32167, elevationFt: 3334 }
  },
  {
    icao: "PABC",
    name: "BETHEL FAA",
    state: "AK",
    location: { lat: 60.791944, lon: -161.87638, elevationFt: 193 }
  },
  {
    icao: "PACG",
    name: "SITKA",
    state: "AK",
    location: { lat: 56.852778, lon: -135.52916, elevationFt: 272 }
  },
  {
    icao: "PAEC",
    name: "NOME",
    state: "AK",
    location: { lat: 64.511389, lon: -165.295, elevationFt: 90 }
  },
  {
    icao: "PAHG",
    name: "ANCHORAGE",
    state: "AK",
    location: { lat: 60.725914, lon: -151.35146, elevationFt: 356 }
  },
  {
    icao: "PAIH",
    name: "MIDDLETON ISLAND",
    state: "AK",
    location: { lat: 59.460767, lon: -146.30344, elevationFt: 132 }
  },
  {
    icao: "PAKC",
    name: "KING SALMON",
    state: "AK",
    location: { lat: 58.679444, lon: -156.62944, elevationFt: 144 }
  },
  {
    icao: "PAPD",
    name: "FAIRBANKS",
    state: "AK",
    location: { lat: 65.035114, lon: -147.50143, elevationFt: 2707 }
  },
  {
    icao: "PGUA",
    name: "ANDERSEN AFB AGANA",
    state: "GU",
    location: { lat: 13.455833, lon: 144.811111, elevationFt: 386 }
  },
  {
    icao: "PHKI",
    name: "SOUTH KAUAI",
    state: "HI",
    location: { lat: 21.893889, lon: -159.5525, elevationFt: 340 }
  },
  {
    icao: "PHKM",
    name: "KAMUELA",
    state: "HI",
    location: { lat: 20.125278, lon: -155.77777, elevationFt: 3966 }
  },
  {
    icao: "PHMO",
    name: "MOLOKAI",
    state: "HI",
    location: { lat: 21.132778, lon: -157.18027, elevationFt: 1444 }
  },
  {
    icao: "PHWA",
    name: "SOUTH SHORE",
    state: "HI",
    location: { lat: 19.095, lon: -155.56888, elevationFt: 1461 }
  },
  {
    icao: "RKJK",
    name: "KUNSAN",
    state: null,
    location: { lat: 35.924167, lon: 126.622222, elevationFt: 192 }
  },
  {
    icao: "RKSG",
    name: "CAMP HUMPHREYS",
    state: null,
    location: { lat: 37.207569, lon: 127.285561, elevationFt: 1521 }
  },
  {
    icao: "RODN",
    name: "KADENA",
    state: null,
    location: { lat: 26.3078, lon: 127.903469, elevationFt: 412 }
  },
  {
    icao: "TADW",
    name: "ANDREWS AFB",
    state: "MD",
    location: { lat: 38.695, lon: -76.845, elevationFt: 344 }
  },
  {
    icao: "TATL",
    name: "ATLANTA",
    state: "GA",
    location: { lat: 33.646944, lon: -84.261944, elevationFt: 1076 }
  },
  {
    icao: "TBNA",
    name: "NASHVILLE",
    state: "TN",
    location: { lat: 35.98, lon: -86.661944, elevationFt: 817 }
  },
  {
    icao: "TBOS",
    name: "BOSTON",
    state: "MA",
    location: { lat: 42.158056, lon: -70.933056, elevationFt: 262 }
  },
  {
    icao: "TBWI",
    name: "BALTIMORE WASHINGTON",
    state: "MD",
    location: { lat: 39.09, lon: -76.63, elevationFt: 299 }
  },
  {
    icao: "TCLT",
    name: "CHARLOTTE",
    state: "NC",
    location: { lat: 35.336944, lon: -80.885, elevationFt: 869 }
  },
  {
    icao: "TCMH",
    name: "COLUMBUS",
    state: "OH",
    location: { lat: 40.006111, lon: -82.715, elevationFt: 1148 }
  },
  {
    icao: "TCVG",
    name: "COVINGTON",
    state: "KY",
    location: { lat: 38.898056, lon: -84.58, elevationFt: 1053 }
  },
  {
    icao: "TDAL",
    name: "DALLAS LOVE FIELD",
    state: "TX",
    location: { lat: 32.926111, lon: -96.968056, elevationFt: 623 }
  },
  {
    icao: "TDAY",
    name: "DAYTON",
    state: "OH",
    location: { lat: 40.021944, lon: -84.123056, elevationFt: 1020 }
  },
  {
    icao: "TDCA",
    name: "WASHINGTON NATIONAL",
    state: "MD",
    location: { lat: 38.758889, lon: -76.961944, elevationFt: 344 }
  },
  {
    icao: "TDEN",
    name: "DENVER",
    state: "CO",
    location: { lat: 39.728056, lon: -104.52611, elevationFt: 5702 }
  },
  {
    icao: "TDFW",
    name: "DALLAS FT WORTH",
    state: "TX",
    location: { lat: 33.065, lon: -96.918056, elevationFt: 584 }
  },
  {
    icao: "TDTW",
    name: "DETROIT",
    state: "MI",
    location: { lat: 42.111111, lon: -83.515, elevationFt: 771 }
  },
  {
    icao: "TEWR",
    name: "NEWARK",
    state: "NJ",
    location: { lat: 40.593056, lon: -74.27, elevationFt: 135 }
  },
  {
    icao: "TFLL",
    name: "FT LAUDERDALE",
    state: "FL",
    location: { lat: 26.143056, lon: -80.343889, elevationFt: 121 }
  },
  {
    icao: "THOU",
    name: "HOUSTON HOBBY",
    state: "TX",
    location: { lat: 29.516111, lon: -95.241944, elevationFt: 118 }
  },
  {
    icao: "TIAD",
    name: "WASHINGTON DULLES",
    state: "VA",
    location: { lat: 39.083889, lon: -77.528889, elevationFt: 472 }
  },
  {
    icao: "TIAH",
    name: "HOUSTON INTERNATIONAL",
    state: "TX",
    location: { lat: 30.065, lon: -95.566944, elevationFt: 253 }
  },
  {
    icao: "TICH",
    name: "WICHITA",
    state: "KS",
    location: { lat: 37.506944, lon: -97.436944, elevationFt: 1352 }
  },
  {
    icao: "TIDS",
    name: "INDIANAPOLIS",
    state: "IN",
    location: { lat: 39.636944, lon: -86.436111, elevationFt: 846 }
  },
  {
    icao: "TJBQ",
    name: "RAFAEL HERNANDEZ AIRPORT",
    state: "PR",
    location: { lat: 18.485, lon: -67.143, elevationFt: 280 }
  },
  {
    icao: "TJFK",
    name: "NEW YORK CITY JFK",
    state: "NY",
    location: { lat: 40.588889, lon: -73.881111, elevationFt: 112 }
  },
  {
    icao: "TJRV",
    name: "JOSE APONTE DE LA TORRE AIRPOR",
    state: "PR",
    location: { lat: 18.256, lon: -65.637, elevationFt: 50 }
  },
  {
    icao: "TJUA",
    name: "SAN JUAN",
    state: "PR",
    location: { lat: 18.115667, lon: -66.078167, elevationFt: 2958 }
  },
  {
    icao: "TLAS",
    name: "LAS VEGAS",
    state: "NV",
    location: { lat: 36.143889, lon: -115.00694, elevationFt: 2057 }
  },
  {
    icao: "TLVE",
    name: "CLEVELAND",
    state: "OH",
    location: { lat: 41.29, lon: -82.008056, elevationFt: 932 }
  },
  {
    icao: "TMCI",
    name: "KANSAS CITY",
    state: "MO",
    location: { lat: 39.498056, lon: -94.741944, elevationFt: 1089 }
  },
  {
    icao: "TMCO",
    name: "ORLANDO INTERNATIONAL",
    state: "FL",
    location: { lat: 28.343889, lon: -81.326111, elevationFt: 171 }
  },
  {
    icao: "TMDW",
    name: "CHICAGO MIDWAY",
    state: "IL",
    location: { lat: 41.651111, lon: -87.73, elevationFt: 764 }
  },
  {
    icao: "TMEM",
    name: "MEMPHIS",
    state: "MS",
    location: { lat: 34.896111, lon: -89.993056, elevationFt: 482 }
  },
  {
    icao: "TMIA",
    name: "MIAMI",
    state: "FL",
    location: { lat: 25.758056, lon: -80.491111, elevationFt: 125 }
  },
  {
    icao: "TMKE",
    name: "MILWAUKEE",
    state: "WI",
    location: { lat: 42.818889, lon: -88.046111, elevationFt: 932 }
  },
  {
    icao: "TMSP",
    name: "MINNEAPOLIS",
    state: "MN",
    location: { lat: 44.871111, lon: -92.933056, elevationFt: 1122 }
  },
  {
    icao: "TMSY",
    name: "NEW ORLEANS",
    state: "LA",
    location: { lat: 30.021944, lon: -90.403056, elevationFt: 98 }
  },
  {
    icao: "TOKC",
    name: "NORMAN WFO",
    state: "OK",
    location: { lat: 35.276111, lon: -97.51, elevationFt: 1309 }
  },
  {
    icao: "TORD",
    name: "CHICAGO OHARE",
    state: "IL",
    location: { lat: 41.796944, lon: -87.858056, elevationFt: 745 }
  },
  {
    icao: "TPBI",
    name: "WEST PALM BEACH",
    state: "FL",
    location: { lat: 26.688056, lon: -80.273056, elevationFt: 135 }
  },
  {
    icao: "TPHL",
    name: "PHILADELPHIA",
    state: "NJ",
    location: { lat: 39.948889, lon: -75.068889, elevationFt: 154 }
  },
  {
    icao: "TPHX",
    name: "PHOENIX",
    state: "AZ",
    location: { lat: 33.421111, lon: -112.16305, elevationFt: 1089 }
  },
  {
    icao: "TPIT",
    name: "PITTSBURGH",
    state: "PA",
    location: { lat: 40.501111, lon: -80.486111, elevationFt: 1385 }
  },
  {
    icao: "TRDU",
    name: "RALEIGH",
    state: "NC",
    location: { lat: 36.001944, lon: -78.696944, elevationFt: 515 }
  },
  {
    icao: "TSDF",
    name: "LOUISVILLE",
    state: "KY",
    location: { lat: 38.046111, lon: -85.61, elevationFt: 732 }
  },
  {
    icao: "TSJU",
    name: "SAN JUAN",
    state: "PR",
    location: { lat: 18.473889, lon: -66.178889, elevationFt: 157 }
  },
  {
    icao: "TSLC",
    name: "SALT LAKE CITY",
    state: "UT",
    location: { lat: 40.966944, lon: -111.93, elevationFt: 4295 }
  },
  {
    icao: "TSTL",
    name: "ST LOUIS",
    state: "MO",
    location: { lat: 38.805, lon: -90.488889, elevationFt: 646 }
  },
  {
    icao: "TTPA",
    name: "TAMPA",
    state: "FL",
    location: { lat: 27.86, lon: -82.518056, elevationFt: 92 }
  },
  {
    icao: "TTUL",
    name: "TULSA",
    state: "OK",
    location: { lat: 36.071111, lon: -95.826944, elevationFt: 823 }
  }
];
