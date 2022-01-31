import { Component, h, Prop, Host } from '@stencil/core';
import { mediumScreen, largeScreen } from '../../utils/breakpoints';
import { GetAttributeType } from '../../types/GetAttributeType';
import { ImageVariantType } from '../../types/ImageVariant';

@Component({
  tag: 'backascout-image',
  styleUrl: 'backascout-image.scss',
  shadow: true,
})
export class BackascoutImage {
  /** Alternative text for image */
  @Prop() alt?: string;
  /** Specifies the path to the image that will be served to larger medias (above 1024 px)
      and as a fallback for legacy browsers */
  @Prop() src!: string;
  /** The the loading method for the image */
  @Prop() loading?: GetAttributeType<'img', 'loading'> = 'lazy';
  /** Specifies the path to the image served to small medias (below 600 px) */
  @Prop() smallSet?: string;
  /** Specifies the path to the image served to medium sized medias (between 600 and 1024 px) */
  @Prop() mediumSet?: string;
  /** Adds variant of the image*/
  @Prop() variant?: ImageVariantType;

  private mediumSize = mediumScreen - 1;
  private largeSize = largeScreen - 1;

  render() {
    return (
      <Host>
        <picture
          class={{
            'backascout-image': true,
            [`backascout-image--${this.variant}`]: !!this.variant,
          }}
        >
          {this.smallSet && (
            <source
              media={'(max-width:' + this.mediumSize + 'px)'}
              srcSet={this.smallSet}
            />
          )}
          {this.mediumSet && (
            <source
              media={'(max-width:' + this.largeSize + 'px)'}
              srcSet={this.mediumSet}
            />
          )}
          <img src={this.src} alt={this.alt} />
        </picture>
      </Host>
    );
  }
}
