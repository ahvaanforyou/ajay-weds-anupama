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

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: "all" | "traditional" | "pre-wedding" | "candid";
  aspect: "portrait" | "landscape" | "square";
}

export interface WeddingConfig {
  couple: {
    bride: CouplePerson;
    groom: CouplePerson;
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
  gallery: GalleryPhoto[];
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
    bride: {
      name: "Anupama",
      teluguName: "అనుపమ",
      role: "Meet the Bride",
      parents: "Smt. Siva Parvathi & Sri Anjaneyulu",
      education: "M.Sc (Com)",
      description: "M.Sc (Com)",
      image: "/images/bride.jpg",
    },
    groom: {
      name: "Ajay Kumar",
      teluguName: "అజయ్ కుమార్",
      role: "Meet the Groom",
      parents: "Smt. Rani & Sri Narasimharao",
      education: "Chartered Accountant",
      description: "Chartered Accountant",
      image: "/images/groom.jpg",
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
      id: "event-pellikuthuru",
      title: "Pellikuthuru & Pellikoduku",
      teluguTitle: "పెళ్లికూతురు / పెళ్లికొడుకు",
      date: "Thursday, December 10, 2026",
      time: "9:00 AM onwards",
      venue: "Bride & Groom Residences",
      address: "Eluru, Andhra Pradesh",
      description:
        "The sacred Nalugu, turmeric and mangala snaanam ceremony where the bride and groom are lovingly anointed with holy oils and blessed by elders.",
      dressCode: "Traditional Yellow / Pattu Silks",
      googleMapsUrl: "https://maps.google.com/?q=Eluru+Andhra+Pradesh",
      icon: "kalash",
    },
    {
      id: "event-mehendi",
      title: "Mehendi & Sangeet Sandhya",
      teluguTitle: "మెహందీ & సంగీత్ వేడుక",
      date: "Friday, December 11, 2026",
      time: "6:30 PM onwards",
      venue: "GK Convention Lawns",
      address: "Nuzvid Eluru Road, Dondapudi, Duggirala, Eluru",
      description:
        "An enchanting evening of intricate henna artistry, joyous South Indian folk dances, musical celebrations, and delectable delicacies.",
      dressCode: "Vibrant Festive Pastels & Ethnic Wear",
      googleMapsUrl:
        "https://maps.google.com/?q=GK+Convention+Hall+Nuzvid+Eluru+Road+Dondapudi+Duggirala+Eluru+Andhra+Pradesh+534003",
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
    {
      id: "event-reception",
      title: "Wedding Reception",
      teluguTitle: "శుభ పరిణయ విందు (రిసెప్షన్)",
      date: "Sunday, December 13, 2026",
      time: "7:00 PM onwards",
      venue: "GK Convention Hall",
      address:
        "Nuzvid Eluru Road, Dondapudi, Duggirala, Eluru, Andhra Pradesh - 534003",
      description:
        "An evening of celebration, banquet dinner, and warm congratulations with family and dear friends.",
      dressCode: "Royal Ethnic / Elegant Formal Attire",
      googleMapsUrl:
        "https://maps.google.com/?q=GK+Convention+Hall+Nuzvid+Eluru+Road+Dondapudi+Duggirala+Eluru+Andhra+Pradesh+534003",
      icon: "reception",
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
  gallery: [
    {
      id: "photo-1",
      src: "/images/gallery-1.jpg",
      caption: "Sacred Jeelakarra Bellam — Auspicious Muhurtham Moment",
      category: "traditional",
      aspect: "landscape",
    },
    {
      id: "photo-2",
      src: "/images/gallery-2.jpg",
      caption: "Bride in Traditional Kanchipuram Gold Silk Pattu",
      category: "traditional",
      aspect: "portrait",
    },
    {
      id: "photo-3",
      src: "/images/gallery-3.jpg",
      caption: "Pre-wedding Sunset by the Scenic Waters",
      category: "pre-wedding",
      aspect: "portrait",
    },
    {
      id: "photo-4",
      src: "/images/gallery-4.jpg",
      caption: "Laughter and Turmeric during Nalugu Ceremonies",
      category: "candid",
      aspect: "landscape",
    },
    {
      id: "photo-5",
      src: "/images/gallery-5.jpg",
      caption: "Groom in Regal Raw Silk Dhoti and Golden Angavastram",
      category: "traditional",
      aspect: "portrait",
    },
    {
      id: "photo-6",
      src: "/images/gallery-6.jpg",
      caption: "Together into a Lifetime of Adventures",
      category: "pre-wedding",
      aspect: "landscape",
    },
    {
      id: "photo-7",
      src: "/images/gallery-7.jpg",
      caption: "Mehendi Hues & Sangeet Celebrations",
      category: "candid",
      aspect: "square",
    },
    {
      id: "photo-8",
      src: "/images/gallery-8.jpg",
      caption: "Saptapadi — Seven Sacred Steps around the Agni",
      category: "traditional",
      aspect: "landscape",
    },
  ],
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
