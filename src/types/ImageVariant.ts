export const ImageVariant = {
  DEFAULT: 'default',
  SCALABLE: 'scalable',
} as const;

export type ImageVariantType = typeof ImageVariant[keyof typeof ImageVariant];
