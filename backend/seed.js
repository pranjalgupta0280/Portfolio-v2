const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dns = require('dns');
require('dotenv').config();
const { Profile, Skill, Education, Achievement, DsaProfile, Project, Blog, Admin } = require('./models/schemas');

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seedData = async () => {
  try {
    try {
      await mongoose.connect(MONGO_URI);
      console.log(`Connected to primary MongoDB at ${MONGO_URI} for seeding...`);
    } catch (connErr) {
      console.log(`Failed primary connection (${connErr.message}), trying local fallback...`);
      await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
      console.log('Connected to fallback local MongoDB for seeding...');
    }


    // Clear existing collections
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Achievement.deleteMany({});
    await DsaProfile.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Admin.deleteMany({});

    // 1. Seed Admin
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminRawPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminRawPassword, 10);
    
    await Admin.create({
      username: adminUsername,
      password: hashedPassword
    });
    console.log(`Admin created: ${adminUsername} / ${adminRawPassword}`);

    // 2. Seed Profile
    await Profile.create({
      name: "Pranjal Gupta",
      title: "Full Stack Developer & Competitive Programmer",
      shortIntro: "Building scalable web platforms, high-performance backend systems, and solving complex algorithmic challenges.",
      bio: "Full Stack Developer and Computer Science undergraduate passionate about building fast, reliable software and competing in algorithm contests.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      resumeUrl: "https://example.com/pranjal-gupta-resume.pdf",
      email: "pranjalgupta0280@gmail.com",
      phone: "+91 9876543210",
      location: "India",
      githubUrl: "https://github.com/pranjalgupta0280",
      linkedinUrl: "https://linkedin.com/in/pranjalgupta0280",
      twitterUrl: "https://twitter.com/pranjalgupta0280"
    });
    console.log('Profile seeded.');

    // 3. Seed Skills
    const skillsData = [
      { name: "React / Next.js", category: "Frontend", proficiency: 95, icon: "Layout", order: 1 },
      { name: "TypeScript", category: "Languages & CS", proficiency: 92, icon: "Code", order: 2 },
      { name: "Node.js & Express", category: "Backend", proficiency: 90, icon: "Server", order: 3 },
      { name: "MongoDB & Mongoose", category: "Database", proficiency: 88, icon: "Database", order: 4 },
      { name: "PostgreSQL & Prisma", category: "Database", proficiency: 85, icon: "Database", order: 5 },
      { name: "Tailwind / Vanilla CSS", category: "Frontend", proficiency: 96, icon: "Palette", order: 6 },
      { name: "Docker & AWS", category: "DevOps & Cloud", proficiency: 80, icon: "Cloud", order: 7 },
      { name: "Data Structures & Algo", category: "Languages & CS", proficiency: 94, icon: "Cpu", order: 8 },
      { name: "Git & CI/CD", category: "Tools & Others", proficiency: 90, icon: "GitBranch", order: 9 }
    ];
    await Skill.insertMany(skillsData);
    console.log('Skills seeded.');

    // 4. Seed Education
    const educationData = [
      {
        institution: "Stanford University",
        degree: "B.S. in Computer Science (Software Systems)",
        duration: "2020 - 2024",
        grade: "3.92 / 4.0 GPA",
        description: "Specialized in Distributed Operating Systems, Algorithm Analysis, and Web System Design.",
        order: 1
      },
      {
        institution: "Tech Academy High",
        degree: "High School Diploma with Computer Honors",
        duration: "2016 - 2020",
        grade: "Valedictorian",
        description: "President of Coding Club, National Science Fair Top Finalist.",
        order: 2
      }
    ];
    await Education.insertMany(educationData);
    console.log('Education seeded.');

    // 5. Seed Achievements
    const achievementData = [
      {
        title: "Global Hackathon 1st Place Winner",
        organization: "Meta AI Challenge",
        year: "2024",
        description: "Built an open-source real-time document intelligence engine serving 10k+ requests/min.",
        order: 1
      },
      {
        title: "Candidate Master (Top 2% Globally)",
        organization: "Codeforces",
        year: "2023",
        description: "Reached Max Rating 1940+ in competitive programming algorithms.",
        order: 2
      },
      {
        title: "Open Source Contributor Award",
        organization: "React Ecosystem Foundation",
        year: "2023",
        description: "Maintained core utility plugins used by over 50,000 active projects.",
        order: 3
      }
    ];
    await Achievement.insertMany(achievementData);
    console.log('Achievements seeded.');

    // 6. Seed DSA Profiles
    const dsaData = [
      {
        platform: "Codeforces",
        handle: "alex_coder",
        profileUrl: "https://codeforces.com",
        rating: "1942",
        maxRating: "1980",
        rank: "Candidate Master",
        solvedCount: "1,240+",
        badge: "Purple Master",
        order: 1
      },
      {
        platform: "LeetCode",
        handle: "alexdev_cs",
        profileUrl: "https://leetcode.com",
        rating: "2150",
        maxRating: "2180",
        rank: "Knight (Top 1.5%)",
        solvedCount: "850+",
        badge: "2x Guardian Badge",
        order: 2
      },
      {
        platform: "CodeChef",
        handle: "alex_chef",
        profileUrl: "https://codechef.com",
        rating: "2054",
        maxRating: "2100",
        rank: "5 Star Coder",
        solvedCount: "420+",
        badge: "Global Rank Top 100",
        order: 3
      },
      {
        platform: "GitHub",
        handle: "alexdev-official",
        profileUrl: "https://github.com",
        rating: "500+ Contributions",
        maxRating: "1,200 Stars",
        rank: "Pro Developer",
        solvedCount: "64 Repositories",
        badge: "Arctic Code Vault Contributor",
        order: 4
      }
    ];
    await DsaProfile.insertMany(dsaData);
    console.log('DSA Profiles seeded.');

    // 7. Seed Projects
    const projectsData = [
      {
        title: "AuraAI - Intelligent Design Suite",
        subtitle: "SaaS Platform for Automated Layout Generation",
        description: "A state-of-the-art AI workspace that generates responsive UI components, vector assets, and design systems in seconds.",
        fullDescription: "AuraAI leverages custom neural net models connected with a fast Canvas rendering engine. Users can generate high-converting SaaS landing pages and component libraries using simple natural language prompts.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        category: "Full Stack",
        techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "OpenAI API"],
        githubUrl: "https://github.com",
        liveDemoUrl: "https://example.com",
        featured: true,
        order: 1
      },
      {
        title: "HyperFlow - Distributed Workflow Engine",
        subtitle: "Real-time Event Processing Pipeline",
        description: "Low-latency streaming event architecture capable of handling millions of webhook payloads with zero packet loss.",
        fullDescription: "HyperFlow is built for enterprise developers looking to automate cloud tasks, webhooks, and asynchronous queues with built-in retry strategies, visual DAG flow diagrams, and MongoDB persistence.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        category: "Backend & Systems",
        techStack: ["Node.js", "TypeScript", "Redis", "MongoDB", "Docker", "WebSockets"],
        githubUrl: "https://github.com",
        liveDemoUrl: "https://example.com",
        featured: true,
        order: 2
      },
      {
        title: "QuantumPay - Web3 FinTech Terminal",
        subtitle: "DeFi Payment Settlement Platform",
        description: "A seamless payment gateway connecting traditional banking APIs with instant cryptocurrency settlement rails.",
        fullDescription: "QuantumPay gives merchants an easy dashboard to accept cross-border payments with sub-second finality, zero chargeback risks, and automated accounting sync.",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        category: "FinTech",
        techStack: ["React", "Next.js", "Node.js", "Express", "Ethers.js", "PostgreSQL"],
        githubUrl: "https://github.com",
        liveDemoUrl: "https://example.com",
        featured: false,
        order: 3
      }
    ];
    await Project.insertMany(projectsData);
    console.log('Projects seeded.');

    // 8. Seed Demo Blogs
    const blogsData = [
      {
        title: "Architecting High-Throughput Micro-Frontends with Vite & React",
        slug: "architecting-high-throughput-micro-frontends",
        subtitle: "How to decouple large scale web clients for 10x faster deployment cycles",
        content: "Micro-frontend architectures have evolved from experimental patterns into mission-critical infrastructure for modern engineering organizations.\n\nIn this technical article, we explore how Vite's module federation capabilities enable seamless code sharing, dynamic runtime component loading, and sub-100ms cold builds across multiple autonomous teams.\n\n### Key Takeaways:\n- Splitting monolith bundle graphs without losing global state synchronization\n- Shared dependency caching strategies with HTTP/3\n- Establishing contract-driven prop interfaces across isolated deployments",
        coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        category: "Architecture",
        tags: ["React", "Vite", "Micro-Frontends", "Performance"],
        publishedDate: "SEP 2026",
        readTime: "5 min",
        featured: true,
        order: 1
      },
      {
        title: "Restraint in Digital Craft: A Case for Monochromatic Systems",
        slug: "restraint-in-digital-craft-monochromatic-systems",
        subtitle: "Why high-contrast editorial typography beats garish visual noise in software products",
        content: "Modern UI design often suffers from visual saturation—drowning the user in artificial gradients, heavy drop-shadows, and competing accent colors.\n\nBy adopting a disciplined Swiss editorial approach with Geist typography, hairline dividers (#E5E7EB), and stark monochrome contrast (#111827 on #F8F9FA), web applications achieve exceptional signal-to-noise ratio and timeless elegance.\n\n### Core Principles:\n- Let content scale define hierarchy\n- Eliminate decorative elevation in favor of tonal surface shifts\n- Leverage optical tracking for wide kicker labels",
        coverImageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        category: "UI & Design",
        tags: ["Design Systems", "Minimalism", "Typography", "CSS"],
        publishedDate: "AUG 2026",
        readTime: "7 min",
        featured: true,
        order: 2
      },
      {
        title: "Algorithmic Optimization Patterns in Modern Web Clients",
        slug: "algorithmic-optimization-patterns-web-clients",
        subtitle: "Applying DSA fundamentals to front-end state management and canvas rendering",
        content: "Data structures and algorithms are not just for whiteboard interviews—they are essential for building fluid 60fps web applications handling complex data sets.\n\nWe break down practical applications of Trie search indices for real-time auto-complete, Segment Trees for fast range queries, and Spatial Hashing for WebGL canvas particle physics.",
        coverImageUrl: "https://images.unsplash.com/photo-1516116211223-48a122638e59?auto=format&fit=crop&w=1200&q=80",
        category: "Algorithms",
        tags: ["DSA", "JavaScript", "Optimization", "State Management"],
        publishedDate: "JUL 2026",
        readTime: "4 min",
        featured: false,
        order: 3
      }
    ];
    await Blog.insertMany(blogsData);
    console.log('Demo Blogs seeded.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
