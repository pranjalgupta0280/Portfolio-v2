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


    // Clear existing collections except user projects
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Achievement.deleteMany({});
    await DsaProfile.deleteMany({});
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
      title: "Full Stack Engineer & Agentic AI Systems Developer",
      shortIntro: "Building scalable web platforms, agentic RAG architectures, multi-tenant B2B systems, and high-performance competitive algorithms.",
      bio: "Computer Science and Engineering student at JSS Academy of Technical Education, Noida. Specializing in Full Stack Web Development (React, Node.js, Express, MongoDB, Next.js), AI & Agentic Systems (LangChain, LangGraph, Agentic RAG, Qdrant, NeMo Guardrails), and Competitive Programming (Codeforces Pupil 1324, LeetCode Knight 1871, CodeChef 3-Star).",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      resumeUrl: "https://raw.githubusercontent.com/pranjalgupta0280/Portfolio-v2/main/resume.pdf",
      email: "pranjalgupta0280@gmail.com",
      phone: "+91 7007855590",
      location: "Noida, Uttar Pradesh, India",
      githubUrl: "https://github.com/pranjalgupta0280",
      linkedinUrl: "https://linkedin.com/in/pranjalgupta0280",
      twitterUrl: "https://twitter.com/pranjalgupta0280"
    });
    console.log('Profile seeded.');

    // 3. Seed Skills
    const skillsData = [
      { name: "React / Next.js / SCSS", category: "Frontend", proficiency: 95, icon: "Layout", order: 1 },
      { name: "Node.js & Express", category: "Backend", proficiency: 92, icon: "Server", order: 2 },
      { name: "MongoDB, Mongoose & Transactions", category: "Database", proficiency: 90, icon: "Database", order: 3 },
      { name: "Python / C++ / TypeScript", category: "Languages & CS", proficiency: 94, icon: "Code", order: 4 },
      { name: "LangChain & LangGraph (Agentic RAG)", category: "AI & Agentic Systems", proficiency: 88, icon: "Cpu", order: 5 },
      { name: "Qdrant Vector Search & NeMo Guardrails", category: "AI & Agentic Systems", proficiency: 86, icon: "Database", order: 6 },
      { name: "Socket.IO & WebSockets", category: "Backend", proficiency: 88, icon: "Server", order: 7 },
      { name: "Docker, Git & CI/CD", category: "DevOps & Tools", proficiency: 85, icon: "Cloud", order: 8 },
      { name: "Data Structures & Algorithms", category: "Languages & CS", proficiency: 95, icon: "Cpu", order: 9 }
    ];
    await Skill.insertMany(skillsData);
    console.log('Skills seeded.');

    // 4. Seed Education
    const educationData = [
      {
        institution: "JSS Academy of Technical Education",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        duration: "2023 - Present",
        grade: "Noida, Uttar Pradesh",
        description: "Coursework: Data Structures & Algorithms, AI & Machine Learning, Operating Systems, Software Engineering, Database Management Systems, Object-Oriented Programming.",
        order: 1
      },
      {
        institution: "United Public School",
        degree: "High School Diploma",
        duration: "March 2010 - April 2023",
        grade: "93 / 100 (93%)",
        description: "Kanpur, Uttar Pradesh. Completed High School with distinction and excellence in Mathematics & Computer Science.",
        order: 2
      }
    ];
    await Education.insertMany(educationData);
    console.log('Education seeded.');

    // 5. Seed Achievements
    const achievementData = [
      {
        title: "Meta Hacker Cup Global Rank",
        organization: "Meta",
        year: "2024",
        description: "Achieved Global Rank 4700 in Round 1 and Global Rank 3100 in Round 2 of Meta Hacker Cup.",
        order: 1
      },
      {
        title: "LeetCode Knight (1871 Rating)",
        organization: "LeetCode",
        year: "2024",
        description: "Ranked as Knight on LeetCode with top contest rating 1871 and hundreds of algorithms solved.",
        order: 2
      },
      {
        title: "Codeforces Pupil & CodeChef 3-Star",
        organization: "Codeforces & CodeChef",
        year: "2024",
        description: "Codeforces rating 1324 (Pupil) and CodeChef 3-Star Competitive Programmer.",
        order: 3
      },
      {
        title: "SHASTRA Programming Contest Finalist",
        organization: "IIT Madras",
        year: "2024",
        description: "Selected as Finalist in the national level SHASTRA Programming Contest hosted by IIT Madras.",
        order: 4
      }
    ];
    await Achievement.insertMany(achievementData);
    console.log('Achievements seeded.');

    // 6. Seed DSA Profiles
    const dsaData = [
      {
        platform: "LeetCode",
        handle: "pranjalgupta0280",
        profileUrl: "https://leetcode.com/pranjalgupta0280",
        rating: "1871",
        maxRating: "1871",
        rank: "Knight",
        solvedCount: "500+",
        badge: "Knight Badge",
        order: 1
      },
      {
        platform: "Codeforces",
        handle: "pranjalgupta0280",
        profileUrl: "https://codeforces.com/profile/pranjalgupta0280",
        rating: "1324",
        maxRating: "1324",
        rank: "Pupil",
        solvedCount: "400+",
        badge: "Pupil",
        order: 2
      },
      {
        platform: "CodeChef",
        handle: "pranjalgupta0280",
        profileUrl: "https://codechef.com/users/pranjalgupta0280",
        rating: "1650+",
        maxRating: "1650+",
        rank: "3-Star Coder",
        solvedCount: "300+",
        badge: "3-Star Badge",
        order: 3
      },
      {
        platform: "GitHub",
        handle: "pranjalgupta0280",
        profileUrl: "https://github.com/pranjalgupta0280",
        rating: "Active Contributor",
        maxRating: "20+ Repos",
        rank: "Full Stack & AI Dev",
        solvedCount: "Repositories & Open Source",
        badge: "Git Master",
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
