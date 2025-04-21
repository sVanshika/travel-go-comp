"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { MapPin, Calendar, DollarSign, Utensils, Ticket, Info, Map, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import React from "react"

// Mock destinations data (same as in explore page)
const DESTINATIONS = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/goa.jpg",
    images: [
      "/images/destinations/goa-1.jpg",
      "/images/destinations/goa-2.jpg",
      "/images/destinations/goa-3.jpg",
      "/images/destinations/goa-4.jpg",
    ],
    budget: "budget-friendly",
    activityTypes: ["beach", "relaxation", "nightlife"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "Famous for its beaches, nightlife, and Portuguese heritage.",
    overview:
      "Goa is a state on the southwestern coast of India within the region known as the Konkan. It is bounded by the state of Maharashtra to the north and by Karnataka to the east and south, with the Arabian Sea forming its western coast. Goa is India's smallest state by area and the fourth-smallest by population. Goa has the highest GDP per capita among all Indian states, two and a half times that of the country. The Eleventh Finance Commission of India named Goa the best-placed state because of its infrastructure, and India's National Commission on Population rated it as having the best quality of life in India.",
    attractions: [
      { name: "Calangute Beach", description: "One of the most popular beaches in Goa." },
      {
        name: "Basilica of Bom Jesus",
        description: "UNESCO World Heritage Site and one of the most famous churches in Goa.",
      },
      { name: "Fort Aguada", description: "A well-preserved 17th-century Portuguese fort." },
      {
        name: "Dudhsagar Falls",
        description: "One of India's tallest waterfalls, located in the Bhagwan Mahavir Wildlife Sanctuary.",
      },
      { name: "Anjuna Flea Market", description: "Famous market selling everything from clothes to spices." },
    ],
    cuisine: [
      { name: "Fish Curry Rice", description: "The staple food of Goa, a spicy curry with local fish and rice." },
      { name: "Vindaloo", description: "A spicy curry dish of Portuguese influence." },
      { name: "Bebinca", description: "A traditional Goan dessert with multiple layers." },
      { name: "Feni", description: "A traditional spirit distilled from cashew fruit or coconut palm." },
    ],
    events: [
      { name: "Goa Carnival", month: "February", description: "A colorful celebration before Lent." },
      { name: "Shigmo Festival", month: "March", description: "A spring festival celebrating the arrival of spring." },
      {
        name: "Sunburn Festival",
        month: "December",
        description: "One of Asia's biggest electronic dance music festivals.",
      },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹1,000 - ₹2,500 per night",
        mid: "₹2,500 - ₹7,000 per night",
        luxury: "₹7,000+ per night",
      },
      food: {
        budget: "₹300 - ₹600 per day",
        mid: "₹600 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      transportation: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      activities: {
        budget: "₹500 - ₹1,000 per day",
        mid: "₹1,000 - ₹3,000 per day",
        luxury: "₹3,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Hampi", distance: "300 km", description: "UNESCO World Heritage Site with ancient ruins." },
      { name: "Mumbai", distance: "590 km", description: "India's financial capital and home to Bollywood." },
      { name: "Pune", distance: "450 km", description: "Cultural capital of Maharashtra with historical sites." },
    ],
  },
  // More destinations would be here in a real app
  {
    id: 2,
    name: "Manali",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/manali.jpg",
    images: [
      "/images/destinations/manali-1.jpg",
      "/images/destinations/manali-2.jpg",
      "/images/destinations/manali-3.jpg",
      "/images/destinations/manali-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["mountains", "adventure", "nature", "snow"],
    bestTimeToVisit: ["april", "may", "june", "september", "october", "december", "january", "february"],
    description: "A popular hill station known for its scenic beauty and adventure activities.",
    overview:
      "Manali is a high-altitude Himalayan resort town in India’s northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Surrounded by the Pir Panjal and Dhauladhar ranges, the town is blessed with a picturesque landscape of snow-capped peaks, thick forests, and flowing rivers. The Beas River runs through the town and serves as the lifeline of Manali.",
    attractions: [
      { name: "Solang Valley", description: "Popular for paragliding, skiing, and snow activities." },
      { name: "Rohtang Pass", description: "A high mountain pass with snow even in summer." },
      { name: "Hadimba Temple", description: "A unique temple surrounded by cedar forests." },
      { name: "Old Manali", description: "Charming cafes, bakeries, and a laid-back vibe." },
      { name: "Vashisht Hot Springs", description: "Natural hot water springs with temple surroundings." },
    ],
    cuisine: [
      { name: "Siddu", description: "A Himachali steamed bread with spicy fillings." },
      { name: "Trout Fish", description: "Fresh river trout, often grilled or curried." },
      { name: "Chha Gosht", description: "Spiced lamb curry cooked in yogurt gravy." },
      { name: "Tudkiya Bhath", description: "A unique Himachali rice dish with lentils and spices." },
    ],
    events: [
      { name: "Winter Carnival", month: "January", description: "Celebrates snow sports, culture, and music." },
      { name: "Dussehra Festival", month: "October", description: "Manali celebrates Kullu Dussehra with grandeur." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹800 - ₹2,000 per night",
        mid: "₹2,000 - ₹5,000 per night",
        luxury: "₹5,000+ per night",
      },
      food: {
        budget: "₹250 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      transportation: {
        budget: "₹300 - ₹600 per day",
        mid: "₹600 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      activities: {
        budget: "₹300 - ₹800 per day",
        mid: "₹800 - ₹2,000 per day",
        luxury: "₹2,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Kasol", distance: "75 km", description: "A peaceful village known for its Israeli cafes and scenic views." },
      { name: "Spiti Valley", distance: "200 km", description: "Remote desert mountains with ancient monasteries." },
      { name: "Shimla", distance: "250 km", description: "Colonial hill station and Himachal's capital." },
    ],
  },
  {
    id: 3,
    name: "Jaipur",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/jaipur.jpg",
    images: [
      "/images/destinations/jaipur-1.jpg",
      "/images/destinations/jaipur-2.jpg",
      "/images/destinations/jaipur-3.jpg",
      "/images/destinations/jaipur-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["heritage", "palaces", "culture", "shopping"],
    bestTimeToVisit: ["november", "december", "january", "february", "march"],
    description: "The Pink City, known for its royal architecture, palaces, and vibrant bazaars.",
    overview:
      "Jaipur, the capital of Rajasthan, is a vibrant blend of the old and the new. Also known as the 'Pink City', it was one of the first planned cities in India and is famous for its magnificent forts, palaces, temples, and colorful markets. It's a part of the famous Golden Triangle tourist circuit along with Delhi and Agra.",
    attractions: [
      { name: "Amber Fort", description: "Hilltop fort with artistic Hindu architecture and elephant rides." },
      { name: "City Palace", description: "Royal residence with museums and courtyards." },
      { name: "Hawa Mahal", description: "Palace of Winds with a stunning honeycomb facade." },
      { name: "Jantar Mantar", description: "A UNESCO site and astronomical observatory." },
      { name: "Bapu Bazaar", description: "Bustling market for textiles, jewelry, and local handicrafts." },
    ],
    cuisine: [
      { name: "Dal Baati Churma", description: "Traditional Rajasthani meal of lentils, baked dough balls, and sweet crushed wheat." },
      { name: "Laal Maas", description: "Spicy red meat curry with a fiery flavor." },
      { name: "Ghewar", description: "Disc-shaped sweet soaked in syrup, popular during festivals." },
      { name: "Kachori", description: "Deep-fried savory snack often filled with lentils or onion." },
    ],
    events: [
      { name: "Jaipur Literature Festival", month: "January", description: "World’s largest free literary festival." },
      { name: "Teej Festival", month: "August", description: "Women’s festival celebrating monsoon with songs and dances." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹800 - ₹2,500 per night",
        mid: "₹2,500 - ₹6,000 per night",
        luxury: "₹6,000+ per night",
      },
      food: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      transportation: {
        budget: "₹100 - ₹300 per day",
        mid: "₹300 - ₹800 per day",
        luxury: "₹800+ per day",
      },
      activities: {
        budget: "₹300 - ₹800 per day",
        mid: "₹800 - ₹2,000 per day",
        luxury: "₹2,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Ajmer", distance: "130 km", description: "Spiritual city with Dargah Sharif." },
      { name: "Pushkar", distance: "145 km", description: "Holy town famous for camel fair and Brahma temple." },
      { name: "Ranthambore", distance: "180 km", description: "Wildlife reserve known for tiger sightings." },
    ],
  },
  {
    id: 4,
    name: "Munnar",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/munnar.jpg",
    images: [
      "/images/destinations/munnar-1.jpg",
      "/images/destinations/munnar-2.jpg",
      "/images/destinations/munnar-3.jpg",
      "/images/destinations/munnar-4.jpg",
    ],
    budget: "budget-friendly",
    activityTypes: ["hills", "tea plantations", "nature", "wildlife"],
    bestTimeToVisit: ["september", "october", "november", "december", "january", "february", "march"],
    description: "A tranquil hill station in Kerala known for tea gardens and lush green valleys.",
    overview:
      "Munnar is a town in the Western Ghats mountain range in India’s Kerala state. It's known for rolling hills dotted with tea plantations established in the late 19th century. The area is also rich in biodiversity and offers scenic vistas, wildlife sanctuaries, and a calm retreat from urban life.",
    attractions: [
      { name: "Eravikulam National Park", description: "Home to the endangered Nilgiri Tahr and scenic views." },
      { name: "Tea Museum", description: "Showcases Munnar’s history and legacy of tea cultivation." },
      { name: "Mattupetty Dam", description: "Scenic dam area ideal for boating and picnics." },
      { name: "Echo Point", description: "Famous spot where your voice echoes off surrounding hills." },
      { name: "Top Station", description: "Highest point in Munnar with panoramic valley views." },
    ],
    cuisine: [
      { name: "Appam with Stew", description: "Soft rice pancakes with coconut-based vegetable or meat stew." },
      { name: "Kerala Sadya", description: "Banana leaf meal with multiple vegetarian dishes and rice." },
      { name: "Fish Molee", description: "Kerala-style fish curry cooked in coconut milk." },
      { name: "Puttu and Kadala Curry", description: "Steamed rice cake with spicy black chickpeas curry." },
    ],
    events: [
      { name: "Neelakurinji Bloom", month: "Seasonal (12-year cycle)", description: "Mass blooming of purplish-blue flowers across hills." },
      { name: "Onam", month: "August/September", description: "Harvest festival celebrated with traditional feasts and dances." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹800 - ₹1,800 per night",
        mid: "₹1,800 - ₹4,000 per night",
        luxury: "₹4,000+ per night",
      },
      food: {
        budget: "₹250 - ₹600 per day",
        mid: "₹600 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      transportation: {
        budget: "₹200 - ₹400 per day",
        mid: "₹400 - ₹900 per day",
        luxury: "₹900+ per day",
      },
      activities: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Thekkady", distance: "90 km", description: "Home to Periyar Wildlife Sanctuary, known for tigers and elephants." },
      { name: "Alleppey", distance: "170 km", description: "Famous for its serene backwaters and houseboat cruises." },
      { name: "Kochi", distance: "130 km", description: "Historic port city with colonial influences and vibrant culture." },
    ]
  },
  {
    id: 5,
    name: "Andaman",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/andaman.jpg",
    images: [
      "/images/destinations/andaman-1.jpg",
      "/images/destinations/andaman-2.jpg",
      "/images/destinations/andaman-3.jpg",
      "/images/destinations/andaman-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["beach", "scuba diving", "islands", "relaxation"],
    bestTimeToVisit: ["november", "december", "january", "february", "march", "april"],
    description: "A tropical island destination known for pristine beaches, coral reefs, and marine life.",
    overview:
      "The Andaman Islands are a group of islands in the Bay of Bengal, belonging to India. With white sandy beaches, turquoise waters, and rich coral reefs, Andaman is a paradise for beach lovers, adventure seekers, and nature enthusiasts. Popular islands include Havelock and Neil, offering everything from scuba diving to tranquil sunsets.",
    attractions: [
      { name: "Radhanagar Beach", description: "One of Asia’s best beaches, located on Havelock Island." },
      { name: "Cellular Jail", description: "Historic colonial-era prison with a moving light and sound show." },
      { name: "Elephant Beach", description: "Ideal for snorkeling and underwater photography." },
      { name: "Ross Island", description: "Historical ruins from the British era surrounded by wildlife." },
      { name: "Limestone Caves, Baratang", description: "Stunning natural caves accessible via mangrove boat rides." },
    ],
    cuisine: [
      { name: "Grilled Lobster", description: "Fresh seafood grilled with Indian spices." },
      { name: "Fish Curry", description: "Local catch cooked in coconut and mustard curry." },
      { name: "Coconut Prawn Curry", description: "Traditional dish with prawns and coconut milk." },
      { name: "Banana Chips", description: "Crispy fried banana slices popular as a snack." },
    ],
    events: [
      { name: "Island Tourism Festival", month: "January", description: "A cultural festival with music, dance, and local food." },
      { name: "Beach Festival", month: "April", description: "Promotes eco-tourism with beach games and cultural performances." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹1,200 - ₹2,500 per night",
        mid: "₹2,500 - ₹6,000 per night",
        luxury: "₹6,000+ per night",
      },
      food: {
        budget: "₹300 - ₹700 per day",
        mid: "₹700 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      transportation: {
        budget: "₹300 - ₹700 per day",
        mid: "₹700 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      activities: {
        budget: "₹500 - ₹1,000 per day",
        mid: "₹1,000 - ₹3,000 per day",
        luxury: "₹3,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Neil Island", distance: "40 km", description: "A peaceful island with coral reefs and secluded beaches." },
      { name: "Port Blair", distance: "0 km", description: "Capital of Andaman, known for history and shopping." },
      { name: "Baratang Island", distance: "100 km", description: "Famous for mangrove creeks and limestone caves." },
    ],
  },
  {
    id: 6,
    name: "Darjeeling",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/darjeeling.jpg",
    images: [
      "/images/destinations/darjeeling-1.jpg",
      "/images/destinations/darjeeling-2.jpg",
      "/images/destinations/darjeeling-3.jpg",
      "/images/destinations/darjeeling-4.jpg",
    ],
    budget: "budget-friendly",
    activityTypes: ["mountains", "nature", "tea gardens", "heritage"],
    bestTimeToVisit: ["march", "april", "may", "october", "november"],
    description: "A picturesque hill station in West Bengal known for tea estates and Himalayan views.",
    overview:
      "Darjeeling is a charming hill station nestled in the foothills of the Himalayas. Known for its world-famous tea, colonial-era architecture, and panoramic views of Mt. Kanchenjunga, it is often called the 'Queen of the Hills'. Darjeeling also offers a blend of cultural influences from Nepalese, Tibetan, and British heritage.",
    attractions: [
      { name: "Tiger Hill", description: "Offers stunning sunrise views of Kanchenjunga and Everest." },
      { name: "Batasia Loop", description: "Spiral railway track with beautiful gardens." },
      { name: "Darjeeling Himalayan Railway", description: "UNESCO-listed toy train experience." },
      { name: "Peace Pagoda", description: "A serene Buddhist monument offering panoramic city views." },
      { name: "Happy Valley Tea Estate", description: "Tour and tasting at a working tea plantation." },
    ],
    cuisine: [
      { name: "Thukpa", description: "Tibetan-style noodle soup." },
      { name: "Momos", description: "Steamed or fried dumplings filled with veggies or meat." },
      { name: "Sel Roti", description: "Traditional Nepalese sweet bread." },
      { name: "Darjeeling Tea", description: "Delicate, floral tea that's world-renowned." },
    ],
    events: [
      { name: "Darjeeling Carnival", month: "November", description: "Music, parades, local food, and crafts." },
      { name: "Maghe Sankranti", month: "January", description: "Nepalese festival celebrating the new harvest." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹700 - ₹1,500 per night",
        mid: "₹1,500 - ₹3,000 per night",
        luxury: "₹3,000+ per night",
      },
      food: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,000 per day",
        luxury: "₹1,000+ per day",
      },
      transportation: {
        budget: "₹100 - ₹300 per day",
        mid: "₹300 - ₹800 per day",
        luxury: "₹800+ per day",
      },
      activities: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Kalimpong", distance: "50 km", description: "A peaceful town known for orchids and monasteries." },
      { name: "Gangtok", distance: "95 km", description: "Capital of Sikkim with Buddhist sites and cable cars." },
      { name: "Mirik", distance: "45 km", description: "A quiet lakeside destination surrounded by tea gardens." },
    ],
  },
  {
    id: 7,
    name: "Varanasi",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/varanasi.jpg",
    images: [
      "/images/destinations/varanasi-1.jpg",
      "/images/destinations/varanasi-2.jpg",
      "/images/destinations/varanasi-3.jpg",
      "/images/destinations/varanasi-4.jpg",
    ],
    budget: "budget-friendly",
    activityTypes: ["spiritual", "culture", "heritage", "ghats"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "One of the oldest cities in the world, famous for the Ganges River and spiritual heritage.",
    overview:
      "Varanasi, also known as Kashi or Benares, is a sacred city on the banks of the Ganges River. It's a spiritual hub for Hindus, Jains, and Buddhists alike. With its ancient temples, vibrant ghats, and spiritual rituals, the city provides a profound cultural experience steeped in tradition.",
    attractions: [
      { name: "Dashashwamedh Ghat", description: "Famous for the evening Ganga Aarti ceremony." },
      { name: "Kashi Vishwanath Temple", description: "One of the holiest Shiva temples in India." },
      { name: "Sarnath", description: "Buddhist site where Buddha delivered his first sermon." },
      { name: "Banaras Hindu University", description: "One of the oldest and largest universities in India." },
      { name: "Manikarnika Ghat", description: "Sacred cremation ground believed to grant moksha." },
    ],
    cuisine: [
      { name: "Kachori Sabzi", description: "Spicy curry served with deep-fried wheat bread." },
      { name: "Malaiyo", description: "Seasonal sweet foam dessert made from milk and saffron." },
      { name: "Baati Chokha", description: "Roasted wheat balls served with spiced mashed vegetables." },
      { name: "Banarasi Paan", description: "Iconic betel leaf preparation with sweet fillings." },
    ],
    events: [
      { name: "Dev Deepawali", month: "November", description: "Thousands of diyas lit on the ghats for the gods." },
      { name: "Ganga Mahotsav", month: "November", description: "Cultural event with music, crafts, and boat races." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹500 - ₹1,200 per night",
        mid: "₹1,200 - ₹3,000 per night",
        luxury: "₹3,000+ per night",
      },
      food: {
        budget: "₹150 - ₹400 per day",
        mid: "₹400 - ₹1,000 per day",
        luxury: "₹1,000+ per day",
      },
      transportation: {
        budget: "₹100 - ₹300 per day",
        mid: "₹300 - ₹800 per day",
        luxury: "₹800+ per day",
      },
      activities: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Prayagraj", distance: "120 km", description: "Site of the Kumbh Mela and Sangam." },
      { name: "Ayodhya", distance: "210 km", description: "Birthplace of Lord Rama." },
      { name: "Bodh Gaya", distance: "250 km", description: "Place where Buddha attained enlightenment." },
    ],
  },
  {
    id: 8,
    name: "Udaipur",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/udaipur.jpg",
    images: [
      "/images/destinations/udaipur-1.jpg",
      "/images/destinations/udaipur-2.jpg",
      "/images/destinations/udaipur-3.jpg",
      "/images/destinations/udaipur-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["heritage", "lakes", "romantic", "culture"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "The City of Lakes, known for palaces, royal architecture, and scenic boat rides.",
    overview:
      "Udaipur, often referred to as the Venice of the East, is a royal city in Rajasthan famous for its beautiful lakes, lavish palaces, and timeless charm. Its history, cultural richness, and romantic atmosphere make it a top destination for couples and history lovers.",
    attractions: [
      { name: "City Palace", description: "Majestic palace complex overlooking Lake Pichola." },
      { name: "Lake Pichola", description: "Serene lake with scenic boat rides to Jag Mandir and Lake Palace." },
      { name: "Jag Mandir", description: "Island palace known for architecture and history." },
      { name: "Fateh Sagar Lake", description: "Peaceful spot for evening strolls and boating." },
      { name: "Saheliyon Ki Bari", description: "Garden built for royal women with fountains and marble art." },
    ],
    cuisine: [
      { name: "Gatte ki Sabzi", description: "Gram flour dumplings in tangy yogurt gravy." },
      { name: "Kair Sangri", description: "Desert beans and berries cooked in traditional spices." },
      { name: "Mohan Maas", description: "Royal-style meat curry with dry fruits and rich gravy." },
      { name: "Dil Jaani", description: "Sweet dish with saffron and dry fruits." },
    ],
    events: [
      { name: "Mewar Festival", month: "March/April", description: "Celebrates spring with processions, music, and dance." },
      { name: "Shilpgram Utsav", month: "December", description: "Handicrafts, folk art, and rural culture celebration." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹1,000 - ₹2,500 per night",
        mid: "₹2,500 - ₹6,000 per night",
        luxury: "₹6,000+ per night",
      },
      food: {
        budget: "₹300 - ₹700 per day",
        mid: "₹700 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      transportation: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,000 per day",
        luxury: "₹1,000+ per day",
      },
      activities: {
        budget: "₹300 - ₹800 per day",
        mid: "₹800 - ₹2,000 per day",
        luxury: "₹2,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Mount Abu", distance: "165 km", description: "The only hill station in Rajasthan." },
      { name: "Chittorgarh", distance: "120 km", description: "Famous for its fort and Rajput history." },
      { name: "Kumbhalgarh", distance: "85 km", description: "UNESCO fort with the world’s second-longest wall." },
    ],
  },
  {
    id: 9,
    name: "Mumbai",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/mumbai.jpg",
    images: [
      "/images/destinations/mumbai-1.jpg",
      "/images/destinations/mumbai-2.jpg",
      "/images/destinations/mumbai-3.jpg",
      "/images/destinations/mumbai-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["city life", "beach", "heritage", "shopping"],
    bestTimeToVisit: ["november", "december", "january", "february", "march"],
    description: "The City of Dreams, known for Bollywood, street food, colonial architecture, and beaches.",
    overview:
      "Mumbai, formerly Bombay, is the financial capital of India and one of the most vibrant urban centers in the world. A mix of colonial charm, towering skyscrapers, historic landmarks, bustling markets, and a rich cinematic culture makes Mumbai a city like no other. It's where tradition meets ambition.",
    attractions: [
      { name: "Gateway of India", description: "Iconic waterfront monument built during the British era." },
      { name: "Marine Drive", description: "Scenic coastal road also known as the Queen’s Necklace." },
      { name: "Elephanta Caves", description: "UNESCO-listed cave temples on an island off the coast." },
      { name: "Chhatrapati Shivaji Terminus", description: "Gothic-style railway station and heritage site." },
      { name: "Colaba Causeway", description: "Famous for shopping, cafes, and street fashion." },
    ],
    cuisine: [
      { name: "Vada Pav", description: "Mumbai’s most iconic street food — spiced potato fritter in a bun." },
      { name: "Pav Bhaji", description: "Spicy mashed vegetables served with buttered bread." },
      { name: "Bombay Sandwich", description: "Layered chutney sandwich with unique Indian flavors." },
      { name: "Bhel Puri", description: "Crispy puffed rice mixed with tangy sauces and vegetables." },
    ],
    events: [
      { name: "Kala Ghoda Arts Festival", month: "February", description: "Cultural extravaganza of art, theatre, music and literature." },
      { name: "Ganesh Chaturthi", month: "August/September", description: "Massive street celebrations in honor of Lord Ganesha." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹1,000 - ₹2,500 per night",
        mid: "₹2,500 - ₹6,000 per night",
        luxury: "₹6,000+ per night",
      },
      food: {
        budget: "₹300 - ₹600 per day",
        mid: "₹600 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      transportation: {
        budget: "₹100 - ₹300 per day",
        mid: "₹300 - ₹800 per day",
        luxury: "₹800+ per day",
      },
      activities: {
        budget: "₹300 - ₹800 per day",
        mid: "₹800 - ₹2,000 per day",
        luxury: "₹2,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Lonavala", distance: "85 km", description: "Popular hill station for weekend getaways." },
      { name: "Alibaug", distance: "95 km", description: "Coastal town known for beaches and forts." },
      { name: "Nashik", distance: "170 km", description: "Wine capital of India and pilgrimage site." },
    ],
  },
  {
    id: 10,
    name: "Delhi",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/delhi.jpg",
    images: [
      "/images/destinations/delhi-1.jpg",
      "/images/destinations/delhi-2.jpg",
      "/images/destinations/delhi-3.jpg",
      "/images/destinations/delhi-4.jpg",
    ],
    budget: "mid-range",
    activityTypes: ["heritage", "food", "shopping", "culture"],
    bestTimeToVisit: ["october", "november", "december", "february", "march"],
    description: "India’s capital city, where Mughal architecture, street food, and modern life collide.",
    overview:
      "Delhi is a city of contrasts — ancient monuments and modern metro lines, bustling street food vendors and luxurious shopping malls. As the political capital of India, Delhi boasts a rich history, vibrant culture, and a dynamic lifestyle that make it one of the most iconic destinations in the country.",
    attractions: [
      { name: "Red Fort", description: "A massive 17th-century fort built by the Mughal emperors." },
      { name: "India Gate", description: "War memorial and picnic spot at the heart of the city." },
      { name: "Qutub Minar", description: "Tallest brick minaret and UNESCO World Heritage Site." },
      { name: "Lotus Temple", description: "Baháʼí House of Worship known for its flower-like design." },
      { name: "Chandni Chowk", description: "Historic market famous for street food and silver jewelry." },
    ],
    cuisine: [
      { name: "Chole Bhature", description: "Deep-fried bread with spicy chickpea curry." },
      { name: "Parathas", description: "Stuffed flatbread, often served with curd and chutney." },
      { name: "Jalebi", description: "Sweet spirals soaked in sugar syrup." },
      { name: "Kebabs", description: "Spiced meat grilled to perfection in Mughlai tradition." },
    ],
    events: [
      { name: "Republic Day Parade", month: "January", description: "Grand military and cultural parade on Rajpath." },
      { name: "Qutub Festival", month: "November", description: "Music and dance near the Qutub Minar." },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹800 - ₹2,000 per night",
        mid: "₹2,000 - ₹5,000 per night",
        luxury: "₹5,000+ per night",
      },
      food: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      transportation: {
        budget: "₹100 - ₹250 per day",
        mid: "₹250 - ₹600 per day",
        luxury: "₹600+ per day",
      },
      activities: {
        budget: "₹300 - ₹700 per day",
        mid: "₹700 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Agra", distance: "230 km", description: "Home of the Taj Mahal." },
      { name: "Haridwar", distance: "220 km", description: "Holy city on the banks of the Ganges." },
      { name: "Jaipur", distance: "270 km", description: "The Pink City and part of the Golden Triangle." },
    ],
  }
  
  
  
      
    
  
]

export default function DestinationDetailPage({ params }) {
  const { id } = React.use(params)
  const destinationId = Number.parseInt(id)
  const destination = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {/* Hero Header */}
        <div
          className="destination-header"
          style={{ backgroundImage: `url(${destination.images[activeImageIndex] || destination.image})` }}
        >
          <div className="destination-header-overlay"></div>
          <div className="destination-header-content">
            <Button
              asChild
              variant="outline"
              className="mb-4 text-white border-white/30 bg-black/20 hover:bg-black/30 hover:text-white w-fit"
            >
              <Link href="/explore" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Destinations
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
                <p className="text-white/80">
                  {destination.country}, {destination.continent}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/20 border-white/30 text-white hover:bg-black/30 hover:text-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Image Gallery */}
          <div className="mb-8 grid gap-4 grid-cols-4">
            {destination.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-video cursor-pointer overflow-hidden rounded-lg ${activeImageIndex === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${destination.name} ${index + 1}`}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Quick Info Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Best Time to Visit</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.bestTimeToVisit
                    .map((month) => month.charAt(0).toUpperCase() + month.slice(1))
                    .join(", ")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Budget Category</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.budget === "budget-friendly"
                    ? "Budget-Friendly"
                    : destination.budget === "moderate"
                      ? "Moderate"
                      : "Luxury"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Activities</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.activityTypes
                    .map((activity) => activity.charAt(0).toUpperCase() + activity.slice(1))
                    .join(", ")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Info className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{destination.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Destination Info */}
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    About {destination.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{destination.overview}</p>
                </CardContent>
              </Card>

              <Tabs defaultValue="attractions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                  <TabsTrigger value="events">Events & Festivals</TabsTrigger>
                </TabsList>

                <TabsContent value="attractions" className="mt-4 space-y-4">
                  {destination.attractions.map((attraction, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/attractions/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={attraction.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div> */}
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <MapPin className="h-4 w-4 text-primary" />
                              {attraction.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{attraction.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="cuisine" className="mt-4 space-y-4">
                  {destination.cuisine.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/cuisine/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div> */}
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <Utensils className="h-4 w-4 text-primary" />
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="events" className="mt-4 space-y-4">
                  {destination.events.map((event, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/events/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={event.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div> */}
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <Ticket className="h-4 w-4 text-primary" />
                              {event.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">Month: {event.month}</p>
                            <p className="mt-1 text-sm">{event.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Nearby Places Worth Visiting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {destination.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <h3 className="font-medium">{place.name}</h3>
                        <p className="text-xs text-muted-foreground">Distance: {place.distance}</p>
                        <p className="mt-1 text-sm">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cost Breakdown
                  </CardTitle>
                  <CardDescription>Estimated daily expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Accommodation</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.accommodation.budget}
                        </p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.accommodation.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.accommodation.luxury}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Food</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.budget}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.luxury}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Transportation</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.transportation.budget}
                        </p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.transportation.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.transportation.luxury}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Activities</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.budget}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.luxury}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button asChild size="lg" className="gap-2 w-full">
                  <Link href={`/itinerary?destination=${destination.name}`}>
                    <MapPin className="h-4 w-4" />
                    Plan a Trip to {destination.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}
