import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import { ScoutVariantType } from '../../../types/ScoutVariant';

@Component({
  tag: 'backascout-tab-filter-option',
  styleUrl: 'backascout-tab-filter-option.scss',
  shadow: true,
})
export class BackascoutTabFilterOption {
  @Prop({ reflect: true }) value!: string;
  @Prop({ reflect: true }) selected?: boolean = false;
  @Prop({ reflect: true }) variant?: ScoutVariantType;

  @Event() backascoutSelect: EventEmitter<string>;

  selectHandler(value: string): void {
    this.backascoutSelect.emit(value);
  }

  render() {
    return (
      <Host>
        <button
          class={{
            'backascout-tab-filter-option': true,
            'backascout-tab-filter-option--selected': this.selected,
            [`backascout-tab-filter-option--${this.variant}`]: !!this.variant,
          }}
          onClick={() => this.selectHandler(this.value)}
        >
          <backascout-p variant="overline-200">
            <slot />
          </backascout-p>
        </button>
      </Host>
    );
  }
}
