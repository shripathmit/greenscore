// Sustainability Dashboard Interactive Features

class SustainabilityDashboard {
    constructor() {
        this.analysisCards = document.querySelectorAll('.analysis-card');
        this.progressBars = document.querySelectorAll('.progress-fill, .score-bar-fill');
        this.init();
    }

    init() {
        this.setupCardInteractions();
        this.animateProgressBars();
        this.setupAccessibility();
        this.expandAllSections();
        setTimeout(() => {
            this.animateScoreOnLoad();
        }, 300);
    }

    setupCardInteractions() {
        this.analysisCards.forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            const cardHeader = card.querySelector('.card-header');
            const toggleCard = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCardExpansion(card);
            };
            if (expandBtn) {
                expandBtn.addEventListener('click', toggleCard);
            }
            if (cardHeader) {
                cardHeader.addEventListener('click', toggleCard);
                cardHeader.style.cursor = 'pointer';
            }
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleCardExpansion(card);
                }
            });
            card.setAttribute('tabindex', '0');
        });
    }

    toggleCardExpansion(card) {
        const isExpanded = card.classList.contains('expanded');
        const content = card.querySelector('.card-content');
        const expandBtn = card.querySelector('.expand-btn');

        if (isExpanded) {
            card.classList.remove('expanded');
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            if (expandBtn) expandBtn.setAttribute('aria-expanded', 'false');
        } else {
            card.classList.add('expanded');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.paddingTop = 'var(--space-20)';
            content.style.paddingBottom = 'var(--space-20)';
            if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
            this.analysisCards.forEach(other => {
                if (other !== card && other.classList.contains('expanded')) {
                    this.toggleCardExpansion(other);
                }
            });
        }

        if (!isExpanded) {
            setTimeout(() => {
                const rect = card.getBoundingClientRect();
                const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                if (!isFullyVisible) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }

    animateProgressBars() {
        const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        this.progressBars.forEach(bar => observer.observe(bar));
    }

    animateProgressBar(progressBar) {
        const score = progressBar.getAttribute('data-score');
        if (!score) return;
        const percentage = (parseInt(score) / 10) * 100;
        progressBar.style.width = '0%';
        requestAnimationFrame(() => {
            progressBar.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            progressBar.style.width = percentage + '%';
        });
    }

    animateScoreOnLoad() {
        const mainScoreProgress = document.querySelector('.score-section .progress-fill');
        if (mainScoreProgress) this.animateProgressBar(mainScoreProgress);
        const sectionScoreBars = document.querySelectorAll('.score-bar-fill');
        sectionScoreBars.forEach((bar, index) => {
            setTimeout(() => this.animateProgressBar(bar), index * 200);
        });
    }

    setupAccessibility() {
        this.analysisCards.forEach((card, index) => {
            const title = card.querySelector('h4')?.textContent || `Analysis section ${index + 1}`;
            const expandBtn = card.querySelector('.expand-btn');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Expand ${title} analysis`);
            if (expandBtn) {
                expandBtn.setAttribute('aria-expanded', 'false');
                expandBtn.setAttribute('aria-label', `Toggle ${title} details`);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const focusableArray = Array.from(focusableElements);
        const currentIndex = focusableArray.indexOf(document.activeElement);
        if (e.shiftKey) {
            if (currentIndex === 0) {
                e.preventDefault();
                focusableArray[focusableArray.length - 1].focus();
            }
        } else {
            if (currentIndex === focusableArray.length - 1) {
                e.preventDefault();
                focusableArray[0].focus();
            }
        }
    }

    expandSection(sectionName) {
        const card = document.querySelector(`[data-section="${sectionName}"]`);
        if (card && !card.classList.contains('expanded')) {
            this.toggleCardExpansion(card);
        }
    }

    expandAllSections() {
        this.analysisCards.forEach(card => {
            if (!card.classList.contains('expanded')) {
                card.classList.add('expanded');
                const content = card.querySelector('.card-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    content.style.paddingTop = 'var(--space-20)';
                    content.style.paddingBottom = 'var(--space-20)';
                }
                const expandBtn = card.querySelector('.expand-btn');
                if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }

    getAnalysisData() {
        const data = { overallScore: 7, sections: {} };
        this.analysisCards.forEach(card => {
            const sectionName = card.getAttribute('data-section');
            const scoreElement = card.querySelector('.score-value');
            const isExpanded = card.classList.contains('expanded');
            if (sectionName && scoreElement) {
                data.sections[sectionName] = {
                    score: parseInt(scoreElement.textContent),
                    expanded: isExpanded
                };
            }
        });
        return data;
    }
}

class UserExperienceEnhancements {
    static addHoverEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('expanded')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }

    static addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    static addLoadingAnimations() {
        const cards = document.querySelectorAll('.analysis-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loading-overlay');
    if (sessionStorage.getItem('showSpinner') === 'true' && overlay) {
        overlay.style.display = 'flex';
    }

    const stored = sessionStorage.getItem('analysisResult');
    let titleFromResult = '';
    if (stored) {
        const parsed = parseAnalysisText(stored);
        titleFromResult = extractTitle(stored);
        const rationale = document.querySelector('.score-rationale');
        if (rationale) rationale.textContent = parsed.rationale || stored;
        if (parsed.score) {
            const scoreNumber = document.querySelector('.score-number');
            const progress = document.querySelector('.score-section .progress-fill');
            if (scoreNumber) scoreNumber.textContent = parsed.score;
            if (progress) progress.setAttribute('data-score', parsed.score);
        }

        const sections = ['materials','manufacturing','design','finishing','endoflife'];
        sections.forEach(key => {
            const data = parsed[key];
            if (data) {
                const card = document.querySelector(`.analysis-card[data-section="${key}"]`);
                if (card) {
                    const a = card.querySelector('.assumption');
                    const e = card.querySelector('.evaluation');
                    const sv = card.querySelector('.score-value');
                    const sb = card.querySelector('.score-bar-fill');
                    if (a && data.assumption) {
                        a.innerHTML = `<strong>Assumption:</strong> ${data.assumption}`;
                    }
                    if (e && data.evaluation) {
                        e.innerHTML = `<strong>Evaluation:</strong> ${data.evaluation}`;
                    }
                    if (sv && data.score !== undefined) {
                        sv.textContent = data.score;
                    }
                    if (sb && data.score !== undefined) {
                        sb.setAttribute('data-score', data.score);
                    }
                }
            }
        });
    }

    const storedName = sessionStorage.getItem('productName');
    const productName = titleFromResult || storedName;
    if (productName) {
        const titleEl = document.getElementById('image-title');
        if (titleEl) titleEl.textContent = productName;
        document.title = `Product Sustainability Analysis - ${productName}`;
    }

    const preview = sessionStorage.getItem('imagePreview');
    if (preview) {
        const img = document.getElementById('product-thumbnail');
        if (img) img.src = preview;
    }

    const dashboard = new SustainabilityDashboard();
    UserExperienceEnhancements.addHoverEffects();
    UserExperienceEnhancements.addSmoothScrolling();
    UserExperienceEnhancements.addLoadingAnimations();
    window.sustainabilityDashboard = dashboard;

    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Dashboard loaded in ${Math.round(loadTime)}ms`);
        });
    }

    if (overlay) {
        overlay.style.display = 'none';
    }
    sessionStorage.removeItem('showSpinner');
});

window.addEventListener('resize', function() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
        const expandedCards = document.querySelectorAll('.analysis-card.expanded');
        expandedCards.forEach(card => {
            const content = card.querySelector('.card-content');
            if (content) {
                content.style.maxHeight = 'none';
                const height = content.scrollHeight;
                content.style.maxHeight = height + 'px';
            }
        });
    }, 250);
});

window.addEventListener('error', function(e) {
    console.error('Dashboard Error:', e.error);
});

function parseAnalysisText(text) {
    const sections = {};
    const lines = text.split(/\n+/);
    let current = null;
    lines.forEach(line => {
        if (!line) return;
        let trimmed = line.trim();
        if (!trimmed) return;
        trimmed = trimmed.replace(/^[-\u2022]\s*/, '').replace(/^#+\s*/, '');
        const lower = trimmed.toLowerCase();

        if (lower.startsWith('materials')) {
            current = 'materials';
            if (!sections[current]) sections[current] = {};
            return;
        }
        if (lower.startsWith('manufacturing')) {
            current = 'manufacturing';
            if (!sections[current]) sections[current] = {};
            return;
        }
        if (lower.startsWith('design')) {
            current = 'design';
            if (!sections[current]) sections[current] = {};
            return;
        }
        if (lower.startsWith('finishing')) {
            current = 'finishing';
            if (!sections[current]) sections[current] = {};
            return;
        }
        if (lower.startsWith('end of life')) {
            current = 'endoflife';
            if (!sections[current]) sections[current] = {};
            return;
        }
        if (lower.startsWith('greenscore')) {
            const m = trimmed.match(/(\d+(?:\.\d+)?)/);
            if (m) sections.score = parseFloat(m[1]);
            const rest = trimmed.replace(/^greenscore\s*:?\s*/i, '')
                .replace(/estimated\s*/i, '')
                .replace(/(\d+(?:\.\d+)?)(?:\s*\/\s*\d+)?/, '')
                .trim();
            if (rest) sections.rationale = rest;
            current = 'rationale';
            return;
        }
        if (lower.startsWith('rationale')) {
            sections.rationale = trimmed.replace(/^rationale\s*:?\s*/i, '');
            current = 'rationale';
            return;
        }

        if (current) {
            if (current === 'rationale') {
                sections.rationale = (sections.rationale ? sections.rationale + ' ' : '') + trimmed;
                return;
            }
            if (/^\*?assumption\*?/i.test(trimmed)) {
                if (!sections[current]) sections[current] = {};
                sections[current].assumption = trimmed.replace(/^\*?assumption\*?\s*:?\s*/i, '');
                return;
            }
            if (/^\*?evaluation\*?/i.test(trimmed)) {
                if (!sections[current]) sections[current] = {};
                sections[current].evaluation = trimmed.replace(/^\*?evaluation\*?\s*:?\s*/i, '');
                return;
            }
            if (/^\*?score\*?/i.test(trimmed)) {
                if (!sections[current]) sections[current] = {};
                const m = trimmed.match(/\*?score\*?\s*:?\s*(\d+(?:\.\d+)?)(?:\s*\/\s*10)?/i);
                if (m) sections[current].score = parseFloat(m[1]);
                return;
            }
            const sub = trimmed.match(/^([^:]+?)\s*(?:score)?\s*:?\s*(\d+(?:\.\d+)?)(?:\s*\/\s*10)?$/i);
            if (sub) {
                if (!sections[current]) sections[current] = {};
                if (!sections[current].subscores) sections[current].subscores = {};
                const name = sub[1].replace(/\*+/g, '').trim().toLowerCase();
                sections[current].subscores[name] = parseFloat(sub[2]);
                return;
            }
            if (!sections[current]) sections[current] = {};
            sections[current].extra = (sections[current].extra ? sections[current].extra + ' ' : '') + trimmed;
        }
    });
    return sections;
}

function extractTitle(text) {
    const lines = text.split(/\n+/);
    for (const line of lines) {
        const m = line.match(/Sustainability Analysis of(?: the)?\s*(.+)/i);
        if (m && m[1]) {
            return m[1].replace(/[\*#]/g, '').trim();
        }
    }
    return '';
}
