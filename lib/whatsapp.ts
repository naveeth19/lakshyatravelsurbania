import { site } from '@/data/site';
import type { Van } from '@/data/fleet';

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Landing pages tag the message so the business can see which ad produced it. */
function withRef(message: string, ref?: string): string {
  return ref ? `${message} [ref: ${ref}]` : message;
}

export const GENERIC_MESSAGE =
  'Hi, I need a Force Urbania. Date:  Pickup:  Drop:  No. of people: ';

export function genericMessage(ref?: string): string {
  return withRef(GENERIC_MESSAGE, ref);
}

export function vanMessage(van: Van, mode: 'local' | 'outstation', ref?: string): string {
  return withRef(
    `Hi, I would like to book the ${van.name} (${mode}). Date:  Pickup:  Drop:  No. of people: `,
    ref,
  );
}

export function tripMessage(trip: string, days: number, ref?: string): string {
  return withRef(
    `Hi, please share the Urbania fare for a ${trip} trip (${days} days). Date:  No. of people: `,
    ref,
  );
}
