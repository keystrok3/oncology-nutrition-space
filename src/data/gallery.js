export const GALLERY_ITEMS = [
  ...Array.from({ length: 6 }, (_, index) => ({
    image: `/images/outreach/nakuru-0${index + 1}.jpeg`,
    alt: `Nakuru County nutrition awareness day photo ${index + 1}`,
    title: "Nakuru County Nutrition Awareness Day",
    description: "In partnership with Nakuru Hospice.",
  })),
  ...Array.from({ length: 3 }, (_, index) => ({
    image: `/images/outreach/nairobi-0${index + 1}.jpeg`,
    alt: `Nairobi nutrition awareness meetup photo ${index + 1}`,
    title: "Nairobi Meetup & Nutrition Awareness Day",
    description: "Held at SOS International Hall.",
  })),
  ...Array.from({ length: 5 }, (_, index) => ({
    image: `/images/outreach/nci-0${index + 1}.jpeg`,
    alt: `National Cancer Survivors Walk 2026 photo ${index + 1}`,
    title: "National Cancer Survivors Walk 2026",
    description: "ONS in partnership with KENCO, NCI-Kenya, and KNH.",
  })),
  ...Array.from({ length: 3 }, (_, index) => ({
    image: `/images/outreach/vihiga-0${index + 1}.jpeg`,
    alt: `Vihiga community outreach photo ${index + 1}`,
    title: "Vihiga Community Outreach",
    description: "Vihiga community outreach and nutrition awareness day.",
  })),
];

export const FEATURED_GALLERY_ITEMS = [
  GALLERY_ITEMS[0],
  GALLERY_ITEMS[6],
  GALLERY_ITEMS[9],
  GALLERY_ITEMS[14],
];
