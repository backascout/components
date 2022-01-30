// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const AccordionItemVariant = {
  DEFAULT: 'default',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

// Create a string literal union type like 'h1' | 'h2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type AccordionItemVariantType = typeof AccordionItemVariant[keyof typeof AccordionItemVariant];
