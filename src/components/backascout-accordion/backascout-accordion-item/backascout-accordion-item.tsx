import { Component, Host, h, Prop, State } from '@stencil/core';
import { v4 } from 'uuid';

import {
  AccordionItemVariant,
  AccordionItemVariantType,
} from '../../../types/AccordionItemVariant';

import minus from './assets/minus.svg';
import plus from './assets/plus.svg';

@Component({
  tag: 'backascout-accordion-item',
  styleUrl: 'backascout-accordion-item.scss',
  shadow: true,
})
export class BackascoutAccordionItem {
  @Prop() heading!: string;
  @Prop() variant: AccordionItemVariantType = AccordionItemVariant.DEFAULT;

  @State() isOpen: boolean = false;

  private uniqueId = v4();

  private toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return (
      <Host>
        <div class={`backascout-accordion-item backascout-accordion-item--${this.variant}`}>
          <button
            id={`backascout-accordion-item-header-${this.uniqueId}`}
            class={{
              'backascout-accordion-item__header': true,
              'backascout-accordion-item__header--open': this.isOpen,
              [`backascout-accordion-item__header--${this.variant}`]: !!this.variant,
            }}
            type="button"
            aria-expanded={this.isOpen}
            aria-controls={`backascout-accordion-item-content-${this.uniqueId}`}
            onClick={() => this.toggleAccordion()}
            tabIndex={0}
          >
            <backascout-heading tag="h3" variant="title-100">
              <div class="backascout-accordion-item__header-title">
                <span>{this.heading}</span>
                <object
                  data={this.isOpen ? minus : plus}
                  type="image/svg+xml"
                  class={{
                    'backascout-accordion-item__header-icon': true,
                    'backascout-accordion-item__header-icon--open': this.isOpen,
                  }}
                  tabIndex={-1}
                />
              </div>
            </backascout-heading>
          </button>

          <div
            id={`backascout-accordion-item-content-${this.uniqueId}`}
            class={{
              'backascout-accordion-item__content': true,
              'backascout-accordion-item__content--visible': this.isOpen,
            }}
            role="region"
            aria-hidden={!this.isOpen}
            aria-labelledby={`backascout-accordion-item-header-${this.uniqueId}`}
            tabIndex={-1}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
