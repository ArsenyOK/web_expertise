import { Bolt, Code2, Database, Code, Shield, Users } from "lucide-react";

export const projectDetail = {
  backLabel: "Back to projects",

  hero: {
    type: "SaaS / AI Tool",
    title: "AI PR Review Assistant",
    description:
      "An AI-powered GitHub App that reviews pull requests, analyzes code changes, and helps teams improve code quality.",
    primaryAction: "Live Demo",
    secondaryAction: "View on GitHub",
  },

  preview: {
    eyebrow: "Pull Request #142",
    title: "feat: add user analytics tracking",
    stats: [
      { value: "92", label: "Score" },
      { value: "4", label: "Issues" },
      { value: "7", label: "Suggestions" },
      { value: "85%", label: "Coverage" },
    ],
    feedback: [
      {
        type: "success",
        text: "Good use of TypeScript types",
      },
      {
        type: "warning",
        text: "Consider extracting logic into a separate util",
      },
    ],
    codeTitle: "src/services/analytics.ts",
    code: `+ trackEvent("signup", {
+   source: campaign,
+   userId,
+ });

- console.log(data);`,
  },

  overview: {
    title: "Overview",
    paragraphs: [
      "AI PR Review Assistant is a GitHub App that uses LLM technology to automate pull request reviews. It analyzes code changes, detects potential bugs, highlights security risks, and provides actionable feedback directly inside the pull request.",
      "The goal is to reduce review time, improve code quality, and help engineering teams ship faster with more confidence.",
    ],
  },

  results: {
    title: "Key Results",
    items: [
      {
        value: "-40%",
        label: "Reduction in review time",
        icon: Bolt,
      },
      {
        value: "+35%",
        label: "Issues caught earlier",
        icon: Shield,
      },
      {
        value: "+25%",
        label: "Developer productivity",
        icon: Code2,
      },
      {
        value: "10K+",
        label: "Pull requests analyzed",
        icon: Users,
      },
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "AI-powered code analysis and suggestions",
      "Automatic detection of bugs and security risks",
      "Inline comments with actionable feedback",
      "GitHub App webhook integration",
    ],
  },

  techStack: {
    title: "Tech Stack",
    items: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "OpenAI API",
      "GitHub API",
      "Prisma",
      "Vercel",
    ],
  },

  architecture: {
    title: "Architecture",
    items: [
      {
        label: "GitHub",
        icon: Code,
      },
      {
        label: "Webhook Handler",
        icon: Bolt,
      },
      {
        label: "AI Analysis",
        icon: Code2,
      },
      {
        label: "Database",
        icon: Database,
      },
    ],
  },

  screenshots: {
    title: "Screenshots",
    items: [1, 2, 3],
  },

  nextProject: {
    label: "Next Project",
    title: "Focus AI",
    description:
      "A product that transforms goals and scattered ideas into clear, actionable execution plans.",
    action: "View Project",
  },
};
