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
        explanation: "Low score due to single-use design, petroleum-based materials and significant environmental impact from production and disposal.",
        factors: ["Single-Use", "Non-Recyclable", "High Carbon Footprint", "Pollution Risk"],
        recommendations: "Consider switching to reusable cloth or canvas bags for shopping."
    },
    {
        name: "Organic Cotton T-Shirt", 
        score: 7,
        explanation: "Good sustainability score thanks to organic materials, responsible farming practices and biodegradable fibers.",
        factors: ["Organic Materials", "Biodegradable", "Sustainable Farming", "Low Chemical Use"],
        recommendations: "Excellent choice! Look for fair trade certification for even better impact."
    },
    {
        name: "LED Light Bulb",
        score: 9,
        explanation: "Excellent score due to energy efficiency, long lifespan (25+ years) and significant reduction in electricity consumption.",
        factors: ["Energy Efficient", "Long Lasting", "Reduces Emissions", "Cost Effective"],
        recommendations: "Perfect sustainable choice! Replace all incandescent bulbs for maximum impact."
    },
    {
        name: "Disposable Coffee Cup",
        score: 2,
        explanation: "Very low score due to single-use design, mixed materials making recycling difficult and high waste generation.",
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
        question: "How accurate are the AI sustainability scores?",
        answer: "Our neural networks are trained on comprehensive life-cycle assessment (LCA) data and 8 core environmental metrics. We continuously update our AI models with the latest research, certifications, and environmental data."
    },
    {
        question: "What factors determine a product's AI-generated Green Score?",
        answer: "Our machine learning algorithms evaluate carbon footprint, water usage, material sustainability, recyclability, durability, manufacturing impact, transportation, and end-of-life disposal through advanced pattern recognition."
    },
    {
        question: "Can I trust these AI scores for purchasing decisions?",
        answer: "Yes! Our AI methodology is transparent and based on scientific research. Our neural networks achieve 94% accuracy in sustainability assessment. However, we recommend using scores as one factor in your decision-making process."
    },
    {
        question: "Do you store my photos in the AI system?",
        answer: "No, we process photos temporarily for AI analysis and then delete them. We respect your privacy and don't store personal images in our neural networks or databases."
    }
];

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        const numParticles = Math.min(80, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? 'rgba(50, 184, 198, ' : 'rgba(76, 175, 80, '
            });
        }
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                particle.vx += dx * 0.00005;
                particle.vy += dy * 0.00005;
            }
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(50, 184, 198, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + (particle.opacity * 0.3) + ')';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// DOM elements
let currentProduct = null;
let particleSystem = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    particleSystem = new ParticleSystem();
    
    // Initialize functionality with delay to ensure DOM is ready
    setTimeout(() => {
        initializeNavigation();
        initializeUploadFunctionality();
        initializeFAQ();
        initializeContactForm();
        populateMetrics();
        initializeSocialSharing();
        animateCounters();
        initializeVisualEffects();
        initializeScrollAnimations();
    }, 100);
});

// Visual Effects Initialization
function initializeVisualEffects() {
    // Add floating animations to cards
    const floatingElements = document.querySelectorAll('.floating-card');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize neural pulse effects
    const neuralElements = document.querySelectorAll('.neural-pulse');
    neuralElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Add hover effects to tech elements
    const techElements = document.querySelectorAll('.tech-glow');
    techElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 25px rgba(50, 184, 198, 0.6)';
            element.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '0 0 15px rgba(50, 184, 198, 0.3)';
            element.style.transform = 'scale(1)';
        });
    });
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for certain elements
                if (entry.target.classList.contains('glow-text')) {
                    entry.target.style.textShadow = '0 0 20px rgba(50, 184, 198, 0.5)';
                }
            }
        });
    }, observerOptions);
    
    // Apply to elements that should animate on scroll
    setTimeout(() => {
        document.querySelectorAll('.step-card, .mission-stat, .faq-item, .glassmorphism-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }, 100);
}

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
        scoreProductBtn.addEventListener('click', (e) => {
            e.preventDefault();
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
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
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

    // Ensure buttons are enabled and working
    fileUploadBtn.disabled = false;
    if (cameraBtn) cameraBtn.disabled = false;
    if (analyzeBtn) analyzeBtn.disabled = false;

    // File upload button - ensure it triggers file input
    fileUploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('File upload button clicked');
        fileInput.click();
    });

    // Camera button
    if (cameraBtn && cameraInput) {
        cameraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Camera button clicked');
            cameraInput.click();
        });
    }

    // Drag and drop functionality with enhanced visual feedback
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
        uploadArea.style.boxShadow = '0 0 30px rgba(50, 184, 198, 0.4)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        uploadArea.style.boxShadow = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        uploadArea.style.boxShadow = '';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Upload area click (but not when clicking buttons)
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || e.target.closest('.upload-content')) {
            if (!e.target.closest('button')) {
                console.log('Upload area clicked');
                fileInput.click();
            }
        }
    });

    // File input changes
    fileInput.addEventListener('change', (e) => {
        console.log('File input changed');
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
            console.log('Camera input changed');
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }

    // Analyze button with enhanced animation
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Analyze button clicked');
            analyzeProduct();
        });
    }

    // Try another button
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetUpload();
        });
    }
}

function handleFile(file) {
    console.log('Handling file:', file.name);
    
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
            console.log('Preview image set');
        }
        
        if (uploadArea) {
            uploadArea.classList.add('hidden');
        }
        
        if (previewArea) {
            previewArea.classList.remove('hidden');
            // Add scanning animation
            const scanningOverlay = previewArea.querySelector('.scanning-overlay');
            if (scanningOverlay) {
                scanningOverlay.style.display = 'block';
            }
        }
        
        if (resultsArea) {
            resultsArea.classList.add('hidden');
        }
        
        // Ensure analyze button is enabled
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
            analyzeBtn.style.pointerEvents = 'auto';
        }
    };
    reader.readAsDataURL(file);
}

function analyzeProduct() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsArea = document.getElementById('results-area');
    const previewArea = document.getElementById('preview-area');
    
    if (!analyzeBtn || !resultsArea) {
        console.error('Required elements not found for analysis');
        return;
    }
    
    console.log('Starting AI analysis...');
    
    // Show enhanced loading state
    analyzeBtn.textContent = 'AI Processing...';
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('loading');
    
    // Add neural processing animation
    analyzeBtn.style.background = 'linear-gradient(90deg, rgba(50, 184, 198, 0.8), rgba(76, 175, 80, 0.8), rgba(50, 184, 198, 0.8))';
    analyzeBtn.style.backgroundSize = '200% 100%';
    analyzeBtn.style.animation = 'neuralProcessing 2s ease-in-out infinite';
    
    // Simulate analysis delay with visual feedback
    setTimeout(() => {
        // Generate mock analysis
        currentProduct = generateMockAnalysis();
        displayResults(currentProduct);
        
        if (previewArea) {
            previewArea.classList.add('hidden');
        }
        resultsArea.classList.remove('hidden');
        
        // Reset button with success animation
        analyzeBtn.textContent = 'AI Analysis Complete';
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('loading');
        analyzeBtn.style.background = '';
        analyzeBtn.style.animation = '';
        
        // Update impact counters
        updateImpactCounters();
        
        // Add success glow effect
        resultsArea.style.boxShadow = '0 0 30px rgba(50, 184, 198, 0.3)';
        setTimeout(() => {
            resultsArea.style.boxShadow = '';
        }, 2000);
        
        console.log('AI analysis complete');
        
    }, 3000);
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
    
    // Animate score reveal
    let currentScore = 0;
    const targetScore = product.score;
    const scoreAnimation = setInterval(() => {
        currentScore += 0.2;
        scoreNumber.textContent = Math.floor(currentScore);
        
        if (currentScore >= targetScore) {
            scoreNumber.textContent = targetScore;
            clearInterval(scoreAnimation);
        }
    }, 50);
    
    // Remove existing score classes
    scoreCircle.classList.remove('low', 'medium', 'high');
    
    // Add appropriate score class with delay for animation
    setTimeout(() => {
        if (product.score <= 4) {
            scoreCircle.classList.add('low');
        } else if (product.score <= 7) {
            scoreCircle.classList.add('medium');
        } else {
            scoreCircle.classList.add('high');
        }
    }, 1000);
    
    // Set content with typewriter effect
    productName.textContent = product.name;
    typeWriter(scoreExplanation, product.explanation, 30);
    typeWriter(recommendations, product.recommendations, 30);
    
    // Clear and populate factors with staggered animation
    factorsList.innerHTML = '';
    product.factors.forEach((factor, index) => {
        setTimeout(() => {
            const factorTag = document.createElement('div');
            factorTag.className = 'factor-tag';
            factorTag.textContent = factor;
            factorTag.style.opacity = '0';
            factorTag.style.transform = 'translateY(20px)';
            factorsList.appendChild(factorTag);
            
            // Animate in
            setTimeout(() => {
                factorTag.style.opacity = '1';
                factorTag.style.transform = 'translateY(0)';
                factorTag.style.transition = 'all 0.3s ease';
            }, 50);
        }, index * 200);
    });
}

// Typewriter effect for text
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

function resetUpload() {
    const uploadArea = document.getElementById('upload-area');
    const previewArea = document.getElementById('preview-area');
    const resultsArea = document.getElementById('results-area');
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    
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
    if (analyzeBtn) {
        analyzeBtn.textContent = 'Initiate AI Analysis';
        analyzeBtn.disabled = false;
    }
    
    console.log('Upload reset');
}

// FAQ functionality with enhanced animations
function initializeFAQ() {
    const faqList = document.getElementById('faq-list');
    
    if (!faqList) {
        console.error('FAQ list element not found');
        return;
    }
    
    faqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item glassmorphism-card';
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
            
            // Close all FAQ items with animation
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                const itemQuestion = item.querySelector('.faq-question');
                if (itemAnswer) {
                    itemAnswer.classList.add('hidden');
                    itemAnswer.style.maxHeight = '0';
                }
                if (itemQuestion) itemQuestion.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item with enhanced animation
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
                
                // Add glow effect
                faqItem.style.boxShadow = '0 0 20px rgba(50, 184, 198, 0.2)';
                setTimeout(() => {
                    faqItem.style.boxShadow = '';
                }, 1000);
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
        
        // Simulate form submission with enhanced feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Transmitting...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(90deg, rgba(50, 184, 198, 0.8), rgba(76, 175, 80, 0.8))';
            submitBtn.style.animation = 'neuralProcessing 1s ease-in-out infinite';
            
            setTimeout(() => {
                alert('Message transmitted successfully! Our AI team will respond soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.animation = '';
                
                // Success glow effect
                contactForm.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.3)';
                setTimeout(() => {
                    contactForm.style.boxShadow = '';
                }, 2000);
            }, 2000);
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
    
    sustainabilityMetrics.forEach((metric, index) => {
        const metricItem = document.createElement('div');
        metricItem.className = 'metric-item';
        metricItem.textContent = metric;
        metricItem.style.animationDelay = `${index * 0.1}s`;
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
                `🤖🌍 I just scored a ${currentProduct.name} with AI-powered GreenScore: ${currentProduct.score}/10! Experience the future of sustainable shopping with artificial intelligence.` :
                '🤖🌍 Discover the future of sustainable shopping with AI-powered GreenScore - where artificial intelligence meets environmental consciousness!';
            
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

// Animate counters with enhanced effects
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
    
    document.querySelectorAll('.stat-number, .glow-number').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    
    if (numericValue > 0) {
        let current = 0;
        const increment = numericValue / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = target;
                clearInterval(timer);
                
                // Add completion glow effect
                element.style.textShadow = '0 0 25px rgba(50, 184, 198, 0.8)';
                setTimeout(() => {
                    element.style.textShadow = '0 0 15px rgba(50, 184, 198, 0.5)';
                }, 500);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 25);
    }
}

// Update impact counters after scoring
function updateImpactCounters() {
    const productsScored = document.getElementById('products-scored');
    const bottlesAvoided = document.getElementById('bottles-avoided');
    
    if (productsScored && bottlesAvoided) {
        // Simulate slight increases with animation
        setTimeout(() => {
            const currentProducts = parseInt(productsScored.textContent.replace(/[^\d]/g, ''));
            const currentBottles = parseInt(bottlesAvoided.textContent.replace(/[^\d]/g, ''));
            
            // Animate increment
            animateIncrement(productsScored, currentProducts, currentProducts + 1, '+');
            
            if (currentProduct && currentProduct.score >= 7) {
                const bottleIncrease = Math.floor(Math.random() * 5) + 1;
                animateIncrement(bottlesAvoided, currentBottles, currentBottles + bottleIncrease, '+');
            }
        }, 1000);
    }
}

function animateIncrement(element, start, end, suffix) {
    let current = start;
    const increment = (end - start) / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString() + suffix;
            clearInterval(timer);
            
            // Flash effect
            element.style.color = 'rgba(76, 175, 80, 1)';
            element.style.textShadow = '0 0 20px rgba(76, 175, 80, 0.8)';
            setTimeout(() => {
                element.style.color = '';
                element.style.textShadow = '0 0 15px rgba(50, 184, 198, 0.5)';
            }, 1000);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 50);
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes neuralProcessing {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes dataFlow {
        0% { transform: translateX(-100%) translateY(0); }
        50% { transform: translateX(0) translateY(-10px); }
        100% { transform: translateX(100%) translateY(0); }
    }
    
    @keyframes consciousPulse {
        0%, 100% { 
            box-shadow: 0 0 15px rgba(50, 184, 198, 0.3);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 25px rgba(76, 175, 80, 0.5);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);

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

// Add environmental consciousness to scroll behavior
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Initialize consciousness - Easter egg for environmental awareness
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('glow-text')) {
        clickCount++;
        if (clickCount === 7) {
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                z-index: 10000;
                font-size: 18px;
                box-shadow: 0 0 30px rgba(50, 184, 198, 0.5);
            `;
            message.innerHTML = `
                <h3>🤖🌍 AI Consciousness Activated</h3>
                <p>Every choice you make echoes through the digital-biological continuum.</p>
                <p>Together, we are building a sustainable future where technology and nature coexist in harmony.</p>
                <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; background: linear-gradient(45deg, #32B8C6, #4CAF50); border: none; border-radius: 5px; color: white; cursor: pointer;">Understood</button>
            `;
            document.body.appendChild(message);
            clickCount = 0;
        }
    }
});

console.log('🤖🌍 GreenScore AI initialized - Where artificial intelligence meets environmental consciousness');
console.log('Neural networks online. Sustainability algorithms loaded. Ready to analyze the future.');