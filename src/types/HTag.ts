// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const HTag = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

// Create a string literal union type like 'h1' | 'h2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type HTagType = typeof HTag[keyof typeof HTag];
