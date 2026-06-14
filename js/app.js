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
    ev: {
        title: "EV Charging Infrastructure",
        desc: "Empowering electric mobility with advanced charging systems, centralized fleet hubs, and certified safety-compliant installation networks.",
        themeColor: "linear-gradient(135deg, #00f5d4, #00bbf9)",
        themeTextColor: "#00f5d4",
        details: [
            { icon: "🔌", title: "Commercial Charging Stations", desc: "Dual gun AC and DC fast chargers integrated with seamless digital payment interfaces." },
            { icon: "🚚", title: "Fleet Charging Solutions", desc: "Dedicated high-current charging yards for electric logistics, buses, and corporate fleets." },
            { icon: "⚡", title: "High-Speed DC Fast Chargers", desc: "CCS2, CHAdeMO, and GB/T standard ultra-fast chargers from 30kW up to 240kW." },
            { icon: "📊", title: "CMS Management Software", desc: "Cloud-based tracking for station availability, energy utilization, and bill generation." }
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
function initPortfolio() {
    const filters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

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
        });
    });
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
    const solarCostNode = document.getElementById('solar-res-cost');
    const solarSavingsNode = document.getElementById('solar-res-savings');
    const solarRoiNode = document.getElementById('solar-res-roi');
    const solarCarbonNode = document.getElementById('solar-res-carbon');

    function calculateSolar() {
        const monthlyBill = parseInt(solarBillSlider.value, 10);
        const roofArea = parseInt(solarAreaSlider.value, 10);

        // Update displayed values
        solarBillVal.textContent = monthlyBill.toLocaleString('en-IN');
        solarAreaVal.textContent = roofArea.toLocaleString('en-IN');

        // General Math Model:
        // 1. Calculate required capacity based on bill:
        // Average unit cost in India ~ 8 INR
        // Monthly units consumed = Monthly bill / 8
        // 1 kW Solar produces roughly 120 units per month
        // Suggested solar capacity = Monthly units consumed / 120
        const tariff = 8;
        const monthlyUnits = monthlyBill / tariff;
        const requiredCapacity = monthlyUnits / 120; // in kW

        // 2. Area limitation check:
        // 1 kW Solar requires roughly 100 sq.ft
        const maxCapacityFromArea = roofArea / 100;

        // Suggested system size is the minimum of required vs area limit, rounded to 1 decimal place
        let systemCapacity = Math.min(requiredCapacity, maxCapacityFromArea);
        if (systemCapacity < 1) systemCapacity = 1; // min 1kW
        systemCapacity = Math.round(systemCapacity * 10) / 10;

        // Costs (Average system cost around 65,000 INR per kW for small, 50,000 INR for larger scale)
        const costPerKw = systemCapacity > 10 ? 55000 : 65000;
        const totalCost = Math.round(systemCapacity * costPerKw);

        // Annual Savings: System kW * 120 units/month * 12 months * unit price
        const annualUnits = systemCapacity * 120 * 12;
        const annualSavings = Math.round(annualUnits * tariff);

        // ROI Duration: Total Cost / Annual Savings
        const roi = Math.round((totalCost / (annualSavings || 1)) * 10) / 10;

        // Carbon Offset: ~0.8 tonnes (800kg) CO2 reduced per 1 kW solar per year
        const carbonOffset = Math.round(systemCapacity * 0.82 * 10) / 10;

        // Update displays
        solarCapNode.textContent = `${systemCapacity} kW`;
        solarCostNode.textContent = `₹ ${totalCost.toLocaleString('en-IN')}`;
        solarSavingsNode.textContent = `₹ ${annualSavings.toLocaleString('en-IN')}`;
        solarRoiNode.textContent = `${roi} Years`;
        solarCarbonNode.textContent = `${carbonOffset} Tonnes / Yr`;
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
