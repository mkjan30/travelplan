// ============================================================
// TRIP DATA — Edit this file to update your itinerary & costs
// ============================================================
import {
  Landmark, Leaf, Umbrella, Palmtree, Utensils, GlassWater,
  ShoppingBag, Sunrise, Sun, Sunset, Moon, Sparkles, Clock
} from "lucide-react";

export const TRIPS = {
  bangkok: {
    id: "bangkok",
    destination: "Bangkok, Thailand",
    flag: "🇹🇭",
    startDate: "2026-04-20",
    endDate: "2026-04-26",
    currency: "THB",
    coverColor: "#f43f5e",
    days: [
      {
        id: "bkk-d1", day: 1, theme: "Bangkok Icons (Temples & River)",
        slots: [
          { id: "bkk-d1-s1", time: "Morning", place: "Grand Palace", description: "Royal complex and Bangkok icon", mustVisit: ["Emerald Buddha temple", "Golden architecture"], estimatedCost: 500, actualCost: null, category: "culture", lat: 13.7500, lng: 100.4913 },
          { id: "bkk-d1-s2", time: "Afternoon", place: "Wat Pho", description: "Reclining Buddha / Thai massage school", estimatedCost: 200, actualCost: null, category: "culture", lat: 13.7465, lng: 100.4933 },
          { id: "bkk-d1-s3", time: "Sunset", place: "Wat Arun", description: "Best river sunset views", estimatedCost: 100, actualCost: null, category: "culture", lat: 13.7437, lng: 100.4889 },
          { id: "bkk-d1-s4", time: "Evening", place: "Dinner by Chao Phraya", description: "Riverside dinner", estimatedCost: 800, actualCost: null, category: "food", lat: 13.7225, lng: 100.5147 }
        ]
      },
      {
        id: "bkk-d2", day: 2, theme: "Markets & Chinatown",
        slots: [
          { id: "bkk-d2-s1", time: "Morning", place: "Pak Khlong Talat", description: "Biggest flower market", estimatedCost: 0, actualCost: null, category: "shopping", lat: 13.7423, lng: 100.4967 },
          { id: "bkk-d2-s2", time: "Afternoon", place: "Chinatown (Yaowarat)", description: "Michelin street food / grilled seafood", mustVisit: ["Wat Mangkon Kamalawat (Chinese Buddhist temple)"], estimatedCost: 200, actualCost: null, category: "food", lat: 13.7411, lng: 100.5085 },
          { id: "bkk-d2-s3", time: "Nightlife", place: "Yaowarat street food", description: "Budget $10–$15", estimatedCost: 400, actualCost: null, category: "food", lat: 13.7411, lng: 100.5085 }
        ]
      },
      {
        id: "bkk-d3", day: 3, theme: "Floating Markets & Train Market",
        slots: [
          { id: "bkk-d3-s1", time: "Morning", place: "Damnoen Saduak", description: "Floating market tour", estimatedCost: 800, actualCost: null, category: "culture", lat: 13.5196, lng: 99.9597 },
          { id: "bkk-d3-s2", time: "Morning", place: "Maeklong Railway Market", description: "Train runs through stalls", estimatedCost: 0, actualCost: null, category: "culture", lat: 13.4075, lng: 99.9986 },
          { id: "bkk-d3-s3", time: "Afternoon", place: "Return to Bangkok", description: "Tour ends around 2 PM", estimatedCost: 200, actualCost: null, category: "nature", lat: 13.7563, lng: 100.5018 },
          { id: "bkk-d3-s4", time: "Evening", place: "Rooftop bar", description: "Octave or Sky Bar", estimatedCost: 1000, actualCost: null, category: "nightlife", lat: 13.7215, lng: 100.5170 }
        ]
      },
      {
        id: "bkk-d4", day: 4, theme: "Modern Bangkok",
        slots: [
          { id: "bkk-d4-s1", time: "Morning", place: "Mahanakhon SkyWalk", description: "Glass sky deck", estimatedCost: 880, actualCost: null, category: "adventure", lat: 13.7236, lng: 100.5284 },
          { id: "bkk-d4-s2", time: "Afternoon", place: "ICONSIAM", description: "Food hall / Indoor floating market", estimatedCost: 500, actualCost: null, category: "shopping", lat: 13.7266, lng: 100.5105 },
          { id: "bkk-d4-s3", time: "Nightlife", place: "Sukhumvit nightlife", description: "Soi 11 / Nana Plaza", estimatedCost: 1500, actualCost: null, category: "nightlife", lat: 13.7433, lng: 100.5564 }
        ]
      },
      {
        id: "bkk-d5", day: 5, theme: "Ayutthaya Day Trip",
        slots: [
          { id: "bkk-d5-s1", time: "Whole Day", place: "Wat Mahathat & Wat Chaiwatthanaram", description: "Buddha head in tree roots & Iconic riverside ruins", mustVisit: ["Ayutthaya Historical Park (UNESCO heritage site)"], estimatedCost: 1000, actualCost: null, category: "culture", lat: 14.3532, lng: 100.5690 },
          { id: "bkk-d5-s2", time: "Evening", place: "Travel", description: "Bangkok <-> Ayutthaya (1-1.5 hrs each way)", estimatedCost: 300, actualCost: null, category: "nature", lat: 13.7563, lng: 100.5018 }
        ]
      },
      {
        id: "bkk-d6", day: 6, theme: "Hidden Bangkok & Local Life",
        slots: [
          { id: "bkk-d6-s1", time: "Morning", place: "Bang Krachao", description: "Cycling / Floating cafes / Green lung", estimatedCost: 300, actualCost: null, category: "nature", lat: 13.6841, lng: 100.5630 },
          { id: "bkk-d6-s2", time: "Afternoon", place: "Canal boat tour", description: "Explore old waterways", estimatedCost: 500, actualCost: null, category: "adventure", lat: 13.7563, lng: 100.5018 },
          { id: "bkk-d6-s3", time: "Nightlife", place: "Talad Rot Fai Srinakarin", description: "Vintage market / Street food", estimatedCost: 500, actualCost: null, category: "shopping", lat: 13.6924, lng: 100.6493 }
        ]
      },
      {
        id: "bkk-d7", day: 7, theme: "Shopping & Relaxation",
        slots: [
          { id: "bkk-d7-s1", time: "Morning", place: "Chatuchak Weekend Market", description: "15,000+ stalls / Souvenirs and clothes", estimatedCost: 1000, actualCost: null, category: "shopping", lat: 13.8000, lng: 100.5500 },
          { id: "bkk-d7-s2", time: "Afternoon", place: "Traditional Thai Spa", description: "Health Land or Let's Relax", estimatedCost: 800, actualCost: null, category: "nature", lat: 13.7563, lng: 100.5018 },
          { id: "bkk-d7-s3", time: "Final Sunset", place: "Chao Phraya dinner cruise", description: "Temple views at night / $35-$50", estimatedCost: 1500, actualCost: null, category: "food", lat: 13.7225, lng: 100.5147 }
        ]
      }
    ]
  },
  chiang_mai: {
    id: "chiang_mai",
    destination: "Chiang Mai, Thailand",
    flag: "🇹🇭",
    startDate: "2026-04-27",
    endDate: "2026-04-30",
    currency: "THB",
    coverColor: "#8b5cf6",
    days: [
      {
        id: "cm-d1", day: 1, theme: "Old City Exploration",
        slots: [
          { id: "cm-d1-s1", time: "Morning", place: "Old City Temples", description: "Wat Chedi Luang / Wat Phra Singh / Wat Chiang Man", estimatedCost: 150, actualCost: null, category: "culture", lat: 18.7869, lng: 98.9866 },
          { id: "cm-d1-s2", time: "Afternoon", place: "Three Kings Monument", description: "Chiang Mai City Arts & Cultural Centre", estimatedCost: 90, actualCost: null, category: "culture", lat: 18.7903, lng: 98.9873 },
          { id: "cm-d1-s3", time: "Evening", place: "Chiang Mai Night Bazaar", description: "Street food / Souvenirs / Local crafts", estimatedCost: 400, actualCost: null, category: "shopping", lat: 18.7865, lng: 98.9996 }
        ]
      },
      {
        id: "cm-d2", day: 2, theme: "Doi Suthep & Mountain Temples",
        slots: [
          { id: "cm-d2-s1", time: "Morning", place: "Wat Phra That Doi Suthep", description: "Golden pagoda / City viewpoint / Dragon stairs", estimatedCost: 200, actualCost: null, category: "culture", lat: 18.8049, lng: 98.9213 },
          { id: "cm-d2-s2", time: "Afternoon", place: "Wat Pha Lat", description: "Hidden jungle temple / Peaceful forest setting", estimatedCost: 50, actualCost: null, category: "nature", lat: 18.7994, lng: 98.9416 },
          { id: "cm-d2-s3", time: "Sunset", place: "Doi Suthep Viewpoint", description: "Panoramic Chiang Mai city views", estimatedCost: 0, actualCost: null, category: "nature", lat: 18.8049, lng: 98.9213 },
          { id: "cm-d2-s4", time: "Evening", place: "Nimmanhaemin District", description: "Cafes / Restaurants / Nightlife", estimatedCost: 600, actualCost: null, category: "nightlife", lat: 18.7961, lng: 98.9664 }
        ]
      },
      {
        id: "cm-d3", day: 3, theme: "Doi Inthanon National Park",
        slots: [
          { id: "cm-d3-s1", time: "Whole Day", place: "Doi Inthanon Tour", description: "Wachirathan Waterfall / Twin Royal Pagodas / Highest peak", estimatedCost: 1500, actualCost: null, category: "adventure", lat: 18.5883, lng: 98.4851 }
        ]
      },
      {
        id: "cm-d4", day: 4, theme: "Elephant Sanctuary Experience",
        slots: [
          { id: "cm-d4-s1", time: "Morning", place: "Elephant Nature Park", description: "Feed and interact with rescued elephants (No riding)", estimatedCost: 2500, actualCost: null, category: "nature", lat: 19.2155, lng: 98.8145 },
          { id: "cm-d4-s2", time: "Afternoon", place: "Mountain Cafes", description: "No.39 Cafe / Chom Cafe / Graph Cafe", estimatedCost: 300, actualCost: null, category: "food", lat: 18.7961, lng: 98.9664 },
          { id: "cm-d4-s3", time: "Evening", place: "Sunday Walking Street Market", description: "Street food / Handicrafts / Live music", estimatedCost: 500, actualCost: null, category: "shopping", lat: 18.7883, lng: 98.9880 }
        ]
      }
    ]
  },
  phuket: {
    id: "phuket",
    destination: "Phuket, Thailand",
    flag: "🇹🇭",
    startDate: "2026-04-14",
    endDate: "2026-04-17",
    currency: "THB",
    coverColor: "#0ea5e9",
    days: [
      {
        id: "phuket-d1",
        day: 1,
        theme: "Old Phuket Town + Culture + Sunset Viewpoints",
        slots: [
          {
            id: "phuket-d1-s1",
            time: "Morning",
            place: "Old Phuket Town",
            description:
              "Colorful Sino-Portuguese buildings, cafes and street art, Thalang Road walking street.",
            mustVisit: ["Soi Romanee (Instagram street)", "Phuket Thai Hua Museum", "Jui Tui Chinese Temple"],
            estimatedCost: 300,
            actualCost: null,
            category: "culture",
            lat: 7.8862,
            lng: 98.3923,
          },
          {
            id: "phuket-d1-s2",
            time: "Afternoon",
            place: "Big Buddha",
            description:
              "One of the best viewpoints in Phuket. Huge marble Buddha statue on the hill. Free entry.",
            estimatedCost: 100,
            actualCost: null,
            category: "culture",
            lat: 7.8275,
            lng: 98.3121,
          },
          {
            id: "phuket-d1-s3",
            time: "Afternoon",
            place: "Wat Chalong Temple",
            description:
              "Most important temple in Phuket. Beautiful golden architecture.",
            estimatedCost: 100,
            actualCost: null,
            category: "culture",
            lat: 7.8453,
            lng: 98.3375,
          },
          {
            id: "phuket-d1-s4",
            time: "Sunset",
            place: "Promthep Cape",
            description: "One of the best sunset spots in Thailand.",
            optional: false,
            estimatedCost: 50,
            actualCost: null,
            category: "nature",
            lat: 7.7636,
            lng: 98.3054,
          },
          {
            id: "phuket-d1-s5",
            time: "Optional",
            place: "Windmill Viewpoint / Nai Harn Beach",
            description: "Optional add-on after Promthep Cape.",
            optional: true,
            estimatedCost: 0,
            actualCost: null,
            category: "nature",
            lat: 7.7769,
            lng: 98.3038,
          },
        ],
      },
      {
        id: "phuket-d2",
        day: 2,
        theme: "Island Hopping — The Best Tour in Phuket",
        slots: [
          {
            id: "phuket-d2-s1",
            time: "Whole Day",
            place: "Phi Phi Islands Boat Tour",
            description:
              "Full-day island hopping tour to the stunning Phi Phi Islands — snorkeling, clear water, limestone cliffs.",
            estimatedCost: 1500,
            actualCost: null,
            category: "adventure",
            lat: 7.7407,
            lng: 98.7784,
          },
          {
            id: "phuket-d2-s2",
            time: "Evening",
            place: "Patong Night Market",
            description: "Patong Night Market or Malin Plaza Market for street food dinner.",
            mustVisit: ["Patong Night Market", "Malin Plaza Market"],
            estimatedCost: 300,
            actualCost: null,
            category: "food",
            lat: 7.8906,
            lng: 98.2955,
          },
        ],
      },
      {
        id: "phuket-d3",
        day: 3,
        theme: "Beaches + Adventure + Nightlife",
        slots: [
          {
            id: "phuket-d3-s1",
            time: "Morning",
            place: "Kata Noi Beach",
            description: "Swimming, snorkeling, jet ski, parasailing.",
            mustVisit: ["Swimming", "Snorkeling", "Jet Ski", "Parasailing"],
            estimatedCost: 800,
            actualCost: null,
            category: "beach",
            lat: 7.8211,
            lng: 98.2968,
          },
          {
            id: "phuket-d3-s2",
            time: "Afternoon",
            place: "Hanuman World Zipline",
            description:
              "Hanuman World zipline or Elephant Sanctuary — choose your adventure!",
            mustVisit: ["Hanuman World Zipline", "Elephant Sanctuary"],
            estimatedCost: 1200,
            actualCost: null,
            category: "adventure",
            lat: 7.9125,
            lng: 98.3509,
          },
          {
            id: "phuket-d3-s3",
            time: "Sunset",
            place: "Karon Viewpoint",
            description:
              "Overlooks three beaches — great spot for golden hour photos.",
            estimatedCost: 0,
            actualCost: null,
            category: "nature",
            lat: 7.8415,
            lng: 98.2975,
          },
          {
            id: "phuket-d3-s4",
            time: "Nightlife",
            place: "Bangla Road, Patong",
            description: "Famous party street. Clubs, bars, live music, entertainment.",
            mustVisit: ["Bangla Road", "Illuzion Club", "Tiger Nightclub", "Cafe del Mar Beach Club"],
            estimatedCost: 1000,
            actualCost: null,
            category: "nightlife",
            lat: 7.8920,
            lng: 98.2955,
          },
        ],
      },
      {
        id: "phuket-d4",
        day: 4,
        theme: "Hidden Gems + Relaxing Day",
        slots: [
          {
            id: "phuket-d4-s1",
            time: "Early Morning",
            place: "Samet Nangshe Viewpoint",
            description:
              "One of the most beautiful views in Thailand. Overlooks limestone islands in Phang Nga Bay. Sunrise recommended.",
            estimatedCost: 500,
            actualCost: null,
            category: "nature",
            lat: 8.2849,
            lng: 98.5290,
          },
          {
            id: "phuket-d4-s2",
            time: "Late Morning",
            place: "Bang Pae Waterfall",
            description: "Short jungle walk to a lovely waterfall.",
            estimatedCost: 200,
            actualCost: null,
            category: "nature",
            lat: 8.0186,
            lng: 98.3667,
          },
          {
            id: "phuket-d4-s3",
            time: "Afternoon",
            place: "Phang Nga Bay Tour",
            description:
              "James Bond Island, canoeing through caves, floating villages.",
            mustVisit: ["James Bond Island", "Canoeing through caves", "Floating villages"],
            estimatedCost: 1500,
            actualCost: null,
            category: "adventure",
            lat: 8.2752,
            lng: 98.5018,
          },
          {
            id: "phuket-d4-s4",
            time: "Final Sunset",
            place: "Catch Beach Club",
            description: "Wind down at Cafe del Mar, Catch Beach Club, or Carpe Diem Beach Club.",
            mustVisit: ["Cafe del Mar", "Catch Beach Club", "Carpe Diem Beach Club"],
            estimatedCost: 800,
            actualCost: null,
            category: "beach",
            lat: 7.9726,
            lng: 98.2770,
          },
        ],
      },
    ],
  },
  malaysia: {
    id: "malaysia",
    destination: "Malaysia",
    flag: "🇲🇾",
    startDate: "2026-04-18",
    endDate: "2026-04-22",
    currency: "MYR",
    coverColor: "#10b981",
    days: [
      {
        id: "malaysia-d1",
        day: 1,
        theme: "Add your Malaysia itinerary",
        slots: [
          {
            id: "malaysia-d1-s1",
            time: "Morning",
            place: "To be planned",
            description: "Tap the + button to add your Malaysia activities.",
            estimatedCost: 0,
            actualCost: null,
            category: "culture",
            lat: 3.1390,
            lng: 101.6869,
          },
        ],
      },
    ],
  },

};

export const PLACES_TO_VISIT = [
  // Phuket
  { id: "p1", trip: "phuket", name: "Old Phuket Town", category: "culture", visited: false, notes: "", lat: 7.8862, lng: 98.3923 },
  { id: "p2", trip: "phuket", name: "Big Buddha", category: "culture", visited: false, notes: "", lat: 7.8275, lng: 98.3121 },
  { id: "p3", trip: "phuket", name: "Wat Chalong Temple", category: "culture", visited: false, notes: "", lat: 7.8453, lng: 98.3375 },
  { id: "p4", trip: "phuket", name: "Phi Phi Islands", category: "nature", visited: false, notes: "", lat: 7.7407, lng: 98.7784 },
  { id: "p5", trip: "phuket", name: "Kata Noi Beach", category: "beach", visited: false, notes: "", lat: 7.8211, lng: 98.2968 },
  { id: "p6", trip: "phuket", name: "Promthep Cape", category: "nature", visited: false, notes: "", lat: 7.7636, lng: 98.3054 },
  { id: "p7", trip: "phuket", name: "Samet Nangshe Viewpoint", category: "nature", visited: false, notes: "", lat: 8.2849, lng: 98.5290 },
  { id: "p8", trip: "phuket", name: "Phang Nga Bay", category: "nature", visited: false, notes: "", lat: 8.2752, lng: 98.5018 },
  { id: "p9", trip: "phuket", name: "Bangla Road", category: "nightlife", visited: false, notes: "", lat: 7.8920, lng: 98.2955 },
  { id: "p10", trip: "phuket", name: "Patong Night Market", category: "food", visited: false, notes: "", lat: 7.8906, lng: 98.2955 },
  { id: "p11", trip: "phuket", name: "Tiger Kingdom", category: "adventure", visited: false, notes: "", lat: 7.9265, lng: 98.3357 },
  { id: "p12", trip: "phuket", name: "Hanuman World Zipline", category: "adventure", visited: false, notes: "", lat: 7.9125, lng: 98.3509 },
  // Malaysia
  { id: "m1", trip: "malaysia", name: "Petronas Twin Towers", category: "culture", visited: false, notes: "", lat: 3.1579, lng: 101.7116 },
  { id: "m2", trip: "malaysia", name: "Batu Caves", category: "culture", visited: false, notes: "", lat: 3.2379, lng: 101.6840 },
  { id: "m3", trip: "malaysia", name: "Langkawi", category: "nature", visited: false, notes: "", lat: 6.3500, lng: 99.8000 },
  // Bangkok
  { id: "b1", trip: "bangkok", name: "Grand Palace & Wat Phra Kaew", category: "culture", visited: false, notes: "", lat: 13.7500, lng: 100.4913 },
  { id: "b2", trip: "bangkok", name: "Wat Arun", category: "culture", visited: false, notes: "", lat: 13.7437, lng: 100.4889 },
  { id: "b3", trip: "bangkok", name: "Chatuchak Weekend Market", category: "shopping", visited: false, notes: "", lat: 13.8000, lng: 100.5500 },
  { id: "b4", trip: "bangkok", name: "Ayutthaya Historical Park", category: "culture", visited: false, notes: "", lat: 14.3532, lng: 100.5690 },
  { id: "b5", trip: "bangkok", name: "Yaowarat (Chinatown)", category: "food", visited: false, notes: "", lat: 13.7411, lng: 100.5085 },
  // Chiang Mai
  { id: "cm1", trip: "chiang_mai", name: "Wat Phra That Doi Suthep", category: "culture", visited: false, notes: "", lat: 18.8049, lng: 98.9213 },
  { id: "cm2", trip: "chiang_mai", name: "Elephant Nature Park", category: "nature", visited: false, notes: "", lat: 19.2155, lng: 98.8145 },
  { id: "cm3", trip: "chiang_mai", name: "Chiang Mai Night Bazaar", category: "shopping", visited: false, notes: "", lat: 18.7865, lng: 98.9996 },
  { id: "cm4", trip: "chiang_mai", name: "Doi Inthanon National Park", category: "adventure", visited: false, notes: "", lat: 18.5883, lng: 98.4851 },
];

export const PACKING_LIST = [
  // Documents
  { id: "pk1", category: "Documents", item: "Passport", checked: false },
  { id: "pk2", category: "Documents", item: "Travel Insurance", checked: false },
  { id: "pk3", category: "Documents", item: "Hotel Booking Confirmations", checked: false },
  { id: "pk4", category: "Documents", item: "Flight Tickets", checked: false },
  { id: "pk5", category: "Documents", item: "Emergency Contact List", checked: false },
  // Money
  { id: "pk6", category: "Money", item: "Thai Baht (THB) cash", checked: false },
  { id: "pk7", category: "Money", item: "Malaysian Ringgit (MYR) cash", checked: false },
  { id: "pk8", category: "Money", item: "Travel Card / Wise Card", checked: false },
  // Clothes
  { id: "pk9", category: "Clothes", item: "Light T-shirts (7x)", checked: false },
  { id: "pk10", category: "Clothes", item: "Shorts (3x)", checked: false },
  { id: "pk11", category: "Clothes", item: "Swimwear (2x)", checked: false },
  { id: "pk12", category: "Clothes", item: "Light jacket / hoodie", checked: false },
  { id: "pk13", category: "Clothes", item: "Comfortable walking shoes", checked: false },
  { id: "pk14", category: "Clothes", item: "Flip flops / sandals", checked: false },
  // Temple Visit
  { id: "pk15", category: "Temple", item: "Modest clothing (cover shoulders & knees)", checked: false },
  // Beach & Adventure
  { id: "pk16", category: "Beach", item: "Sunscreen SPF 50+", checked: false },
  { id: "pk17", category: "Beach", item: "Sunglasses", checked: false },
  { id: "pk18", category: "Beach", item: "Beach towel", checked: false },
  { id: "pk19", category: "Beach", item: "Waterproof bag / dry bag", checked: false },
  { id: "pk20", category: "Beach", item: "Underwater camera / GoPro", checked: false },
  // Health
  { id: "pk21", category: "Health", item: "Motion sickness pills (for boat tours)", checked: false },
  { id: "pk22", category: "Health", item: "Mosquito repellent", checked: false },
  { id: "pk23", category: "Health", item: "Basic first aid kit", checked: false },
  { id: "pk24", category: "Health", item: "Hand sanitizer", checked: false },
  // Tech
  { id: "pk25", category: "Tech", item: "Phone charger", checked: false },
  { id: "pk26", category: "Tech", item: "Power bank", checked: false },
  { id: "pk27", category: "Tech", item: "Universal travel adapter", checked: false },
  { id: "pk28", category: "Tech", item: "SIM card / eSIM (Thailand)", checked: false },
];

export const CATEGORY_META = {
  culture: { label: "Culture", icon: Landmark, color: "#8b5cf6" },
  nature: { label: "Nature", icon: Leaf, color: "#10b981" },
  beach: { label: "Beach", icon: Umbrella, color: "#0ea5e9" },
  adventure: { label: "Adventure", icon: Palmtree, color: "#f59e0b" },
  food: { label: "Food", icon: Utensils, color: "#ef4444" },
  nightlife: { label: "Nightlife", icon: GlassWater, color: "#6366f1" },
  shopping: { label: "Shopping", icon: ShoppingBag, color: "#ec4899" },
};

export const TIME_ICONS = {
  "Morning": Sunrise,
  "Afternoon": Sun,
  "Sunset": Sunset,
  "Evening": Moon,
  "Nightlife": GlassWater,
  "Whole Day": Clock,
  "Early Morning": Sunrise,
  "Late Morning": Sun,
  "Final Sunset": Sunset,
  "Optional": Sparkles,
};

// ─── Map Helpers (free, no API key required) ─────────────────
// Builds a Google Maps directions URL using coordinates or place name.
// On mobile, this opens the native Maps app automatically.
export function getMapsDirectionUrl(lat, lng, placeName) {
  if (lat && lng) {
    // Coordinate-based (most accurate)
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  }
  // Fallback: search by name
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
}

// Opens in Google Maps (or Apple Maps on iOS via universal link)
export function getAppleMapsUrl(lat, lng, placeName) {
  if (lat && lng) {
    return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  }
  return `https://maps.apple.com/?q=${encodeURIComponent(placeName)}`;
}

// OpenStreetMap view (fallback, always free)
export function getOSMUrl(lat, lng, placeName) {
  if (lat && lng) {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=16`;
  }
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(placeName)}`;
}
