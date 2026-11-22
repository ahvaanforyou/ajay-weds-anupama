export interface CouplePerson {
  name: string;
  teluguName: string;
  role: string;
  parents: string;
  grandparents?: string;
  education?: string;
  description?: string;
  image: string;
  instagram?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  teluguTitle?: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  description?: string;
  dressCode?: string;
  isMainEvent?: boolean;
  googleMapsUrl?: string;
  icon: "kalash" | "mehendi" | "mandapam" | "reception";
}

export interface WeddingConfig {
  couple: {
    groom: CouplePerson;
    bride: CouplePerson;
  };
  shlokas: {
    sanskritGanesha: string;
    teluguGanesha: string;
    blessingTelugu?: string;
    blessingEnglish?: string;
  };
  weddingDateTime: {
    iso: string;
    dateFormatted: string;
    dayFormatted: string;
    muhurthamTime: string;
    muhurthamTelugu: string;
    teluguTithi: string;
    timezone: string;
  };
  events: WeddingEvent[];
  venue: {
    name: string;
    teluguName?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmarks?: string;
    googleMapsUrl?: string;
    googleMapsEmbedUrl?: string;
    parkingNotes?: string;
    showMapEmbed: boolean;
  };
  rsvp: {
    enabled: boolean;
    deadline?: string;
    maxGuests: number;
    contactPhone?: string;
    contactEmail?: string;
  };
  audio: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    src: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: "Ajay",
      teluguName: "అజయ్",
      role: "Meet the Groom",
      parents: "Smt. Rani & Sri Narasimharao",
      education: "Chartered Accountant",
      description: "Chartered Accountant",
      image: "/images/groom.jpg",
    },
    bride: {
      name: "Anupama",
      teluguName: "అనుపమ",
      role: "Meet the Bride",
      parents: "Smt. Siva Parvathi & Sri Anjaneyulu",
      education: "M.Sc (Com)",
      description: "M.Sc (Com)",
      image: "/images/bride.jpg",
    },
  },
  shlokas: {
    sanskritGanesha: "॥ श्री गणेशाय नमः ॥",
    teluguGanesha: "॥ శ్రీ గణేశాయ నమః ॥",
    blessingTelugu: "కల్యాణ వైభోగమే",
    blessingEnglish:
      "With the loving blessings of our elders and the divine grace of Sri Venkateswara Swamy, we invite you to share our joy as we begin our sacred journey of togetherness.",
  },
  weddingDateTime: {
    iso: "2026-12-12T20:26:00+05:30",
    dateFormatted: "Saturday, December 12, 2026",
    dayFormatted: "Saturday",
    muhurthamTime: "8:26 PM",
    muhurthamTelugu: "శుభ ముహూర్తం : రాత్రి 8:26 నిమిషములకు",
    teluguTithi: "మార్గశిర శుద్ధ తదియ, శనివారం",
    timezone: "Asia/Kolkata",
  },
  events: [
    {
      id: "event-pellikoduku-pellikuturu",
      title: "Pellikoduku & Pellikuthuru",
      teluguTitle: "పెళ్లికొడుకు & పెళ్లికూతురు",
      date: "Thursday, December 10, 2026",
      time: "6:00 AM",
      venue: "At our residences",
      address: "Residences of Ajay & Anupama",
      description:
        "The sacred Nalugu, turmeric and mangala snaanam ceremony where the groom and bride are lovingly anointed with holy oils and blessed by elders.",
      dressCode: "Traditional Yellow / Pattu Silks",
      googleMapsUrl: "https://maps.google.com/?q=Eluru+Andhra+Pradesh",
      icon: "kalash",
    },
    {
      id: "event-haldi",
      title: "Haldi Ceremony",
      teluguTitle: "పసుపు వేడుక (హల్దీ)",
      date: "Thursday, December 10, 2026",
      time: "6:00 PM",
      venue: "At our residences",
      address: "Residences of Ajay & Anupama",
      description:
        "A radiant and joyful celebration of auspicious turmeric, love, folk songs, and blessings with family and close friends.",
      dressCode: "Festive Yellow / Ethnic Attire",
      googleMapsUrl: "https://maps.google.com/?q=Eluru+Andhra+Pradesh",
      icon: "mehendi",
    },
    {
      id: "event-muhurtham",
      title: "Pradhana Vivaham & Sumuhurtham",
      teluguTitle: "ప్రధాన వివాహం (మాంగల్య ధారణం)",
      date: "Saturday, December 12, 2026",
      time: "8:26 PM (Sumuhurtham)",
      venue: "GK Convention Hall",
      address:
        "Nuzvid Eluru Road, Dondapudi, Duggirala, Eluru, Andhra Pradesh - 534003",
      description:
        "The sacred Vedic Hindu wedding ceremony: Kanyadaanam, Jeelakarra Bellam, Mangalya Dharana, and Saptapadi as two souls unite into one eternal bond.",
      dressCode: "Traditional Kanchipuram Pattu Sarees & Pattu Dhoti Kurta",
      isMainEvent: true,
      googleMapsUrl:
        "https://maps.google.com/?q=GK+Convention+Hall+Nuzvid+Eluru+Road+Dondapudi+Duggirala+Eluru+Andhra+Pradesh+534003",
      icon: "mandapam",
    },
  ],
  venue: {
    name: "GK Convention Hall",
    teluguName: "జి.కె. కన్వెన్షన్ హాల్",
    address: "Nuzvid Eluru Road, Dondapudi, Duggirala",
    city: "Eluru",
    state: "Andhra Pradesh",
    pincode: "534003",
    landmarks: "Opposite Hosana Mandir, Nuzvid - Eluru Road",
    googleMapsUrl:
      "https://maps.google.com/?q=GK+Convention+Hall+Nuzvid+Eluru+Road+Dondapudi+Duggirala+Eluru+Andhra+Pradesh+534003",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5!2d81.08!3d16.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGK+Convention+Hall+Eluru!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    parkingNotes:
      "Ample dedicated parking space available for all wedding guests at the convention hall premises.",
    showMapEmbed: true,
  },
  rsvp: {
    enabled: true,
    deadline: "December 08, 2026",
    maxGuests: 6,
    contactPhone: "+91 98765 43210",
    contactEmail: "celebrate@ajay-anupama.com",
  },
  audio: {
    enabled: true,
    title: "Mangala Vaadhyam",
    subtitle: "Nadaswaram & Thavil Traditional Wedding Harmony",
    src: "/audio/seetha-kalyana.mp3",
  },
};
