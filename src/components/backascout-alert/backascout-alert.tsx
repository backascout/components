import { Component, Host, h, Prop } from '@stencil/core';
import { AlertVariant, AlertVariantType } from '../../types/AlertVariant';

@Component({
  tag: 'backascout-alert',
  styleUrl: 'backascout-alert.scss',
  shadow: true,
})
export class BackascoutAlert {
  @Prop({ reflect: true }) body?: string;
  @Prop({ reflect: true }) heading!: string;
  @Prop({ reflect: true }) linkHref?: string;
  @Prop({ reflect: true }) linkText?: string;
  @Prop({ reflect: true }) variant: AlertVariantType = AlertVariant.DEFAULT;

  render() {
    return (
      <Host>
        <div class={`backascout-alert backascout-alert--${this.variant}`} role="alert">
          <div class="backascout-alert__container">
            <backascout-heading tag="h3" variant="title-100" class="backascout-alert__heading">
              {this.heading}
            </backascout-heading>

            <div class="backascout-alert__body">
              <slot>
                <backascout-p>{this.body}</backascout-p>
              </slot>

              {this.linkHref && this.linkText && (
                <div class="backascout-alert__link">
                  <backascout-p>
                    <backascout-link href={this.linkHref} color={this.variant}>
                      {this.linkText}
                    </backascout-link>
                  </backascout-p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
