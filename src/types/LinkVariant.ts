// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const LinkVariant = {
  TEXT: 'text',
  STANDALONE: 'standalone',
} as const;

// Create a string literal union type like 'value1' | 'value2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type LinkVariantType = typeof LinkVariant[keyof typeof LinkVariant];
