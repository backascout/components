import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'backascout-button',
  styleUrl: 'backascout-button.scss',
  shadow: true,
})
export class BackascoutButton {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
