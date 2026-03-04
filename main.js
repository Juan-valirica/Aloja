/* =====================================================
   ALOJA GROUP - SCROLL ANIMATIONS
   Clean, Fluid, Professional - No Parallax Glitches
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       ENABLE ANIMATIONS - Add js-ready class to body
       ===================================================== */

    document.documentElement.classList.add('js-ready');

    /* =====================================================
       CONFIG
       ===================================================== */

    const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

    /* =====================================================
       HERO - SMOOTH FADE TRANSITION (Black to White)
       ===================================================== */

    const heroSection = document.querySelector('.hero-section');
    const logoContainer = document.querySelector('.logo-container');
    const heroScrollHint = document.querySelector('.hero-scroll-hint');
    const heroBg = document.querySelector('.hero-bg');

    if (heroSection && logoContainer) {
        const heroHeight = window.innerHeight;

        // Smoothing variables for fluid animation
        let currentProgress = 0;
        let targetProgress = 0;
        let rafId = null;

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const updateHero = () => {
            // Smooth interpolation for fluid motion
            currentProgress = lerp(currentProgress, targetProgress, 0.08);

            // Clamp to prevent tiny oscillations
            if (Math.abs(currentProgress - targetProgress) < 0.001) {
                currentProgress = targetProgress;
            }

            const progress = currentProgress;

            // Phase 1: Logo fade out (0 - 0.6 progress)
            const logoProgress = Math.min(progress / 0.6, 1);

            // Smooth logo transformations
            const scale = 1 + (logoProgress * 0.15);
            const blur = logoProgress * 20;
            const logoOpacity = 1 - logoProgress;

            logoContainer.style.transform = `scale(${scale})`;
            logoContainer.style.filter = `blur(${blur}px)`;
            logoContainer.style.opacity = logoOpacity;

            // Phase 2: Background transition from black to white (0.3 - 0.9)
            const bgProgress = Math.max(0, Math.min((progress - 0.3) / 0.6, 1));
            const bgValue = Math.round(bgProgress * 255);
            heroSection.style.backgroundColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

            // Fade cloud layers
            if (heroBg) {
                heroBg.style.opacity = 1 - bgProgress;
            }

            // Hide hero completely when done
            if (progress >= 1) {
                heroSection.style.visibility = 'hidden';
            } else {
                heroSection.style.visibility = 'visible';
            }

            // Scroll hint fade quickly
            if (heroScrollHint) {
                heroScrollHint.style.opacity = Math.max(0, 0.6 - progress * 3);
            }

            // Continue animation if not settled
            if (currentProgress !== targetProgress) {
                rafId = requestAnimationFrame(updateHero);
            }
        };

        const handleHeroScroll = () => {
            const scrollY = window.scrollY;
            targetProgress = Math.min(scrollY / (heroHeight * 0.8), 1);

            if (!rafId) {
                rafId = requestAnimationFrame(updateHero);
            }
        };

        // Use requestAnimationFrame for smooth updates
        window.addEventListener('scroll', () => {
            handleHeroScroll();
            rafId = null;
        }, { passive: true });

        handleHeroScroll();
    }

/* =====================================================
   HEADLINE - TYPING EFFECT
   ===================================================== */

const headlineSection = document.querySelector('.headline-section');
const headlineLines = document.querySelectorAll('.headline-line');

if (headlineSection && headlineLines.length > 0) {

    const headlineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                headlineLines.forEach((line, index) => {

                    // Guardar texto original una sola vez
                    if (!line.dataset.original) {
                        line.dataset.original = line.textContent.trim();
                        line.textContent = '';
                    }

                    setTimeout(() => {
                        line.style.opacity = '1';
                        typeText(line, 10); // velocidad headline (ligeramente más lenta)
                    }, index * 420); // delay entre líneas

                });

                headlineObserver.disconnect();
            }

        });
    }, { threshold: 0.35 });

    headlineObserver.observe(headlineSection);
}



    /* =====================================================
       SECTION DIVIDERS - LINE REVEAL
       ===================================================== */

    const dividerLines = document.querySelectorAll('.divider-line');

    if (dividerLines.length > 0) {
        const dividerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
    entry.target.classList.add('visible');
} else {
    entry.target.classList.remove('visible');
}

            });
        }, { threshold: 0.5 });

        dividerLines.forEach(line => dividerObserver.observe(line));
    }

    /* =====================================================
       BRANDS SECTION - REVEAL ANIMATION
       ===================================================== */

    const brandCards = document.querySelectorAll('.brand-card');
    const dividerVertical = document.querySelector('.divider-vertical');

    if (brandCards.length > 0) {
        const brandsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
    entry.target.classList.add('visible');

    // 🔥 Forzar repaint del SVG
    const svg = entry.target.querySelector('.number-outline');
    if (svg) {
        svg.style.strokeDashoffset = '1000';
        svg.getBoundingClientRect(); // force reflow
        svg.style.strokeDashoffset = '0';
    }
}

            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        brandCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
            brandsObserver.observe(card);
        });
    }

    if (dividerVertical) {
        const verticalDividerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        verticalDividerObserver.observe(dividerVertical);
    }

    /* =====================================================
       MANIFESTO BLOCKS - SEQUENTIAL REVEAL
       ===================================================== */


/* =====================================================
   DEVICE SPEED CONFIG
   ===================================================== */

const isMobile = window.matchMedia('(max-width: 768px)').matches;



/* =====================================================
   MANIFESTO BLOCKS - SEQUENTIAL REVEAL + TYPING EFFECT
   ===================================================== */

const manifestoBlocks = document.querySelectorAll('.manifesto-block');

const typeText = (element, speed = 3) => {
    if (!element.dataset.original) {
        element.dataset.original = element.innerHTML.trim();
    }

    const text = element.dataset.original;
    element.innerHTML = '';

    let index = 0;

    const interval = setInterval(() => {
        element.innerHTML = text.slice(0, index);
        element.setAttribute('data-text', element.textContent);

        index++;

        if (index > text.length) {
            clearInterval(interval);
        }
    }, speed);
};



if (manifestoBlocks.length > 0) {

    const manifestoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

if (entry.isIntersecting) {
    entry.target.classList.add('visible');

/* ===============================
   SVG NUMBER STROKE ANIMATION
   =============================== */

const object = entry.target.querySelector('.block-number-container object');

if (object && !object.dataset.animated) {

    const animateSVG = () => {
        const svgDoc = object.contentDocument;
        if (!svgDoc) return;

        const path = svgDoc.querySelector('.number-outline');
        if (!path) return;

        object.dataset.animated = 'true';

        path.style.strokeDasharray = '1000';
        path.style.strokeDashoffset = '1000';

        // Force repaint
        path.getBoundingClientRect();

        // Animate
        path.style.strokeDashoffset = '0';
    };

    // SVG ya cargado
    if (object.contentDocument) {
        animateSVG();
    } 
    // SVG aún no cargado
    else {
        object.addEventListener('load', animateSVG, { once: true });
    }
}


    /* ===============================
       MANIFESTO TEXT TYPING
       =============================== */

    const text = entry.target.querySelector('.manifesto-text');

    if (text && !text.dataset.typed) {
        text.dataset.typed = 'true';

        setTimeout(() => {
            text.style.opacity = '1';
        }, 110);

        setTimeout(() => {
    typeText(text, isMobile ? 1.2 : 3);
}, 180);

    }
}


        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -80px 0px'
    });

    manifestoBlocks.forEach(block => {
        manifestoObserver.observe(block);
    });
}



    /* =====================================================
       FOUNDERS - ENTRY FROM SIDES
       ===================================================== */

 const founderCards = document.querySelectorAll('.founder-card');
const foundersSection = document.querySelector('.founders-section');

if (founderCards.length > 0 && foundersSection) {

    const foundersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                founderCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        card.classList.remove('exit');
                    }, index * 200);
                });
            } else {
                founderCards.forEach(card => {
                    card.classList.remove('visible');
                    card.classList.add('exit');
                });
            }

        });
    }, { threshold: 0.3 });

    foundersObserver.observe(foundersSection);
}


    /* =====================================================
       FOOTER - PARALLAX DARK TRANSITION
       ===================================================== */

    const footer = document.querySelector('.site-footer');
    const footerTransition = document.querySelector('.footer-transition');

    if (footer && footerTransition) {
        const handleFooterParallax = () => {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the footer is visible
            if (footerRect.top < windowHeight) {
                const progress = Math.min((windowHeight - footerRect.top) / (windowHeight * 0.5), 1);

                // Parallax effect on transition overlay
                const translateY = (1 - progress) * 100;
                footerTransition.style.transform = `translateY(${translateY}px)`;
                footerTransition.style.opacity = progress;
            }
        };

        window.addEventListener('scroll', handleFooterParallax, { passive: true });
        handleFooterParallax();
    }

    /* =====================================================
       FOOTER CONTENT - REVEAL ANIMATION
       ===================================================== */

    const footerColumns = document.querySelectorAll('.footer-column');

    if (footerColumns.length > 0) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        footerColumns.forEach((column, index) => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(40px)';
            column.style.transition = `opacity 0.8s ${EASE_OUT_EXPO} ${index * 0.15}s, transform 0.8s ${EASE_OUT_EXPO} ${index * 0.15}s`;
            footerObserver.observe(column);
        });
    }

    /* =====================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    /* =====================================================
       HERO VIDEO - iOS SAFE AUTOPLAY FIX
       ===================================================== */

const heroVideo = document.querySelector('.logo-video');

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('preload', 'auto');

    const forcePlay = () => {
        heroVideo.play().catch(() => {});
        window.removeEventListener('touchstart', forcePlay);
        window.removeEventListener('scroll', forcePlay);
    };

    // iOS necesita un gesto real
    window.addEventListener('touchstart', forcePlay, { once: true });
    window.addEventListener('scroll', forcePlay, { once: true });
}


});