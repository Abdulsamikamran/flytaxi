import { figmaIcons } from "@/assets/figma-icons";

export const APP_NAME = "FLYTAXI";

export const APP_DESCRIPTION =
  "Premium airport transfers and taxi rides across Israel. Reliable, punctual, professional.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Book a Ride", href: "/#booking" },
  { label: "Service Areas", href: "/#popular-routes" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FAQ_TABS = [
  { id: "all", label: "All" },
  { id: "booking", label: "Booking" },
  { id: "payment", label: "Payment" },
  { id: "airport", label: "Airport" },
  { id: "cancellation", label: "Cancellation" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export const FAQ_ITEMS = [
  {
    id: "booking-1",
    category: "booking" as const,
    question: "How do I book a transfer?",
    answer:
      "Enter your pickup and drop-off details in the booking widget on our homepage, choose your vehicle type, and click Calculate Price. Once you see your fixed fare, complete your details and confirm — no account required.",
  },
  {
    id: "booking-2",
    category: "booking" as const,
    question: "Do I need to create an account?",
    answer:
      "No. You can calculate your fare and complete a booking without creating an account. We'll send confirmation details to your email or phone.",
  },
  {
    id: "payment-1",
    category: "payment" as const,
    question: "Is the quoted price fixed?",
    answer:
      "Yes. All airport transfer fares shown on FlyTaxi are fixed. The price you see before booking is the price you pay — no surge pricing and no hidden fees.",
  },
  {
    id: "payment-2",
    category: "payment" as const,
    question: "What payment methods are accepted?",
    answer:
      "We accept major credit and debit cards. Some routes also support cash payment to the driver — payment options are shown at checkout.",
  },
  {
    id: "cancellation-1",
    category: "cancellation" as const,
    question: "Can I cancel my booking?",
    answer:
      "Free cancellation up to 3 hours before scheduled pickup. Cancellations within 3 hours may incur a fee depending on vehicle assignment status. Use Manage Booking to cancel or modify.",
  },
  {
    id: "airport-1",
    category: "airport" as const,
    question: "How will I find my driver at the airport after my flight lands?",
    answer:
      "Your driver meets you in the Terminal 3 arrivals hall after baggage claim, holding a name sign with your name. You'll receive driver contact details before pickup.",
  },
  {
    id: "booking-3",
    category: "booking" as const,
    question: "Can I request a specific vehicle type?",
    answer:
      "Yes. Choose from Standard Sedan, Premium Sedan, or Van / Minibus when booking. Vehicle options are shown in the booking widget with capacity details.",
  },
  {
    id: "airport-2",
    category: "airport" as const,
    question:
      "What if my flight is delayed and I need help coordinating pickup?",
    answer:
      "We monitor your flight number and adjust pickup time automatically. One hour of waiting time from landing is included at no extra charge. Contact support if you need additional help.",
  },
  {
    id: "payment-3",
    category: "payment" as const,
    question: "Do you charge extra for luggage?",
    answer:
      "Standard luggage is included. Use the luggage counters in the booking widget to add extra bags — any additional charges are shown before you confirm.",
  },
  {
    id: "booking-4",
    category: "booking" as const,
    question: "Is the service available 24/7?",
    answer:
      "We operate 24/6 with transfers available around the clock. Book online anytime and we'll confirm your driver details before pickup.",
  },
  {
    id: "booking-5",
    category: "booking" as const,
    question: "Can I add additional stops?",
    answer:
      "Additional stops may be available depending on your route. Contact our support team before booking or mention it in your message when requesting a custom quote.",
  },
  {
    id: "booking-6",
    category: "booking" as const,
    question: "How far in advance can I book?",
    answer:
      "You can book transfers weeks in advance. We recommend booking at least 24 hours ahead for airport transfers, though same-day availability is often available.",
  },
] as const;

export const CONTACT_INFO = {
  phone: "+972 3 000 0000",
  phoneNote: "24/6 support",
  email: "info@flytaxi.co.il",
  emailNote: "We reply within hours",
  serviceArea: "All of Israel",
  serviceAreaNote: "To & From Ben Gurion Airport",
} as const;

export const HERO_FEATURES = [
  "Fixed fares, no surprises",
  "No login required",
  "Instant price",
] as const;

export const STATS = [
  { value: "24/6", label: "Always available" },
  { value: "50K+", label: "Rides completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "15min", label: "Avg. pickup time" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Enter Your Trip",
    description:
      "Choose To or From Ben Gurion Airport and provide your pickup address, date, and time.",
    icon: "plane" as const,
  },
  {
    step: "02",
    title: "See Your Fare Instantly",
    description:
      "Get your fixed fare immediately — no registration, no hidden fees, no surprises.",
    icon: "fare" as const,
  },
  {
    step: "03",
    title: "Confirm Your Booking",
    description:
      "Complete your details, choose your payment method, and receive instant confirmation.",
    icon: "check" as const,
  },
] as const;

export const SERVICES = [
  {
    title: "To Ben Gurion Airport",
    description:
      "On-time pickup from your door. Fixed fare, professional driver, stress-free departure.",
    features: [
      "Door-to-terminal service",
      "Fixed confirmed price",
      "Flight details optional",
      "Track from your phone",
    ],
    cta: "Book To Airport",
  },
  {
    title: "From Ben Gurion Airport",
    description:
      "Driver waiting for you at arrivals. We monitor your flight and adjust for delays.",
    features: [
      "Meet & greet at arrivals",
      "Flight number collection",
      "Name sign service",
      "Help with luggage",
    ],
    cta: "Book From Airport",
  },
] as const;

export const POPULAR_ROUTES = [
  { from: "Tel Aviv", to: "Ben Gurion Airport" },
  { from: "Ben Gurion Airport", to: "Tel Aviv" },
  { from: "Jerusalem", to: "Ben Gurion Airport" },
  { from: "Ben Gurion Airport", to: "Jerusalem" },
  { from: "Netanya", to: "Ben Gurion Airport" },
  { from: "Ben Gurion Airport", to: "Netanya" },
  { from: "Beer Sheva", to: "Ben Gurion Airport" },
  { from: "Ben Gurion Airport", to: "Beer Sheva" },
  { from: "Haifa", to: "Ben Gurion Airport" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Fixed Fares",
    description: "No surge pricing. The price you see is the price you pay.",
    icon: figmaIcons.lock,
  },
  {
    title: "Instant Price",
    description: "Calculate your fare before booking, no account needed.",
    icon: figmaIcons.flash,
  },
  {
    title: "Professional Drivers",
    description: "Licensed, vetted drivers with airport transfer experience.",
    icon: figmaIcons.pilot,
  },
  {
    title: "Easy Booking",
    description: "Book in minutes, manage your rides, track your driver.",
  },
] as const;

export const FOOTER_LINKS = {
  "Quick Links": ["Book a Ride", "Manage Booking", "Fare Calculator", "Service Areas"],
  Services: ["Airport Pickup", "Airport Drop-off", "City Taxi", "Route Pricing"],
  Support: ["FAQ", "Contact Us", "Terms of Service", "Privacy Policy"],
  Cities: ["Tel Aviv", "Jerusalem", "Haifa", "All Areas"],
} as const;

export const VEHICLE_TYPES = [
  { id: "standard", label: "Standard Sedan", icon: figmaIcons.carStandard },
  { id: "premium", label: "Premium Sedan", icon: figmaIcons.carPremium },
  { id: "van", label: "Van / Minibus", icon: figmaIcons.van },
] as const;

export const LUGGAGE_TYPES = [
  { id: "carryon", label: "Trolley / Carry-on suitcase" },
  { id: "large", label: "Large suitcase" },
] as const;

export const BOOKING_STEPS = [
  { id: 1, label: "Fare", path: "/book/fare" },
  { id: 2, label: "Details", path: "/book/details" },
  { id: 3, label: "Review", path: "/book/review" },
  { id: 4, label: "Contact", path: "/book/passenger" },
  { id: 5, label: "Verify", path: "/book/verify" },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "cash" as const,
    label: "Cash to Driver",
    description: "Pay in cash directly to your driver",
    section: "driver" as const,
    badge: "Direct to driver",
  },
  {
    id: "bit" as const,
    label: "Bit",
    description: "Pay via Bit app directly to driver",
    section: "driver" as const,
    badge: "Direct to driver",
  },
  {
    id: "paybox" as const,
    label: "PayBox",
    description: "Pay via PayBox directly to driver",
    section: "driver" as const,
    badge: "Direct to driver",
  },
  {
    id: "card" as const,
    label: "Credit Card",
    description: "Secure online payment to FLYTAXI",
    section: "online" as const,
    badge: "Online to FLYTAXI",
  },
] as const;

export const FARE_INCLUSIONS = [
  "Luggage assistance",
  "No waiting time charge",
  "VAT included",
  "Flight number helps coordinate pickup",
] as const;

export const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const LUGGAGE_COUNT_OPTIONS = [0, 1, 2, 3, 4] as const;
