import { TripPlan } from '../types/travel';

export const SAMPLE_TRIPS: TripPlan[] = [
  {
    id: 'sample_japan_7d',
    createdAt: '2026-09-29T10:00:00.000Z',
    title: 'Tokyo & Kyoto: Ancient Temples to Cyberpunk Horizons',
    tagline: 'A seamless 7-day blend of Michelin gastronomy, bamboo forest tranquility, neon alleyways, and historic ryokan culture.',
    destination: 'Tokyo & Kyoto, Japan',
    daysCount: 7,
    budgetTier: 'moderate',
    currency: 'USD',
    travelParty: 'couple',
    travelStyle: 'balanced',
    datesLabel: '7 Days Curated Journey',
    overview: {
      summary:
        'This 7-day odyssey balances Japan’s two iconic hearts: hyper-modern Tokyo and contemplative Kyoto. Beginning in the historic streets of Asakusa and cutting through Shibuya’s kinetic energy, you board the Shinkansen bullet train to Kyoto for Zen rock gardens, morning market tastings, and illuminated evening bamboo paths.',
      bestTimeToVisit: 'Late March to May (Cherry Blossoms) or October to November (Vibrant Autumn Foliage).',
      expectedWeather: 'Mild and pleasant (15°C - 22°C / 59°F - 72°F). Layers recommended with comfortable walking shoes.',
      localCurrencyAndTipping: 'Japanese Yen (JPY). Strictly NO tipping—it can cause confusion or offense. Credit cards widely accepted in major stores, but keep 10,000 JPY cash for temples and ramen counters.',
      culturalEtiquette: [
        'Always remove shoes when stepping onto tatami mats or entering homes/traditional ryokans.',
        'Never walk while eating street food; finish near the stall or vending machine.',
        'Keep phone conversations silent on trains and subways.',
        'Carry a small bag for your trash, as public trash cans are rare.'
      ],
      transportationTips: 'Get an IC card (Suica/Pasmo) on Apple/Google Wallet for effortless subway tap-and-go. Reserve your Shinkansen bullet train seats 2-3 days ahead on SmartEX.',
      safetyAndEmergency: 'Japan is one of the safest countries globally. Dial 110 for Police and 119 for Medical/Fire emergencies.'
    },
    budgetBreakdown: {
      totalEstimatedCost: 2650,
      currency: 'USD',
      costPerPerson: 1325,
      categories: [
        {
          name: 'Accommodation',
          amount: 1100,
          percentage: 42,
          description: '4 nights Tokyo modern design hotel + 2 nights Kyoto boutique Machiya townhouse',
          savingTip: 'Book Machiya accommodations in Gion or Sanjo 2 months in advance.'
        },
        {
          name: 'Food & Dining',
          amount: 720,
          percentage: 27,
          description: 'Kaiseki dinner, fresh Tsukiji market sashimi, izakaya bites & craft matcha',
          savingTip: 'Department store basement food halls (depachika) offer 5-star bento boxes at 30% discount after 7:30 PM.'
        },
        {
          name: 'Transportation',
          amount: 430,
          percentage: 16,
          description: 'Tokyo-Kyoto roundtrip Shinkansen + unlimited IC metro card usage',
          savingTip: 'Take regional local express lines instead of taxis in Kyoto.'
        },
        {
          name: 'Activities & Shrines',
          amount: 250,
          percentage: 9,
          description: 'Tea ceremony workshop, teamLab Planets, temple grounds & castle entry',
          savingTip: 'Book teamLab morning slots 3 weeks ahead for the best lighting and lowest crowd.'
        },
        {
          name: 'Souvenirs & Buffer',
          amount: 150,
          percentage: 6,
          description: 'Handmade pottery, Uji matcha, stationery & emergency cushion',
          savingTip: 'Loft and Hands in Shibuya offer tax-free shopping on purchases over 5,000 JPY.'
        }
      ]
    },
    neighborhoodsAndStays: [
      {
        neighborhoodName: 'Ginza & Marunouchi (Tokyo)',
        vibe: 'Sophisticated, immaculate, central transit hub',
        whyStayHere: 'Direct airport train connections and walkable to imperial gardens and elite dining.',
        recommendedStayType: 'Boutique Lifestyle Hotel',
        priceRange: '$180 - $260 / night',
        safetyRating: 'Exceptional (Ranked #1 for safety)'
      },
      {
        neighborhoodName: 'Gion / Higashiyama (Kyoto)',
        vibe: 'Preserved wooden facades, lantern-lit alleys, geiko culture',
        whyStayHere: 'Wake up steps from Yasaka Shrine before the crowds arrive.',
        recommendedStayType: 'Restored Heritage Machiya or Ryokan',
        priceRange: '$190 - $280 / night',
        safetyRating: 'Quiet, peaceful & walkable'
      }
    ],
    packingList: [
      {
        category: 'Footwear & Apparel',
        items: [
          'Ultra-supportive walking sneakers (20,000+ steps/day expected)',
          'Slip-on shoes for frequent temple shoe removals',
          'Breathable merino wool socks without holes',
          'Light rain shell or compact travel umbrella'
        ]
      },
      {
        category: 'Electronics & Connectivity',
        items: [
          'eSIM or pocket Wi-Fi device',
          'Type A two-prong plug adapter (100V)',
          'Slim 10,000mAh external battery pack for day trips',
          'Noise-cancelling earbuds for the bullet train'
        ]
      },
      {
        category: 'Essentials & Transit',
        items: [
          'Suica / Pasmo digital IC card loaded in phone wallet',
          'Coin purse (Japanese coins are heavily used)',
          'Small handkerchief / pocket towel (restrooms rarely provide paper towels)',
          'Passport (mandatory to carry in Japan at all times)'
        ]
      }
    ],
    agentAdvice:
      'Pro Travel Tip: In Kyoto, visit Fushimi Inari Shrine either at 6:30 AM before sunrise or at 8:30 PM under the eerie red lantern glow. You will have the sacred torii gates almost entirely to yourself.',
    itinerary: [
      {
        dayNumber: 1,
        dateTitle: 'Day 1: Arrival & Historic Edo Roots in Asakusa',
        theme: 'Ancient Traditions & Riverfront Views',
        area: 'Asakusa & Ueno, Tokyo',
        transitAdvice: 'Take the Keisei Skyliner from Narita or Keikyu Line from Haneda directly to Asakusa.',
        estimatedDayCost: 110,
        morning: {
          time: '09:30 AM',
          activity: 'Senso-ji Temple & Nakamise Dori Morning Stroll',
          location: 'Senso-ji, Asakusa',
          duration: '2.5 hours',
          description:
            'Wander under the iconic giant red Kaminarimon lantern and browse fragrant freshly baked ningyo-yaki cakes before the incense-filled main hall.',
          insiderTip: 'Dip your hands in the sacred fountain and draw an "omikuji" fortune for 100 JPY.',
          costEstimate: 'Free ($5 for incense & fortune)',
          tags: ['Historic', 'Cultural Icon']
        },
        lunch: {
          restaurantName: 'Asakusa Imahan',
          cuisine: 'Traditional Sukiyaki & Wagyu',
          specialtyDish: 'Marbled Black Wagyu Sukiyaki Lunch Gozen',
          priceRange: '$$$',
          area: 'Asakusa',
          tip: 'Lunch sets are half the evening price for the exact same grade A5 beef.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Sumida River Water Bus Cruise to Hama-rikyu Gardens',
          location: 'Sumida River & Chuo City',
          duration: '2 hours',
          description:
            'Board the futuristic glass "Himiko" boat designed by anime icon Leiji Matsumoto, cruising beneath 12 bridges into the shogun’s seaside gardens.',
          insiderTip: 'Stop at the garden’s floating wooden teahouse for whisked ceremonial matcha and seasonal wagashi sweet.',
          costEstimate: '$14 boat + $3 garden',
          tags: ['Scenic Cruise', 'Zen Garden']
        },
        dinner: {
          restaurantName: 'Kagari Soba',
          cuisine: 'Tori Paitan Ramen',
          specialtyDish: 'Rich Creamy Chicken Broth Ramen with seasonal vegetables',
          priceRange: '$$',
          area: 'Ginza',
          tip: 'Arrive 15 minutes before opening to grab a seat at the pristine 8-seat cedar counter.'
        },
        evening: {
          time: '08:00 PM',
          activity: 'Ginza 6 Rooftop Garden & Neon Twilight Stroll',
          location: 'Ginza 6, Tokyo',
          duration: '1.5 hours',
          description:
            'Ascend to the open-air landscaped rooftop deck of Ginza Six overlooking the glowing metropolis skyline with a gentle evening breeze.',
          insiderTip: 'Stop by the Tsutaya Books art gallery floor on Level 6 for architectural books and artisanal tea.',
          costEstimate: 'Free',
          tags: ['Skyline', 'Architecture']
        },
        hiddenGem: {
          name: 'Bar Trench in Ebisu',
          description: 'An intimate, speakeasy herbal apothecary cocktail bar with bespoke absinthe cocktails.',
          whySpecial: 'Consistently named one of Asia’s 50 best bars, with only 12 cozy bar seats.'
        }
      },
      {
        dayNumber: 2,
        dateTitle: 'Day 2: Shibuya Crossing, Meiji Shrine & Harajuku Contrasts',
        theme: 'Kinetic Youth Culture & Sacred Forest Quiet',
        area: 'Shibuya & Harajuku, Tokyo',
        transitAdvice: 'Yamanote Loop Line directly connects Shibuya, Harajuku, and Shinjuku.',
        estimatedDayCost: 95,
        morning: {
          time: '08:30 AM',
          activity: 'Meiji Jingu Shrine Sacred Forest Walk',
          location: 'Yoyogi Park / Harajuku',
          duration: '2 hours',
          description:
            'Pass beneath towering 1,500-year-old cedar Torii gates into 170 acres of serene evergreen forest honoring Emperor Meiji.',
          insiderTip: 'Look for the wall of ceremonial French wine barrels gifted to the Emperor.',
          costEstimate: 'Free',
          tags: ['Sacred Shrine', 'Forest Bathing']
        },
        lunch: {
          restaurantName: 'Harajuku Gyozaro',
          cuisine: 'Casual Gyoza & Japanese Draft Beer',
          specialtyDish: 'Crispy Pan-Fried Pork & Chive Dumplings with spicy bean sprouts',
          priceRange: '$',
          area: 'Jingumae / Harajuku',
          tip: 'Order both the pan-fried (yaki) and steamed (sui) dumplings—6 dumplings cost just $2.50!'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Cat Street Boutiques & Shibuya Sky Observation Deck',
          location: 'Shibuya Scramble Square',
          duration: '3 hours',
          description:
            'Walk the hip pedestrian Cat Street into Shibuya, culminating in Shibuya Sky’s open-air 360-degree glass perimeter deck 229m in the sky.',
          insiderTip: 'Book the 4:30 PM ticket slot to witness day turn into golden hour and brilliant neon dusk.',
          costEstimate: '$18 Shibuya Sky ticket',
          tags: ['Observation Deck', 'Urban Culture']
        },
        dinner: {
          restaurantName: 'Afuri Ramen Shibuya',
          cuisine: 'Yuzu Shio Ramen',
          specialtyDish: 'Citrus Yuzu Scented Dashi Ramen with charcoal-grilled chashu pork',
          priceRange: '$$',
          area: 'Shibuya',
          tip: 'Select "Tanrei" broth for a lighter, crisp aroma.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Shibuya Scramble Crossing & Nonbei Yokocho',
          location: 'Shibuya Crossing',
          duration: '2 hours',
          description:
            'Experience the pulse of the world’s busiest pedestrian crossing, then slip into "Drunkard’s Alley" with lantern-lit micro-bars dating back to the 1950s.',
          insiderTip: 'Watch the crossing from the 2nd floor window of Shibuya Tsutaya for unobstructed aerial videos.',
          costEstimate: '$15 for craft highball',
          tags: ['Iconic Crossing', 'Izakaya']
        },
        hiddenGem: {
          name: 'Nezu Museum & Hidden Bamboo Garden',
          description: 'A tranquil private museum of pre-modern Japanese art tucked behind an exquisite bamboo corridor.',
          whySpecial: '95% of tourists miss the hidden strolling pond garden situated directly behind the gallery.'
        }
      },
      {
        dayNumber: 3,
        dateTitle: 'Day 3: Digital Art, Tsukiji Flavors & Futuristic Odaiba',
        theme: 'Immersion & Future Aesthetics',
        area: 'Toyosu & Odaiba, Tokyo',
        transitAdvice: 'Yurikamome automated monorail line crossing the Rainbow Bridge.',
        estimatedDayCost: 140,
        morning: {
          time: '09:00 AM',
          activity: 'teamLab Planets Multisensory Art Experience',
          location: 'Toyosu, Tokyo',
          duration: '2.5 hours',
          description:
            'Wade barefoot through knee-deep water filled with digital koi fish, drift into infinite crystal mirrors, and float under an orchid dome that breathes with you.',
          insiderTip: 'Wear pants that easily roll up past your knees; secure lockers and shorts rentals are free.',
          costEstimate: '$28 per person',
          tags: ['Immersive Art', 'Digital Wonder']
        },
        lunch: {
          restaurantName: 'Daiwa Sushi',
          cuisine: 'Edomae Omakase Sushi',
          specialtyDish: 'Chef’s selection 7-piece seasonal nigiri with fatty tuna (Otoro)',
          priceRange: '$$$',
          area: 'Toyosu Fish Market',
          tip: 'Directly sourced from the morning tuna auction inside the market building.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Tsukiji Outer Market Food Exploration & Knife Shopping',
          location: 'Tsukiji Outer Market',
          duration: '2.5 hours',
          description:
            'Sample rolled tamagoyaki sweet omelettes, charcoal-grilled wagyu skewers, and fresh sea urchin while browsing master Japanese knife craftsmen.',
          insiderTip: 'Masamoto Sohonten knife shop will engrave your initials in Japanese kanji for free with purchase.',
          costEstimate: '$25 tastings',
          tags: ['Street Food', 'Culinary Craft']
        },
        dinner: {
          restaurantName: 'Gonpachi Nishi-Azabu (Kill Bill Restaurant)',
          cuisine: 'Atmospheric Soba & Yakitori',
          specialtyDish: 'Hand-dipped buckwheat soba & charcoal skewers',
          priceRange: '$$$',
          area: 'Roppongi / Nishi-Azabu',
          tip: 'Request a table on the 2nd-floor balcony overlooking the bustling open kitchen.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Tokyo Tower Illuminated View from Roppongi Hills Mori Deck',
          location: 'Mori Tower 52F',
          duration: '1.5 hours',
          description:
            'Marvel at Tokyo Tower glowing in warm amber orange against the endless city grid of twinkling lights.',
          insiderTip: 'Your ticket also grants admission to the Mori Art Museum contemporary exhibitions.',
          costEstimate: '$14',
          tags: ['Night View', 'Modern Architecture']
        },
        hiddenGem: {
          name: 'Shimokitazawa Vintage Alleyways',
          description: 'Bohemian neighborhood filled with indie coffee shops, vinyl records, and curated vintage clothing.',
          whySpecial: 'Pedestrianized and deeply beloved by Tokyo artists and musicians.'
        }
      },
      {
        dayNumber: 4,
        dateTitle: 'Day 4: Shinkansen Bullet Train to Kyoto & Golden Pavilion',
        theme: 'Speed, Scenery & Golden Reflections',
        area: 'Northern Kyoto & Kinkaku-ji',
        transitAdvice: 'Nozomi Shinkansen train takes exactly 2 hours 15 minutes from Tokyo Station to Kyoto Station.',
        estimatedDayCost: 195,
        morning: {
          time: '08:00 AM',
          activity: 'Ekiben Tasting on the Shinkansen (Speeding past Mt. Fuji)',
          location: 'Tokyo Station to Kyoto Station',
          duration: '2.5 hours',
          description:
            'Pick up an exquisite bento box at Tokyo Station’s "Ekibenya Matsuri" and watch the countryside blur at 300 km/h with views of snow-capped Mt. Fuji on the right side.',
          insiderTip: 'Book seats on row "E" in ordinary car or row "D" in green car to see Mt. Fuji around 45 minutes into the journey.',
          costEstimate: '$105 Shinkansen ticket + $12 bento',
          tags: ['Bullet Train', 'Mt. Fuji View']
        },
        lunch: {
          restaurantName: 'Tofu Cuisine Tosuiro',
          cuisine: 'Traditional Kyoto Kyo-tofu Kaiseki',
          specialtyDish: 'Silken hot-pot oboro tofu with yuzu dipping sauce',
          priceRange: '$$',
          area: 'Kiyamachi, Kyoto',
          tip: 'Kyoto’s pristine soft underground water makes its handmade tofu world famous.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Kinkaku-ji (Golden Pavilion) & Ryoan-ji Zen Rock Garden',
          location: 'Kita Ward, Kyoto',
          duration: '3 hours',
          description:
            'Witness the top two floors of Kinkaku-ji covered in pure gold leaf reflecting over the mirror pond, followed by contemplating Ryoan-ji’s enigmatic 15 rock composition.',
          insiderTip: 'Try to see all 15 stones at once from the veranda—from any angle, at least one stone is naturally hidden from view.',
          costEstimate: '$8 admissions',
          tags: ['UNESCO World Heritage', 'Zen Rock Garden']
        },
        dinner: {
          restaurantName: 'Gion Karyo',
          cuisine: 'Bespoke Kyoto Kaiseki Course',
          specialtyDish: 'Seasonal 9-course miniature tasting menu featuring sweetfish & matsutake',
          priceRange: '$$$$',
          area: 'Gion Hanamikoji',
          tip: 'Book 3-4 weeks ahead; sitting at the counter gives you a front-row view of the chef’s knife artistry.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Moonlit Lantern Stroll along Shirakawa Canal',
          location: 'Gion Shirakawa',
          duration: '1.5 hours',
          description:
            'A cobblestone willow-lined canal lined with traditional wooden tea houses glowing in soft paper lantern light. Quiet, romantic, and timeless.',
          insiderTip: 'Listen closely for the wooden clogs (geta) of geiko heading to evening banquet appointments.',
          costEstimate: 'Free',
          tags: ['Historic Romantic Walk', 'Atmospheric']
        },
        hiddenGem: {
          name: 'Otagi Nenbutsu-ji Temple',
          description: 'A secluded mountain hillside temple covered in moss, featuring 1,200 whimsical stone statues carved with humorous expressions.',
          whySpecial: 'Far less crowded than Arashiyama center and full of playful personality.'
        }
      },
      {
        dayNumber: 5,
        dateTitle: 'Day 5: Arashiyama Bamboo Grove & Riverboat Serenity',
        theme: 'Nature, Whispering Bamboo & Monkeys',
        area: 'Arashiyama, Western Kyoto',
        transitAdvice: 'Take the scenic Randen retro tramway from central Kyoto.',
        estimatedDayCost: 105,
        morning: {
          time: '07:30 AM',
          activity: 'Sagano Bamboo Forest & Tenryu-ji Zen Temple Garden',
          location: 'Arashiyama',
          duration: '3 hours',
          description:
            'Step into the towering jade bamboo grove early in the morning when the wind creates a registered natural "soundscape of Japan", then visit the 14th-century temple garden.',
          insiderTip: 'Arriving before 8:00 AM gives you tranquil empty corridors for photography before tour groups arrive at 9:30 AM.',
          costEstimate: '$5 temple admission',
          tags: ['Nature Wonder', 'Temple Gardens']
        },
        lunch: {
          restaurantName: 'Yoshiya Arashiyama',
          cuisine: 'Kyoto Soba & Seasonal Tempura',
          specialtyDish: 'Cold cha-soba green tea noodles with crispy seasonal mountain vegetable tempura',
          priceRange: '$$',
          area: 'Oi Riverfront',
          tip: 'Request a window seat with views of the historic wooden Togetsukyo Bridge.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Oi River Wooden Boat Rowing & Iwatayama Monkey Park',
          location: 'Arashiyama Riverbank',
          duration: '2.5 hours',
          description:
            'Rent a wooden rowboat beneath the pine forested cliffs, then take a short shaded hike up Mount Arashiyama where wild Japanese macaques roam freely with sweeping valley panoramas.',
          insiderTip: 'You can buy apple slices inside the enclosed viewing hut to feed the monkeys safely.',
          costEstimate: '$14 boat + $6 park',
          tags: ['Wildlife', 'Scenic River']
        },
        dinner: {
          restaurantName: 'Chao Chao Gyoza Sanjo-Kiyamachi',
          cuisine: 'Gourmet Crispy Wing Gyoza & Draft Beer',
          specialtyDish: 'Chao Chao signature gyoza lace wings & crab shrimp dumplings',
          priceRange: '$',
          area: 'Sanjo Kawaramachi',
          tip: 'Casual, vibrant counter vibe with multi-award winning crispy gyoza.'
        },
        evening: {
          time: '08:00 PM',
          activity: 'Pontocho Alley Izakaya Hop & Kamo River Boardwalk',
          location: 'Pontocho Alley, Kyoto',
          duration: '2 hours',
          description:
            'Walk down Kyoto’s narrowest historic alleyway packed with hidden bars, followed by joining locals sitting along the peaceful Kamo River bank.',
          insiderTip: 'In warmer months, restaurants build "kawayuka" wooden platforms suspended over the flowing water.',
          costEstimate: '$15 for drinks',
          tags: ['Nightlife', 'Riverside']
        },
        hiddenGem: {
          name: 'Gio-ji Temple Moss Garden',
          description: 'A tiny, serene thatched-roof hermitage nestled within a lush emerald green velvet carpet of moss.',
          whySpecial: 'Surrounded by maple trees and weeping bamboo, it feels like a fairy tale retreat.'
        }
      },
      {
        dayNumber: 6,
        dateTitle: 'Day 6: Fushimi Inari Torii Gates & Uji Green Tea Capital',
        theme: 'Sacred Trails, Matcha Masters & Ancient Tales',
        area: 'Southern Kyoto & Uji',
        transitAdvice: 'JR Nara Line from Kyoto Station directly to Fushimi-Inari (5 mins) and Uji (20 mins).',
        estimatedDayCost: 115,
        morning: {
          time: '07:00 AM',
          activity: 'Fushimi Inari Taisha 10,000 Vermilion Torii Gate Hike',
          location: 'Fushimi Ward, Kyoto',
          duration: '3 hours',
          description:
            'Ascend the holy Mount Inari through tunnels of thousands of vivid scarlet Torii gates winding through sacred forest shrines guarded by fox statues.',
          insiderTip: 'Most tourists stop at the halfway Yotsutsuji intersection. Continuing to the summit brings profound peace and solitude.',
          costEstimate: 'Free',
          tags: ['Sacred Shrine', 'Mountain Trail']
        },
        lunch: {
          restaurantName: 'Nakamura Tokichi Honten',
          cuisine: 'Authentic Matcha Gastronomy',
          specialtyDish: 'Matcha soba noodles served in fresh bamboo stalks + premium Maruto matcha parfait',
          priceRange: '$$',
          area: 'Uji City',
          tip: 'Founded in 1854, this is the historic epicenter of Japanese tea culture. Take a numbered queue ticket upon arrival.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Byodoin Phoenix Hall (10 Yen Coin Landmark) & Tea Ceremony',
          location: 'Uji, Kyoto Prefecture',
          duration: '3 hours',
          description:
            'Gaze upon the magnificent 1,000-year-old Phoenix Hall floating on an island pond (depicted on the 10-yen coin), followed by a hands-on stone grinding matcha workshop.',
          insiderTip: 'Visit the underground Treasure Museum (Hoshokan) included with admission to see the original bronze phoenixes.',
          costEstimate: '$12 admission & museum',
          tags: ['UNESCO Treasure', 'Matcha Ceremony']
        },
        dinner: {
          restaurantName: 'Gion Duck Noodles',
          cuisine: 'Modern French-Japanese Duck Ramen',
          specialtyDish: 'Duck breast soba with rich duck broth and sansho pepper oil',
          priceRange: '$$',
          area: 'Gion',
          tip: 'Hidden behind a blank wooden door marked only with emoji symbols for duck and ramen.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Yasaka Shrine Night Illumination',
          location: 'Higashiyama, Kyoto',
          duration: '1.5 hours',
          description:
            'Hundreds of white paper lanterns inscribed with names of local merchants illuminate the central dance stage at Yasaka Shrine, open 24 hours.',
          insiderTip: 'Rub the sacred water stone "Utsukushi-gozen" said to bless you with inner and outer beauty.',
          costEstimate: 'Free',
          tags: ['Lanterns', 'Spiritual Evening']
        },
        hiddenGem: {
          name: 'Mimuroto-ji (Flower Temple)',
          description: 'A quiet hillside temple in Uji famous for hydrangeas, lotus blossoms, and an ancient stone ox statue.',
          whySpecial: 'Touching the stone ball in the ox’s mouth is said to bring winning luck and vitality.'
        }
      },
      {
        dayNumber: 7,
        dateTitle: 'Day 7: Nishiki Market Feast, Farewell Souvenirs & Departure',
        theme: 'Kyoto’s Kitchen & Lasting Memories',
        area: 'Central Kyoto & Transit',
        transitAdvice: 'Haruka Kansai Airport Express directly from Kyoto Station (75 mins) or Shinkansen back to Tokyo.',
        estimatedDayCost: 90,
        morning: {
          time: '09:00 AM',
          activity: 'Nishiki Market 400-Year-Old "Kitchen of Kyoto"',
          location: 'Nakagyo Ward, Kyoto',
          duration: '2.5 hours',
          description:
            'A vibrant 5-block covered pedestrian arcade boasting over 100 stalls selling dashi tamago, pickled vegetables, roasted sesame tea, and grilled baby octopus skewers.',
          insiderTip: 'Eat at designated standing zones inside each stall to follow local cleanliness rules.',
          costEstimate: '$20 market food crawl',
          tags: ['Food Market', 'Culinary Heritage']
        },
        lunch: {
          restaurantName: 'Katsukura Sanjo Honten',
          cuisine: 'Artisanal Kurobuta Tonkatsu',
          specialtyDish: 'Crisp Berkshire pork cutlet with unlimited shredded cabbage and barley rice',
          priceRange: '$$',
          area: 'Sanjo',
          tip: 'Grind your own roasted sesame seeds in the mortar bowl before pouring the thick savory-sweet tonkatsu sauce.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Kyoto Station Monument Architecture & Departure Prep',
          location: 'Kyoto Station Building',
          duration: '2 hours',
          description:
            'Explore the breathtaking 16-story matrix of glass and steel architecture designed by Hiroshi Hara, climbing the grand staircase to the sky garden before airport transit.',
          insiderTip: 'Head to the basement Isetan Depachika to purchase beautifully packaged Yatsuhashi cinnamon treats for your flight.',
          costEstimate: 'Free ($15 souvenirs)',
          tags: ['Modern Architecture', 'Travel Transit']
        },
        dinner: {
          restaurantName: 'Airport Transit / Departures Lounge',
          cuisine: 'On-the-go Bento & Green Tea',
          specialtyDish: 'Kansai style pressed mackerel sushi (battera)',
          priceRange: '$$',
          area: 'KIX or NRT Airport',
          tip: 'Easy, delicious meal before your flight.'
        },
        evening: {
          time: '07:00 PM',
          activity: 'Evening Flight Departure & Farewell to Japan',
          location: 'Airport Terminal',
          duration: '2 hours',
          description:
            'Reflect on an unforgettable week of cultural depth, sensational cuisine, and tranquil gardens as your flight departs into the night sky.',
          insiderTip: 'Keep your passport handy for duty-free tax refund validation upon airport security exit.',
          costEstimate: 'N/A',
          tags: ['Departure', 'Memories']
        },
        hiddenGem: {
          name: 'Kyoto Station Skyway Tunnel',
          description: 'A glass pedestrian catwalk suspended 45 meters above the station hall with views of Kyoto Tower.',
          whySpecial: 'Completely free and rarely visited despite being inside the main transit terminal.'
        }
      }
    ]
  },
  {
    id: 'sample_amalfi_5d',
    createdAt: '2026-09-29T10:00:00.000Z',
    title: 'Amalfi Coast: Clifftop Splendor & Mediterranean Sun',
    tagline: 'A breathtaking 5-day escape of lemon groves, pastel villages, private wooden gozzo boat cruises, and clifftop sunsets.',
    destination: 'Amalfi Coast, Italy',
    daysCount: 5,
    budgetTier: 'upscale',
    currency: 'EUR',
    travelParty: 'couple',
    travelStyle: 'luxury-comfort',
    datesLabel: '5 Days Mediterranean Dream',
    overview: {
      summary:
        'The Amalfi Coast is one of the world’s most cinematic coastlines. This 5-day journey stays anchored in Positano and Ravello, pairing panoramic walks along the Path of the Gods with private wooden boat excursions around Capri, fresh burrata and lemon pasta, and opera music floating over Villa Rufolo’s gardens.',
      bestTimeToVisit: 'May to June or September to October (warm sunshine, blooming bougainvillea, pleasant breezes without peak August crowds).',
      expectedWeather: 'Sunny and Mediterranean (22°C - 28°C / 72°F - 82°F). Sun hats, linen attire, and swimwear are essential.',
      localCurrencyAndTipping: 'Euro (€). Tipping is not strictly required in Italy; a 5-10% tip or rounding up for attentive service is appreciated.',
      culturalEtiquette: [
        'Dress elegantly when dining in the evening; beachwear is strictly for the beach or boat.',
        'Cover shoulders and knees when visiting historic cathedrals like the Duomo di Amalfi.',
        'Order espresso or macchiato after 11 AM; cappuccinos are considered morning-only drinks in Italy.'
      ],
      transportationTips: 'Avoid driving rental cars on the narrow coastal cliff roads in summer. Use high-speed ferries (Travelmar) or private drivers for seamless transfers.',
      safetyAndEmergency: 'Extremely safe. Dial 112 for general European emergencies.'
    },
    budgetBreakdown: {
      totalEstimatedCost: 3200,
      currency: 'EUR',
      costPerPerson: 1600,
      categories: [
        {
          name: 'Accommodation',
          amount: 1500,
          percentage: 47,
          description: '4 nights in cliffside boutique hotel with private balcony sea view in Positano/Praiano',
          savingTip: 'Praiano offers the exact same sunset views as Positano at 40% less cost.'
        },
        {
          name: 'Dining & Wine',
          amount: 850,
          percentage: 26,
          description: 'Seafood trattorias, Michelin star cliffside dining, limoncello tastings',
          savingTip: 'Ask for the house carafe of local Campania white wine (Greco di Tufo or Fiano).'
        },
        {
          name: 'Private Boat & Ferries',
          amount: 550,
          percentage: 17,
          description: 'Private 4-hour wooden gozzo boat around Capri & coastal ferry passes',
          savingTip: 'Book boat captains directly at the Positano pier for better rates.'
        },
        {
          name: 'Activities & Entries',
          amount: 180,
          percentage: 6,
          description: 'Villa Rufolo, Villa Cimbrone, Duomo di Amalfi and lemon grove tour',
          savingTip: 'Purchase combined garden tickets in Ravello.'
        },
        {
          name: 'Buffer & Keepsakes',
          amount: 120,
          percentage: 4,
          description: 'Hand-painted ceramics from Vietri sul Mare, artisanal linen & limoncello',
          savingTip: 'Vietri sul Mare is the authentic home of Amalfi ceramics.'
        }
      ]
    },
    neighborhoodsAndStays: [
      {
        neighborhoodName: 'Positano (Upper Cliff)',
        vibe: 'Glamorous, romantic, iconic pastel cascades',
        whyStayHere: 'Direct walking access to world-class dining, boutiques, and ferry docks.',
        recommendedStayType: 'Boutique Sea-View Hotel with Terrace',
        priceRange: '€320 - €480 / night',
        safetyRating: 'Very safe, pedestrian stairways'
      },
      {
        neighborhoodName: 'Ravello (Clifftop Sanctuary)',
        vibe: 'Aristocratic, serene, classical music haven',
        whyStayHere: 'Perched 365m above the sea with tranquility away from the tour boat crowds.',
        recommendedStayType: 'Historic Villa Estate',
        priceRange: '€280 - €420 / night',
        safetyRating: 'Quiet, peaceful & pedestrianized'
      }
    ],
    packingList: [
      {
        category: 'Resort & Coastal Wear',
        items: [
          'Breathable linen shirts, dresses, and trousers',
          'Comfortable walking leather sandals or espadrilles (hundreds of stairs daily)',
          'High UV sunglasses and wide-brim sunhat',
          'Swimsuits & quick-dry microfiber beach towel'
        ]
      },
      {
        category: 'Travel & Daypack',
        items: [
          'Waterproof dry-bag phone pouch for boat cruises',
          'Motion sickness bands or tablets for winding coastal roads and boat rides',
          'EU 2-pin plug adapter (Type C/F)',
          'Refillable stainless steel water bottle'
        ]
      }
    ],
    agentAdvice:
      'Pro Travel Tip: In Positano, book your dinner at Da Adolfo—it is accessible only by taking their private wooden boat with a red fish flag from the Positano pier to a secluded cove beach.',
    itinerary: [
      {
        dayNumber: 1,
        dateTitle: 'Day 1: Arrival in Positano & Sunset Aperitivo',
        theme: 'Coastal Glamour & First Views',
        area: 'Positano',
        transitAdvice: 'Private car transfer or ferry from Salerno / Naples directly to Positano dock.',
        estimatedDayCost: 220,
        morning: {
          time: '11:00 AM',
          activity: 'Check-in & Stroll through Bougainvillea Alleys',
          location: 'Via dei Mulini, Positano',
          duration: '2 hours',
          description: 'Descend through stone-paved walkways draped in purple bougainvillea and lined with handmade leather sandal ateliers.',
          insiderTip: 'Stop at Safari Sandals to have custom leather sandals fitted and made by hand in 20 minutes.',
          costEstimate: 'Free',
          tags: ['Charming Alleys', 'Artisanal Shopping']
        },
        lunch: {
          restaurantName: 'Chez Black',
          cuisine: 'Fresh Seafood & Mediterranean',
          specialtyDish: 'Spaghetti ai Ricci di Mare (Sea Urchin Pasta) or Heart-Shaped Pizza',
          priceRange: '$$$',
          area: 'Spiaggia Grande, Positano',
          tip: 'Iconic beachfront tables directly looking out onto the colorful umbrellas and pastel cliff.'
        },
        afternoon: {
          time: '02:30 PM',
          activity: 'Fornillo Beach Hidden Cove Relaxation',
          location: 'Spiaggia di Fornillo',
          duration: '3 hours',
          description: 'Follow the romantic cliffside path from the main beach to Fornillo, a quieter pebble beach sheltered by ancient watchtowers.',
          insiderTip: 'Rent a sun lounger at Pupetto Beach Club for half the price of the crowded main beach.',
          costEstimate: '€20 sunbed',
          tags: ['Beach Relaxation', 'Coastal Path']
        },
        dinner: {
          restaurantName: 'La Sponda (Le Sirenuse)',
          cuisine: 'Michelin-starred Fine Dining',
          specialtyDish: 'Handmade lemon ravioli with red prawns from Mazara del Vallo',
          priceRange: '$$$$',
          area: 'Positano Cliff',
          tip: 'Illuminated entirely by 400 beeswax candles every evening—unbeatable romance.'
        },
        evening: {
          time: '09:30 PM',
          activity: 'Franco’s Bar Clifftop Sunset Cocktail',
          location: 'Franco’s Bar, Positano',
          duration: '1.5 hours',
          description: 'Sip a signature Mediterranean spritz on the open terrace overlooking the glittering lights of Positano cascading into the sea.',
          insiderTip: 'No reservations accepted; arrive 30 minutes before sunset for prime railing seats.',
          costEstimate: '€25 cocktail',
          tags: ['Aperitivo', 'Golden Hour View']
        },
        hiddenGem: {
          name: 'Chiesa di Santa Maria Assunta Dome',
          description: 'The green and yellow majolica tiled dome visible from every boat; inside houses a revered 12th-century Byzantine Black Madonna.',
          whySpecial: 'Step inside during afternoon organ practice for an inspiring acoustic experience.'
        }
      },
      {
        dayNumber: 2,
        dateTitle: 'Day 2: Capri Island & Faraglioni Private Boat Cruise',
        theme: 'Deep Blue Grottos & Island Sophistication',
        area: 'Capri & Faraglioni Rocks',
        transitAdvice: 'Private wooden gozzo boat excursion departing directly from Positano pier.',
        estimatedDayCost: 380,
        morning: {
          time: '09:00 AM',
          activity: 'Private Wooden Gozzo Boat Departure towards Capri',
          location: 'Gulf of Salerno & Capri',
          duration: '4 hours',
          description: 'Cruise past the Sirenusas (Li Galli islands), swimming in secluded turquoise bays, passing through the natural arch of the Faraglioni rocks.',
          insiderTip: 'Legend says kissing your partner while passing through the arch of the middle Faraglione rock brings eternal love.',
          costEstimate: '€250 boat share per person',
          tags: ['Private Cruise', 'Swimming in Sea']
        },
        lunch: {
          restaurantName: 'La Fontelina Capri',
          cuisine: 'Capri Clifftop Seafood & Sangria',
          specialtyDish: 'Salt-crusted sea bass & white peach sangria under straw pergolas',
          priceRange: '$$$$',
          area: 'Faraglioni Clifftop, Capri',
          tip: 'One of the most famous beach clubs in the world; reservations must be requested 3-4 months in advance.'
        },
        afternoon: {
          time: '02:30 PM',
          activity: 'Capri Town Piazzetta & Gardens of Augustus',
          location: 'Capri Island Center',
          duration: '2.5 hours',
          description: 'Take the open-top convertible taxi up to Capri town, stroll the glamorous boutique lanes, and stand above the hairpin turns of Via Krupp.',
          insiderTip: 'Get gelato at Buonocore—they press and roll the warm waffle cones right in front of you.',
          costEstimate: '€3 entry + €5 gelato',
          tags: ['Piazzetta', 'Panoramic Gardens']
        },
        dinner: {
          restaurantName: 'Da Vincenzo Positano',
          cuisine: 'Authentic Campanian Trattoria',
          specialtyDish: 'Fresh tuna steak with pistachio crust and sauteed escarole',
          priceRange: '$$$',
          area: 'Upper Positano',
          tip: 'Warm, family-run hospitality and a Michelin Bib Gourmand fixture since 1958.'
        },
        evening: {
          time: '09:30 PM',
          activity: 'Starlight Limoncello Tasting on the Terrace',
          location: 'Positano Terrace',
          duration: '1.5 hours',
          description: 'Enjoy frosty glasses of locally produced artisanal limoncello infused with giant Sfusato Amalfitano lemons.',
          insiderTip: 'Store limoncello in the freezer; authentic high-proof limoncello will never freeze solid.',
          costEstimate: '€10',
          tags: ['Limoncello', 'Stargazing']
        },
        hiddenGem: {
          name: 'Green Grotto (Grotta Verde) Secret Swim',
          description: 'Far less crowded than the Blue Grotto with no tourist boat wait times, glowing an emerald green from underwater refraction.',
          whySpecial: 'Your boat captain can drop anchor right outside so you can swim straight inside.'
        }
      },
      {
        dayNumber: 3,
        dateTitle: 'Day 3: Path of the Gods (Sentiero degli Dei) Clifftop Trek',
        theme: 'Epic Heights, Wild Rosemary & Coastal Villages',
        area: 'Bomerano to Nocelle & Positano',
        transitAdvice: 'Morning local bus or private taxi to Bomerano trailhead.',
        estimatedDayCost: 95,
        morning: {
          time: '08:00 AM',
          activity: 'Hiking the Path of the Gods',
          location: 'Bomerano to Nocelle',
          duration: '3.5 hours',
          description: 'Hike 6.5 km along an ancient mule trail suspended 500 meters above the turquoise sea, passing limestone gorges and wild herb meadows.',
          insiderTip: 'Start from Bomerano towards Nocelle so the trail is mostly downhill with constant sea views right in front of you.',
          costEstimate: 'Free',
          tags: ['World-Class Hike', 'Clifftop Views']
        },
        lunch: {
          restaurantName: 'Santa Croce Trattoria Nocelle',
          cuisine: 'Rustic Mountain & Coastal Fare',
          specialtyDish: 'Homemade gnocchi alla Sorrentina with melted mozzarella and fresh basil',
          priceRange: '$$',
          area: 'Nocelle Village',
          tip: 'Situated at the exact finish line of the hike with terrace tables overlooking Positano below.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Descending the 1,700 Steps of Nocelle or Open-Air Shuttle',
          location: 'Nocelle to Arienzo Beach',
          duration: '2 hours',
          description: 'Descend through the charming quiet hamlets of Nocelle and Montepertuso down to Arienzo beach for a well-deserved dip in the sea.',
          insiderTip: 'Take the local Mobydick shuttle bus if your knees prefer skipping the stairs.',
          costEstimate: '€2 bus ticket',
          tags: ['Scenic Village', 'Sea Swim']
        },
        dinner: {
          restaurantName: 'Ristorante Max',
          cuisine: 'Fine Dining Art Gallery & Wine Cellar',
          specialtyDish: 'Handmade paccheri pasta with monkfish ragu and confit tomatoes',
          priceRange: '$$$',
          area: 'Positano Center',
          tip: 'Dine surrounded by genuine 17th-century oil paintings and an ancient subterranean wine cellar.'
        },
        evening: {
          time: '09:00 PM',
          activity: 'Music on the Rocks Club inside the Cave',
          location: 'Spiaggia Grande Cave, Positano',
          duration: '2 hours',
          description: 'For those wanting evening energy, this world-renowned club is carved directly into the living sea cliff.',
          insiderTip: 'The upper terrace restaurant is quiet for a late night cocktail even if you do not want to dance.',
          costEstimate: '€20 entry/drink',
          tags: ['Cave Venue', 'Nightlife']
        },
        hiddenGem: {
          name: 'Il Chiosco del Sentiero degli Dei in Nocelle',
          description: 'A tiny wooden fruit stall where an elderly local farmer squeezes fresh ice-cold pomegranate and lemon juice on demand.',
          whySpecial: 'The most refreshing drink on earth after completing the mountain trek.'
        }
      },
      {
        dayNumber: 4,
        dateTitle: 'Day 4: Ravello Clifftop Villas, Classical Gardens & Amalfi Town',
        theme: 'Aristocratic Splendor & Maritime History',
        area: 'Ravello & Amalfi Town',
        transitAdvice: 'Ferry from Positano to Amalfi (20 mins), then local open-air bus up to Ravello.',
        estimatedDayCost: 140,
        morning: {
          time: '09:30 AM',
          activity: 'Villa Cimbrone & The Infinity Terrace (Terrazza dell’Infinito)',
          location: 'Ravello, Italy',
          duration: '2.5 hours',
          description: 'Walk through classical marble bust-lined clifftops that inspired Virginia Woolf and Winston Churchill, looking out into infinity.',
          insiderTip: 'The view from the Terrazza dell’Infinito was described by Gore Vidal as the most beautiful sight in the world.',
          costEstimate: '€10 garden ticket',
          tags: ['Historic Villa', 'Infinity View']
        },
        lunch: {
          restaurantName: 'Cumpa’ Cosimo',
          cuisine: 'Homestyle Campanian Comfort Food',
          specialtyDish: 'Mamma Netta’s 5-pasta tasting plate (sampler of the day)',
          priceRange: '$$',
          area: 'Piazza Duomo, Ravello',
          tip: 'Beloved by celebrities for over 60 years for its genuine grandmother-style cooking.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Villa Rufolo Gardens & Duomo di Sant’Andrea in Amalfi',
          location: 'Ravello & Amalfi Town',
          duration: '3 hours',
          description: 'Visit the Moorish cloister of Villa Rufolo where Wagner composed Parsifal, then head down to explore the 9th-century Duomo in Amalfi.',
          insiderTip: 'Inside the Duomo, do not miss the Cloister of Paradise with its 120 slender Arabic-Norman arches.',
          costEstimate: '€8 Villa Rufolo + €3 Duomo',
          tags: ['UNESCO Architecture', 'Cathedral']
        },
        dinner: {
          restaurantName: 'Ristorante Marina Grande Amalfi',
          cuisine: 'Contemporary Coastal Seafood',
          specialtyDish: 'Catch-of-the-day crudo and lobster linguine right over the water',
          priceRange: '$$$',
          area: 'Amalfi Pier',
          tip: 'Right on the beach edge with waves lapping beneath the terrace.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Evening Ferry Back to Positano under the Stars',
          location: 'Amalfi to Positano Sea Route',
          duration: '1 hour',
          description: 'Board the final ferry back to Positano as the seaside cliffs glow with thousands of golden village lights.',
          insiderTip: 'Sit on the top deck on the starboard side (facing the coast).',
          costEstimate: '€10 ferry ticket',
          tags: ['Night Cruise', 'Romantic Horizon']
        },
        hiddenGem: {
          name: 'Valle delle Ferriere Nature Reserve Waterfall',
          description: 'A lush microclimate valley hidden behind Amalfi town filled with moss-covered ruins of medieval paper mills and rare prehistoric ferns.',
          whySpecial: 'Feels like entering a temperate Jurassic jungle just 30 minutes walk from the seaside.'
        }
      },
      {
        dayNumber: 5,
        dateTitle: 'Day 5: Lemon Grove Tour, Limoncello Crafting & Farewell',
        theme: 'Fragrant Yellow Harvest & Mediterranean Farewells',
        area: 'Minori & Amalfi',
        transitAdvice: 'Scenic coastal transfer towards Naples Capodichino Airport or Salerno rail station.',
        estimatedDayCost: 110,
        morning: {
          time: '09:30 AM',
          activity: 'Path of Lemons (Sentiero dei Limoni) Farm Walk',
          location: 'Maiori to Minori',
          duration: '2.5 hours',
          description: 'Wander through family-owned terraced lemon groves suspended on wooden pergolas, meeting 4th-generation farmers.',
          insiderTip: 'Taste raw Sfusato Amalfitano lemon slices sprinkled with sugar and fresh mint—the peel is sweet and pesticide-free.',
          costEstimate: '€15 farm visit & tasting',
          tags: ['Agriturismo', 'Lemon Orchards']
        },
        lunch: {
          restaurantName: 'Sal De Riso',
          cuisine: 'Master Italian Pasticceria & Bistro',
          specialtyDish: 'World-famous "Delizia al Limone" sponge dome cake filled with lemon cream',
          priceRange: '$$',
          area: 'Minori Seafront',
          tip: 'Salvatore De Riso is Italy’s most decorated pastry master; do not leave without trying his lemon babà.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Vietri sul Mare Ceramic Workshop & Souvenir Selection',
          location: 'Vietri sul Mare',
          duration: '2 hours',
          description: 'Browse the artisanal ceramic capital of the coast, selecting hand-painted pottery plates, oil cruets, and decorative tiles.',
          insiderTip: 'Ceramica Artistica Solimene is housed in an astonishing Paolo Soleri designed ceramic facade.',
          costEstimate: 'Free (€30 for ceramics)',
          tags: ['Handcrafted Ceramics', 'Local Heritage']
        },
        dinner: {
          restaurantName: 'Da Gemma',
          cuisine: 'Traditional Neapolitan & Amalfi Classics',
          specialtyDish: 'Zuppa di Pesce (Rich Amalfi Seafood Stew)',
          priceRange: '$$$',
          area: 'Amalfi Historic Center',
          tip: 'Established in 1872; ask for the historic balcony overlooking the cathedral piazza.'
        },
        evening: {
          time: '07:30 PM',
          activity: 'Farewell Coastal Sunset Drive towards Airport',
          location: 'Amalfi Drive (SS163)',
          duration: '1.5 hours',
          description: 'A relaxing sunset transfer over the Monti Lattari mountain pass as you reflect on the sun-soaked Mediterranean magic.',
          insiderTip: 'Keep your camera ready for the last look over the Gulf of Naples and Mount Vesuvius.',
          costEstimate: 'N/A',
          tags: ['Sunset Drive', 'Departure']
        },
        hiddenGem: {
          name: 'Fiordo di Furore',
          description: 'A dramatic natural fjord with a tiny fishermen’s hamlet and stone arched bridge over crashing turquoise waves.',
          whySpecial: 'Looks like a Scandinavian fjord transplanted into southern Italy.'
        }
      }
    ]
  },
  {
    id: 'sample_iceland_4d',
    createdAt: '2026-09-29T10:00:00.000Z',
    title: 'Iceland: Golden Circle, Glaciers & Northern Lights',
    tagline: 'An exhilarating 4-day arctic road journey through thundering waterfalls, blue ice caves, geothermal lagoons, and dancing auroras.',
    destination: 'Reykjavik & South Coast, Iceland',
    daysCount: 4,
    budgetTier: 'moderate',
    currency: 'USD',
    travelParty: 'friends',
    travelStyle: 'adventure-nature',
    datesLabel: '4 Days Arctic Expedition',
    overview: {
      summary:
        'Iceland is a land sculpted by raw geological fire and ice. This 4-day journey navigates the legendary Golden Circle, black volcanic sand beaches of Vik, crystal blue glacier caves under Vatnajokull, and geothermal soaking at the Sky Lagoon overlooking the North Atlantic.',
      bestTimeToVisit: 'September to March for Northern Lights & Ice Caves; June to August for 24-hour Midnight Sun & lush green moss.',
      expectedWeather: 'Dynamic and unpredictable (-2°C to 6°C / 28°F to 43°F). Windproof and waterproof outerwear is mandatory.',
      localCurrencyAndTipping: 'Icelandic Króna (ISK). 100% cashless country—even single coffees or public restrooms take contactless Apple/Google Pay. Tipping is not customary.',
      culturalEtiquette: [
        'Always shower thoroughly with soap with no swimsuit before entering any public geothermal pool or hot spring.',
        'Never walk on the fragile green Icelandic moss—it takes decades to recover.',
        'Never turn your back on the ocean at Reynisfjara Black Sand Beach due to sudden "sneaker waves".'
      ],
      transportationTips: 'Rent a 4x4 SUV equipped with studded winter tires, or book guided super-jeep excursions for ice caves.',
      safetyAndEmergency: 'Download the 112 Iceland app and check vedur.is daily for real-time wind and road alerts. Emergency: 112.'
    },
    budgetBreakdown: {
      totalEstimatedCost: 1980,
      currency: 'USD',
      costPerPerson: 990,
      categories: [
        {
          name: '4x4 Rental & Fuel',
          amount: 580,
          percentage: 29,
          description: '4x4 SUV with gravel and winter insurance + gas',
          savingTip: 'Book early and use the fuel discount fob attached to the rental car key.'
        },
        {
          name: 'Accommodation',
          amount: 650,
          percentage: 33,
          description: 'Cozy South Coast cabin with outdoor hot tub + modern Reykjavik hotel',
          savingTip: 'Staying in cabins along the South Coast allows Northern Lights viewing with zero light pollution.'
        },
        {
          name: 'Activities & Glaciers',
          amount: 450,
          percentage: 23,
          description: 'Katla crystal ice cave super-jeep tour & Sky Lagoon Pure Pass',
          savingTip: 'Sky Lagoon offers a twilight pass with lower rates than the Blue Lagoon.'
        },
        {
          name: 'Food & Local Dining',
          amount: 300,
          percentage: 15,
          description: 'Hearty lamb stews, langoustine soup, rye bread ice cream & roadhouse snacks',
          savingTip: 'Stock up on skyr yogurt and snacks at Bónus supermarket.'
        }
      ]
    },
    neighborhoodsAndStays: [
      {
        neighborhoodName: 'Reykjavik Downtown (101)',
        vibe: 'Colorful corrugated houses, hip coffee roasters, street art',
        whyStayHere: 'Walkable to world-class bakeries, Hallgrimskirkja, and lively music venues.',
        recommendedStayType: 'Nordic Boutique Hotel',
        priceRange: '$170 - $240 / night',
        safetyRating: 'Virtually zero crime'
      },
      {
        neighborhoodName: 'Vik i Myrdal (South Coast)',
        vibe: 'Secluded seaside village framed by dramatic basalt cliffs',
        whyStayHere: 'Prime location for glacier adventures and dark night sky aurora spotting.',
        recommendedStayType: 'Country Lodge or Timber Cabin with Hot Tub',
        priceRange: '$180 - $260 / night',
        safetyRating: 'Quiet & peaceful wilderness'
      }
    ],
    packingList: [
      {
        category: 'Cold Weather Armor',
        items: [
          'Gore-Tex waterproof outer shell jacket and rain pants',
          'Heavyweight merino wool thermal base layers',
          'Ankle-supporting waterproof hiking boots with Vibram soles',
          'Fleece-lined windproof gloves, beanie, and neck gaiter'
        ]
      },
      {
        category: 'Arctic Gear & Spa',
        items: [
          'Swimsuit & quick-dry towel for geothermal springs',
          'Microspikes / crampons for icy walkways',
          'Headlamp with red-light mode for nighttime aurora chasing',
          'Tripod and phone mount for long-exposure Northern Lights photos'
        ]
      }
    ],
    agentAdvice:
      'Pro Travel Tip: Keep your phone camera set to Night Mode with 3-second exposure. The camera sensor will frequently detect the green hue of the Northern Lights before your eyes can even notice them in the dark!',
    itinerary: [
      {
        dayNumber: 1,
        dateTitle: 'Day 1: Golden Circle Wonders & Geothermal Soak',
        theme: 'Gushing Geysers, Continental Rifts & Steaming Springs',
        area: 'Thingvellir, Geysir & Gullfoss',
        transitAdvice: 'Drive Route 36 from Reykjavik onto the classic Golden Circle circuit.',
        estimatedDayCost: 110,
        morning: {
          time: '08:30 AM',
          activity: 'Thingvellir National Park Continental Rift Walk',
          location: 'Thingvellir National Park',
          duration: '2.5 hours',
          description:
            'Walk through the dramatic canyon where the North American and Eurasian tectonic plates are actively pulling apart, site of the world’s oldest parliament (est. 930 AD).',
          insiderTip: 'Peer into the crystal-clear glacial waters of Silfra fissure with 100-meter underwater visibility.',
          costEstimate: '$8 parking fee',
          tags: ['Tectonic Rift', 'UNESCO World Heritage']
        },
        lunch: {
          restaurantName: 'Friðheimar Greenhouse Farm',
          cuisine: 'Geothermal Tomato Experience',
          specialtyDish: 'Unlimited sweet tomato soup served with freshly baked sourdough bread and cucumber salsa',
          priceRange: '$$',
          area: 'Reykholt',
          tip: 'Dine inside a warm, illuminated geothermal greenhouse surrounded by 10,000 tomato plants. Must reserve online.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Strokkur Erupting Geysir & Gullfoss Golden Waterfall',
          location: 'Haukadalur Geothermal Valley',
          duration: '3 hours',
          description:
            'Watch the boiling Strokkur geysir blast water 30 meters into the air every 6 to 10 minutes, then stand beside the roar of Gullfoss plunging into a jagged canyon.',
          insiderTip: 'Wear full waterproof pants at Gullfoss; the wind blows glacial spray directly across the lower viewing platform.',
          costEstimate: 'Free',
          tags: ['Geyser Eruption', 'Mighty Waterfall']
        },
        dinner: {
          restaurantName: 'Supa Vik',
          cuisine: 'Nordic Soups & Artisan Breads',
          specialtyDish: 'Traditional Icelandic slow-cooked lamb soup with root vegetables',
          priceRange: '$$',
          area: 'Vik Village',
          tip: 'Free soup refills keep you warm after a brisk day of outdoor exploring.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Stargazing & First Aurora Watch from Country Cabin',
          location: 'South Coast Wilderness Lodge',
          duration: '2 hours',
          description:
            'Step into the outdoor geothermal hot tub under the unpolluted black sky, watching for luminous ribbons of green and violet aurora borealis.',
          insiderTip: 'Download the Aurora app and watch for a KP index above 3 and cloud cover under 20%.',
          costEstimate: 'Free',
          tags: ['Northern Lights', 'Hot Tub Soak']
        },
        hiddenGem: {
          name: 'Kerið Crater Lake',
          description: 'A 3,000-year-old volcanic caldera filled with vivid aquamarine water framed by contrasting red volcanic rock slopes.',
          whySpecial: 'Astonishing acoustics—Björk once held a floating concert directly in the center of the lake.'
        }
      },
      {
        dayNumber: 2,
        dateTitle: 'Day 2: Waterfalls Behind the Mist & Black Sand Reynisfjara',
        theme: 'Cascades, Basalt Columns & Atlantic Waves',
        area: 'Seljalandsfoss, Skogafoss & Vik',
        transitAdvice: 'Drive east along the Ring Road (Route 1) with views of glaciers and volcanoes.',
        estimatedDayCost: 95,
        morning: {
          time: '08:30 AM',
          activity: 'Walking Behind Seljalandsfoss & Hidden Gljúfrabúi Cave Waterfall',
          location: 'South Coast Waterfall Route',
          duration: '2.5 hours',
          description:
            'Experience the thrill of walking along the slippery rock pathway completely behind a 60-meter cascading waterfall, then wade into a secret canyon cave.',
          insiderTip: 'Gljúfrabúi is hidden 400m to the left behind a narrow cliff slot; step along the river boulders to reveal the secret fall inside.',
          costEstimate: '$7 parking',
          tags: ['Behind the Waterfall', 'Secret Cave']
        },
        lunch: {
          restaurantName: 'Mia’s Country Van',
          cuisine: 'Artisanal Icelandic Fish & Chips',
          specialtyDish: 'Crispy wild Atlantic cod battered in spelt flour with seasoned potato wedges and garlic skyr dip',
          priceRange: '$$',
          area: 'Near Skogafoss',
          tip: 'Operated out of a red vintage van; the freshest fish on the South Coast.'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Skogafoss Rainbow Stairs & Reynisfjara Black Sand Beach',
          location: 'Vik i Myrdal',
          duration: '3.5 hours',
          description:
            'Stand before the thundering spray of Skogafoss often crowned with double rainbows, then venture to the eerie black volcanic sands and hexagonal basalt column sea caves of Reynisfjara.',
          insiderTip: 'Respect the warning lights at Reynisfjara. Never get within 30 meters of the water line due to dangerous sneaker waves.',
          costEstimate: 'Free',
          tags: ['Black Sand Beach', 'Basalt Columns']
        },
        dinner: {
          restaurantName: 'The Black Crust Pizzeria',
          cuisine: 'Artisan Sourdough Pizza',
          specialtyDish: 'Charcoal-infused black crust pizza with fresh langoustine, truffles, and cream cheese',
          priceRange: '$$',
          area: 'Vik',
          tip: 'Created specifically to mimic the surrounding black volcanic sand.'
        },
        evening: {
          time: '08:30 PM',
          activity: 'Vik Church Hilltop Twilight View & Aurora Hunt',
          location: 'Vik i Myrdal Red Roof Church',
          duration: '1.5 hours',
          description:
            'Ascend to the hilltop church overlooking the village, ocean, and the jagged Reynisdrangar sea stacks jutting out of the rolling ocean waves.',
          insiderTip: 'The hill provides 360-degree clear sightlines for any aurora activity.',
          costEstimate: 'Free',
          tags: ['Scenic Viewpoint', 'Iconic Church']
        },
        hiddenGem: {
          name: 'Dyrhólaey Arch Lighthouse',
          description: 'A dramatic 120-meter high volcanic promontory with a massive natural stone arch carved by the Atlantic waves.',
          whySpecial: 'Unbeatable panoramic views stretching 40 miles down the black sand coast.'
        }
      },
      {
        dayNumber: 3,
        dateTitle: 'Day 3: Super-Jeep Crystal Ice Cave Expedition & Glaciers',
        theme: 'Subterranean Blue Ice & Floating Icebergs',
        area: 'Vatnajokull / Katla & Jokulsarlon',
        transitAdvice: 'Super-jeep guided tour equipped with monster 46-inch tires for glacier crossing.',
        estimatedDayCost: 260,
        morning: {
          time: '08:30 AM',
          activity: 'Super-Jeep Ride & Katla Natural Blue Ice Cave Tour',
          location: 'Mýrdalsjökull Glacier',
          duration: '3.5 hours',
          description:
            'Strap on helmet and crampons to step deep inside a naturally formed glacier cave glowing with ancient volcanic ash layers and luminescent electric-blue ice.',
          insiderTip: 'The ice is thousands of years old and so dense that air bubbles have been squeezed out, creating the intense sapphire blue color.',
          costEstimate: '$170 guided expedition',
          tags: ['Crystal Ice Cave', 'Glacier Adventure']
        },
        lunch: {
          restaurantName: 'Pakkhús Restaurant',
          cuisine: 'Ocean-to-Table Langoustine',
          specialtyDish: 'Garlic-butter sautéed Icelandic lobster (langoustine) with fresh crusty bread',
          priceRange: '$$$',
          area: 'Hofn Harbour',
          tip: 'Housed in an 1897 wooden maritime warehouse overlooking the fishing boat docks.'
        },
        afternoon: {
          time: '02:00 PM',
          activity: 'Diamond Beach & Jökulsárlón Glacial Lagoon',
          location: 'Jökulsárlón Lagoon',
          duration: '3 hours',
          description:
            'Gaze at colossal icebergs calved from the glacier drifting slowly towards the ocean, washing up on black sands like glistening cut diamonds.',
          insiderTip: 'Look for harbor seals swimming between the floating icebergs hunting for fish.',
          costEstimate: 'Free',
          tags: ['Diamond Beach', 'Glacial Lagoon']
        },
        dinner: {
          restaurantName: 'Fjallkonan Reykjavik',
          cuisine: 'Modern Icelandic Tapas',
          specialtyDish: 'Slow-cooked arctic char with fennel and warm rye bread with whipped butter',
          priceRange: '$$$',
          area: 'Downtown Reykjavik',
          tip: 'Order their craft rhubarb cocktail garnished with cotton candy.'
        },
        evening: {
          time: '09:00 PM',
          activity: 'Reykjavik Craft Beer Crawl & Harpa Concert Hall',
          location: 'Laugavegur, Reykjavik',
          duration: '2 hours',
          description:
            'Marvel at the glowing honeycombed glass facade of Harpa Concert Hall reflecting off the harbor, then try crisp local craft ales at Skúli Craft Bar.',
          insiderTip: 'Download the "Appy Hour" app for Reykjavik to find 50% discounts on local craft brews.',
          costEstimate: '$18 craft pints',
          tags: ['Nightlife', 'Harpa Architecture']
        },
        hiddenGem: {
          name: 'Fjaðrárgljúfur Canyon',
          description: 'A serpentine 100-meter deep moss-cloaked fairytale canyon carved by glacial runoff over millions of years.',
          whySpecial: 'Stunning viewing platforms that look straight out of a fantasy novel.'
        }
      },
      {
        dayNumber: 4,
        dateTitle: 'Day 4: Hallgrimskirkja, Sky Lagoon 7-Step Ritual & Farewell',
        theme: 'Nordic Architecture, Geothermal Warmth & Departure',
        area: 'Reykjavik & Reykjanes Peninsula',
        transitAdvice: 'Drive 45 minutes towards Keflavik International Airport (KEF).',
        estimatedDayCost: 130,
        morning: {
          time: '09:00 AM',
          activity: 'Hallgrímskirkja Tower View & Brauð & Co Cinnamon Buns',
          location: 'Downtown Reykjavik',
          duration: '2.5 hours',
          description:
            'Take the elevator to the 73-meter clock tower of Iceland’s cathedral modeled after basalt columns, then grab a steaming vanilla cinnamon roll from Brauð & Co.',
          insiderTip: 'Watch through the bakery glass window as bakers pull trays of sizzling, caramelized sourdough pastries from the oven.',
          costEstimate: '$10 tower ticket + $5 pastry',
          tags: ['City Panorama', 'Artisan Bakery']
        },
        lunch: {
          restaurantName: 'Bæjarins Beztu Pylsur',
          cuisine: 'World-Famous Icelandic Hot Dogs',
          specialtyDish: 'Lamb hot dog "eina með öllu" (with everything: crispy fried onions, raw onions, ketchup, and remoulade)',
          priceRange: '$',
          area: 'Reykjavik Harbour',
          tip: 'Operating since 1937 and visited by Bill Clinton and Anthony Bourdain. Costs just $4.50!'
        },
        afternoon: {
          time: '01:30 PM',
          activity: 'Sky Lagoon 7-Step Geothermal Ritual Overlooking North Atlantic',
          location: 'Kársnes Harbour, Kópavogur',
          duration: '3 hours',
          description:
            'Immerse in an oceanfront geothermal infinity lagoon with sheer turf walls, undergoing the 7-step ritual: hot soak, cold glacier plunge, ocean-view sauna, cold fog mist, body scrub, and steam.',
          insiderTip: 'Swim up to the in-lagoon bar carved into the stone cave for a glass of prosecco or Icelandic cider while floating.',
          costEstimate: '$85 Pure Pass',
          tags: ['Geothermal Lagoon', 'Oceanfront Spa']
        },
        dinner: {
          restaurantName: 'Café Loki',
          cuisine: 'Traditional Icelandic Tasting Platter',
          specialtyDish: 'Warm rye bread with mashed fish (plokkfiskur) and rye bread ice cream',
          priceRange: '$$',
          area: 'Opposite Hallgrímskirkja',
          tip: 'Try their delicate homemade rye bread ice cream—tastes like sweet caramel crunch.'
        },
        evening: {
          time: '06:30 PM',
          activity: 'Drive through Reykjanes Lava Fields to Airport Departure',
          location: 'Reykjanes Geopark / KEF Airport',
          duration: '1.5 hours',
          description:
            'A scenic drive through moss-covered lunar lava fields on your way to Keflavik Airport for your return flight home.',
          insiderTip: 'Duty-free shop inside KEF airport is one of the best in Europe for Icelandic wool sweaters (lopapeysa) and lava salts.',
          costEstimate: 'N/A',
          tags: ['Departure', 'Lava Fields']
        },
        hiddenGem: {
          name: 'Brú milli heimsálfa (Bridge Between Continents)',
          description: 'A 50-foot footbridge straddling a gaping fissure between the North American and Eurasian tectonic plates.',
          whySpecial: 'You can stand with one foot in North America and one foot in Europe at the same time.'
        }
      }
    ]
  }
];

