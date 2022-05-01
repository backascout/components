import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'backascout-blog-card',
  styleUrl: 'backascout-blog-card.scss',
  shadow: true,
})
export class BackascoutBlogCard {
  @Prop({ reflect: true }) badge?: string;
  @Prop({ reflect: true }) body?: string;
  @Prop({ reflect: true }) heading!: string;
  @Prop({ reflect: true }) href!: string;
  @Prop({ reflect: true }) imageUrl?: string;
  @Prop({ reflect: true }) imageAlt?: string;

  render() {
    return (
      <Host>
        <article class="backascout-blog-card">
          <backascout-link
            href={this.href}
            silent
            class="backascout-blog-card__link"
            disable-visited
          >
            <div class="backascout-blog-card__wrapper">
              {this.badge && (
                <div
                  class={{
                    'backascout-blog-card__badge': true,
                    'backascout-blog-card__badge--absolute': !!this.imageUrl,
                  }}
                >
                  <backascout-p variant="overline-200">{this.badge}</backascout-p>
                </div>
              )}

              {this.imageUrl && (
                <figure class="backascout-blog-card__image-wrapper">
                  <img
                    src={this.imageUrl}
                    alt={this.imageAlt}
                    draggable={false}
                    class="backascout-blog-card__image"
                  />
                </figure>
              )}

              <backascout-heading
                tag="h1"
                variant="title-300"
                class="backascout-blog-card__heading"
              >
                {this.heading}
              </backascout-heading>

              <div class="backascout-blog-card__body">
                <slot>{this.body && <backascout-p innerHTML={this.body}></backascout-p>}</slot>
              </div>
            </div>
          </backascout-link>
        </article>
      </Host>
    );
  }
}
