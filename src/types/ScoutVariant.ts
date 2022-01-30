// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const ScoutVariant = {
  SCOUTERNA: 'scouterna',
  FAMILJESCOUTERNA: 'familjescouterna',
  SPARARNA: 'spararna',
  UPPTACKARNA: 'upptackarna',
  AVENTYRARNA: 'aventyrarna',
  UTMANARNA: 'utmanarna',
  ROVER: 'rover',
} as const;

// Create a string literal union type like 'h1' | 'h2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type ScoutVariantType = typeof ScoutVariant[keyof typeof ScoutVariant];
