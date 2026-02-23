
import { Crystal, HealingMethod } from './types';

export const CRYSTALS: Crystal[] = [
  {
    id: '1', name: 'Amethyst', hindiName: 'जमुनिया (Jamuniya)', teluguName: 'అమెథిస్ట్ (Amethist)', color: 'Purple', element: 'Air', chakra: 'Third Eye',
    description: 'A powerful and protective stone with a high spiritual vibration. Known as the Bishop\'s Stone in medieval times, it was believed to prevent intoxication and promote sobriety.',
    vedicInfo: 'In Vedic astrology, Amethyst is associated with Saturn (Shani). It is worn to calm an overactive mind and enhance meditation. Traditionally used by sages and monks for spiritual advancement.',
    properties: ['Calms the mind', 'Enhances intuition', 'Aids sleep', 'Relieves stress', 'Spiritual growth', 'Sobriety', 'Dream clarity'],
    image: 'https://images.unsplash.com/photo-1567606401053-904000305886?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '2', name: 'Rose Quartz', hindiName: 'गुलाबी स्फटिक (Gulabi Sphatik)', teluguName: 'రోజ్ క్వార్ట్జ్ (Rose Quartz)', color: 'Pink', element: 'Water', chakra: 'Heart',
    description: 'The stone of universal love. In Greek mythology, Aphrodite\'s blood stained white quartz pink when she cut herself on a briar bush rushing to save Adonis.',
    vedicInfo: 'Associated with Venus (Shukra) in Vedic astrology. Promotes love, harmony, and emotional healing. Recommended for those seeking to attract love or heal relationship wounds.',
    properties: ['Self-love', 'Emotional healing', 'Compassion', 'Deep inner healing', 'Romantic connection', 'Forgiveness', 'Heart opening'],
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '3', name: 'Citrine', hindiName: 'सुनहला (Sunehla)', teluguName: 'సిట్రిన్ (Sitrin)', color: 'Yellow', element: 'Fire', chakra: 'Solar Plexus',
    description: 'Known as the Merchant\'s Stone, shopkeepers in ancient China placed citrine in their cash registers to attract prosperity and success.',
    vedicInfo: 'Associated with Jupiter (Guru/Brihaspati). A substitute for Yellow Sapphire (Pukhraj). Enhances wisdom, prosperity, and spiritual knowledge. Ideal for students and business people.',
    properties: ['Success', 'Positivity', 'Creativity', 'Energy booster', 'Wealth attraction', 'Mental clarity', 'Confidence'],
    image: 'https://images.unsplash.com/photo-1628108502360-14197c36a282?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '4', name: 'Lapis Lazuli', hindiName: 'लाजवर्द (Lajvard)', teluguName: 'లాపిస్ లాజులి (Lapis Lajuli)', color: 'Deep Blue', element: 'Wind', chakra: 'Throat',
    description: 'Sacred to ancient Egyptian pharaohs, used in Cleopatra\'s eyeshadow and Tutankhamun\'s burial mask. The Sumerians believed it carried the soul of the gods.',
    vedicInfo: 'Associated with Saturn (Shani) and the Throat chakra. Enhances truthful communication and intellectual ability. Used in ancient Indian medicine (Ayurveda) for eye ailments and skin conditions.',
    properties: ['Communication', 'Inner truth', 'Wisdom', 'Intellectual ability', 'Royal energy', 'Third eye activation', 'Self-awareness'],
    image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '5', name: 'Black Tourmaline', hindiName: 'काला तुरमलीन (Kala Turmaline)', teluguName: 'బ్లాక్ టూర్మలిన్ (Black Tourmalin)', color: 'Black', element: 'Earth', chakra: 'Root',
    description: 'The ultimate protection stone. Ancient magicians used it as a shield against earth demons. It generates a negative ion field similar to a protective force field.',
    vedicInfo: 'Used as a protective talisman in Indian tradition. Absorbs negative energies and EMF radiation. Placed at doorways and corners of homes for Vastu (Indian Feng Shui) correction.',
    properties: ['Protection', 'Grounding', 'Stress relief', 'EMF shielding', 'Psychic defense', 'Anxiety reduction', 'Energy purification'],
    image: 'https://images.unsplash.com/photo-1614064548237-096f735f344f?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '6', name: 'Carnelian', hindiName: 'अकीक (Akik)', teluguName: 'కార్నేలియన్ (Karnelian)', color: 'Orange', element: 'Fire', chakra: 'Sacral',
    description: 'Ancient Egyptian warriors wore carnelian around their necks for courage in battle. The Prophet Muhammad is said to have worn a carnelian ring on his right hand.',
    vedicInfo: 'Known as Akik in Indian tradition, associated with Mars (Mangal). Boosts courage, vitality, and physical strength. Used in traditional Indian jewelry and believed to balance the Sacral chakra.',
    properties: ['Courage', 'Energy', 'Creativity', 'Social confidence', 'Passion', 'Motivation', 'Fertility support'],
    image: 'https://images.unsplash.com/photo-1605374828135-01e49b80b27e?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '7', name: 'Clear Quartz', hindiName: 'स्फटिक (Sphatik)', teluguName: 'స్ఫటికం (Sphatikam)', color: 'White', element: 'All', chakra: 'Crown',
    description: 'The Master Healer and most versatile crystal. Ancient Greeks believed it was ice frozen so deeply it would never thaw. Amplifies energy of all other stones.',
    vedicInfo: 'Sphatik Mala (crystal rosary) is sacred in Hindu worship, especially for Goddess Lakshmi and Lord Shiva. Used in puja rituals and meditation. Purifies the aura and enhances all chakras.',
    properties: ['Amplification', 'Clarity', 'Focus', 'Healing', 'Programming intentions', 'Energy cleansing', 'Spiritual awareness'],
    image: 'https://images.unsplash.com/photo-1596434449084-3c66280436ce?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '8', name: 'Moonstone', hindiName: 'चंद्रकांत मणि (Chandrakant Mani)', teluguName: 'చంద్రకాంత శిల (Chandrakanta Shila)', color: 'Iridescent White', element: 'Water', chakra: 'Crown',
    description: 'Sacred in Hindu mythology as solidified moonbeams. Romans believed moonstone was formed from moonlight itself. Shows adularescence — a floating inner glow.',
    vedicInfo: 'Associated with Moon (Chandra). A substitute for Pearl (Moti). Balances emotions, enhances intuition, and calms anxiety. Especially beneficial for those with a weak Moon in their horoscope.',
    properties: ['New beginnings', 'Intuition', 'Inner growth', 'Lunar connection', 'Emotional balance', 'Fertility', 'Safe travel'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '9', name: 'Tiger\'s Eye', hindiName: 'लहसुनिया (Lahsuniya)', teluguName: 'పులి కన్ను రాయి (Puli Kannu Rayi)', color: 'Golden Brown', element: 'Earth', chakra: 'Solar Plexus',
    description: 'Roman soldiers carried Tiger\'s Eye for bravery in battle. The chatoyant effect (cat\'s eye shimmer) was believed to grant all-seeing powers.',
    vedicInfo: 'Associated with Ketu in Vedic astrology. Known as a protective stone that wards off the evil eye (Nazar). Enhances willpower, focus, and practical decision-making.',
    properties: ['Courage', 'Protection', 'Good luck', 'Confidence', 'Focused willpower', 'Evil eye protection', 'Grounding'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '10', name: 'Labradorite', hindiName: 'लैब्राडोराइट (Labradorite)', teluguName: 'లాబ్రడోరైట్ (Labradorite)', color: 'Gray-Blue Iridescent', element: 'Wind', chakra: 'Third Eye',
    description: 'Inuit legends say the Northern Lights were trapped inside the rocks until a warrior freed them with his spear. The labradorescence effect mirrors the aurora.',
    vedicInfo: 'A powerful stone of transformation and protection. Used by modern Indian healers for psychic protection during meditation and past-life recall. Shields the aura from energy leaks.',
    properties: ['Transformation', 'Protection', 'Psychic abilities', 'Imagination', 'Inner magic', 'Aura shielding', 'Synchronicity'],
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '11', name: 'Emerald', hindiName: 'पन्ना (Panna)', teluguName: 'పచ్చ (Pachcha)', color: 'Green', element: 'Earth', chakra: 'Heart',
    description: 'Cleopatra\'s favorite gemstone. Ancient Egyptians mined emeralds as early as 1500 BCE. In the Quran, Paradise is described as adorned with emeralds.',
    vedicInfo: 'Associated with Mercury (Budh). One of the Navaratna (nine sacred gems). Enhances intelligence, communication, and business acumen. Prescribed for weak Mercury in the birth chart.',
    properties: ['Intelligence', 'Communication', 'Love', 'Rebirth', 'Wisdom', 'Patience', 'Memory enhancement'],
    image: 'https://images.unsplash.com/photo-1583937443566-6b087f5f3cb0?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '12', name: 'Ruby', hindiName: 'माणिक (Manik)', teluguName: 'మాణిక్యం (Manikyam)', color: 'Red', element: 'Fire', chakra: 'Heart',
    description: 'Called "Ratnaraj" (King of Gems) in Sanskrit. Ancient Indians believed rubies contained an inextinguishable inner fire. Warriors embedded rubies in their skin for invincibility.',
    vedicInfo: 'Associated with Sun (Surya). The most powerful Navaratna gem. Enhances leadership, authority, vitality, and self-confidence. Prescribed for weak Sun in the horoscope.',
    properties: ['Vitality', 'Leadership', 'Passion', 'Courage', 'Life force', 'Self-confidence', 'Nobility'],
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '13', name: 'Blue Sapphire', hindiName: 'नीलम (Neelam)', teluguName: 'నీలం (Neelam)', color: 'Blue', element: 'Air', chakra: 'Third Eye',
    description: 'The destiny stone. Medieval kings wore sapphires as protection against treachery. Ancient Persians believed the sky was painted blue by the reflection of sapphires.',
    vedicInfo: 'Associated with Saturn (Shani). The fastest-acting Navaratna gem — can bring dramatic changes. Must be tested before wearing permanently. Can bring immense wealth or ruin if mismatched.',
    properties: ['Destiny', 'Focus', 'Discipline', 'Wealth', 'Protection', 'Karmic clarity', 'Mental strength'],
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=400&h=400&auto=format&fit=crop'
  },
  {
    id: '14', name: 'Yellow Sapphire', hindiName: 'पुखराज (Pukhraj)', teluguName: 'పుష్యరాగం (Pushyaragam)', color: 'Yellow', element: 'Air', chakra: 'Solar Plexus',
    description: 'Considered the gem of Jupiter — the teacher of the gods. In Vedic tradition, it is one of the most auspicious gems for marriage and prosperity.',
    vedicInfo: 'Associated with Jupiter (Guru/Brihaspati). Worn on the index finger in gold. Enhances wisdom, spirituality, marriage prospects, and children. One of the most beneficial Navaratna gems.',
    properties: ['Wisdom', 'Prosperity', 'Marriage', 'Spiritual growth', 'Fame', 'Good fortune', 'Divine grace'],
    image: 'https://images.unsplash.com/photo-1599707367790-86e0c8a0b501?q=80&w=400&h=400&auto=format&fit=crop'
  }
];

// Map of stone names (lowercase) to their data for quick lookup
export const STONE_LOOKUP: Record<string, { hindiName: string; teluguName: string; image: string; description: string; vedicInfo: string; properties: string[]; chakra: string; element: string }> = {};
CRYSTALS.forEach(c => {
  STONE_LOOKUP[c.name.toLowerCase()] = { hindiName: c.hindiName, teluguName: c.teluguName, image: c.image, description: c.description, vedicInfo: c.vedicInfo, properties: c.properties, chakra: c.chakra, element: c.element };
});

// Additional well-known stones not in main collection but referenced in prescriptions
const EXTRA_STONES: Record<string, { hindiName: string; teluguName: string; description: string; vedicInfo: string; properties: string[] }> = {
  'pearl': { hindiName: 'मोती (Moti)', teluguName: 'ముత్యం (Mutyam)', description: 'Formed within mollusks, pearls are organic gems symbolizing purity and innocence.', vedicInfo: 'Associated with Moon (Chandra). Calms emotions and balances the mind.', properties: ['Emotional balance', 'Purity', 'Calming'] },
  'garnet': { hindiName: 'तामड़ा (Tamda)', teluguName: 'గార్నెట్ (Garnet)', description: 'The warrior\'s stone, carried for protection and vitality since ancient times.', vedicInfo: 'Associated with Rahu. Protects during travel and provides courage.', properties: ['Vitality', 'Courage', 'Protection'] },
  'turquoise': { hindiName: 'फ़ीरोज़ा (Firoza)', teluguName: 'టర్క్వాయిజ్ (Turquoise)', description: 'Sacred to Native Americans, Persians, and Tibetans as a master healer and protector.', vedicInfo: 'Used as a protective talisman. Promotes health, good fortune, and protection from evil.', properties: ['Protection', 'Healing', 'Communication'] },
  'malachite': { hindiName: 'दानाफिरंग (Danafirang)', teluguName: 'మాలకైట్ (Malachite)', description: 'The transformation stone with striking green bands, used by ancient Egyptians for eye makeup.', vedicInfo: 'A powerful heart healer. Absorbs negative energies and pollution.', properties: ['Transformation', 'Protection', 'Healing'] },
  'obsidian': { hindiName: 'काला शीशा (Kala Sheesha)', teluguName: 'అబ్సిడియన్ (Obsidian)', description: 'Volcanic glass formed from rapid cooling lava. Ancient Aztecs made mirrors and weapons from it.', vedicInfo: 'A truth-revealing stone. Used for shadow work and deep psychic protection.', properties: ['Truth', 'Protection', 'Grounding'] },
  'opal': { hindiName: 'दूधिया पत्थर (Dudhiya Patthar)', teluguName: 'ఓపల్ (Opal)', description: 'The play-of-color stone. Romans considered it the most precious gem, embodying all gemstone colors.', vedicInfo: 'Associated with Venus (Shukra). Enhances creativity, love, and passion.', properties: ['Creativity', 'Love', 'Inspiration'] },
  'diamond': { hindiName: 'हीरा (Heera)', teluguName: 'వజ్రం (Vajram)', description: 'The hardest natural substance and king of gemstones. Symbol of eternal love and invincibility.', vedicInfo: 'Associated with Venus (Shukra). Brings luxury, beauty, and marital harmony.', properties: ['Purity', 'Strength', 'Love'] },
  'coral': { hindiName: 'मूंगा (Moonga)', teluguName: 'పవడం (Pavadam)', description: 'An organic gem from the sea. Red coral has been treasured since ancient Roman times.', vedicInfo: 'Associated with Mars (Mangal). Enhances courage, vitality, and blood health.', properties: ['Courage', 'Vitality', 'Energy'] },
  'cat\'s eye': { hindiName: 'लहसुनिया (Lehsuniya)', teluguName: 'వైడూర్యం (Vaiduryam)', description: 'Chrysoberyl cat\'s eye with its distinctive band of light. Feared and revered in equal measure.', vedicInfo: 'Associated with Ketu. Protects against accidents, evil spirits, and hidden enemies.', properties: ['Protection', 'Intuition', 'Luck'] },
  'hessonite': { hindiName: 'गोमेद (Gomed)', teluguName: 'గోమేధికం (Gomedhikam)', description: 'A variety of grossular garnet with a warm honey color. Known as the cinnamon stone.', vedicInfo: 'Associated with Rahu. Removes confusion and enhances clarity. Protects against Rahu dasha.', properties: ['Clarity', 'Focus', 'Protection'] },
  'aquamarine': { hindiName: 'बेरूज (Beruj)', teluguName: 'అక్వామెరైన్ (Aquamarine)', description: 'The sailor\'s gem, believed to calm waves and protect seafarers. Named "water of the sea" in Latin.', vedicInfo: 'A calming stone associated with water element. Aids clear communication and soothes anxiety.', properties: ['Calm', 'Communication', 'Courage'] },
  'fluorite': { hindiName: 'फ्लोराइट (Fluorite)', teluguName: 'ఫ్లోరైట్ (Fluorite)', description: 'The Genius Stone. Its orderly internal structure helps organize chaotic thoughts and improve focus.', vedicInfo: 'Used by students and scholars. Enhances concentration, learning, and mental clarity.', properties: ['Focus', 'Learning', 'Protection'] },
};

Object.entries(EXTRA_STONES).forEach(([key, val]) => {
  STONE_LOOKUP[key] = { ...val, image: '', chakra: '', element: '' };
});

export const METHODS: HealingMethod[] = [
  {
    id: 'm1', title: 'Jewelry & Wearing', icon: '💎',
    description: 'Continuous benefits by keeping the stone within your auric field for constant energy resonance.',
    howTo: [
      'Pendants: Heart & Throat chakras. Wear close to skin for maximum effect.',
      'Rings: Different fingers correspond to different energies (e.g., Thumb for Willpower, Ring finger for Love).',
      'Bracelets: Left wrist (Receptive/Absorbing), Right wrist (Projective/Giving).',
      'Choose metals that complement the stone — Gold for fire stones, Silver for water stones.'
    ]
  },
  {
    id: 'm2', title: 'Crystal Grids', icon: '🔮',
    description: 'Placing multiple stones in sacred geometric patterns to manifest powerful intentions.',
    howTo: [
      'Select a center stone to focus the intention — this is the master controller.',
      'Use supporting stones to create a geometric flow (Flower of Life, Metatron\'s Cube).',
      'Activate the grid with a clear quartz wand tracing lines between stones.',
      'Refresh the grid every New Moon and Full Moon for maximum potency.'
    ]
  },
  {
    id: 'm3', title: 'Meditation & Placement', icon: '🧘',
    description: 'Direct chakra placement during meditation for deep energetic work and spiritual journeying.',
    howTo: [
      'Lie down comfortably and place crystals on corresponding chakra points.',
      'Begin with grounding stones (Root) and work upward to Crown.',
      'Breathe deeply — inhale for 4 counts, hold for 4, exhale for 8.',
      'Visualize the crystal\'s light radiating through each energy center.',
      'Session length: 15-30 minutes for beginners, up to 60 minutes for advanced practice.'
    ]
  },
  {
    id: 'm4', title: 'Crystal Elixirs', icon: '🫗',
    description: 'Infusing water with crystal vibrations for internal healing (indirect method only for safety).',
    howTo: [
      'SAFETY FIRST: Only use the indirect method — place crystal outside the glass container.',
      'Use spring or filtered water in a clear glass vessel.',
      'Place the crystal next to the vessel under moonlight for 4-8 hours.',
      'Set a clear intention before and after the infusion process.',
      'Drink within 24 hours. Never use toxic stones like Malachite or Cinnabar directly.'
    ]
  },
  {
    id: 'm5', title: 'Sound Cleansing', icon: '🔔',
    description: 'Using pure tones and sacred frequencies to cleanse and recharge crystal vibrations.',
    howTo: [
      'Use a singing bowl (Tibetan or Crystal) tuned to 432Hz or 528Hz.',
      'Place stones in or near the bowl and strike gently — let the vibration wash over them.',
      'Alternatively, use tuning forks at specific chakra frequencies.',
      'Sound cleansing is ideal for large collections or crystals that cannot be submerged.'
    ]
  },
  {
    id: 'm6', title: 'Moon Bathing', icon: '🌙',
    description: 'Harnessing lunar energy to purify, charge, and program your crystals with celestial power.',
    howTo: [
      'Full Moon: Maximum charging power — place all stones on a natural surface outdoors.',
      'New Moon: Deep purification and intention-setting — ideal for programming new crystals.',
      'Avoid direct sunlight for Amethyst, Rose Quartz, and Fluorite (fading risk).',
      'Leave crystals out from sunset to sunrise for a complete lunar bath cycle.'
    ]
  }
];

export const ZODIAC_CRYSTALS: Record<string, { stones: string[]; element: string; quality: string }> = {
  'Aries': { stones: ['Carnelian', 'Diamond', 'Ruby'], element: 'Fire', quality: 'Cardinal' },
  'Taurus': { stones: ['Rose Quartz', 'Emerald', 'Coral'], element: 'Earth', quality: 'Fixed' },
  'Gemini': { stones: ['Citrine', 'Emerald', 'Tiger\'s Eye'], element: 'Air', quality: 'Mutable' },
  'Cancer': { stones: ['Moonstone', 'Pearl', 'Ruby'], element: 'Water', quality: 'Cardinal' },
  'Leo': { stones: ['Ruby', 'Tiger\'s Eye', 'Carnelian'], element: 'Fire', quality: 'Fixed' },
  'Virgo': { stones: ['Emerald', 'Citrine', 'Blue Sapphire'], element: 'Earth', quality: 'Mutable' },
  'Libra': { stones: ['Opal', 'Diamond', 'Lapis Lazuli'], element: 'Air', quality: 'Cardinal' },
  'Scorpio': { stones: ['Labradorite', 'Coral', 'Obsidian'], element: 'Water', quality: 'Fixed' },
  'Sagittarius': { stones: ['Yellow Sapphire', 'Turquoise', 'Amethyst'], element: 'Fire', quality: 'Mutable' },
  'Capricorn': { stones: ['Blue Sapphire', 'Garnet', 'Black Tourmaline'], element: 'Earth', quality: 'Cardinal' },
  'Aquarius': { stones: ['Amethyst', 'Aquamarine', 'Blue Sapphire'], element: 'Air', quality: 'Fixed' },
  'Pisces': { stones: ['Yellow Sapphire', 'Moonstone', 'Aquamarine'], element: 'Water', quality: 'Mutable' }
};

export const ZODIAC_SYMBOLS: Record<string, string> = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

export const MOON_PHASES: Record<string, { hindi: string; telugu: string; advice: string }> = {
  'New Moon': { hindi: 'अमावस्या (Amavasya)', telugu: 'అమావాస్య (Amavasya)', advice: '🌑 Purification cycle. Ideal for deep cleansing, setting new intentions, and programming crystals.' },
  'Waxing Crescent': { hindi: 'शुक्ल द्वितीया (Shukla Dvitiya)', telugu: 'శుక్ల విదియ (Shukla Vidiya)', advice: '🌒 Growth begins. Plant seeds of intention. Use Citrine and Green Aventurine for new ventures.' },
  'First Quarter': { hindi: 'शुक्ल अष्टमी (Shukla Ashtami)', telugu: 'శుక్ల అష్టమి (Shukla Ashtami)', advice: '🌓 Momentum phase. Overcome obstacles with Tiger\'s Eye and Carnelian. Take decisive action.' },
  'Waxing Gibbous': { hindi: 'शुक्ल एकादशी (Shukla Ekadashi)', telugu: 'శుక్ల ఏకాదశి (Shukla Ekadashi)', advice: '🌔 Refinement cycle. Polish your intentions. Best for abundance stones — Citrine, Pyrite, and Yellow Sapphire.' },
  'Full Moon': { hindi: 'पूर्णिमा (Purnima)', telugu: 'పౌర్ణమి (Pournami)', advice: '🌕 Peak charging night! Place ALL stones under direct moonlight for maximum energetic renewal and amplification.' },
  'Waning Gibbous': { hindi: 'कृष्ण तृतीया (Krishna Tritiya)', telugu: 'కృష్ణ తదియ (Krishna Tadiya)', advice: '🌖 Gratitude phase. Express thanks with Rose Quartz. Share wisdom and blessings with others.' },
  'Last Quarter': { hindi: 'कृष्ण अष्टमी (Krishna Ashtami)', telugu: 'కృష్ణ అష్టమి (Krishna Ashtami)', advice: '🌗 Release cycle. Use Black Tourmaline and Obsidian. Let go of stagnant energy and old patterns.' },
  'Waning Crescent': { hindi: 'कृष्ण चतुर्दशी (Krishna Chaturdashi)', telugu: 'కృష్ణ చతుర్దశి (Krishna Chaturdashi)', advice: '🌘 Rest and surrender. Use Amethyst and Moonstone. Prepare for the new cycle with meditation.' }
};

export const DAILY_AFFIRMATIONS: string[] = [
  "I am aligned with the highest vibration of love and light.",
  "My energy field is clear, radiant, and protected by the mineral kingdom.",
  "I release all that no longer serves my highest good.",
  "I am grounded in the present moment and open to infinite possibility.",
  "The ancient wisdom of the Earth flows through me now.",
  "I trust the journey and embrace transformation with grace.",
  "My intuition is a compass guiding me toward my true purpose.",
  "I am worthy of abundance, love, and deep inner peace.",
  "I honor the sacred balance between my physical and spiritual selves.",
  "Every crystal I touch amplifies my inherent divine power."
];

export const SUGGESTED_FOLLOWUPS: string[] = [
  "What finger should I wear this stone on?",
  "How should I cleanse this before first use?",
  "Can I wear this stone while sleeping?",
  "What metal setting works best for this stone?",
  "Are there any stones I should NOT combine with this?",
  "How long should I wear it before seeing effects?",
  "Is there a specific day or time to start wearing it?",
  "What mantra should I chant while wearing this?",
  "Can children or pregnant women wear this stone?",
  "What are the side effects if this stone doesn't suit me?",
];
