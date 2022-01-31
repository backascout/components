import { JSXBase } from '@stencil/core/internal';

type Elements = JSXBase.IntrinsicElements;
type GetElementAttributes<T extends keyof Elements> = Elements[T];

/**
 * Get HTML element attribute type.
 * E.g. GetAttributeType<'a', 'href'> to get "string".
 */
export type GetAttributeType<
  K extends keyof Elements,
  Attribute extends keyof GetElementAttributes<K>,
> = GetElementAttributes<K>[Attribute];
