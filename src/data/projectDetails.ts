import {
  Bolt,
  Code2,
  Database,
  Code,
  Shield,
  Users,
  Brain,
  Smartphone,
  LayoutDashboard,
  Zap,
  Rocket,
  Layers3,
} from "lucide-react";

export const projectDetails = [
  {
    id: "ai-pr-review-assistant",

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
        "AI PR Review Assistant is a GitHub App that uses LLM technology to automate pull request reviews.",
        "It analyzes code changes, detects potential bugs, highlights security risks, and provides actionable feedback directly inside pull requests.",
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
  },

  {
    id: "focus-ai",

    backLabel: "Back to projects",

    hero: {
      type: "AI Productivity App",
      title: "Focus AI",
      description:
        "A product that transforms goals and scattered ideas into structured execution plans using AI-powered workflows.",
      primaryAction: "Open Product",
      secondaryAction: "Product Overview",
    },

    preview: {
      eyebrow: "Execution Plan",
      title: "Launch AI assistant MVP in 30 days",

      stats: [
        { value: "12", label: "Tasks" },
        { value: "4", label: "Stages" },
        { value: "93%", label: "Clarity" },
        { value: "AI", label: "Planning" },
      ],

      feedback: [
        {
          type: "success",
          text: "Execution roadmap generated successfully",
        },
        {
          type: "warning",
          text: "Consider reducing feature scope for MVP",
        },
      ],

      codeTitle: "generated-plan.json",

      code: `{
  "phase": "MVP",
  "timeline": "30 days",
  "priority": "high"
}`,
    },

    overview: {
      title: "Overview",

      paragraphs: [
        "Focus AI helps founders and developers convert vague goals into structured execution systems.",
        "The product combines AI planning, prioritization, and roadmap generation into a single productivity workflow.",
      ],
    },

    results: {
      title: "Key Results",

      items: [
        {
          value: "+48%",
          label: "Faster planning",
          icon: Brain,
        },
        {
          value: "-60%",
          label: "Decision fatigue",
          icon: Zap,
        },
        {
          value: "+32%",
          label: "Execution clarity",
          icon: Rocket,
        },
        {
          value: "AI",
          label: "Workflow automation",
          icon: Layers3,
        },
      ],
    },

    features: {
      title: "Key Features",

      items: [
        "AI-generated execution plans",
        "Task prioritization and breakdown",
        "Goal-to-action transformation",
        "Structured roadmap generation",
      ],
    },

    techStack: {
      title: "Tech Stack",

      items: [
        "React",
        "TypeScript",
        "Tailwind",
        "Node.js",
        "OpenAI API",
        "Express",
        "Vercel",
        "Render",
      ],
    },

    architecture: {
      title: "Architecture",

      items: [
        {
          label: "AI Planning Engine",
          icon: Brain,
        },
        {
          label: "Prompt Processing",
          icon: Bolt,
        },
        {
          label: "Workflow Generator",
          icon: Code2,
        },
        {
          label: "Persistence Layer",
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
      title: "Enterprise Security Dashboard",
      description:
        "Complex enterprise dashboards optimized for scalability, speed, and operational visibility.",
      action: "View Project",
    },
  },

  {
    id: "enterprise-security-dashboard",

    backLabel: "Back to projects",

    hero: {
      type: "Frontend Engineering",
      title: "Enterprise Security Dashboard",
      description:
        "Complex dashboards, data-heavy interfaces, performance optimization, and scalable frontend architecture.",
      primaryAction: "View Case Study",
      secondaryAction: "Architecture Notes",
    },

    preview: {
      eyebrow: "Security Analytics",
      title: "Threat detection overview",

      stats: [
        { value: "1.2M", label: "Events" },
        { value: "99.9%", label: "Uptime" },
        { value: "48%", label: "Faster rendering" },
        { value: "24", label: "Widgets" },
      ],

      feedback: [
        {
          type: "success",
          text: "Virtualized rendering improved performance",
        },
        {
          type: "warning",
          text: "Large data payload detected",
        },
      ],

      codeTitle: "dashboard-performance.ts",

      code: `optimizeGridRendering();
enableVirtualization();
reduceBundleSize();`,
    },

    overview: {
      title: "Overview",

      paragraphs: [
        "An enterprise-grade dashboard system focused on large-scale data visualization and security operations.",
        "The platform prioritizes scalability, rendering performance, maintainability, and operational clarity.",
      ],
    },

    results: {
      title: "Key Results",

      items: [
        {
          value: "-48%",
          label: "Faster rendering",
          icon: Zap,
        },
        {
          value: "-35%",
          label: "Bundle size reduction",
          icon: Bolt,
        },
        {
          value: "+60%",
          label: "UX responsiveness",
          icon: LayoutDashboard,
        },
        {
          value: "Enterprise",
          label: "Scalable architecture",
          icon: Layers3,
        },
      ],
    },

    features: {
      title: "Key Features",

      items: [
        "Large-scale dashboard architecture",
        "Virtualized rendering systems",
        "Real-time analytics",
        "Scalable component infrastructure",
      ],
    },

    techStack: {
      title: "Tech Stack",

      items: [
        "Angular",
        "RxJS",
        "TypeScript",
        "AG Grid",
        "TanStack Query",
        "SCSS",
        "Jest",
        "Playwright",
      ],
    },

    architecture: {
      title: "Architecture",

      items: [
        {
          label: "Analytics Layer",
          icon: LayoutDashboard,
        },
        {
          label: "Data Streaming",
          icon: Bolt,
        },
        {
          label: "Frontend Infrastructure",
          icon: Code2,
        },
        {
          label: "Performance Engine",
          icon: Zap,
        },
      ],
    },

    screenshots: {
      title: "Screenshots",
      items: [1, 2, 3],
    },

    nextProject: {
      label: "Next Project",
      title: "Mobile Product MVP",
      description:
        "A polished cross-platform mobile app concept focused on speed and validation.",
      action: "View Project",
    },
  },

  {
    id: "mobile-product-mvp",

    backLabel: "Back to projects",

    hero: {
      type: "Mobile Application",
      title: "Mobile Product MVP",
      description:
        "A polished cross-platform mobile app concept built for fast validation and clean user experience.",
      primaryAction: "Preview App",
      secondaryAction: "Mobile Architecture",
    },

    preview: {
      eyebrow: "Mobile Flow",
      title: "User onboarding experience",

      stats: [
        { value: "4.9", label: "UX Score" },
        { value: "28%", label: "Retention" },
        { value: "2.1s", label: "Load Time" },
        { value: "iOS/Android", label: "Platforms" },
      ],

      feedback: [
        {
          type: "success",
          text: "Smooth onboarding experience",
        },
        {
          type: "warning",
          text: "Push notifications disabled",
        },
      ],

      codeTitle: "mobile-flow.tsx",

      code: `navigate("Onboarding");
enableBiometrics();
optimizeAnimations();`,
    },

    overview: {
      title: "Overview",

      paragraphs: [
        "A cross-platform MVP designed for fast validation, rapid iteration, and premium user experience.",
        "The focus was on clean architecture, responsive UI, and scalable mobile foundations.",
      ],
    },

    results: {
      title: "Key Results",

      items: [
        {
          value: "2.1s",
          label: "Launch speed",
          icon: Zap,
        },
        {
          value: "+40%",
          label: "User engagement",
          icon: Users,
        },
        {
          value: "Cross-platform",
          label: "Shared codebase",
          icon: Smartphone,
        },
        {
          value: "MVP",
          label: "Rapid delivery",
          icon: Rocket,
        },
      ],
    },

    features: {
      title: "Key Features",

      items: [
        "Cross-platform mobile UI",
        "Authentication flows",
        "Push notification integration",
        "Fast MVP iteration cycle",
      ],
    },

    techStack: {
      title: "Tech Stack",

      items: [
        "React Native",
        "Expo",
        "TypeScript",
        "Firebase",
        "Node.js",
        "REST API",
        "Tailwind",
        "Vercel",
      ],
    },

    architecture: {
      title: "Architecture",

      items: [
        {
          label: "Mobile UI",
          icon: Smartphone,
        },
        {
          label: "Authentication",
          icon: Shield,
        },
        {
          label: "API Layer",
          icon: Code2,
        },
        {
          label: "Realtime Sync",
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
      title: "AI PR Review Assistant",
      description:
        "An AI-powered GitHub App that reviews pull requests and improves engineering workflows.",
      action: "View Project",
    },
  },
];
