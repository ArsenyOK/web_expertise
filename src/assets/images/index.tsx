import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement>;

const Logo = ({ className = "h-10 w-10 text-white", ...props }: LogoProps) => {
  return (
    <svg
      viewBox="260 240 500 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M690 394 L669 385 L648 382 L548 383 L548 410 L654 410 L666 413 L676 418 L692 432 L698 441 L703 453 L705 464 L704 479 L702 487 L695 500 L684 512 L674 519 L662 524 L646 527 L453 527 L431 553 L505 554 L505 676 L530 643 L531 553 L655 553 L667 551 L679 547 L699 535 L714 520 L720 511 L726 499 L731 480 L732 465 L729 445 L720 424 L712 413 L701 402 Z M530 251 L303 594 L335 594 L504 337 L505 447 L530 419 Z"
      />
    </svg>
  );
};

export default Logo;
