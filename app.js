// Sample products data
const sampleProducts = [
    {
        name: "Reusable Water Bottle",
        score: 8,
        explanation: "High sustainability score due to durable stainless steel construction and ability to replace hundreds of single-use bottles over its lifetime.",
        factors: ["Reusable", "Durable Materials", "Recyclable", "Reduces Waste"],
        recommendations: "Great choice! Consider using this daily to maximize environmental benefit."
    },
    {
        name: "Plastic Shopping Bag",
        score: 3,
        explanation: "Low score due to single-use design, petroleum-based materials, and significant environmental impact from production and disposal.",
        factors: ["Single-Use", "Non-Recyclable", "High Carbon Footprint", "Pollution Risk"],
        recommendations: "Consider switching to reusable cloth or canvas bags for shopping."
    },
    {
        name: "Organic Cotton T-Shirt", 
        score: 7,
        explanation: "Good sustainability score thanks to organic materials, responsible farming practices, and biodegradable fibers.",
        factors: ["Organic Materials", "Biodegradable", "Sustainable Farming", "Low Chemical Use"],
        recommendations: "Excellent choice! Look for fair trade certification for even better impact."
    },
    {
        name: "LED Light Bulb",
        score: 9,
        explanation: "Excellent score due to energy efficiency, long lifespan (25+ years), and significant reduction in electricity consumption.",
        factors: ["Energy Efficient", "Long Lasting", "Reduces Emissions", "Cost Effective"],
        recommendations: "Perfect sustainable choice! Replace all incandescent bulbs for maximum impact."
    },
    {
        name: "Disposable Coffee Cup",
        score: 2,
        explanation: "Very low score due to single-use design, mixed materials making recycling difficult, and high waste generation.",
        factors: ["Single-Use", "Difficult to Recycle", "Waste Generation", "Resource Intensive"],
        recommendations: "Switch to a reusable coffee cup or mug to dramatically improve your environmental impact."
    }
];

const sustainabilityMetrics = [
    "Carbon Footprint",
    "Water Usage", 
    "Material Sustainability",
    "Recyclability",
    "Durability & Lifespan",
    "Manufacturing Impact",
    "Transportation",
    "End-of-Life Disposal"
];

const faqData = [
    {
        question: "How accurate are the sustainability scores?",
        answer: "Our scores are based on comprehensive life-cycle assessment (LCA) data and 8 core environmental metrics. We continuously update our database with the latest research and certifications."
    },
    {
        question: "What factors determine a product's Green Score?",
        answer: "We evaluate carbon footprint, water usage, material sustainability, recyclability, durability, manufacturing impact, transportation, and end-of-life disposal."
    },
    {
        question: "Can I trust these scores for purchasing decisions?",
        answer: "Yes! Our methodology is transparent and based on scientific research. However, we recommend using scores as one factor in your decision-making process."
    },
    {
        question: "Do you store my photos?",
        answer: "No, we process photos temporarily for scoring and then delete them. We respect your privacy and don't store personal images."
    }
];

// DOM elements
let currentProduct = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeUploadFunctionality();
    initializeFAQ();
    initializeContactForm();
    populateMetrics();
    initializeSocialSharing();
    animateCounters();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
        });
    }

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
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // Main CTA buttons
    const scoreProductBtn = document.getElementById('score-product-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    
    if (scoreProductBtn) {
        scoreProductBtn.addEventListener('click', () => {
            const scoringSection = document.getElementById('scoring-tool');
            if (scoringSection) {
                scoringSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Upload functionality
function initializeUploadFunctionality() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const fileUploadBtn = document.getElementById('file-upload-btn');
    const cameraBtn = document.getElementById('camera-btn');
    const previewArea = document.getElementById('preview-area');
    const previewImage = document.getElementById('preview-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const tryAnotherBtn = document.getElementById('try-another-btn');

    // Check if all elements exist
    if (!uploadArea || !fileInput || !fileUploadBtn) {
        console.error('Upload elements not found');
        return;
    }

    // File upload button - ensure it triggers file input
    fileUploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
    });

    // Camera button
    if (cameraBtn && cameraInput) {
        cameraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            cameraInput.click();
        });
    }

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Upload area click (but not when clicking buttons)
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || e.target.closest('.upload-content')) {
            if (e.target !== fileUploadBtn && e.target !== cameraBtn) {
                fileInput.click();
            }
        }
    });

    // File input changes
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }

    // Analyze button
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            analyzeProduct();
        });
    }

    // Try another button
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', () => {
            resetUpload();
        });
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImage = document.getElementById('preview-image');
        const uploadArea = document.getElementById('upload-area');
        const previewArea = document.getElementById('preview-area');
        const resultsArea = document.getElementById('results-area');
        
        if (previewImage) {
            previewImage.src = e.target.result;
        }
        
        if (uploadArea) {
            uploadArea.classList.add('hidden');
        }
        
        if (previewArea) {
            previewArea.classList.remove('hidden');
        }
        
        if (resultsArea) {
            resultsArea.classList.add('hidden');
        }
    };
    reader.readAsDataURL(file);
}

function analyzeProduct() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsArea = document.getElementById('results-area');
    const previewArea = document.getElementById('preview-area');
    
    if (!analyzeBtn || !resultsArea) {
        return;
    }
    
    // Show loading state
    analyzeBtn.textContent = 'Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis delay
    setTimeout(() => {
        // Generate mock analysis
        currentProduct = generateMockAnalysis();
        displayResults(currentProduct);
        
        if (previewArea) {
            previewArea.classList.add('hidden');
        }
        resultsArea.classList.remove('hidden');
        
        // Reset button
        analyzeBtn.textContent = 'Analyze Product';
        analyzeBtn.disabled = false;
        
        // Update impact counters
        updateImpactCounters();
    }, 2000);
}

function generateMockAnalysis() {
    // Either pick a random sample product or generate a variation
    const baseProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    
    // Add some variation to make it feel more realistic
    const scoreVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const newScore = Math.max(1, Math.min(10, baseProduct.score + scoreVariation));
    
    return {
        ...baseProduct,
        score: newScore
    };
}

function displayResults(product) {
    const scoreCircle = document.getElementById('score-circle');
    const scoreNumber = document.getElementById('score-number');
    const productName = document.getElementById('product-name');
    const scoreExplanation = document.getElementById('score-explanation');
    const factorsList = document.getElementById('factors-list');
    const recommendations = document.getElementById('recommendations');
    
    if (!scoreCircle || !scoreNumber || !productName || !scoreExplanation || !factorsList || !recommendations) {
        console.error('Results elements not found');
        return;
    }
    
    // Set score with color coding
    scoreNumber.textContent = product.score;
    
    // Remove existing score classes
    scoreCircle.classList.remove('low', 'medium', 'high');
    
    // Add appropriate score class
    if (product.score <= 4) {
        scoreCircle.classList.add('low');
    } else if (product.score <= 7) {
        scoreCircle.classList.add('medium');
    } else {
        scoreCircle.classList.add('high');
    }
    
    // Set content
    productName.textContent = product.name;
    scoreExplanation.textContent = product.explanation;
    recommendations.textContent = product.recommendations;
    
    // Clear and populate factors
    factorsList.innerHTML = '';
    product.factors.forEach(factor => {
        const factorTag = document.createElement('div');
        factorTag.className = 'factor-tag';
        factorTag.textContent = factor;
        factorsList.appendChild(factorTag);
    });
}

function resetUpload() {
    const uploadArea = document.getElementById('upload-area');
    const previewArea = document.getElementById('preview-area');
    const resultsArea = document.getElementById('results-area');
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    
    if (uploadArea) {
        uploadArea.classList.remove('hidden');
    }
    if (previewArea) {
        previewArea.classList.add('hidden');
    }
    if (resultsArea) {
        resultsArea.classList.add('hidden');
    }
    if (fileInput) {
        fileInput.value = '';
    }
    if (cameraInput) {
        cameraInput.value = '';
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqList = document.getElementById('faq-list');
    
    if (!faqList) {
        console.error('FAQ list element not found');
        return;
    }
    
    faqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <button class="faq-question" aria-expanded="false">
                ${faq.question}
                <span class="faq-toggle">+</span>
            </button>
            <div class="faq-answer hidden">
                ${faq.answer}
            </div>
        `;
        
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                const itemQuestion = item.querySelector('.faq-question');
                if (itemAnswer) itemAnswer.classList.add('hidden');
                if (itemQuestion) itemQuestion.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.classList.remove('hidden');
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        faqList.appendChild(faqItem);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// Populate sustainability metrics
function populateMetrics() {
    const metricsGrid = document.getElementById('metrics-grid');
    
    if (!metricsGrid) {
        console.error('Metrics grid not found');
        return;
    }
    
    sustainabilityMetrics.forEach(metric => {
        const metricItem = document.createElement('div');
        metricItem.className = 'metric-item';
        metricItem.textContent = metric;
        metricsGrid.appendChild(metricItem);
    });
}

// Social sharing functionality
function initializeSocialSharing() {
    const twitterBtn = document.getElementById('share-twitter');
    const facebookBtn = document.getElementById('share-facebook');
    
    if (twitterBtn) {
        twitterBtn.addEventListener('click', () => {
            const text = currentProduct ? 
                `I just scored a ${currentProduct.name} with GreenScore: ${currentProduct.score}/10! Make sustainable choices with confidence.` :
                'Make sustainable choices with confidence using GreenScore - instantly rate any product\'s environmental impact!';
            
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
        });
    }
}

// Animate counters
function animateCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    
    if (numericValue > 0) {
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 30);
    }
}

// Update impact counters after scoring
function updateImpactCounters() {
    const productsScored = document.getElementById('products-scored');
    const bottlesAvoided = document.getElementById('bottles-avoided');
    
    if (productsScored && bottlesAvoided) {
        // Simulate slight increases
        setTimeout(() => {
            const currentProducts = parseInt(productsScored.textContent.replace(/[^\d]/g, ''));
            const currentBottles = parseInt(bottlesAvoided.textContent.replace(/[^\d]/g, ''));
            
            productsScored.textContent = (currentProducts + 1).toLocaleString() + '+';
            
            if (currentProduct && currentProduct.score >= 7) {
                bottlesAvoided.textContent = (currentBottles + Math.floor(Math.random() * 5) + 1).toLocaleString() + '+';
            }
        }, 500);
    }
}

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Add some subtle animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const slideUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply slide-up animation to cards and sections
setTimeout(() => {
    document.querySelectorAll('.card, .step-card, .mission-stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        slideUpObserver.observe(el);
    });
}, 100);