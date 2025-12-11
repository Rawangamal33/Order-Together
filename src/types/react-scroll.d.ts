declare module 'react-scroll' {
  import * as React from 'react';

  export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
    to?: string;
    spy?: boolean;
    smooth?: boolean | string;
    offset?: number;
    duration?: number;
    delay?: number;
    isDynamic?: boolean;
    containerId?: string;
    activeClass?: string;
    href?: string;
  }

  export const Link: React.ComponentType<LinkProps>;
  export const Element: React.ComponentType<any>;
  export const scroller: any;
  export const Events: any;
  export const animateScroll: any;

  const _default: {
    Link: React.ComponentType<LinkProps>;
    Element: React.ComponentType<any>;
    scroller: any;
    Events: any;
    animateScroll: any;
  };

  export default _default;
}
