document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Scrolling behavior
    initNavigation();

    // Statistics Counter Animation using Intersection Observer
    initStatsCounter();

    // Services Modals Management
    initServiceModals();

    // Portfolio Filtering
    initPortfolio();

    // Calculators (Solar Savings & Power Backup)
    initCalculators();

    // Testimonials Carousel
    initTestimonials();

    // Contact Form handling
    initContactForm();

    // Project Details & Gallery Modal Management
    initProjectDetailsModal();
    initProjectGalleryModal();
});

/* ==========================================
   2. Navigation Header & Mobile Menu
   ========================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon if using inline tags (e.g. ☰ to ✕)
            const icon = mobileMenuBtn.querySelector('i') || mobileMenuBtn;
            if (navMenu.classList.contains('active')) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '☰';
            }
        });
    }

    // Scroll Spy for navigation active link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 160) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Close menu when link is clicked (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });
    });
}

/* ==========================================
   3. Statistics Counters
   ========================================== */
function initStatsCounter() {
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounting();
                animated = true;
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);

    function startCounting() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds counting animation
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    }
}

/* ==========================================
   4. Services Detailed Modals
   ========================================== */
const serviceDetails = {
    solar: {
        title: "Solar EPC Solutions",
        desc: "End-to-end solar engineering, procurement, and construction services designed for high performance, maximum yield, and 25+ years of operational durability.",
        themeColor: "linear-gradient(135deg, #ffbe0b, #ff5400)",
        themeTextColor: "#ffbe0b",
        details: [
            { icon: "☀", title: "Utility Scale Power Plants", desc: "Large megawatt scale grid-connected ground mounted installations with automated smart tracking." },
            { icon: "🏢", title: "Commercial & Industrial Rooftops", desc: "Cost-reduction plants for factories, commercial towers, warehouses, and institutions." },
            { icon: "🏡", title: "Residential Systems", desc: "Grid-tied solar systems with premium net-metering and modern aesthetic integration." },
            { icon: "🔧", title: "Operation & Maintenance (O&M)", desc: "Thermal drone inspections, automated waterless cleaning, and real-time remote monitoring." }
        ]
    },

    ups: {
        title: "Industrial UPS & Power Backup",
        desc: "Complete uninterruptible power supply solutions built for critical operations, medical hubs, and advanced data center environments.",
        themeColor: "linear-gradient(135deg, #00d2ff, #7209b7)",
        themeTextColor: "#00d2ff",
        details: [
            { icon: "🔋", title: "Industrial Grade UPS", desc: "Heavy-duty modular online UPS with high power factor and input harmonic protection." },
            { icon: "🏢", title: "Commercial Grade Backup", desc: "Reliable power security systems for high-rise offices, retail grids, and smart infrastructure." },
            { icon: "🖥", title: "Data Center Backup Systems", desc: "N+1 and 2N redundant topologies ensuring 99.999% uptime with lithium-ion integration." },
            { icon: "⚙", title: "Battery Management Systems", desc: "Smart battery banks containing active cell balancing and real-time degradation diagnostics." }
        ]
    },
    stabilizer: {
        title: "Voltage Stabilizers (AVR)",
        desc: "Advanced electronic voltage regulation to safeguard high-precision CNC machinery, industrial medical units, and sensitive electrical grids.",
        themeColor: "linear-gradient(135deg, #00d2ff, #00f5d4)",
        themeTextColor: "#00d2ff",
        details: [
            { icon: "⚙", title: "Servo Voltage Stabilizers", desc: "Microprocessor-controlled copper-wound stabilizers with ultra-fast correction response." },
            { icon: "🏭", title: "Industrial Heavy AVR", desc: "Wide input range stabilizers designed for unbalanced three-phase industrial inputs." },
            { icon: "🛡", title: "Spike & Surge Protection", desc: "Class B & C lightning surge arresters and active filtering circuits to prevent transients." },
            { icon: "🔧", title: "Custom Enclosures", desc: "IP54 outdoor-rated designs with automated air ducting or oil-cooled setups." }
        ]
    },
    dg: {
        title: "Diesel Generator (DG) Solutions",
        desc: "Robust back-up power packages comprising generator supply, customized soundproof enclosures, and continuous AMCs.",
        themeColor: "linear-gradient(135deg, #ff5400, #7209b7)",
        themeTextColor: "#ff5400",
        details: [
            { icon: "🔥", title: "Heavy Duty DG Sets", desc: "Engine-driven generators starting from 5 kVA up to 3000 kVA configurations." },
            { icon: "🔇", title: "Acoustic Enclosures", desc: "CPCB-IV emission and noise level compliant structural acoustic canopies." },
            { icon: "🎛", title: "AMF / Auto Transfer Panels", desc: "Automated grid outage sensing with auto-start and load transfer within 8 seconds." },
            { icon: "📋", title: "Annual Maintenance (AMC)", desc: "Scheduled filtration cleaning, system inspections, and 24/7 technical callouts." }
        ]
    },
    pmc: {
        title: "Project Management Consultancy",
        desc: "Professional site supervision, budget optimizations, structural quality audits, and scheduling for infrastructure projects.",
        themeColor: "linear-gradient(135deg, #b5179e, #ff7096)",
        themeTextColor: "#ff7096",
        details: [
            { icon: "📋", title: "Strategic Planning & Scheduling", desc: "Critical path analysis, Primavera schedules, and complete resource leveling checks." },
            { icon: "👁", title: "On-site Construction Supervision", desc: "Continuous surveillance, milestone checks, and strict HSE safety protocol compliance." },
            { icon: "🔬", title: "Quality Assurance Audits", desc: "Detailed concrete testing, electrical insulation resistance tests, and hardware verification." },
            { icon: "💰", title: "Cost & Billing Audits", desc: "Contractor bill verification, change-order optimization, and budget tracking panels." }
        ]
    },
    infra: {
        title: "Electrical Infrastructure Solutions",
        desc: "Turnkey design and installation of HT/LT power distribution systems, high-tension cabling, and smart panel builds.",
        themeColor: "linear-gradient(135deg, #ff7096, #00d2ff)",
        themeTextColor: "#ff7096",
        details: [
            { icon: "🏭", title: "HT / LT Panel Boards", desc: "Main power distribution boards, motor control centers, and smart APFC panels." },
            { icon: "🔌", title: "Cabling & Cable Trays", desc: "Heavy armored copper/aluminum cabling layouts, structural cable tray designs, and duct runs." },
            { icon: "⚡", title: "Power Quality Assessments", desc: "Harmonic analysis, active power factor correction, and localized grid optimization." },
            { icon: "🚧", title: "Substation Infrastructure", desc: "Design and erection of compact substations, transformers, and ring main units." }
        ]
    }
};

function initServiceModals() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;

    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const modalClose = modal.querySelector('.modal-close');
    const modalContent = modal.querySelector('.modal-content-wrap');
    const cards = document.querySelectorAll('.service-card[data-service]');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceKey = card.getAttribute('data-service');
            const data = serviceDetails[serviceKey];
            if (!data) return;

            // Populate Modal Content
            modalContent.style.setProperty('--theme-color-modal', data.themeColor);
            modalContent.style.setProperty('--theme-color-modal-text', data.themeTextColor);
            
            modal.querySelector('.modal-title').textContent = data.title;
            modal.querySelector('.modal-desc').textContent = data.desc;

            const gridContainer = modal.querySelector('.modal-details-grid');
            gridContainer.innerHTML = ''; // clear

            data.details.forEach(item => {
                const itemHTML = `
                    <div class="modal-detail-item">
                        <div style="font-size:1.3rem; margin-right:8px; line-height:1;">${item.icon}</div>
                        <div class="modal-detail-text">
                            <h5>${item.title}</h5>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                `;
                gridContainer.insertAdjacentHTML('beforeend', itemHTML);
            });

            // Open Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
}

/* ==========================================
   5. Portfolio Filtering Logic
   ========================================== */
function renderSolarCategory(categoryName) {
    const grid = document.getElementById('solar-expanded-grid');
    if (!grid) return;

    const projects = window.solarProjectsData[categoryName] || [];
    grid.innerHTML = '';

    projects.forEach(proj => {
        // Build image slides HTML
        let slidesHTML = '';
        const bgSize = proj.bgSize || 'cover';
        proj.images.forEach(imgUrl => {
            slidesHTML += `<div class="solar-subproject-slide" style="background-image: url('${imgUrl}'); background-size: ${bgSize}; background-repeat: no-repeat; background-position: center; background-color: #070912;"></div>`;
        });

        // Build navigation dots if multiple images
        let dotsHTML = '';
        if (proj.images.length > 1) {
            dotsHTML = `<div class="solar-gallery-dots">`;
            proj.images.forEach((_, idx) => {
                dotsHTML += `<div class="solar-gallery-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>`;
            });
            dotsHTML += `</div>`;
        }

        // Build navigation arrows if multiple images
        let arrowsHTML = '';
        if (proj.images.length > 1) {
            arrowsHTML = `
                <button class="solar-gallery-arrow prev" aria-label="Previous Photo">❮</button>
                <button class="solar-gallery-arrow next" aria-label="Next Photo">❯</button>
            `;
        }

        // Build badges
        let badgesLeftHTML = '';
        if (proj.capacityHighlight && proj.capacityHighlightPosition === 'left') {
            badgesLeftHTML += `<span class="solar-subproject-cap-badge" style="position: static;">${proj.capacityHighlight}</span>`;
        }
        if (proj.badges && proj.badges.length > 0) {
            proj.badges.forEach(b => {
                badgesLeftHTML += `<span class="solar-subproject-badge" style="position: static;">${b}</span>`;
            });
        } else if (proj.badge) {
            badgesLeftHTML += `<span class="solar-subproject-badge" style="position: static;">${proj.badge}</span>`;
        }

        let badgesRightHTML = '';
        if (proj.capacityHighlight && proj.capacityHighlightPosition !== 'left') {
            if (Array.isArray(proj.capacityHighlight)) {
                proj.capacityHighlight.forEach(hl => {
                    badgesRightHTML += `<span class="solar-subproject-cap-badge" style="position: static;">${hl}</span>`;
                });
            } else {
                badgesRightHTML += `<span class="solar-subproject-cap-badge" style="position: static;">${proj.capacityHighlight}</span>`;
            }
        }

        // Custom CTA button configuration
        const btnText = proj.btnText || 'View Project Details';
        const action = proj.action || 'details';

        const projectHTML = `
            <div class="solar-subproject-card" data-project-id="${proj.id}">
                <div class="solar-subproject-img-container" style="cursor: pointer;">
                    <div class="solar-subproject-slides">
                        ${slidesHTML}
                    </div>
                    ${arrowsHTML}
                    ${dotsHTML}
                    <div style="position: absolute; bottom: 15px; left: 15px; display: flex; flex-direction: column; gap: 6px; z-index: 5; align-items: flex-start;">
                        ${badgesLeftHTML}
                    </div>
                    <div style="position: absolute; top: 15px; right: 15px; display: flex; flex-direction: column; gap: 6px; z-index: 5; align-items: flex-end;">
                        ${badgesRightHTML}
                    </div>
                </div>
                <div class="solar-subproject-content">
                    <div>
                        <h4 class="solar-subproject-title">${proj.name}</h4>
                        <p class="solar-subproject-desc">${proj.desc}</p>
                    </div>
                    <div class="solar-subproject-meta-grid">
                        <div class="solar-subproject-meta-item">
                            <span class="solar-subproject-meta-label">Client</span>
                            <span class="solar-subproject-meta-val">${proj.client}</span>
                        </div>
                        <div class="solar-subproject-meta-item">
                            <span class="solar-subproject-meta-label">Capacity</span>
                            <span class="solar-subproject-meta-val">${proj.capacity}</span>
                        </div>
                        <div class="solar-subproject-meta-item">
                            <span class="solar-subproject-meta-label">Location</span>
                            <span class="solar-subproject-meta-val">${proj.location}</span>
                        </div>
                        ${proj.date ? `
                        <div class="solar-subproject-meta-item">
                            <span class="solar-subproject-meta-label">Completion Date</span>
                            <span class="solar-subproject-meta-val">${proj.date}</span>
                        </div>
                        ` : ''}
                        ${proj.projectType ? `
                        <div class="solar-subproject-meta-item" style="grid-column: span 2; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 8px; margin-top: 4px;">
                            <span class="solar-subproject-meta-label">Project Type</span>
                            <span class="solar-subproject-meta-val" style="color: var(--color-blue); font-weight: 600;">${proj.projectType}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="solar-subproject-footer" style="margin-top: auto; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 15px;">
                        <button class="btn btn-secondary btn-view-project-details" data-project-id="${proj.id}" data-action="${action}" style="width: 100%; padding: 10px 16px; font-size: 0.85rem; border-radius: 8px;">
                            ${btnText}
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', projectHTML);
    });

    initSolarSlides();
}

function initSolarSlides() {
    const cards = document.querySelectorAll('.solar-subproject-card');
    cards.forEach(card => {
        const slidesContainer = card.querySelector('.solar-subproject-slides');
        if (!slidesContainer) return;

        const slides = card.querySelectorAll('.solar-subproject-slide');
        const dots = card.querySelectorAll('.solar-gallery-dot');
        const prevBtn = card.querySelector('.solar-gallery-arrow.prev');
        const nextBtn = card.querySelector('.solar-gallery-arrow.next');

        if (slides.length <= 1) return;

        let currentIndex = 0;
        let autoSlideInterval = null;

        function updateSlider() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }, 4000); // auto-slide every 4 seconds
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
                startAutoSlide(); // reset auto-slide timer
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
                startAutoSlide(); // reset auto-slide timer
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = parseInt(dot.getAttribute('data-index'), 10);
                updateSlider();
                startAutoSlide(); // reset auto-slide timer
            });
        });

        // Pause slide show on hover
        card.addEventListener('mouseenter', stopAutoSlide);
        card.addEventListener('mouseleave', startAutoSlide);

        // Start initially
        startAutoSlide();
    });
}

function initPortfolio() {
    const filters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    const solarCard = document.getElementById('solar-project-card');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const category = filter.getAttribute('data-filter');

            projects.forEach(project => {
                const projCategory = project.getAttribute('data-category');
                
                if (category === 'all' || projCategory === category) {
                    project.classList.remove('filtered-out');
                    project.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    project.classList.add('filtered-out');
                }
            });

            if (category !== 'all' && category !== 'solar') {
                collapseSolarCard();
            }
        });
    });

    if (solarCard) {
        const collapsedView = solarCard.querySelector('.project-card-collapsed');
        const expandedView = solarCard.querySelector('.project-card-expanded');
        const closeBtn = solarCard.querySelector('.btn-close-solar-expand');
        const tabBtns = solarCard.querySelectorAll('.solar-tab-btn');

        collapsedView.addEventListener('click', () => {
            expandSolarCard();
        });

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            collapseSolarCard();
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-tab');
                renderSolarCategory(cat);
            });
        });

        function expandSolarCard() {
            solarCard.classList.add('expanded');
            collapsedView.style.display = 'none';
            expandedView.style.display = 'block';

            const activeTab = solarCard.querySelector('.solar-tab-btn.active');
            const defaultCat = activeTab ? activeTab.getAttribute('data-tab') : 'residential';
            renderSolarCategory(defaultCat);

            setTimeout(() => {
                solarCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        function collapseSolarCard() {
            if (!solarCard.classList.contains('expanded')) return;
            
            solarCard.classList.remove('expanded');
            collapsedView.style.display = 'block';
            expandedView.style.display = 'none';

            setTimeout(() => {
                document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

/* ==========================================
   6. Interactive Calculators
   ========================================== */
function initCalculators() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.calc-tab-btn');
    const panels = document.querySelectorAll('.calc-panel-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Solar Calculator Logic ---
    const solarBillSlider = document.getElementById('solar-bill');
    const solarBillVal = document.getElementById('solar-bill-val');
    const solarAreaSlider = document.getElementById('solar-area');
    const solarAreaVal = document.getElementById('solar-area-val');

    // Result Nodes
    const solarCapNode = document.getElementById('solar-res-capacity');
    const solarReqAreaNode = document.getElementById('solar-res-req-area');
    const solarAvailAreaNode = document.getElementById('solar-res-avail-area');
    const solarStatusNode = document.getElementById('solar-res-status');
    const solarCostNode = document.getElementById('solar-res-cost');
    const solarSavingsNode = document.getElementById('solar-res-savings');
    const solarLifetimeSavingsNode = document.getElementById('solar-res-lifetime-savings');
    const solarRoiNode = document.getElementById('solar-res-roi');
    const solarCarbonNode = document.getElementById('solar-res-carbon');

    function calculateSolar() {
        const monthlyBill = parseInt(solarBillSlider.value, 10);
        const roofArea = parseInt(solarAreaSlider.value, 10);

        // Update displayed values
        solarBillVal.textContent = monthlyBill.toLocaleString('en-IN');
        solarAreaVal.textContent = roofArea.toLocaleString('en-IN');

        // Calculation Parameters
        const tariff = 10;
        const annualGrowthRate = 0.03;
        const solarGenerationPerKW = 1500; // kWh/year in India

        const monthlyUnits = monthlyBill / tariff;
        const annualUnits = monthlyUnits * 12;

        // Total projected consumption over 30 years
        const totalConsumption30Years = annualUnits * (((1 + annualGrowthRate) ** 30 - 1) / annualGrowthRate);

        // Account for panel degradation (approx average output factor over 30 years is 0.925)
        const degradationFactor = 0.925;

        // Required annual generation with safety margin (10%)
        let requiredAnnualGeneration = (totalConsumption30Years / 30) / degradationFactor;
        requiredAnnualGeneration *= 1.10;

        // Solar capacity calculation
        const solarCapacityKW = requiredAnnualGeneration / solarGenerationPerKW;
        const systemCapacity = Math.max(1, Math.round(solarCapacityKW * 10) / 10); // Minimum 1 kW

        // Roof area required: 100 Sq. Ft. per kW
        const requiredRoofArea = Math.round(systemCapacity * 100);

        // Roof suitability check
        let roofStatus = "";
        if (roofArea >= requiredRoofArea) {
            roofStatus = "✅ Roof Area Sufficient";
            solarStatusNode.style.color = "var(--color-green)";
        } else {
            const roofShortfall = requiredRoofArea - roofArea;
            roofStatus = `❌ Shortfall: ${roofShortfall.toLocaleString('en-IN')} Sq. Ft.`;
            solarStatusNode.style.color = "#ff5400";
        }

        // Financials
        const projectCost = Math.round(systemCapacity * 65000);
        const annualSavings = Math.round(monthlyBill * 12);
        const lifetimeSavings = Math.round(annualSavings * 30);
        
        // ROI Period
        const roiYears = Math.round((projectCost / (annualSavings || 1)) * 10) / 10;

        // CO2 Offset
        const co2Offset = Math.round(systemCapacity * 0.82 * 10) / 10;

        // Update displays
        solarCapNode.textContent = `${systemCapacity} kW`;
        solarReqAreaNode.textContent = `${requiredRoofArea.toLocaleString('en-IN')} Sq. Ft.`;
        solarAvailAreaNode.textContent = `${roofArea.toLocaleString('en-IN')} Sq. Ft.`;
        solarStatusNode.textContent = roofStatus;
        solarCostNode.textContent = `₹ ${projectCost.toLocaleString('en-IN')}`;
        solarSavingsNode.textContent = `₹ ${annualSavings.toLocaleString('en-IN')}`;
        solarLifetimeSavingsNode.textContent = `₹ ${lifetimeSavings.toLocaleString('en-IN')}`;
        solarRoiNode.textContent = `${roiYears} Years`;
        solarCarbonNode.textContent = `${co2Offset} Tonnes / Yr`;
    }

    if (solarBillSlider && solarAreaSlider) {
        solarBillSlider.addEventListener('input', calculateSolar);
        solarAreaSlider.addEventListener('input', calculateSolar);
        calculateSolar(); // Initial run
    }

    // --- Power Backup Calculator Logic ---
    const backupLoadSlider = document.getElementById('backup-load');
    const backupLoadVal = document.getElementById('backup-load-val');
    const backupTimeSlider = document.getElementById('backup-time');
    const backupTimeVal = document.getElementById('backup-time-val');
    const facilityTypeSelect = document.getElementById('facility-type');

    // Result Nodes
    const upsCapNode = document.getElementById('backup-res-ups');
    const batCapNode = document.getElementById('backup-res-battery');
    const dgCapNode = document.getElementById('backup-res-dg');

    function calculateBackup() {
        const loadWatts = parseInt(backupLoadSlider.value, 10);
        const durationHours = parseInt(backupTimeSlider.value, 10);
        const facility = facilityTypeSelect.value; // 'residential', 'commercial', 'industrial'

        backupLoadVal.textContent = loadWatts.toLocaleString('en-IN');
        backupTimeVal.textContent = `${durationHours} Hrs`;

        // 1. UPS capacity calculation:
        // Load in VA = Load in Watts / Power Factor (approx 0.8)
        // Add a safety margin (approx 20%) to prevent overload
        const powerFactor = 0.8;
        const loadVA = loadWatts / powerFactor;
        const upsVA = Math.ceil((loadVA * 1.25) / 100) * 100; // round up to nearest 100 VA
        
        let upsText = "";
        if (upsVA >= 10000) {
            upsText = `${(upsVA / 1000).toFixed(1)} kVA Online UPS`;
        } else {
            upsText = `${upsVA} VA Offline/Line-Int`;
        }

        // 2. Battery capacity calculation (Ah):
        // Total Watt-Hours = Load Watts * Duration
        // Battery Voltage: Typically 12V for small systems, scales to higher voltages for large loads
        // Battery Ah = Watt-Hours / (System Voltage * Efficiency (approx 0.8))
        let systemVoltage = 12; // default 12V
        if (loadWatts > 5000) systemVoltage = 120; // high voltage bank
        else if (loadWatts > 2500) systemVoltage = 96;
        else if (loadWatts > 1500) systemVoltage = 48;
        else if (loadWatts > 800) systemVoltage = 24;

        const batteryAh = (loadWatts * durationHours) / (systemVoltage * 0.8);
        const roundedAh = Math.ceil(batteryAh / 50) * 50; // common sizing increments
        const numBatteries = Math.ceil(roundedAh / 150) * (systemVoltage / 12);
        
        let batteryText = `${roundedAh} Ah Total Bank (${systemVoltage}V System)`;
        if (loadWatts > 2000) {
            batteryText = `${roundedAh} Ah (Req. ~${Math.ceil(numBatteries)} x 12V 150Ah Batteries)`;
        }

        // 3. DG Set Sizing:
        // High surge allowance is required (especially for industrial or commercial with aircons, motors)
        // Safety margin of 30-40% above maximum load
        let dgMargin = 1.3;
        if (facility === 'industrial') dgMargin = 1.5; // account for heavy inductive motor surges
        if (facility === 'commercial') dgMargin = 1.4;

        const dgVA = (loadWatts / powerFactor) * dgMargin;
        const dgkVA = Math.ceil((dgVA / 1000) * 2) / 2; // round to nearest 0.5 kVA

        // Update displays
        upsCapNode.textContent = upsText;
        batCapNode.textContent = batteryText;
        dgCapNode.textContent = `${dgkVA} kVA Silent DG Set`;
    }

    if (backupLoadSlider && backupTimeSlider && facilityTypeSelect) {
        backupLoadSlider.addEventListener('input', calculateBackup);
        backupTimeSlider.addEventListener('input', calculateBackup);
        facilityTypeSelect.addEventListener('change', calculateBackup);
        calculateBackup(); // Initial run
    }
}

/* ==========================================
   9. Premium Project Details Modal
   ========================================== */
function initProjectDetailsModal() {
    const modal = document.getElementById('project-details-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.project-modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Event delegation for project details button
    const grid = document.getElementById('solar-expanded-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-view-project-details');
            if (!btn) return;
            e.preventDefault();
            const projId = btn.getAttribute('data-project-id');
            const action = btn.getAttribute('data-action');
            if (action === 'gallery') {
                if (typeof window.openProjectGallery === 'function') {
                    window.openProjectGallery(projId);
                }
            } else {
                openProjectDetailsModal(projId);
            }
        });
    }
}

function openProjectDetailsModal(projId) {
    const modal = document.getElementById('project-details-modal');
    if (!modal) return;

    // Find the project data
    let foundProj = null;
    for (const cat in window.solarProjectsData) {
        const found = window.solarProjectsData[cat].find(p => p.id === projId);
        if (found) {
            foundProj = found;
            break;
        }
    }

    if (!foundProj) return;

    // Populate modal title and desc
    modal.querySelector('.project-modal-title').textContent = foundProj.name;
    modal.querySelector('.project-modal-desc').textContent = foundProj.desc;
    
    // Badges
    const badgeEl = modal.querySelector('.project-modal-badge');
    if (badgeEl) {
        badgeEl.textContent = foundProj.badge || "Solar EPC Project";
        badgeEl.style.display = foundProj.badge ? 'block' : 'none';
    }
    const capHighlightEl = modal.querySelector('.project-modal-cap-highlight');
    if (capHighlightEl) {
        capHighlightEl.textContent = foundProj.capacityHighlight || foundProj.capacity;
        capHighlightEl.style.display = (foundProj.capacityHighlight || foundProj.capacity) ? 'block' : 'none';
    }

    // Populate gallery slides
    const slidesContainer = modal.querySelector('.project-modal-slides');
    const dotsContainer = modal.querySelector('.project-modal-dots');
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    const bgSize = foundProj.bgSize || 'cover';
    foundProj.images.forEach((imgUrl, idx) => {
        const slide = document.createElement('div');
        slide.className = 'project-modal-slide';
        slide.style.backgroundImage = `url('${imgUrl}')`;
        slide.style.backgroundSize = bgSize;
        slide.style.backgroundRepeat = 'no-repeat';
        slide.style.backgroundPosition = 'center';
        slide.style.backgroundColor = '#070912';
        slidesContainer.appendChild(slide);

        if (foundProj.images.length > 1) {
            const dot = document.createElement('div');
            dot.className = `project-modal-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', idx);
            dotsContainer.appendChild(dot);
        }
    });

    // Toggle arrow navigation buttons
    const prevBtn = modal.querySelector('.project-modal-arrow.prev');
    const nextBtn = modal.querySelector('.project-modal-arrow.next');
    if (foundProj.images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        dotsContainer.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        dotsContainer.style.display = 'flex';
    }

    // Modal gallery slider logic
    let currentIndex = 0;
    const slides = modal.querySelectorAll('.project-modal-slide');
    const dots = modal.querySelectorAll('.project-modal-dot');

    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Remove old listeners to avoid multiple events firing
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    newNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = parseInt(dot.getAttribute('data-index'), 10);
            updateSlider();
        });
    });

    // Reset slider transform
    slidesContainer.style.transform = 'translateX(0)';

    // Populate specs grid
    const specsGrid = modal.querySelector('.project-modal-specs-grid');
    specsGrid.innerHTML = `
        <div class="project-modal-spec-item">
            <span class="project-modal-spec-label">Client</span>
            <span class="project-modal-spec-value">${foundProj.client}</span>
        </div>
        <div class="project-modal-spec-item">
            <span class="project-modal-spec-label">Capacity</span>
            <span class="project-modal-spec-value">${foundProj.capacity}</span>
        </div>
        <div class="project-modal-spec-item">
            <span class="project-modal-spec-label">Location</span>
            <span class="project-modal-spec-value">${foundProj.location}</span>
        </div>
        ${foundProj.date ? `
        <div class="project-modal-spec-item">
            <span class="project-modal-spec-label">Completion Date</span>
            <span class="project-modal-spec-value">${foundProj.date}</span>
        </div>
        ` : ''}
        ${foundProj.projectType ? `
        <div class="project-modal-spec-item" style="grid-column: span 2; border-left: 3px solid var(--color-blue);">
            <span class="project-modal-spec-label">Project Type</span>
            <span class="project-modal-spec-value" style="color: var(--color-blue);">${foundProj.projectType}</span>
        </div>
        ` : ''}
    `;

    // Configure Inquire button
    const inquireBtn = modal.querySelector('.btn-modal-inquire');
    if (inquireBtn) {
        // Clone and replace to prevent multiple listeners
        const newInquireBtn = inquireBtn.cloneNode(true);
        inquireBtn.parentNode.replaceChild(newInquireBtn, inquireBtn);
        
        newInquireBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Close modal
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Autofill inquiry form
                const serviceSelect = document.getElementById('form-service');
                if (serviceSelect) {
                    serviceSelect.value = 'solar';
                }
                const messageTextarea = document.getElementById('form-message');
                if (messageTextarea) {
                    messageTextarea.value = `I am interested in a solar EPC project similar to ${foundProj.name} (${foundProj.capacity} capacity). Please get in touch to discuss parameters.`;
                    messageTextarea.focus();
                }
            }
        });
    }

    // Configure WhatsApp button text or prefilled query
    const whatsappBtn = modal.querySelector('.btn-modal-whatsapp');
    if (whatsappBtn) {
        const text = encodeURIComponent(`Hello, I am interested in a Solar EPC project similar to ${foundProj.name} (${foundProj.capacity} capacity, ${foundProj.location}). Please share details.`);
        whatsappBtn.setAttribute('href', `https://wa.me/919822511373?text=${text}`);
    }

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* ==========================================
   10. Project Gallery Modal (Full-Screen Preview)
   ========================================== */
function initProjectGalleryModal() {
    const modal = document.getElementById('project-gallery-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.gallery-modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const zoomWrapper = modal.querySelector('.gallery-modal-zoom-wrapper');
    const zoomImg = modal.querySelector('.gallery-modal-img');
    const prevBtn = modal.querySelector('.gallery-modal-arrow.prev');
    const nextBtn = modal.querySelector('.gallery-modal-arrow.next');
    const zoomBtn = modal.querySelector('.gallery-modal-zoom-btn');
    const captionText = modal.querySelector('.gallery-modal-caption-text');
    const counterEl = modal.querySelector('.gallery-modal-counter');

    let currentProj = null;
    let currentIdx = 0;
    let isZoomed = false;

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    function resetZoom() {
        isZoomed = false;
        zoomWrapper.style.transform = 'scale(1)';
        zoomWrapper.style.cursor = 'zoom-in';
        zoomImg.style.transform = 'translate(0px, 0px)';
    }

    function toggleZoom() {
        isZoomed = !isZoomed;
        if (isZoomed) {
            zoomWrapper.style.transform = 'scale(2.2)';
            zoomWrapper.style.cursor = 'zoom-out';
        } else {
            resetZoom();
        }
    }

    if (zoomWrapper) {
        zoomWrapper.addEventListener('click', (e) => {
            if (e.target === zoomImg || e.target === zoomWrapper) {
                toggleZoom();
            }
        });
    }
    if (zoomBtn) {
        zoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleZoom();
        });
    }

    function showImage(idx) {
        if (!currentProj) return;
        currentIdx = (idx + currentProj.images.length) % currentProj.images.length;
        
        zoomImg.src = currentProj.images[currentIdx];
        
        // Captions
        const caption = (currentProj.captions && currentProj.captions[currentIdx]) || currentProj.name;
        captionText.textContent = caption;
        
        // Counter
        counterEl.textContent = `${currentIdx + 1} / ${currentProj.images.length}`;
        resetZoom();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIdx - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIdx + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            showImage(currentIdx - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentIdx + 1);
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Global helper function to open gallery directly
    window.openProjectGallery = function(projId, startIdx = 0) {
        // Find project data
        let foundProj = null;
        for (const cat in window.solarProjectsData) {
            const found = window.solarProjectsData[cat].find(p => p.id === projId);
            if (found) {
                foundProj = found;
                break;
            }
        }

        if (!foundProj) return;

        currentProj = foundProj;
        showImage(startIdx);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Wire up gallery modal triggers on portfolio cards
    const grid = document.getElementById('solar-expanded-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            // Find if click is inside image container
            const imgContainer = e.target.closest('.solar-subproject-img-container');
            if (!imgContainer) return;
            
            // Avoid triggering modal if clicking navigation components
            if (e.target.closest('.solar-gallery-arrow') || e.target.closest('.solar-gallery-dots')) {
                return;
            }

            e.preventDefault();
            const card = imgContainer.closest('.solar-subproject-card');
            if (!card) return;
            
            const projId = card.getAttribute('data-project-id');
            
            // Get current slide index from style transform
            const slidesWrapper = card.querySelector('.solar-subproject-slides');
            let startIdx = 0;
            if (slidesWrapper && slidesWrapper.style.transform) {
                const match = slidesWrapper.style.transform.match(/translateX\(-(\d+)%\)/);
                if (match && match[1]) {
                    startIdx = Math.round(parseInt(match[1], 10) / 100);
                }
            }

            window.openProjectGallery(projId, startIdx);
        });
    }
}

/* ==========================================
   7. Testimonials Carousel
   ========================================== */
function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-nav');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;

    // Create Navigation Dots dynamically
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Hide all slide elements physically to prevent overlap bugs
        slides.forEach(s => s.style.display = 'none');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].style.display = 'block';
        // Delay slight tick to allow display block to apply before transition
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 20);
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000); // changes every 6s
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Initialize slide displays
    slides.forEach((s, idx) => {
        if (idx !== 0) s.style.display = 'none';
    });

    startAutoPlay();
}

/* ==========================================
   8. Contact Inquiry Form & WhatsApp Actions
   ========================================== */
function initContactForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const service = document.getElementById('form-service').value;
        const message = document.getElementById('form-message').value.trim();

        // Perform basic verification
        if (!name || !email || !phone || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulating futuristic submission animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin" style="width:18px; height:18px; animation:spin 1s linear infinite;" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-opacity="0.3"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Transmission in progress...
        `;

        setTimeout(() => {
            // Visual success feedback
            submitBtn.style.background = '#00f5d4';
            submitBtn.style.color = '#020305';
            submitBtn.innerHTML = '✔ Inquiry Received Successfully';

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.innerHTML = originalText;
            }, 3000);
        }, 1800);
    });
}
