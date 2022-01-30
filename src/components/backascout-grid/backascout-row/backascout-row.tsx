import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'backascout-row',
  styleUrl: 'backascout-row.scss',
})
export class BackascoutRow {
  render() {
    return (
      <Host class="backascout-row">
        <slot />
      </Host>
    );
  }
}
