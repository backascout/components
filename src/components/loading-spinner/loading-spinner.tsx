import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'loading-spinner',
  styleUrl: 'loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner {
  render() {
    return (
      <Host>
        <div class="loading-spinner" />
      </Host>
    );
  }
}
