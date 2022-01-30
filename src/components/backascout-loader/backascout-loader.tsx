import { Component, Host, h } from '@stencil/core';

import lily from './assets/lily-blue.svg';

@Component({
  tag: 'backascout-loader',
  styleUrl: 'backascout-loader.scss',
  shadow: true,
})
export class BackascoutLoader {
  render() {
    const backgroundImage = `url(${lily})`;

    return (
      <Host>
        <div
          class="backascout-loader"
          style={{ backgroundImage }}
        >
          {/* <img src={lily} alt="Scoutlilja" class="backascout-loader__lily" /> */}
        </div>
      </Host>
    );
  }
}
