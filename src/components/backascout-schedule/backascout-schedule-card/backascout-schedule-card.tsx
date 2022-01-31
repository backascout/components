import { Component, Host, h, Prop } from '@stencil/core';
import { format as formatDate, isSameDay } from 'date-fns';
import { sv } from 'date-fns/locale';

import { ScoutVariantType } from '../../../types/ScoutVariant';

@Component({
  tag: 'backascout-schedule-card',
  styleUrl: 'backascout-schedule-card.scss',
  shadow: true,
})
export class BackascoutScheduleCard {
  @Prop({ reflect: true }) activityDescription?: string;
  @Prop({ reflect: true }) activityHeading!: string;
  @Prop({ reflect: true }) activityHref?: string;
  @Prop({ reflect: true }) activityHrefLabel?: string;
  @Prop({ reflect: true }) cancelled?: boolean = false;
  @Prop({ reflect: true }) endDate!: string;
  @Prop({ reflect: true }) heading!: string;
  @Prop({ reflect: true }) startDate!: string;
  @Prop({ reflect: true }) subheading?: string;
  @Prop({ reflect: true }) variant?: ScoutVariantType;

  render() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.startDate);

    return (
      <Host>
        <article
          class={{
            'backascout-schedule-card': true,
            [`backascout-schedule-card--${this.variant}`]: !!this.variant,
          }}
        >
          <header
            class={{
              'backascout-schedule-card__header': true,
              'backascout-schedule-card__header--cancelled': this.cancelled,
              [`backascout-schedule-card__header--${this.variant}`]: !!this.variant,
            }}
          >
            <div class="backascout-schedule-card__heading">
              <backascout-heading tag="h1" variant="title-200">
                {this.heading}
              </backascout-heading>

              <backascout-p variant="preamble-100">
                {formatDate(startDate, 'd MMM', { locale: sv })}
                {!isSameDay(startDate, endDate) &&
                  ` - ${formatDate(endDate, 'd MMM', { locale: sv })}`}
              </backascout-p>
            </div>
            {this.subheading && (
              <div class="backascout-schedule-card__subheading">
                <backascout-p variant="subsection">{this.subheading}</backascout-p>
              </div>
            )}
          </header>
          <main class="backascout-schedule-card__content">
            {this.cancelled && (
              <div class="backascout-schedule-card__cancelled-alert">
                <backascout-alert
                  variant="error"
                  heading="Inställd aktivitet"
                  body="Denna aktivitet har blivit inställd."
                ></backascout-alert>
              </div>
            )}

            <backascout-heading tag="h2" variant="title-100">
              {this.activityHeading}
            </backascout-heading>

            {this.activityDescription && <backascout-p>{this.activityDescription}</backascout-p>}

            {this.activityHref && this.activityHrefLabel && (
              <backascout-link href={this.activityHref} target="_blank" rel="noopener noreferrer">
                {this.activityHrefLabel}
              </backascout-link>
            )}

            <slot />
          </main>
        </article>
      </Host>
    );
  }
}
