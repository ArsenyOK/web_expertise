import { type ReactNode, useEffect, useRef } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
};

const Magnetic = ({ children, strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return () => {
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scheduleTransform = () => {
    if (!ref.current || frameRef.current !== undefined) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = undefined;
      ref.current!.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;
    });
  };

  const handleMouseEnter = () => {
    if (!ref.current) return;

    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = rectRef.current ?? ref.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    targetRef.current = {
      x: x * strength,
      y: y * strength,
    };

    scheduleTransform();
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;

    rectRef.current = null;
    targetRef.current = { x: 0, y: 0 };
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
};

export default Magnetic;
