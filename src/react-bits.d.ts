declare module "@/components/CardNav" {
  import type { MouseEventHandler } from "react";

  type CardNavLink = {
    label: string;
    href: string;
    ariaLabel?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

  type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links?: CardNavLink[];
  };

  export default function CardNav(props: {
    logo: string;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
  }): JSX.Element;
}

declare module "@/components/ElectricBorder" {
  import type { CSSProperties, ReactNode } from "react";

  export default function ElectricBorder(props: {
    children: ReactNode;
    color?: string;
    speed?: number;
    chaos?: number;
    borderRadius?: number;
    className?: string;
    style?: CSSProperties;
  }): JSX.Element;
}
