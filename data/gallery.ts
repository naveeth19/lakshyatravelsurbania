export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position for the cover crop, when the default centre is wrong. */
  position?: string;
}

/**
 * Only images with no third-party branding visible are listed here. The cabin
 * photographs were retouched to remove operator logos from the headrests and
 * cushions; see ASSETS_TODO.md for the shots held back and why.
 */
export const gallery: GalleryImage[] = [
  {
    src: '/images/cabin-rows.webp',
    alt: 'Rows of tan leather recliners inside a Force Urbania Maharaja cabin',
    width: 585,
    height: 1040,
    position: 'center 34%',
  },
  {
    src: '/images/cabin-aisle.webp',
    alt: 'Aisle view down a Force Urbania cabin, with reclining seats either side',
    width: 720,
    height: 1280,
    position: 'center 45%',
  },
  {
    src: '/images/cabin-recliner.webp',
    alt: 'Close-up of a reclining leather seat and headrest in a Force Urbania',
    width: 585,
    height: 1040,
    position: 'center 40%',
  },
  {
    src: '/images/van-front-three-quarter.webp',
    alt: 'Front three-quarter view of a grey Force Urbania on a Bengaluru street',
    width: 1400,
    height: 1400,
    position: 'center 55%',
  },
];

export const exteriorShots: GalleryImage[] = [
  {
    src: '/images/van-side-profile.webp',
    alt: 'Side profile of a grey Force Urbania showing its full length and passenger windows',
    width: 1400,
    height: 1400,
  },
  {
    src: '/images/van-night.webp',
    alt: 'Force Urbania parked and ready for a late-night pickup in Bengaluru',
    width: 1400,
    height: 1400,
  },
];
