import {
  Bolt,
  Code2,
  Database,
  Code,
  Shield,
  Users,
  Brain,
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

    nextProject: {
      label: "Next Project",
      nextProjectId: "focus-ai",
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

    nextProject: {
      label: "Next Project",
      title: "Enterprise Security Dashboard",
      nextProjectId: "enterprise-security-dashboard",
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

    nextProject: {
      label: "Next Project",
      nextProjectId: "rair-tech",
      title: "RAIR Technologies",
      description:
        "A blockchain-based Web3 platform focused on digital ownership, MetaMask integration, and smart contract interactions.",
      action: "View Project",
    },
  },

  {
    id: "rair-tech",

    backLabel: "Back to projects",

    hero: {
      type: "Web3 / Blockchain Platform",
      title: "RAIR Technologies",
      description:
        "A Web3 platform built around blockchain technology, focused on digital ownership, smart contracts, and decentralized user experiences.",
      primaryAction: "View Platform",
      secondaryAction: "Blockchain Architecture",
    },

    preview: {
      eyebrow: "Web3 Experience",
      title: "Blockchain-powered digital platform",

      stats: [
        { value: "Web3", label: "Blockchain App" },
        { value: "React", label: "Frontend Stack" },
        { value: "MetaMask", label: "Wallet Integration" },
        { value: "Smart Contracts", label: "Core Logic" },
      ],

      feedback: [
        {
          type: "success",
          text: "Wallet integration completed",
        },
        {
          type: "warning",
          text: "Gas optimization in progress",
        },
      ],

      codeTitle: "wallet-connect.ts",

      code: `connectMetaMask();
initializeSmartContracts();
syncWalletState();`,
    },

    overview: {
      title: "Overview",

      paragraphs: [
        "Worked on a Web3 blockchain platform focused on decentralized technologies, wallet integrations, and blockchain-based user interactions.",
        "Contributed to frontend development, UI/UX implementation, MetaMask integration, Docker-based environments, and smart contract interactions using React and modern web technologies.",
      ],
    },

    results: {
      title: "Key Results",

      items: [
        {
          value: "Web3",
          label: "Blockchain integration",
          icon: Bolt,
        },
        {
          value: "MetaMask",
          label: "Wallet connectivity",
          icon: Shield,
        },
        {
          value: "Docker",
          label: "Containerized setup",
          icon: Database,
        },
        {
          value: "UI/UX",
          label: "Modern user experience",
          icon: Users,
        },
      ],
    },

    features: {
      title: "Key Features",

      items: [
        "MetaMask wallet integration",
        "Smart contract interaction",
        "Responsive Web3 UI",
        "Blockchain-based workflows",
      ],
    },

    techStack: {
      title: "Tech Stack",

      items: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Web3",
        "Blockchain",
        "MetaMask",
        "Smart Contracts",
        "Docker",
      ],
    },

    architecture: {
      title: "Architecture",

      items: [
        {
          label: "Frontend UI",
          icon: Code,
        },
        {
          label: "Wallet Integration",
          icon: Shield,
        },
        {
          label: "Smart Contracts",
          icon: Database,
        },
        {
          label: "Blockchain Layer",
          icon: Code2,
        },
      ],
    },

    nextProject: {
      label: "Next Project",
      nextProjectId: "ai-pr-review-assistant",
      title: "AI PR Review Assistant",
      description:
        "An AI-powered GitHub App that reviews pull requests and improves engineering workflows.",
      action: "View Project",
    },
  },
];
