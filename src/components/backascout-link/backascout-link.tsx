import { Component, Host, Prop, h } from '@stencil/core';
import { GetAttributeType } from '../../types/GetAttributeType';
import { LinkColor, LinkColorType } from '../../types/LinkColor';
import { LinkVariant, LinkVariantType } from '../../types/LinkVariant';

@Component({
  tag: 'backascout-link',
  styleUrl: 'backascout-link.scss',
  shadow: true,
})
export class BackascoutLink {
  @Prop({ reflect: true }) color?: LinkColorType;
  @Prop({ reflect: true }) disableVisited: boolean = false;
  /** Native href attribute of anchor element  */
  @Prop({ reflect: true }) href: GetAttributeType<'a', 'href'>;
  /** A silent link is intended to wrap an element
   * to make it a link but not add any styling
   * except for the pointer cursor and focus style. */
  @Prop({ reflect: true }) silent = false;
  /**
   * Determines if link is displayed on its own line
   * (standalone) or within the current text content
   * (text).
   */
  @Prop({ reflect: true }) variant: LinkVariantType = LinkVariant.TEXT;
  /** Native rel attribute of anchor element  */
  @Prop({ reflect: true }) rel?: GetAttributeType<'a', 'rel'>;
  /** Native target attribute of anchor element  */
  @Prop({ reflect: true }) target?: GetAttributeType<'a', 'target'>;
  /** Native download attribute of anchor element  */
  @Prop({ reflect: true }) download?: GetAttributeType<'a', 'download'>;
  /** Native referrerPolicy attribute of anchor element  */
  @Prop({ reflect: true }) referrerPolicy?: ReferrerPolicy;

  private isStandalone() {
    return this.variant === 'standalone';
  }

  render() {
    return (
      <Host class={{ standalone: this.isStandalone() }}>
        <a
          href={this.href}
          class={{
            'backascout-link': true,
            'backascout-link--silent': this.silent,
            'backascout-link--standalone': this.isStandalone(),
            'backascout-link--disable-visited': this.disableVisited,
            [`backascout-link--${this.color}`]: !!this.color,
          }}
          target={this.target}
          download={this.download}
          referrer-policy={this.referrerPolicy}
        >
          <slot />
        </a>
      </Host>
    );
  }
}
