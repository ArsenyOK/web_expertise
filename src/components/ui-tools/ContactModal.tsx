import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { X } from "lucide-react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!shouldRender || !modalRef.current || !panelRef.current) return;

    const modal = modalRef.current;
    const panel = panelRef.current;

    if (isOpen) {
      gsap.fromTo(
        modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power3.out" },
      );

      gsap.fromTo(
        panel,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
      );
    } else {
      gsap.to(panel, {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.3,
        ease: "power3.in",
      });

      gsap.to(modal, {
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          setShouldRender(false);
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-8 shadow-2xl md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-sm text-white/40 transition hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Project inquiry
          </p>

          <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Let’s discuss what you want to build.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
            Tell me about your product, idea, or technical challenge. I can help
            with SaaS apps, AI tools, MVPs, frontend architecture, performance,
            and production-ready interfaces.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:arsen.pilipenko2014@gmail.com"
                className="block rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-105"
              >
                Email me
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="https://www.linkedin.com/in/arsenii-pylypenko-071094176/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Connect on LinkedIn
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
