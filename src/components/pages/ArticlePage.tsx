import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArticleById } from "../../data/acticles";

const ArticlePage = () => {
  const { id } = useParams();
  const article = getArticleById(id);

  if (!article) {
    return (
      <section className="min-h-screen bg-[#050505] px-5 py-32 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/55">
            Article not found
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
            This article does not exist.
          </h1>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 pb-24 pt-32 text-white sm:px-6 md:pb-32 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>

        <div className="mt-12 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">
            {article.eyebrow}
          </p>

          <h1 className="mt-6 text-[3.2rem] font-semibold leading-[0.92] tracking-[-0.06em] md:text-8xl">
            {article.title}
          </h1>

          <p className="mt-8 max-w-3xl text-base leading-7 text-white/55 md:text-xl md:leading-8">
            {article.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/35">
            <span>{article.publishedAt}</span>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {article.highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
            >
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">
                {item.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/55 md:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-10">
            <div className="space-y-12">
              {article.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                    {section.title}
                  </h2>

                  <div className="mt-6 space-y-5">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-2xl text-base leading-7 text-white/55"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              Key Areas
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {article.skills.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>

            {article.linkedinUrl && (
              <a
                href={article.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
              >
                Read full article on LinkedIn
                <ArrowUpRight size={16} />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;
