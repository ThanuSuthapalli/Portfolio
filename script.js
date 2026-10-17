// Global variables
let slideIndex = 0;
let slideInterval;
let typingInterval;
let isTyping = false;

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Preloader functionality
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const loadingText = document.getElementById('loading-text');

    const loadingMessages = [
        'Initializing Security Protocols',
        'Loading Cyber Defense Systems',
        'Activating Firewall Protection',
        'Scanning Network Perimeter',
        'Encrypting Data Channels',
        'System Ready - Access Granted'
    ];

    let messageIndex = 0;

    // Animate loading messages
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(messageInterval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                initializeApp();
            }, 1000);
        }
    }, 800);
});

// Initialize app after preloader
function initializeApp() {
    initNavigation();
    initSlideshow();
    initTypingAnimation();
    initScrollEffects();
    initProjectCards();
    initContactForm();
    initParallax();
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    // Auto slideshow
    slideInterval = setInterval(nextSlide, 4000);

    // Initialize first slide
    showSlide(0);

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 4000);
        });
    }
}

// Manual slide navigation
function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n - 1;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }

    // Restart auto slideshow
    slideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[slideIndex]) {
            slides[slideIndex].classList.add('active');
        }
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
    }, 4000);
}

// Typing animation
function initTypingAnimation() {
    const roles = [" Full Stack Developer", "Cybersecurity Enthusiast",
        "Frontend Developer",
        "Creative Coder",
        "Web Developer",
        "Graphic Designer",
        "Problem Solver",
        "Marketing Specialist",
        "UI/UX Designer"];
    const typedTextElement = document.getElementById('typed-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }

    if (typedTextElement) {
        typeText();
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-stats');
    animateElements.forEach(el => observer.observe(el));
}

// Project cards functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            const btn = card.querySelector('.btn-view');
            if (btn) {
                btn.style.animationDelay = '0.1s';
            }
        });
    });
}

// Resume download functionality
function downloadResume() {
    // In a real implementation, this would link to an actual PDF file
    // For now, we'll show a message and you can replace this with your actual resume link
    alert('Resume download functionality would be implemented here. Please add your resume.pdf file and link it to this button.');

    // Example of how to implement actual download:
    // const link = document.createElement('a');
    // link.href = 'resume.pdf'; // Path to your actual resume file
    // link.download = 'Alex_Thompson_Resume.pdf';
    // link.click();
}

// Live demo functionality
function openLiveDemo(url) {
    window.open(url, '_blank');
}

// Project modal functionality with Live Demo button
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // Project data with demo links
    const projectData = {
        project1: {
            title: 'Image Gallery Interface',
            description: 'The Image Gallery Interface is a dynamic web application designed to display images in an interactive and visually appealing way. Users can browse through multiple categories of images such as nature, architecture, portraits, and more.',
            features: [
                'Multiple image categories (Nature, Architecture, Portraits, Abstract, etc.)',
                'Slideshow mode with auto-play functionality',
                'Adjustable slide speed (Fast, Normal, Slow)',
                'Multiple transition effects (Fade, Slide, Zoom)',
                'More Responsive design compatible with Laptop',
                'User-friendly and visually appealing interface',

            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
            challenges: 'Implementing smooth transitions, ensuring responsiveness, managing categories, and optimizing load time.',
            outcomes: 'Fully functional interactive gallery with smooth transitions, high user engagement, and scalable design.',
            demoUrl: 'https://imagegalleryinterface.netlify.app/' // Replace with your actual demo/repo link
        },
        project2: {
            title: 'Sliding Puzzle Game',
            description: 'Dive into our interactive Sliding Puzzle Game, where classic fun meets modern design. Challenge your spatial skills by rearranging shuffled tiles to get the sequence of numbers. Whether you’re a casual gamer or puzzle aficionado, this offers engaging entertainment in just a few moves.',
            features: [
                'Dynamic tile shuffling for a new experience each play',
                'Drag-and-drop interface (or touch support) for intuitive gameplay',
                'Timing and move counter to challenge efficiency',
                'Responsive layout so it works smoothly on both desktop and mobile',
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            challenges: 'Balancing smooth animations and responsive controls without performance lag.',
            outcomes: 'Delivered a fluid, fast, and enjoyable puzzle experience across all devices.',
            demoUrl: 'https://cyan-hillary-55.tiiny.site/' // Replace with your actual demo/repo link
        },
        project3: {
            title: 'Professional landing page',
            description: 'This landing page presents your company in its best light — with a clean design, well-structured sections, and intuitive navigation. It communicates who you are, what you do, and why you matter — highlighting your values, services, impact, and client relationships. It also includes compelling calls to action (e.g. “Get Started,” “Contact Us”) that drive conversion. The layout is responsive, ensuring consistent presentation across devices. Every visual and textual component is aligned to showcase your brand’s identity and market lead.',
            features: [
                'Real-world projects spanning client websites and enterprise apps, across frontend & backend domains',
                'Expert one-on-one mentorship, weekly feedback, and career guidance',
                'Service Highlights – Dedicated sections showcasing core services, expertise, and benefits.',
                'Responsive & Fast Loading – Optimized for smooth performance across devices.',
                'Contact & Inquiry Form – Easy way for clients to reach out directly.'
            ],
            technologies: ['JavaScript', 'HTML', 'CSS'],
            challenges: 'Communicating the company’s identity and services clearly while ensuring responsiveness and fast performance.',
            outcomes: 'Achieved a professional, engaging, and conversion‑focused landing page that enhances brand credibility.',
            demoUrl: 'https://professional-corporate-landingpage.netlify.app/' // Replace with your actual demo link
        },
        project4: {
            title: 'Recharge Management dashboard',
            description: 'A modern, responsive recharge management dashboard for web and mobile. Seamlessly manages customers, payments, and analytics using a flexible UI that adapts: detailed tables on desktop/tablet, swipeable cards on mobile, always fast and user-friendly.',
            features: [
                'Full customer management (add/edit/delete) and quick payment status toggle',
                'Recent and expiring customers highlighted for action',
                'Visual analytics, payment history, admin settings, and trash recovery',
                'Error alerts, confirmation prompts, and form validation for smooth workflow'
            ],
            technologies: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL', 'Chart.Js'],
            challenges: 'Integrating real-time record management with PHP and MySQL while maintaining a responsive design.',
            outcomes: 'Successfully built a fully functional recharge management system with clean UI and persistent data handling.',
            demoUrl: 'https://github.com/ThanuSuthapalli/recharge-dashboard.git' // Replace with your actual demo/repo link
        },
        project5: {
            title: 'E- Swasthya Connect',
            description: 'A digital platform designed to improve rural healthcare by connecting villagers, ANMs, and doctors for faster diagnosis, treatment, and case management.',
            features: [
                'Role-based logins for Villagers, ANMs, Doctors, and Admins',
                'Health issue reporting with text and photo uploads',
                'Case triaging, resolution, and escalation system',
                'Real-time communication and tracking of medical cases',
                'Centralized dashboard for monitoring healthcare activities'
            ],
            technologies: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL', 'Bootstrap'],
            challenges: 'Ensuring smooth coordination and data consistency among multiple user roles in real time.',
            outcomes: 'Improved communication, reduced treatment delays, and better access to healthcare in rural communities.',
            demoUrl: 'https://github.com/ThanuSuthapalli/E--Swasthya-Connect.git' // Replace with your actual demo/repo link
        },
        project6: {
            title: 'AssessOrch - AI-Powered Assessment Platform',
            description: 'A dynamic AI-powered web application that enables automated test generation, performance analytics, and secure online assessments with an interactive and user-friendly interface.',
            features: [
                'AI-based automatic question and test generation',
                'Secure online test delivery with authentication',
                'Real-time performance tracking and analytics',
                'User-friendly dashboard for managing tests and results',
                'Scalable system supporting multiple users and assessments'
            ],
            technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'OpenAI API'],
            challenges: 'Designing an efficient AI workflow for generating relevant questions while ensuring secure and scalable test delivery.',
            outcomes: 'Reduced manual effort in test creation, improved evaluation efficiency, and enabled seamless online assessment experience.',
            demoUrl: 'https://assessorch.vercel.app/' // Replace with your actual link
        },
        project7: {
            title: 'CartGenius AI – E-Commerce Shopping Assistant',
            description: 'A smart AI-powered web application that helps users discover products, compare options, and make better purchasing decisions through real-time recommendations and an interactive interface.',
            features: [
                'AI-based product recommendation system',
                'Real-time product search and suggestions',
                'Integration with external APIs for product data',
                'Interactive and responsive user interface',
                'Smart filtering and decision-making assistance'
            ],
            technologies: ['Python', 'FastAPI', 'Gemini API', 'HTML5', 'CSS3', 'JavaScript'],
            challenges: 'Ensuring accurate and relevant product recommendations while handling real-time data efficiently from multiple sources.',
            outcomes: 'Improved product discovery experience, reduced decision-making time, and enhanced user engagement through intelligent suggestions.',
            demoUrl: 'https://cartgenius-ai.onrender.com/' // Replace with your actual link
        },
        project8: {
            title: 'GlowCart – Cosmetics E-Commerce Platform',
            description: 'A scalable multi-store e-commerce web application that enables seamless product management, secure transactions, and role-based access through an intuitive and user-friendly interface.',
            features: [
                'Role-Based Access Control (Admin, Sub-admin, Users)',
                'Multi-store product and order management system',
                'Secure authentication and user authorization',
                'Interactive dashboards for managing products and analytics',
                'Responsive design for seamless experience across devices'
            ],
            technologies: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
            challenges: 'Designing a scalable architecture to handle multiple stores and implementing secure role-based access across different user levels.',
            outcomes: 'Enabled efficient store management, improved user experience, and provided a scalable solution for multi-store e-commerce operations.',
            demoUrl: 'https://github.com/ThanuSuthapalli/GlowCart' // Replace with your actual link
        },
        project9: {
            title: 'ShopNest – E-Commerce Platform',
            description: 'A modern and responsive e-commerce web application designed to provide seamless product browsing, secure authentication, and real-time data handling with a clean and user-friendly interface.',
            features: [
                'User authentication and secure login system',
                'Real-time database integration for dynamic product data',
                'Product browsing, filtering, and search functionality',
                'Responsive and visually appealing UI/UX design',
                'Smooth navigation and optimized user experience'
            ],
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
            challenges: 'Ensuring seamless real-time data synchronization while maintaining fast performance and a smooth user experience.',
            outcomes: 'Delivered a user-friendly e-commerce platform with improved performance, efficient data handling, and enhanced shopping experience.',
            demoUrl: 'https://shop-nest-gilt.vercel.app/products' // Replace with your actual link
        }

    };

    const project = projectData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;

    modalContent.innerHTML = `
        <div class="project-modal-content">
            <p class="project-modal-description">${project.description}</p>

            <div class="project-modal-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="project-modal-section">
                <h4>Technologies Used</h4>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="project-modal-section">
                <h4>Challenges</h4>
                <p>${project.challenges}</p>
            </div>

            <div class="project-modal-section">
                <h4>Outcomes</h4>
                <p>${project.outcomes}</p>
            </div>

            <div class="project-actions">
                <button class="btn-demo" onclick="openLiveDemo('${project.demoUrl}')">
                    <span class="demo-icon">🚀</span>
                    Live Demo
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Certificate modal functionality
function openCertificate(certId) {
    const modal = document.getElementById('certificate-modal');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalContent = document.getElementById('cert-modal-content');

    // Certificate data - add imageUrl or pdfUrl as needed
    const certificateData = {
        aws: {
            title: 'AWS Machine Learning Foundations',
            issuer: 'Amazon Web Services',
            description: 'Completed AWS Academy Machine Learning Foundations, gaining essential knowledge of machine learning concepts and AWS ML services.',
            skills: ['Machine Learning Fundamentals', 'Machine Learning', 'Data Preparation', 'Data Processing', 'Model Training', 'Model Evaluation', 'AWS', 'SageMaker', 'Responsible AI'],
            pdfUrl: 'src/AWS_Academy_Graduate___AWS_Academy_Machine_Learning_Foundations_Badge20250727-33-jzgviv.pdf'  // Replace with your actual image path or omit if not needed
        },
        aws1: {
            title: 'AWS Data Engineering Virtual Internship',
            issuer: 'Amazon Web Services',
            description: 'Completed a 10-week Data Engineering Virtual Internship, gaining practical experience in data pipelines, cloud-based data management, and analytics using AWS tools.',
            skills: ['DataEngineering', 'DataPipelines', 'DataModeling', 'SQL', 'BigData', 'Analytics', 'DataVisualization'],
            imageUrl: 'src/data engg cer.jpg'  // Replace with your actual image path or omit if not needed
        },
        'IIT ROORKEE': {
            title: 'IDEASTROM FINALIST',
            issuer: 'IIT ROORKEE',
            description: 'Participated in Ideastorm at the Annual Entrepreneurship Summit (E-Summit’25) of IIT Roorkee, showcasing innovative ideas and entrepreneurial thinking.',
            skills: [' Entrepreneurship', 'Innovation', 'Ideation', 'ProblemSolving', 'Teamwork', 'Creativity', 'Presentation'],
            imageUrl: 'src/IDEASTROM(IIT ROORKEE).png'  // Replace with your PDF path or omit if not needed
        },
        Cisco: {
            title: 'Networking Essentials',
            issuer: 'Cisco',
            description: 'Successfully completed Cisco Networking Essentials, gaining foundational knowledge in networking concepts and practices.',
            skills: ['Networking', 'IPAddressing', 'Routing', 'Switching', 'Troubleshooting', 'Protocols', 'Connectivity', 'Security'],
            imageUrl: 'src/network_cisco.jpg'  // Replace with your image/picture
        },
        'IIT ROORKEE1': {
            title: 'Productathon Finalist',
            issuer: 'IIT ROORKEE',
            description: 'Participated in Productathon at E-Summit’25, IIT Roorkee, focusing on innovative product development and entrepreneurial solutions.',
            skills: ['ProductDevelopment', 'Entrepreneurship', 'Innovation', 'ProblemSolving', 'Teamwork'],
            imageUrl: 'src/productathon(IIT Roorkee).png'  // Replace with your image/picture
        },
        'Infosys': {
            title: 'BlockChain in Depth',
            issuer: 'Infosys',
            description: 'Completed the "Blockchain in Depth" course from Infosys Springboard on April 17, 2025, gaining comprehensive knowledge of blockchain technology and its applications.',
            skills: ['Blockchain', 'Cryptography', 'SmartContracts', 'DistributedLedger', 'Consensus', 'Decentralization', 'Security'],
            imageUrl: 'src/infosys (cyber)_page-0001.jpg'  // Replace with your image/picture
        },
        'TCS': {
            title: 'TCS ION career Edge',
            issuer: 'TCS',
            description: 'Successfully completed TCS iON Career Edge - IT for Non-IT course covering industry elements and trending technologies, ending July 2025.',
            skills: ['AnalyticalThinking', 'TimeManagement', 'DigitalLiteracy', 'Teamwork', 'ArtificialIntelligence', 'MachineLearning', 'CloudComputing', 'Cybersecurity', 'Blockchain', 'IoT'],
            imageUrl: 'src/TCS.jpg'  // Replace with your image/picture
        },
        'Salesforce': {
            title: 'Salesforce Developer',
            issuer: 'Salesforce',
            description: 'Finished the Salesforce Developer With Agentblazer Champion Program (8-week virtual internship) from May to July 2025.',
            skills: ['Salesforce', 'Apex', 'Visualforce', 'Lightning', 'CRM', 'Integration', 'Customization', 'Automation'],
            imageUrl: 'src/salesforce_page-0001.jpg'  // Replace with your image/picture
        },
        'Forage': {
            title: 'Software Engineering Job Simulation(Accenture)',
            issuer: 'Forage',
            description: 'Completed the Accenture Software Engineering Job Simulation, gaining hands-on experience in project planning, development, testing, and stakeholder communication.',
            skills: ['Architecture', 'Security', 'Programming', 'Testing', 'Agile'],
            pdfUrl: 'src/Accntura_certificate.pdf'  // Replace with your image/picture
        },
        'Officemaster': {
            title: 'Power BI',
            issuer: 'Officemaster',
            description: 'Completed Microsoft Power BI training, developing skills in data visualization, reporting, and business intelligence for data-driven decision-making.',
            skills: ['DataVisualization', 'Dashboards', 'Reporting', 'BusinessIntelligence', 'DataModeling', 'Analytics'],
            imageUrl: 'src/Certificate(BE10X).jpg'  // Replace with your image/picture
        },
        'HackerRank': {
            title: 'Hackathon Winner',
            issuer: 'HackerRank',
            description: 'Achieved first place in a competitive hackathon by designing and developing an innovative solution under time constraints. Demonstrated strong problem-solving, coding proficiency, and teamwork while delivering an efficient and scalable project.',
            skills: ['ProblemSolving', 'CompetitiveProgramming', 'Teamwork', 'TimeManagement', 'AlgorithmDesign', 'Innovation'],
            imageUrl: 'src/Suthapalli_Thanusri_Winner_Certificate_1st_Place.png'  // Replace with your actual image
        },
        intrainz: {
            title: 'Cloud Computing Internship',
            issuer: 'Intrainz',
            description: 'Completed a Cloud Computing internship, gaining hands-on experience in cloud infrastructure, virtualization, and service deployment.',
            skills: ['CloudComputing', 'Virtualization', 'Deployment', 'Infrastructure', 'Networking', 'Security'],
            imageUrl: 'src/intrainz Internship Certificate.jpg'  // Replace with your actual image path or omit if not needed
        },
        hp: {
            title: 'AI for beginners',
            issuer: 'HP',
            description: 'Completed HP LIFE’s AI for Beginners course — gained foundational knowledge of artificial intelligence, its impact on technology and business, importance of data, applications, and ethical considerations.',
            skills: ['AI', 'Data', 'Technology', 'Business', 'Ethics', 'Applications'],
            pdfUrl: 'src/HP_life.pdf'  // Replace with your actual image path or omit if not needed
        },
        simplilearn: {
            title: 'Retrieval-Augmented Generation course',
            issuer: 'Simplilearn',
            description: 'Completed the RAG (Retrieval-Augmented Generation) course, It is an AI framework used to improve the accuracy and relevance of large language models (LLMs) by giving them access to external knowledge bases.',
            skills: ['NLP', 'LLM', 'Generative AI', 'LangChain', 'Vector databases'],
            pdfUrl: 'src/RAG Course (SimpliLearn).pdf'  // Replace with your actual image path or omit if not needed
        },
        mvgr: {
            title: 'Sankalp 24-hr Hackthon',
            issuer: 'MVGR',
            description: 'Participated in a 24-hour hackathon (Sankalp) to rapidly design, prototype and pitch a working tech solution under time pressure; collaborated in a team, handled end-to-end development and presented the project to judges.',
            skills: ['Coding', 'Teamwork', 'Prototyping', 'Problem-solving', 'Debugging', 'Presentation', 'Time-management', 'Collaboration', 'Innovation', 'UX'],
            pdfUrl: 'src/sankalp(mvgr).pdf'  // Replace with your actual image path or omit if not needed
        },
        gdg: {
            title: 'GenAI Study Jams(GDGoC-MVGR)',
            issuer: 'Google Developer Groups',
            description: 'Successfully completed the Specialized Pathways in Generative AI and Google Cloud Technologies as part of the GenAI Study Jams organized by GDGoC-MVGR, gaining hands-on experience with modern AI tools, cloud infrastructure, and generative AI concepts.',
            skills: ['GenerativeAI', 'GoogleCloud', ' AI', ' CloudComputing', ' MachineLearning', 'Innovation', 'Automation', 'ProblemSolving', 'DataProcessing', ' Creativity'],
            pdfUrl: 'src/Thanu suthapalli (GDG).pdf'  // Replace with your actual image path or omit if not needed
        },
    };

    const cert = certificateData[certId];
    if (!cert) return;

    modalTitle.textContent = cert.title;

    // Build certificate preview HTML
    let previewHtml = `<div class="cert-modal-content"><div class="cert-placeholder">`;

    if (cert.imageUrl) {
        previewHtml += `<img src="${cert.imageUrl}" alt="${cert.title}" style="max-width:100%; max-height:375px; border-radius:15px;">`;
    } else if (cert.pdfUrl) {
        previewHtml += `<iframe src="${cert.pdfUrl}#toolbar=0" style="width:100%; height:400px; border:none; border-radius:15px;"></iframe>`;
    } else {
        previewHtml += `
          <div class="cert-placeholder-icon">📜</div>
          <div class="cert-placeholder-text">${cert.title}</div>
          <div class="cert-placeholder-desc">Certificate preview not available</div>
        `;
    }

    previewHtml += `</div>`;

    previewHtml += `
        <div class="cert-details">
            <h4>Issued by: ${cert.issuer}</h4>
            <p>${cert.description}</p>
            <h5>Key Skills Covered:</h5>
            <div class="tech-tags">
                ${cert.skills.map(skill => `<span class="tech-tag">${skill}</span>`).join('')}
            </div>
        </div>
    </div>`;

    modalContent.innerHTML = previewHtml;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}


function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const projectModal = document.getElementById('project-modal');
    const certModal = document.getElementById('certificate-modal');

    if (e.target === projectModal) {
        closeProjectModal();
    }
    if (e.target === certModal) {
        closeCertificateModal();
    }
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Parallax effect for floating elements
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        floatingElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}


function downloadResume() {
    const link = document.createElement('a');
    link.href = 'thanu_resume.pdf';  // Path to your resume PDF
    link.download = 'thanu_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const phoneNumber = '918978636798'; // Replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=Name:%20${name}%0AEmail:%20${email}%0ASubject:%20${subject}%0AMessage:%20${message}`;
    window.open(url, '_blank');
});

