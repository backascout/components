import { Component, Host, h, Prop, State } from '@stencil/core';
import { format as formatDate, isAfter, isBefore, isSameDay } from 'date-fns';
import { sv } from 'date-fns/locale';
import 'whatwg-fetch';

import { ScoutVariantType } from '../../../types/ScoutVariant';

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    (error as any).response = response;
    throw error;
  }
}

function parseJSON(response: Response) {
  return response.json();
}

interface Activity {
  activityDescription?: string;
  activityHeading: string;
  activityHref?: string;
  activityHrefLabel?: string;
  activitySubheading?: string;
  cancelled?: boolean;
  startDate: string;
  endDate: string;
}

enum FilterOption {
  All = 'all',
  Past = 'past',
  Upcoming = 'upcoming',
}

enum Status {
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

@Component({
  tag: 'backascout-schedule',
  styleUrl: 'backascout-schedule.scss',
  shadow: true,
})
export class BackascoutSchedule {
  @Prop() apiUrl?: string;
  @Prop({ reflect: true }) variant?: ScoutVariantType;

  @State() activities: Activity[] = [];
  @State() selectedFilterOption: string = FilterOption.Upcoming;
  @State() status: Status = Status.Loading;

  componentDidLoad() {
    setTimeout(() => {
      this.fetchSchedule();
    }, 500);
  }

  fetchSchedule() {
    this.status = Status.Loading;

    fetch(this.apiUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then((activities: Activity[]) => {
        this.activities = activities;
        this.status = Status.Loaded;
      })
      .catch(error => {
        this.status = Status.Error;
        console.error(error);
      });
  }

  private getFilteredActivities(): Activity[] {
    switch (this.selectedFilterOption) {
      case FilterOption.All:
        return this.getAllActivities();
      case FilterOption.Past:
        return this.getPastActivities();
      case FilterOption.Upcoming:
        return this.getUpcomingActivities();
    }
  }

  private getAllActivities(): Activity[] {
    return this.activities;
  }

  private getPastActivities(): Activity[] {
    return this.activities.filter(activity => {
      const date = new Date();
      const endDate = new Date(activity.endDate);
      const startDate = new Date(activity.startDate);

      return isSameDay(endDate, startDate) ? isAfter(date, endDate) : isAfter(date, startDate);
    });
  }

  private getUpcomingActivities(): Activity[] {
    return this.activities.filter(activity => {
      const date = new Date();
      const endDate = new Date(activity.endDate);
      const startDate = new Date(activity.startDate);

      return isSameDay(endDate, startDate) ? isBefore(date, endDate) : isBefore(date, startDate);
    });
  }

  get featuredActivities(): Activity[] {
    if (this.selectedFilterOption !== FilterOption.Upcoming) {
      return [];
    }

    const [firstActivity, secondActivity] = this.getFilteredActivities();

    return [firstActivity, secondActivity];
  }

  get featuredIsNow(): boolean {
    if (this.featuredActivities.length === 0) {
      return false;
    }

    const activity = this.featuredActivities[0];

    const date = new Date();

    return (
      isAfter(date, new Date(activity.startDate)) && isBefore(date, new Date(activity.endDate))
    );
  }

  get scheduledActivities(): Activity[] {
    const activities = this.getFilteredActivities();

    if (this.selectedFilterOption !== FilterOption.Upcoming) {
      return activities;
    }

    return activities.slice(2);
  }

  render() {
    return (
      <Host>
        <div class="backascout-schedule">
          {this.status === Status.Loading && (
            <div class="backascout-schedule__loader">
              <backascout-loader></backascout-loader>
            </div>
          )}
          {this.status === Status.Error && (
            <div class="backascout-schedule__error">
              <backascout-alert heading="Ett fel har uppstått" variant="error">
                Något gick fel när programmet laddades, vänligen försök igen senare.
              </backascout-alert>
            </div>
          )}
          {this.status === Status.Loaded && (
            <backascout-grid>
              {this.featuredActivities.length > 0 && (
                <backascout-row class="backascout-schedule__featured">
                  <backascout-col width="12" width-md="6">
                    {this.featuredActivities[0] && (
                      <backascout-schedule-card
                        activityDescription={this.featuredActivities[0]?.activityDescription}
                        activityHeading={this.featuredActivities[0].activityHeading}
                        activityHref={this.featuredActivities[0]?.activityHref}
                        activityHrefLabel={this.featuredActivities[0]?.activityHrefLabel}
                        cancelled={this.featuredActivities[0]?.cancelled}
                        endDate={this.featuredActivities[0].endDate}
                        heading={this.featuredIsNow ? 'Nu': 'Nästa aktivitet'}
                        startDate={this.featuredActivities[0].startDate}
                        subheading={this.featuredActivities[0]?.activitySubheading}
                        variant={this.variant}
                      ></backascout-schedule-card>
                    )}
                  </backascout-col>
                  <backascout-col width="12" width-md="6">
                    {this.featuredActivities[1] && (
                      <backascout-schedule-card
                        activityDescription={this.featuredActivities[1]?.activityDescription}
                        activityHeading={this.featuredActivities[1].activityHeading}
                        activityHref={this.featuredActivities[1]?.activityHref}
                        activityHrefLabel={this.featuredActivities[1]?.activityHrefLabel}
                        cancelled={this.featuredActivities[1]?.cancelled}
                        endDate={this.featuredActivities[1].endDate}
                        heading={this.featuredIsNow ? 'Nästa aktivitet' : 'Aktiviteten därefter'}
                        startDate={this.featuredActivities[1].startDate}
                        subheading={this.featuredActivities[1]?.activitySubheading}
                        variant={this.variant}
                      ></backascout-schedule-card>
                    )}
                  </backascout-col>
                </backascout-row>
              )}
              <backascout-row class="backascout-schedule__accordion">
                <backascout-col width="12">
                  <backascout-accordion heading="Aktiviteter" variant={this.variant}>
                    <backascout-tab-filter
                      slot="header-right"
                      onBackascoutSelect={event => (this.selectedFilterOption = event.detail)}
                    >
                      <backascout-tab-filter-option
                        value={FilterOption.All}
                        variant={this.variant}
                        selected={this.selectedFilterOption === FilterOption.All}
                      >
                        Alla
                      </backascout-tab-filter-option>
                      <backascout-tab-filter-option
                        value={FilterOption.Past}
                        variant={this.variant}
                        selected={this.selectedFilterOption === FilterOption.Past}
                      >
                        Tidigare
                      </backascout-tab-filter-option>
                      <backascout-tab-filter-option
                        value={FilterOption.Upcoming}
                        variant={this.variant}
                        selected={this.selectedFilterOption === FilterOption.Upcoming}
                      >
                        Kommande
                      </backascout-tab-filter-option>
                    </backascout-tab-filter>

                    {this.scheduledActivities.length === 0 && (
                      <div class="backascout-schedule__activities-alert">
                        <backascout-alert
                          heading="Inga aktiviteter"
                          body={
                            this.activities.length === 0
                              ? 'Det finns inga aktiviteter att visa.'
                              : 'Det finns inga fler aktiviteter att visa.'
                          }
                          variant="info"
                        ></backascout-alert>
                      </div>
                    )}

                    {this.scheduledActivities.length > 0 &&
                      this.scheduledActivities.map(activity => {
                        const endDate = new Date(activity.endDate);
                        const startDate = new Date(activity.startDate);
                        const variant = (() => {
                          if (activity.cancelled) return 'error';
                          if (!isSameDay(startDate, endDate)) return 'info';
                          return 'default';
                        })();

                        return (
                          <backascout-accordion-item
                            heading={activity.activityHeading}
                            variant={variant}
                          >
                            {activity.cancelled && (
                              <div class="backascout-schedule-card__cancelled-alert">
                                <backascout-alert
                                  variant="error"
                                  heading="Inställd aktivitet"
                                  body="Denna aktivitet har blivit inställd."
                                ></backascout-alert>
                              </div>
                            )}

                            {activity.activityDescription && (
                              <backascout-p>{activity.activityDescription}</backascout-p>
                            )}

                            {activity.activityHref && activity.activityHrefLabel && (
                              <backascout-link
                                href={activity.activityHref}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {activity.activityHrefLabel}
                              </backascout-link>
                            )}

                            <backascout-p>
                              <strong>Datum:</strong>{' '}
                              {formatDate(startDate, 'd MMM', { locale: sv })}
                              {!isSameDay(startDate, endDate) &&
                                ` - ${formatDate(endDate, 'd MMM', { locale: sv })}`}
                            </backascout-p>
                          </backascout-accordion-item>
                        );
                      })}
                  </backascout-accordion>
                </backascout-col>
              </backascout-row>
            </backascout-grid>
          )}
        </div>
      </Host>
    );
  }
}
