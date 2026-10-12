export const site = {
  name: 'Urbania Hire Bengaluru',
  shortName: 'Urbania Hire',
  city: 'Bengaluru',
  url: 'https://forceurbaniahireinbengaluru.com',
  phone: '+918088058825',
  phoneDisplay: '80880 58825',
  phoneDisplayFull: '+91 80880 58825',
  whatsapp: '918088058825',
  /** Placeholders — awaiting client confirmation. See PLACEHOLDERS.md */
  legalName: '[Legal business name]',
  gstin: '[XXXXXXXXXXXXXXX]',
  address: '[Office address]',
  cancellationPolicy: '[Cancellation policy]',
  priceRange: '₹6,500–₹12,500',

  /*
   * Sections that depend on data we do not have yet are switched off rather
   * than shipped with [bracketed] placeholders on screen. Flip a flag back to
   * true the moment the real values land in the files named below.
   */
  /**
   * Profiles that belong to this business, emitted as schema.org sameAs.
   * This is how Google links the website, the Google Business Profile and the
   * social accounts into one entity. Fill these in — an empty list is a
   * missed ranking signal, but a wrong URL is worse than none.
   */
  sameAs: [] as string[],

  /** Reviews section + rating pill. Needs data/reviews.ts filled in. */
  showReviews: false,
  /** Legal name, GSTIN and office address in the footer and policies. */
  showLegalDetails: false,
} as const;

export const telHref = `tel:${site.phone}`;
