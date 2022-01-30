import { Component, h, Host, Prop } from '@stencil/core';
import {
  ParagraphVariant,
  ParagraphVariantType,
} from '../../types/ParagraphVariant';

@Component({
  tag: 'backascout-p',
  styleUrl: 'backascout-p.scss',
  shadow: true,
})
export class BackascoutP {
  /**
   * Determines the appearance of the text.
   */
  @Prop() variant: ParagraphVariantType = ParagraphVariant.PARAGRAPH100;

  render() {
    return (
      <Host
        class={`backascout-p--${this.variant}`}
      >
        <p
          class={{
            'backascout-p': true,
            [`backascout-p--${this.variant}`]: !!this.variant,
          }}
        >
          <slot />
        </p>
      </Host>
    );
  }
}
