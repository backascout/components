import { Component, Event, EventEmitter, Host, h, Listen } from '@stencil/core';

/**
 * @slot default - Expects <backascout-tab-filter-option> elements
 */
@Component({
  tag: 'backascout-tab-filter',
  styleUrl: 'backascout-tab-filter.scss',
  shadow: true,
})
export class BackascoutTabFilter {
  @Event() backascoutSelect: EventEmitter<string>;

  @Listen('backascoutSelect')
  backascoutSelectHandler(event: CustomEvent): void {
    this.backascoutSelect.emit(event.detail);
  }

  render() {
    return (
      <Host>
        <div class="backascout-tab-filter">
          <slot />
        </div>
      </Host>
    );
  }
}
