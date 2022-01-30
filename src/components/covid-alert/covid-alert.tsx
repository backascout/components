import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'covid-alert',
  shadow: true,
})
export class CovidAlert {
  @Prop({ reflect: true }) body?: string;
  @Prop({ reflect: true }) heading: string;
  @Prop({ reflect: true }) linkHref?: string;
  @Prop({ reflect: true }) linkText?: string;

  render() {
    return (
      <Host>
        <backascout-alert
          variant="warning"
          body="Backa Scoutkår håller koll på rekommendationerna från myndigheterna och Scouterna centralt. Det är viktigt att vi alla hjälps åt att minska smittspridningen."
          heading="Samlad information med anledning av covid-19"
          link-href="https://backa.scout.se/covid/"
          link-text="Backa Scoutkårs information med anledning av covid-19"
        ></backascout-alert>
      </Host>
    );
  }
}
