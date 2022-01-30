import { Component, Host, h, Prop } from '@stencil/core';

export type ColumnWidthType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

@Component({
  tag: 'backascout-col',
  styleUrl: 'backascout-col.scss',
})
export class BackascoutColumn {
  /** Column size */
  @Prop() width: ColumnWidthType;
  /** Column size starting from MD breakpoint */
  @Prop() widthMd: ColumnWidthType;
  /** Column size starting from LG breakpoint */
  @Prop() widthLg: ColumnWidthType;
  /** Hide column from this breakpoint up */
  @Prop() hideUp: 'sm' | 'md' | 'lg';
  /** Hide breakpoint on this breakpoint scope and down */
  @Prop() hideDown: 'sm' | 'md';

  render() {
    return (
      <Host
        class={{
          'backascout-col': true,
          [`backascout-col-${this.width}`]: !!this.width,
          [`backascout-col-md-${this.widthMd}`]: !!this.widthMd,
          [`backascout-col-lg-${this.widthLg}`]: !!this.widthLg,
          [`backascout-col-hide-up-${this.hideUp}`]: !!this.hideUp,
          [`backascout-col-hide-down-${this.hideDown}`]: !!this.hideDown,
        }}
      >
        <slot />
      </Host>
    );
  }
}
