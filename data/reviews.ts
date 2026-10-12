export interface Review {
  /** PLACEHOLDER — replace with the real Google review text. */
  text: string;
  /** PLACEHOLDER — replace with the real reviewer name. */
  name: string;
  /** PLACEHOLDER — replace with the real trip type. */
  trip: string;
}

/**
 * Every field below is a placeholder. Do not invent review copy, names or
 * ratings — swap these in only when the client supplies the real Google
 * reviews. See PLACEHOLDERS.md.
 */
export const reviews: Review[] = [
  { text: '[Review 1 text]', name: '[Reviewer 1 name]', trip: '[Trip type]' },
  { text: '[Review 2 text]', name: '[Reviewer 2 name]', trip: '[Trip type]' },
  { text: '[Review 3 text]', name: '[Reviewer 3 name]', trip: '[Trip type]' },
];

export const ratingPlaceholder = '[4.9]';
export const reviewCountPlaceholder = '[120+]';
