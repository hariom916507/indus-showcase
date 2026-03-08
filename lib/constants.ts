import { Bot, Cpu, Database, Network, Landmark, Truck, TrendingUp, Users, LineChart, FileText, Settings, Shield, Globe } from "lucide-react";

export const SITE_CONFIG = {
    name: "Indas Analytics",
    description: "AI Agents for Enterprise ERP intelligence",
    url: "https://indas-analytics.demo",
};

export const HERO_CONTENT = {
    badge: "Next-Gen ERP Intelligence",
    title: {
        main: "AI Agents That Run Your",
        highlight: "ERP Smarter"
    },
    subtext: "Automate finance, operations, and analytics with autonomous AI agents that learn and execute complex enterprise workflows.",
    ctas: {
        primary: "Book Demo",
        secondary: "View Case Studies"
    }
};

export const STATS_CONTENT = [
    { label: "Installations", value: 400, suffix: "+" },
    { label: "Team members", value: 100, suffix: "+" },
    { label: "Countries", value: 20, suffix: "+" },
    { label: "Years combined experience", value: 350, suffix: "+" },
    { label: "Active users", value: 5000, suffix: "+" },
    { label: "Expert sessions", value: 1000, suffix: "+" },
];

export const SERVICES_CONTENT = {
    header: {
        title: "Enterprise AI Capabilities",
        subtitle: "Deploy autonomous agents that integrate directly into your existing ERP ecosystem."
    },
    items: [
        {
            title: "AI Finance Agents",
            description: "Automate reconciliation, accounts payable, and auditing with 99.9% accuracy.",
            icon: Bot,
        },
        {
            title: "Predictive Analytics",
            description: "Identify market trends and operations bottlenecks before they happen with LLM-powered forecasting.",
            icon: LineChart,
        },
        {
            title: "Smart Procurement",
            description: "AI that negotiates and optimizes supply chains in real-time based on live ERP data.",
            icon: Globe,
        },
        {
            title: "Document Intelligence",
            description: "Extract data from invoices, contracts, and receipts directly into your ERP workflow.",
            icon: FileText,
        },
        {
            title: "Process Mining",
            description: "Visualize and optimize business processes automatically using AI-driven event logs.",
            icon: Settings,
        },
        {
            title: "Enterprise Guardrails",
            description: "Secure and private AI execution that respects all data residency and compliance laws.",
            icon: Shield,
        }
    ]
};

export const USE_CASES_CONTENT = {
    header: {
        badge: "Industrial Solutions",
        title: "Industry Use Cases For",
        highlight: "ERP AI",
        description: "Explore how our autonomous agents solve critical bottlenecks across your entire enterprise architecture."
    },
    items: [
        {
            title: "Finance AI",
            description: "Automated accounts payable, real-time cash flow forecasting, and fraud detection with 99.9% precision.",
            icon: Landmark,
            color: "from-blue-500/20 to-blue-600/20",
            iconColor: "text-blue-500"
        },
        {
            title: "Supply Chain AI",
            description: "Anticipate shortages and optimize warehouse routing. AI that balances inventory costs against delivery speeds.",
            icon: Truck,
            color: "from-amber-500/20 to-amber-600/20",
            iconColor: "text-amber-500"
        },
        {
            title: "Sales AI",
            description: "CRM automation and predictive lead qualification. Transform your pipeline into a machine that never sleeps.",
            icon: TrendingUp,
            color: "from-emerald-500/20 to-emerald-600/20",
            iconColor: "text-emerald-500"
        },
        {
            title: "HR AI",
            description: "Autonomous talent matching and retention analytics. Build a workforce that is always prepared for what's next.",
            icon: Users,
            color: "from-purple-500/20 to-purple-600/20",
            iconColor: "text-purple-500"
        }
    ]
};

export const AGENTS_CONTENT = {
    header: {
        badge: "Autonomous Workforce",
        title: "Meet Your New",
        highlight: "AI Associates",
        description: "Our agents don't just suggest data—they execute specialized enterprise workflows across your entire infrastructure."
    },
    metrics: [
        { label: "Agent Templates", value: "14+" },
        { label: "Actions Tasked", value: "4.2M" }
    ],
    items: [
        {
            id: "finance",
            name: "FinBot-X",
            role: "Finance Automator",
            description: "This agent monitors accounts payable and generates real-time tax reports.",
            icon: Bot,
            color: "from-blue-500 to-cyan-400",
            glow: "shadow-blue-500/20",
            stats: { efficiency: "+40%", accuracy: "100%" }
        },
        {
            id: "ops",
            name: "OpsCore",
            role: "Supply Optimization",
            description: "This agent monitors inventory levels and automates restock purchasing.",
            icon: Cpu,
            color: "from-purple-500 to-indigo-400",
            glow: "shadow-purple-500/20",
            stats: { efficiency: "+65%", latency: "<2ms" }
        },
        {
            id: "analytics",
            name: "DataSense",
            role: "Predictive Analyst",
            description: "This agent identifies market trends and predicts Q4 revenue targets.",
            icon: Database,
            color: "from-emerald-500 to-teal-400",
            glow: "shadow-emerald-500/20",
            stats: { accuracy: "98.2%", insights: "1.2k/day" }
        },
        {
            id: "security",
            name: "NetGuard",
            role: "Security Sentinel",
            description: "This agent monitors ERP access logs for anomalous behavior patterns.",
            icon: Network,
            color: "from-rose-500 to-orange-400",
            glow: "shadow-rose-500/20",
            stats: { uptime: "99.99%", threats: "0" }
        }
    ]
};

export const SUCCESS_STORIES_CONTENT = {
    header: {
        badge: "Case Studies",
        title: "Proven Results In",
        highlight: "High-Stakes",
        suffix: "ERP"
    },
    items: [
        {
            title: "Global Finance Corp",
            description: "Automated 85% of accounts payable with zero error margin using our proprietary Finance Agent.",
            image: "/success-finance.png",
            metric: "85% Automation",
            color: "from-blue-600/80 to-indigo-950/90"
        },
        {
            title: "LogiTech Solutions",
            description: "Real-time supply chain optimization leading to 30% reduction in shipping delays worldwide.",
            image: "/success-logistics.png",
            metric: "30% Efficiency",
            color: "from-amber-600/80 to-orange-950/90"
        },
        {
            title: "EcoRetail Group",
            description: "Predictive inventory management that reduced waste by 40% across 500+ global storefronts.",
            image: "/success-finance.png",
            metric: "-40% Waste",
            color: "from-emerald-600/80 to-teal-950/90"
        }
    ]
};

export const TESTIMONIALS_CONTENT = {
    header: {
        title: "What our clients say",
        subtitle: "Real stories from companies we've helped transform."
    },
    items: [
        {
            id: "1",
            name: "Alexander Voss",
            role: "Supply Chain Lead, Global Log",
            videoId: "xr6N8tehEyw",
            thumbnail: "https://img.youtube.com/vi/xr6N8tehEyw/maxresdefault.jpg",
            quote: "The speed at which we can now identify supply chain bottlenecks is unprecedented. The AI agents are seamless."
        },
        {
            id: "2",
            name: "Sarah Jenkins",
            role: "CTO, FinTech Global",
            videoId: "CW-HTH4QZug",
            thumbnail: "https://img.youtube.com/vi/CW-HTH4QZug/hqdefault.jpg",
            quote: "Integrating AI agents into our legacy ERP was the best decision we made this year. Reporting went from days to seconds."
        },
        {
            id: "3",
            name: "Marcus Thorne",
            role: "Director of Ops, Logistics Pro",
            videoId: "D_svGy_TRt4",
            thumbnail: "https://img.youtube.com/vi/D_svGy_TRt4/maxresdefault.jpg",
            quote: "Process automation has finally reached a point where it's truly autonomous. Overhead reduced by 25% instantly."
        },
        {
            id: "4",
            name: "Elena Petrov",
            role: "Chief Data Officer, RetailOne",
            videoId: "lYWtgv6R1yI",
            thumbnail: "https://img.youtube.com/vi/lYWtgv6R1yI/hqdefault.jpg",
            quote: "Real-time analytics is no longer a luxury; it's our competitive advantage. The guardrails are truly enterprise-grade."
        },
        {
            id: "5",
            name: "James Wilson",
            role: "Head of Infra, Enterprise Tech",
            videoId: "CNqo6jdMWOM",
            thumbnail: "https://img.youtube.com/vi/CNqo6jdMWOM/maxresdefault.jpg",
            quote: "Scaling our ERP logic globally was a breeze with Indas Analytics. Integration was incredibly smooth and fast."
        }
    ]
};

export const CLIENT_LOGOS = [
    "Google", "Microsoft", "Amazon", "Netflix", "Meta",
    "Apple", "Tesla", "Adobe", "Salesforce", "Slack",
    "Spotify", "Zoom", "Dropbox", "Uber", "Airbnb",
    "Stripe", "Shopify", "Notion", "Figma", "Canva",
    "Reddit", "Twitter", "LinkedIn", "PayPal", "Intuit",
    "Oracle", "IBM", "Intel", "Nvidia", "Samsung",
    "Disney", "Nike", "Coca-Cola", "Pepsi", "Starbucks",
    "Visa", "Mastercard", "American Express", "Goldman Sachs", "Morgan Stanley"
];
