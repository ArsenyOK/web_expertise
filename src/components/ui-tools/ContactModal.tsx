import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { ArrowLeft, Check, X } from "lucide-react";
import { useMobile } from "../../hooks/useMobile";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ModalMode = "intro" | "form" | "success";

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const isMobile = useMobile();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mode, setMode] = useState<ModalMode>("intro");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
        {
          y: isMobile ? 40 : 60,
          opacity: 0,
          scale: isMobile ? 1 : 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(panel, {
        y: isMobile ? 28 : 40,
        opacity: 0,
        scale: isMobile ? 1 : 0.96,
        duration: 0.3,
        ease: "power3.in",
      });

      gsap.to(modal, {
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          setShouldRender(false);
          setMode("intro");
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen, shouldRender, isMobile]);

  useLayoutEffect(() => {
    if (!contentRef.current || !shouldRender) return;

    gsap.fromTo(
      contentRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
    );
  }, [mode, shouldRender]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitError(
        "Missing Web3Forms access key. Check VITE_WEB3FORMS_ACCESS_KEY in Vercel Environment Variables.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", accessKey);
    formData.append("from_name", "Arseniy Portfolio");
    formData.append("subject", "New project inquiry from portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      let result: {
        success?: boolean;
        message?: string;
        errors?: unknown[];
      } | null = null;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          `Web3Forms returned a non-JSON response. HTTP status: ${response.status}`,
        );
      }

      if (!response.ok || !result?.success) {
        const apiMessage =
          result?.message ||
          (Array.isArray(result?.errors)
            ? JSON.stringify(result.errors)
            : null) ||
          "Unknown Web3Forms error.";

        throw new Error(`HTTP ${response.status}: ${apiMessage}`);
      }

      form.reset();
      setMode("success");

      window.setTimeout(() => {
        onClose();
      }, 1700);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown network error. Please check your internet connection.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!shouldRender) return null;

  const primaryButton = (
    <button
      type="button"
      onClick={() => setMode("form")}
      className="w-full rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition active:scale-[0.98] md:w-auto md:hover:scale-105"
    >
      Email me
    </button>
  );

  const linkedInButton = (
    <a
      href="https://www.linkedin.com/in/arsenii-pylypenko-071094176/"
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium text-white transition active:scale-[0.98] md:w-auto md:hover:bg-white/10"
    >
      Connect on LinkedIn
    </a>
  );

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/70 px-4 py-4 backdrop-blur-xl md:px-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative max-h-[96svh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-white/10 bg-[#080808] p-4 shadow-2xl md:max-h-[92svh] md:rounded-[2rem] md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl md:h-80 md:w-80" />

        <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between md:left-6 md:right-6 md:top-6">
          {mode === "form" ? (
            <button
              type="button"
              onClick={() => setMode("intro")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/45 transition hover:bg-white/[0.07] hover:text-white"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/45 transition hover:bg-white/[0.07] hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={contentRef} className="relative z-10 min-w-0 pt-12 md:pt-14">
          {mode === "intro" ? (
            <>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
                Project inquiry
              </p>

              <h2 className="mt-5 max-w-2xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-tight md:tracking-tight">
                Let’s discuss what you want to build.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/55 md:mt-6">
                Tell me about your product, idea, or technical challenge. I can
                help with SaaS apps, AI tools, MVPs, frontend architecture,
                performance, and production-ready interfaces.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10 md:gap-4">
                {isMobile ? (
                  primaryButton
                ) : (
                  <Magnetic>{primaryButton}</Magnetic>
                )}
                {isMobile ? (
                  linkedInButton
                ) : (
                  <Magnetic>{linkedInButton}</Magnetic>
                )}
              </div>
            </>
          ) : mode === "form" ? (
            <>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40 md:text-sm md:tracking-[0.3em]">
                Email inquiry
              </p>

              <h2 className="mt-4 max-w-2xl text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.04em] md:mt-6 md:text-5xl md:leading-tight">
                Tell me about your project.
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-3 md:mt-8 md:space-y-4"
              >
                <div className="grid min-w-0 gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-12 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 md:h-auto md:px-5 md:py-4"
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 md:px-5 md:py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25"
                  />
                </div>

                <input
                  name="company"
                  placeholder="Company / product name"
                  className="h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 md:h-auto md:px-5 md:py-4"
                />

                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What do you want to build?"
                  className="w-full min-w-0 resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 md:px-5 md:py-4 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-white/25"
                />

                {submitError && (
                  <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:py-4 md:hover:scale-[1.02]"
                >
                  {isSubmitting ? "Sending..." : "Send email"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                  <Check size={26} />
                </div>
              </div>

              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                Message sent
              </p>

              <h2 className="mt-5 max-w-xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
                Thanks. I’ll get back to you soon.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-white/55">
                Your project inquiry has been sent successfully. The window will
                close automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
