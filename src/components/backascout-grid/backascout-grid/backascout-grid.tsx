import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'backascout-grid',
  styleUrl: 'backascout-grid.scss',
  shadow: true,
})
export class BackascoutGrid {
  render() {
    return (
      <Host class="backascout-grid">
        <slot />
      </Host>
    );
  }
}
