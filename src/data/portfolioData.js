import SamikshaPic from '../assets/samiksha.jpeg';
export const portfolioData = {
    profile: {
        name: "Samiksha Bhandari",
        avatarUrl: SamikshaPic,
        title: "BCA Student & Full-Stack Web Developer",
        location: "Sunsari, Nepal",
        leadership: "Treasurer — Code for Change Koshi (2025-2026)",
        bio: "Building functional web architectures mapping PHP, MySQL, and modern MERN layers. Balancing deep software system engineering with community tech operations to create highly scalable web infrastructure solutions.",
        githubUrl: "https://github.com/SamikshaBhandari",
        linkedinUrl: "https://www.linkedin.com/in/samiksha-bhandari-8079b5346/"
    },
    skills: {
        languages: ["PHP", "HTML", "CSS", "C#", "JavaScript", "C/C++", "SQL"],
        frameworks: ["React.js", "Node.js", "Express.js", "Next.js", "Tailwind CSS"],
        tools: ["Git & GitHub", "MySQL", "MongoDB", "Ubuntu Linux"]
    },
    projects: [
        {
            id: "homestay-discovery",
            title: "Homestay Discovery & Booking Management System",
            category: "Full-Stack Web App",
            description: "A secure framework designed for localized tourism maps. Handled backend operations using object-oriented PHP and MySQL entity-relationship schemas to manage automated guest reservations seamlessly.",
            tech: ["PHP", "MySQL", "JavaScript", "CSS3"],
            github: "https://github.com/SamikshaBhandari/Homestays-Discovery"
        },
        {
            id: "hariyali-ghar",
            title: "Hariyali Ghar (Nursery E-commerce)",
            category: "E-Commerce System",
            description: "A custom single-vendor B2C business logic solution built for plant distribution. Optimizes order checkouts, automated digital catalog components, and full shopping state configurations via the MERN ecosystem.",
            tech: ["React.js", "Node.js", "Express.js", "MySQL"],
            github: "https://github.com/SamikshaBhandari/Hariyali-ghar"
        }
    ]
};