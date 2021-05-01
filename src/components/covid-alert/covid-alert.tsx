import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'covid-alert',
  styleUrl: 'covid-alert.css',
  shadow: true,
})
export class CovidAlert {
  @Prop({ reflect: true }) body: string;
  @Prop({ reflect: true }) heading: string;
  @Prop({ reflect: true }) linkHref?: string;
  @Prop({ reflect: true }) linkText?: string;

  render() {
    return (
      <Host>
        <div class="covid-alert" role="alert">
          <div class="covid-alert__container">
            <h3 class="covid-alert__heading">{this.heading}</h3>

            <div class="covid-alert__body">
              <slot>{this.body}</slot>

              {this.linkHref && this.linkText && (
                <div class="covid-alert__link">
                  <a href={this.linkHref}>{this.linkText}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
