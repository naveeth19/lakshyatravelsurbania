export interface Faq {
  q: string;
  a: string;
  /** Rendered as a trailing link after the answer. */
  link?: { href: string; label: string };
}

export const faqs: Faq[] = [
  {
    q: 'Does every Urbania come with a driver?',
    a: 'Yes. Every booking comes with an experienced, verified driver. There is no self-drive option.',
  },
  {
    q: 'How is an outstation trip billed?',
    a: 'Per kilometre, with a minimum of 300 km per day, plus a driver allowance of ₹700 per day. Tolls, parking, state permits and GST are extra.',
  },
  {
    q: "What's the difference between Luxury Maharaja and Premium?",
    a: 'Premium has comfortable pushback seats and strong AC at a lower fare. Luxury Maharaja adds leather recliners, ambient lighting and more room per passenger.',
  },
  {
    q: 'Can I book a one-way trip?',
    a: 'Yes. Pickup anywhere in Bengaluru and drop anywhere you need. Share the route on WhatsApp for a quote.',
  },
  {
    q: 'Which parts of Bengaluru do you pick up from?',
    a: 'All of them. Whitefield, Electronic City, Koramangala, Hebbal, Yelahanka, Jayanagar and everywhere between, including Kempegowda International Airport at any hour.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'It depends on how much notice we have and whether the vehicle was held exclusively for you. Call us and we will tell you plainly where you stand.',
    link: { href: '/cancellation-policy', label: 'Read the cancellation policy' },
  },
];

/** The shorter set used on fleet detail and landing pages. */
export const shortFaqs: Faq[] = [faqs[0], faqs[1], faqs[2], faqs[3]];

/** Distinct sets so hub and company pages do not repeat the home page. */

export const outstationFaqs: Faq[] = [
  {
    q: 'How is an outstation Urbania trip billed?',
    a: 'Per kilometre, with a minimum of 300 km charged per day, plus a driver allowance of ₹700 per day. A two-day trip therefore bills at least 600 km even if the actual driving is less. Tolls, parking, state permits and GST are extra and itemised.',
  },
  {
    q: 'Is the distance counted from my house or from your garage?',
    a: 'Garage to garage, unless we agree otherwise in writing before the trip. We tell you which it is when we quote, so there is no argument about the odometer afterwards.',
  },
  {
    q: 'Do you charge for the return journey if I only travel one way?',
    a: 'One-way drops are quoted as one-way. You are not charged for an empty return leg. Share the route and we will price it.',
  },
  {
    q: 'What happens if the trip runs longer than planned?',
    a: 'Extra days are billed at the same per-kilometre rate with the same 300 km per day minimum, plus one more driver allowance. Tell the driver as early as you can so he can plan his rest.',
  },
  {
    q: 'Which states do you run outstation trips to?',
    a: 'Karnataka, Tamil Nadu, Kerala, Andhra Pradesh and Goa. Trips leaving Karnataka need an interstate permit, which we quote upfront rather than adding at the end.',
  },
  {
    q: 'Can the driver do a night drive?',
    a: 'Yes, and overnight departures for Tirupati and airport runs are routine. On multi-day trips the driver needs a proper overnight rest, and we may decline an itinerary that cannot be driven safely.',
  },
];

export const companyFaqs: Faq[] = [
  {
    q: 'Do you own the vehicles or are you a broker?',
    a: 'Both, and we are straight about which. We run six cabins ourselves with every rate published on this site. Anything beyond those six we arrange from a vetted network, at a fare fixed before you book.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call or WhatsApp 80880 58825, or send the enquiry form on this site. We reply with a fixed, all-in fare rather than a range, usually within a few minutes.',
  },
  {
    q: 'Do you give a GST invoice?',
    a: 'Yes. Tolls, parking and permits are itemised on the invoice rather than folded into one round number, which matters if you are claiming the trip as a business expense.',
  },
  {
    q: 'How do I pay?',
    a: 'We confirm the fare before the trip and settle afterwards. Tell us if you need an advance invoice or a company billing name and we will arrange it when you book.',
  },
  {
    q: 'What areas of Bengaluru do you cover?',
    a: 'All of them, including Whitefield, Electronic City, Koramangala, Hebbal, Marathahalli, Indiranagar, HSR Layout and Yelahanka, plus Kempegowda International Airport at any hour.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'What is included in the Urbania rental price?',
    a: 'The vehicle, an experienced driver, fuel, and the driver\u2019s own food and stay on outstation trips. You can stop as often as you like along your route — the van stays with your group for the whole booking.',
  },
  {
    q: 'What is charged on top of the quoted fare?',
    a: 'Tolls and parking at actual, state permits for trips leaving Karnataka, GST at the applicable rate, entry fees at monuments or reserves, and any distance or time beyond the package you booked. All of it is itemised rather than folded into a round number.',
  },
  {
    q: 'What does the 8 hr / 80 km package actually mean?',
    a: 'It is a city package: the van and driver are yours for 8 hours and up to 80 kilometres. Go past either and the extra hours and extra kilometres are billed at the published rate for that vehicle, which is on this page.',
  },
  {
    q: 'Why is there a 300 km per day minimum on outstation trips?',
    a: 'Because the vehicle and driver are committed to you for the whole day whether you drive 150 km or 300. The minimum is what makes a short multi-day trip viable to run, and it is published so there is no surprise on the invoice.',
  },
  {
    q: 'Is the Luxury Maharaja worth the extra over Premium?',
    a: 'On a long highway day or anything where guests are dressed up, yes — leather recliners and more room per passenger make a real difference over six hours. For an airport run or a day of city sightseeing, Premium does the same job for less.',
  },
  {
    q: 'Do your prices change on weekends or during peak season?',
    a: 'The rates published on this page are what we quote. Availability tightens during the wedding season and on long weekends, so book earlier for those rather than expecting a different price.',
  },
];

export const contactFaqs: Faq[] = [
  {
    q: 'What are your hours?',
    a: 'We answer the phone 24 hours a day, every day of the year. That includes the 4 AM airport runs and the 1 AM Tirupati departures, which are a real part of what we do rather than an exception.',
  },
  {
    q: 'How quickly will you reply to an enquiry?',
    a: 'Usually within a few minutes during the day. If you send it overnight we come back first thing in the morning. If you need an answer immediately, call rather than filling in the form.',
  },
  {
    q: 'Can I book over WhatsApp instead of calling?',
    a: 'Yes, and most people do. Send your date, pickup, drop and group size and we will come back with a fixed fare. Having it in writing suits both sides.',
  },
  {
    q: 'Do you take last-minute bookings?',
    a: 'Constantly. Availability is the only limit, not notice. Call and we will tell you straight away whether we can cover it rather than keeping you waiting.',
  },
  {
    q: 'Can you help if I am not sure which vehicle I need?',
    a: 'That is most calls. Tell us the group size, the route and roughly what the day looks like, and we will suggest a cabin and quote it. There is no obligation.',
  },
];
