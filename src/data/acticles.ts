export type Article = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  linkedinUrl?: string;
  highlights: {
    title: string;
    description: string;
  }[];
  sections: {
    title: string;
    content: string[];
  }[];
  skills: string[];
};

export const articles: Article[] = [
  {
    id: "ai-changing-frontend-engineering",
    eyebrow: "AI & Engineering",
    title: "How AI is changing frontend engineering.",
    description:
      "AI is transforming frontend engineering, but strong engineers are not being replaced — their role is shifting toward architecture, product thinking, and technical judgment.",
    publishedAt: "2026",
    readTime: "4 min read",
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7459692628545048576/",
    highlights: [
      {
        title: "AI is a tool, not engineering judgment.",
        description:
          "AI can automate routine implementation, but architecture, product thinking, debugging, and final technical decisions still belong to engineers.",
      },
      {
        title: "Frontend is evolving into full-stack engineering.",
        description:
          "Companies increasingly expect engineers to understand both frontend and backend systems, not just isolated UI implementation.",
      },
      {
        title: "Strong engineers using AI will dominate.",
        description:
          "AI will not replace strong engineers. But engineers who deeply understand systems and workflows will become dramatically more effective with AI.",
      },
    ],
    sections: [
      {
        title: "AI changes the workflow, not the responsibility.",
        content: [
          "AI is growing rapidly, and the IT market is transforming alongside these new technologies. But frontend development will not simply fade into the background.",
          "AI has already become an essential tool for developers. It can generate, explain, refactor, and automate large parts of routine development work.",
          "But AI is still a tool. Product structure, system design, architecture, and final engineering decisions remain the responsibility of the engineer.",
        ],
      },
      {
        title: "The frontend role is expanding.",
        content: [
          "Pure frontend specialization is becoming less attractive to employers. Companies increasingly prefer engineers who understand both frontend and backend systems.",
          "This shift is uncomfortable, but not surprising. IT has always rewarded adaptation. Frontend engineers who expand into backend, architecture, and product ownership will stay more relevant.",
        ],
      },
      {
        title: "Context is the real advantage.",
        content: [
          "AI does not truly understand a product unless you explain the architecture, business logic, file structure, and technical constraints.",
          "Experienced engineers have a massive advantage because they already understand the workflows, the trade-offs, and the consequences of technical decisions.",
          "AI will not replace strong engineers. But strong engineers using AI will replace weaker and average roles faster than ever before.",
        ],
      },
    ],
    skills: [
      "Architecture",
      "Performance optimization",
      "Validation",
      "Debugging",
      "Product decisions",
      "Critical thinking",
      "Engineering judgment",
    ],
  },

  {
    id: "why-performance-is-a-business-feature",
    eyebrow: "Frontend Performance",
    title: "Why performance is a business feature.",
    description:
      "Performance is not just a technical metric. It directly affects conversion, trust, user retention, and the way people experience a product.",
    publishedAt: "2026",
    readTime: "3 min read",
    linkedinUrl: "https://www.linkedin.com/in/arsenii-pylypenko-071094176/",
    highlights: [
      {
        title: "Speed shapes trust.",
        description:
          "Users judge product quality before they read the copy or explore the features. A slow interface immediately feels less reliable.",
      },
      {
        title: "Performance affects conversion.",
        description:
          "Every unnecessary delay creates friction. Friction reduces sign-ups, purchases, engagement, and user confidence.",
      },
      {
        title: "Good architecture keeps products fast.",
        description:
          "Performance is not fixed by one optimization. It comes from architecture, rendering strategy, data loading, bundle control, and engineering discipline.",
      },
    ],
    sections: [
      {
        title: "Performance is not just a technical detail.",
        content: [
          "Many teams still treat frontend performance as something secondary — a technical improvement that can be handled later. That is a mistake.",
          "Performance is part of the product experience. Before users understand the value of a product, they already feel whether it is fast, smooth, and reliable.",
          "A slow product creates doubt. A fast product creates confidence.",
        ],
      },
      {
        title: "Slow interfaces create business problems.",
        content: [
          "When pages load slowly, interactions feel delayed, or dashboards become heavy, users do not think about JavaScript bundles, rendering strategy, or API waterfalls.",
          "They simply feel that the product is worse.",
          "That feeling affects conversion, retention, engagement, and trust. In business terms, performance is not a frontend concern — it is a revenue concern.",
        ],
      },
      {
        title: "Performance comes from engineering decisions.",
        content: [
          "Real performance is not achieved by randomly adding lazy loading or compressing a few assets. It starts much earlier.",
          "It depends on architecture, component boundaries, data fetching strategy, caching, rendering behavior, bundle size, and how carefully the product grows over time.",
          "This is why performance should be treated as a business feature. It protects the user experience, supports growth, and makes the product feel stronger than competitors.",
        ],
      },
    ],
    skills: [
      "LCP optimization",
      "Bundle size control",
      "Rendering strategy",
      "Caching",
      "Data loading",
      "Architecture",
      "User experience",
    ],
  },
];

export const getArticleById = (id: string | undefined) => {
  return articles.find((article) => article.id === id);
};
