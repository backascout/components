import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { HeadingVariant, HeadingVariantType } from '../../types/HeadingVariant';
import { HTag, HTagType } from '../../types/HTag';

@Component({
  tag: 'backascout-heading',
  styleUrl: 'backascout-heading.scss',
  shadow: true,
})
export class BackascoutHeading {
  private static tags: string[] = Object.values(HTag);
  /** The tag to render. This is mandatory. */
  @Prop() tag: HTagType = HTag.H1;
  /** Determines the appearance of the text. */
  @Prop() variant: HeadingVariantType = HeadingVariant.TITLE100;

  @Watch('tag')
  validateTag(newValue: string) {
    this.validateHTag(newValue);
  }

  connectedCallback() {
    this.validateHTag(this.tag);
  }

  render() {
    const Tag = this.tag.toString();

    return (
      <Host class={`backascout-heading backascout-heading--${this.variant}`}>
        <Tag class={this.variant}>
          <slot />
        </Tag>
      </Host>
    );
  }

  private validateHTag(input: string) {
    /* By checking the provided value against our predefined
     * set of values, we are able to assert that the value is
     * valid at runtime. This is useful if consumer of design
     * system is not using typescript.
     */
    if (BackascoutHeading.tags.indexOf(input) < 0) {
      throw new Error(
        `Illegal value for 'tag': ${input}. Please use ${BackascoutHeading.tags.join(', ')}`,
      );
    }
  }
}
