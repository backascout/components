// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const HeadingVariant = {
  TITLE100: 'title-100',
  TITLE200: 'title-200',
  TITLE300: 'title-300',
  TITLE400: 'title-400',
  TITLE500: 'title-500',
  TITLE600: 'title-600',
  TITLE700: 'title-700',
  TITLE800: 'title-800',
  TITLE900: 'title-900',
} as const;

// Create a string literal union type like 'h1' | 'h2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type HeadingVariantType = typeof HeadingVariant[keyof typeof HeadingVariant];
