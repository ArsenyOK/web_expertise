import { type ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
};

const Magnetic = ({ children, strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const quickXRef = useRef<((value: number) => void) | null>(null);
  const quickYRef = useRef<((value: number) => void) | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    quickXRef.current = gsap.quickTo(element, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    quickYRef.current = gsap.quickTo(element, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!ref.current) return;

    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = rectRef.current ?? ref.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    quickXRef.current?.(x * strength);
    quickYRef.current?.(y * strength);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;

    rectRef.current = null;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.35)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
};

export default Magnetic;
