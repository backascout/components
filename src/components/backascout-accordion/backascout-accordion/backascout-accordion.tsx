import { Component, Host, h, Prop } from '@stencil/core';
import { ScoutVariantType } from '../../../types/ScoutVariant';

@Component({
  tag: 'backascout-accordion',
  styleUrl: 'backascout-accordion.scss',
  shadow: true,
})
export class BackascoutAccordion {
  @Prop({ reflect: true }) heading?: string;
  @Prop({ reflect: true }) variant?: ScoutVariantType;

  render() {
    return (
      <Host>
        <div
          class={{
            'backascout-accordion': true,
            [`backascout-accordion--${this.variant}`]: !!this.variant,
          }}
        >
          <div
            class={{
              'backascout-accordion__header': true,
              [`backascout-accordion__header--${this.variant}`]: !!this.variant,
            }}
          >
            {this.heading && (
              <backascout-heading tag="h2" variant="title-300">
                {this.heading}
              </backascout-heading>
            )}

            <slot name="header-right"></slot>
          </div>
          <div
            class={{
              'backascout-accordion__items': true,
              [`backascout-accordion__items--${this.variant}`]: !!this.variant,
            }}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
