// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const AlertVariant = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
  DEFAULT: 'default',
} as const;

// Create a string literal union type like 'h1' | 'h2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type AlertVariantType = typeof AlertVariant[keyof typeof AlertVariant];
