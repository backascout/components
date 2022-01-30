// Create a const where all members have a readonly value
// and literal type by using const assertion.
export const ParagraphVariant = {
  PARAGRAPH100: 'paragraph-100',
  PARAGRAPH200: 'paragraph-200',
  PREAMBLE100: 'preamble-100',
  PREAMBLE200: 'preamble-200',
  ADDITIONAL100: 'additional-100',
  SUBSECTION: 'subsection',
  OVERLINE100: 'overline-100',
  OVERLINE200: 'overline-200',
} as const;

// Create a string literal union type like 'value1' | 'value2' | ...
// from the const. This allows for cleaner documentation
// in a non-typescript environment.
export type ParagraphVariantType = typeof ParagraphVariant[keyof typeof ParagraphVariant];
