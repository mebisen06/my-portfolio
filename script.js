// Interactive elements for the Kinetic Sentinel Portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state toggle
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3D Tilt Effect for Credential Cards
    const credentialCards = document.querySelectorAll('.credential-card');
    
    credentialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Map mouse coordinates to rotation (-10 to 10 degrees max)
            const rotateX = -(y / (rect.height / 2)) * 10;
            const rotateY = (x / (rect.width / 2)) * 10;
            
            // No transition during tracking for instant 1:1 mapping
            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Spring physics reset
            card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text1 = "// CS STUDENT &";
        const text2 = "SYSTEMS BUILDER";
        heroTitle.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor"></span>';
        const typeTarget = heroTitle.querySelector('.typewriter-text');
        
        let i = 0;
        let isLine2 = false;
        
        function typeWriter() {
            if (!isLine2) {
                if (i < text1.length) {
                    typeTarget.innerHTML += text1.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                } else {
                    typeTarget.innerHTML += '<br>';
                    isLine2 = true;
                    i = 0;
                    setTimeout(typeWriter, 80);
                }
            } else {
                if (i < text2.length) {
                    typeTarget.innerHTML += text2.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                }
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Scroll Animation Observer for Timeline
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });



});


// --- DYNAMIC DATA FETCHING & TRACKING ---

document.addEventListener('DOMContentLoaded', () => {
    // 2. Fetch Projects with Fallback Data
    const projectsGrid = document.getElementById('dynamic-projects-grid');
    const fallbackProjects = [
        {
            title: "Loop.in – College Platform",
            version: "v1.0.0",
            status: "STATUS: ACTIVE // FULL-STACK WEB",
            description: "A community platform built for college students to discuss coursework, share announcements, track deadlines, and participate in department-specific conversations. Designed with a modern full-stack architecture.",
            tags: "FastAPI, Python, Next.js, TypeScript, Tailwind",
            folder_link: "#",
            code_link: "https://github.com/mebisen06/Loop.in",
            live_link: "https://github.com/mebisen06/Loop.in"
        },
        {
            title: "Folioo.in – Creator Platform",
            version: "v1.0.0",
            status: "STATUS: ACTIVE // FULL-STACK WEB / SAAS",
            description: "A premium developer-first creator platform and resume builder. Features a dark-mode analytics dashboard, dynamic portfolio management, and an interactive PDF resume builder/exporter.",
            tags: "React, TypeScript, Vite, Tailwind CSS, Firebase, Recharts",
            folder_link: "#",
            code_link: "https://github.com/mebisen06/folioo.in",
            live_link: "https://folioo-in.vercel.app"
        },
        {
            title: "Trust AI – Fake Review Detector",
            version: "v1.0.0",
            status: "STATUS: ACTIVE // AI / MACHINE LEARNING",
            description: "An AI-powered web application for detecting fake reviews. Built with a FastAPI backend and React frontend. Features real-time text analysis, confidence scores, and analytics dashboards.",
            tags: "FastAPI, Python, React, Vite, NLP, Machine Learning",
            folder_link: "#",
            code_link: "https://github.com/mebisen06/trust-ai",
            live_link: "#"
        },
        {
            title: "Mediva AI",
            version: "v1.0.0",
            status: "STATUS: ACTIVE // AI CHATBOT",
            description: "A college-level hackathon winning project. Mediva AI is an AI-powered health chatbot designed to provide preliminary health guidance and disease-related information through an interactive conversational interface.",
            tags: "HTML, JavaScript, AI Logic",
            folder_link: "#",
            code_link: "https://github.com/mebisen06/health-chatbot",
            live_link: "https://github.com/mebisen06/health-chatbot"
        }
    ];

    function displayProjects(data) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        data.forEach(p => {
            const tagsHtml = (p.tags || '').split(',').filter(tag => tag.trim() !== '').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');
            
            // Conditionally construct links to hide them if they are placeholders (#)
            const folderLinkHtml = p.folder_link && p.folder_link !== '#' 
                ? `<a href="${p.folder_link}" aria-label="Folder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></a>` 
                : '';
                
            const codeLinkHtml = p.code_link && p.code_link !== '#' 
                ? `<a href="${p.code_link}" target="_blank" aria-label="Code"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></a>` 
                : '';
                
            const liveLinkHtml = p.live_link && p.live_link !== '#' 
                ? `<a href="${p.live_link}" target="_blank" aria-label="External Link"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>` 
                : '';

            const titleHtml = p.live_link && p.live_link !== '#'
                ? `<a href="${p.live_link}" target="_blank" style="color: inherit; text-decoration: none;">${p.title}</a>`
                : p.title;

            projectsGrid.innerHTML += `
                <div class="project-card">
                    <div class="project-version">${p.version}</div>
                    <div class="project-header">
                        <h3 class="project-title">${titleHtml}</h3>
                        <div class="project-links">
                            ${folderLinkHtml}
                            ${codeLinkHtml}
                            ${liveLinkHtml}
                        </div>
                    </div>
                    <div class="project-status">${p.status}</div>
                    <p class="project-desc">${p.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                </div>
            `;
        });

        // Re-initialize premium card interactive glow & tilt effects
        if (typeof initCardGlow === 'function') {
            initCardGlow();
        }
    }

    if (projectsGrid) {
        displayProjects(fallbackProjects);
    }

    // 3. Fetch Certificates
    const certsFolder = document.getElementById('dynamic-certificates-folder');
    
    function displayCertificates(data) {
        window.certificatesData = data;
        window.currentCertPage = 0;
        renderCertificates();
    }
    
    function loadFallbackCertificates() {
        // Certificates removed as requested. User will add their own later.
        window.certificatesData = [];
        window.currentCertPage = 0;
        renderCertificates();
    }

    if (certsFolder) {
        loadFallbackCertificates();
    }

    function renderCertificates() {
        const folderContainer = document.getElementById('dynamic-certificates-folder');
        if (!folderContainer) return;
        
        const fronts = folderContainer.querySelectorAll('.folder__front');
        const start = window.currentCertPage * 3;
        const pageData = window.certificatesData.slice(start, start + 3);
        
        // Remove existing papers
        folderContainer.querySelectorAll('.paper').forEach(p => p.remove());
        
        // Add new papers
        const newPapers = [];
        pageData.forEach((c) => {
            const paper = document.createElement('div');
            paper.className = 'paper';
            paper.style.backgroundImage = `url('${c.image_path}')`;
            paper.style.cursor = 'pointer';
            paper.onclick = (e) => {
                const folder = folderContainer.closest('.folder');
                if (folder.classList.contains('open')) {
                    e.stopPropagation();
                    const modal = document.querySelector('.cert-modal');
                    if (modal) {
                        const modalImg = modal.querySelector('.cert-modal-img');
                        if (modalImg) {
                            modalImg.src = c.image_path;
                        }
                        modal.classList.add('active');
                    }
                }
            };
            
            // Re-apply magnetic hover logic here since dynamic ones missed the folder.js logic
            paper.addEventListener('mousemove', (e) => {
                const folder = folderContainer.closest('.folder');
                if (!folder.classList.contains('open')) {
                    paper.style.transform = '';
                    return;
                }
                const rect = paper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const offsetX = (e.clientX - centerX) * 0.15;
                const offsetY = (e.clientY - centerY) * 0.15;
                
                paper.style.setProperty('--magnet-x', `${offsetX}px`);
                paper.style.setProperty('--magnet-y', `${offsetY}px`);
            });

            paper.addEventListener('mouseleave', () => {
                paper.style.setProperty('--magnet-x', `0px`);
                paper.style.setProperty('--magnet-y', `0px`);
            });
            
            newPapers.push(paper);
        });
        
        // Append papers before .folder__front
        newPapers.forEach(p => folderContainer.insertBefore(p, fronts[0] || null));
        
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const prevBtn = document.getElementById('prev-cert-btn');
        const nextBtn = document.getElementById('next-cert-btn');
        if (!prevBtn || !nextBtn) return;
        
        if (window.currentCertPage > 0) {
            prevBtn.style.display = 'inline-flex';
        } else {
            prevBtn.style.display = 'none';
        }
        
        if ((window.currentCertPage + 1) * 3 < window.certificatesData.length) {
            nextBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'none';
        }
    }

    const prevBtn = document.getElementById('prev-cert-btn');
    const nextBtn = document.getElementById('next-cert-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.currentCertPage > 0) {
                window.currentCertPage--;
                renderCertificates();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if ((window.currentCertPage + 1) * 3 < window.certificatesData.length) {
                window.currentCertPage++;
                renderCertificates();
            }
        });
    }

    // --- GITHUB STATS TELEMETRY ---
    const githubUsername = 'mebisen06';
    const fallbackStats = {
        public_repos: 10,
        followers: 5,
        stars: 3,
        contributions: 53
    };

    async function fetchGitHubStats() {
        const reposEl = document.getElementById('github-repos');
        const starsEl = document.getElementById('github-stars');
        const followersEl = document.getElementById('github-followers');
        const contribEl = document.getElementById('github-contributions');

        if (!reposEl) return;

        // Apply loading effect/states first
        reposEl.innerText = '--';
        starsEl.innerText = '--';
        followersEl.innerText = '--';

        try {
            // Fetch User profile details
            const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
            if (!userResponse.ok) throw new Error('Failed to fetch user profile');
            const userData = await userResponse.json();

            // Fetch Repos to sum stars
            const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
            let starsCount = 0;
            if (reposResponse.ok) {
                const reposData = await reposResponse.json();
                starsCount = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            } else {
                starsCount = fallbackStats.stars;
            }

            // Animate number stats for a premium feeling
            animateStatValue(reposEl, userData.public_repos);
            animateStatValue(followersEl, userData.followers);
            animateStatValue(starsEl, starsCount);

        } catch (error) {
            console.error('Error fetching GitHub stats, using fallback:', error);
            reposEl.innerText = fallbackStats.public_repos;
            followersEl.innerText = fallbackStats.followers;
            starsEl.innerText = fallbackStats.stars;
        }

        // Fetch contribution counts dynamically (non-critical, handles CORS issues/flakiness safely)
        try {
            const contribResponse = await fetch(`https://github-contributions-api.deno.dev/${githubUsername}.json`);
            if (contribResponse.ok) {
                const contribData = await contribResponse.json();
                if (contribData && typeof contribData.totalContributions === 'number') {
                    animateStatValue(contribEl, contribData.totalContributions);
                }
            }
        } catch (cErr) {
            console.log('Using static contribution fallback count');
            contribEl.innerText = fallbackStats.contributions;
        }
    }

    function animateStatValue(element, targetValue) {
        if (!element) return;
        const duration = 1000; // ms
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime >= duration) {
                element.innerText = targetValue;
                return;
            }
            const progress = elapsedTime / duration;
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
            element.innerText = currentValue;
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    fetchGitHubStats();

    // --- PREMIUM INTERACTIVE EFFECTS ---
    window.initCardGlow = function() {
        const glowCards = document.querySelectorAll('.project-card, .stat-card, .calendar-card, .timeline-card, .link-card, .terminal-form');
        
        glowCards.forEach(card => {
            // Remove existing listeners to prevent multiple triggers
            card.removeEventListener('mousemove', handleCardMouseMove);
            card.removeEventListener('mouseleave', handleCardMouseLeave);
            
            // Add listeners
            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
        });
    };

    function handleCardMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = -((e.clientY - rect.top - centerY) / centerY) * 3; // Max 3 degrees
        const tiltY = ((e.clientX - rect.left - centerX) / centerX) * 3;  // Max 3 degrees
        
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    function handleCardMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, box-shadow 0.3s';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // Run initially for static cards
    window.initCardGlow();
});

// Certificate Modal Logic is handled in folder.js and triggered via paper click
