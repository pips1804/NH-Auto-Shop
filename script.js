/* ==========================================================================
   NH AUTO SHOP - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. MOBILE NAVIGATION DRAWER
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* ----------------------------------------------------------------------
       2. STICKY HEADER & BACK TO TOP BUTTON ON SCROLL
       ---------------------------------------------------------------------- */
    const siteHeader = document.getElementById('site-header');
    const fabTop = document.getElementById('fab-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Header shadow
        if (scrollPos > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }

        // Back to top button
        if (fabTop) {
            if (scrollPos > 400) {
                fabTop.classList.add('visible');
            } else {
                fabTop.classList.remove('visible');
            }
        }

        // Update active nav link based on section scroll
        updateActiveNav();
    });

    if (fabTop) {
        fabTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ----------------------------------------------------------------------
       3. HERO SLIDESHOW ROTATION
       ---------------------------------------------------------------------- */
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    /* ----------------------------------------------------------------------
       4. SERVICE MENU FLYER LIGHTBOX MODAL
       ---------------------------------------------------------------------- */
    const btnOpenFlyer = document.getElementById('btn-open-flyer');
    const flyerModal = document.getElementById('flyer-modal');
    const flyerClose = document.getElementById('flyer-close');

    if (btnOpenFlyer && flyerModal) {
        btnOpenFlyer.addEventListener('click', () => {
            flyerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (flyerClose && flyerModal) {
        flyerClose.addEventListener('click', () => {
            flyerModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        flyerModal.addEventListener('click', (e) => {
            if (e.target === flyerModal) {
                flyerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ----------------------------------------------------------------------
       5. INTERACTIVE PMS CHECKLIST ITEMS
       ---------------------------------------------------------------------- */
    const checkItems = document.querySelectorAll('.check-item');
    checkItems.forEach(item => {
        item.addEventListener('click', () => {
            checkItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* ----------------------------------------------------------------------
       6. WORKSHOP SPOTLIGHT COVERFLOW CAROUSEL
       ---------------------------------------------------------------------- */
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('.carousel-dots .dot');
    const btnGalleryPrev = document.getElementById('gallery-prev');
    const btnGalleryNext = document.getElementById('gallery-next');

    if (gallerySlides.length > 0) {
        let currentIndex = 0;
        const totalSlides = gallerySlides.length;

        function updateCarousel(index) {
            currentIndex = (index + totalSlides) % totalSlides;

            gallerySlides.forEach((slide, i) => {
                slide.className = 'gallery-slide';

                if (i === currentIndex) {
                    slide.classList.add('is-active');
                } else if (i === (currentIndex - 1 + totalSlides) % totalSlides) {
                    slide.classList.add('is-prev');
                } else if (i === (currentIndex + 1) % totalSlides) {
                    slide.classList.add('is-next');
                } else if (i < currentIndex) {
                    slide.classList.add('is-far-prev');
                } else {
                    slide.classList.add('is-far-next');
                }
            });

            galleryDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        if (btnGalleryNext) {
            btnGalleryNext.addEventListener('click', () => {
                updateCarousel(currentIndex + 1);
            });
        }

        if (btnGalleryPrev) {
            btnGalleryPrev.addEventListener('click', () => {
                updateCarousel(currentIndex - 1);
            });
        }

        galleryDots.forEach((dot, i) => {
            dot.addEventListener('click', () => updateCarousel(i));
        });

        gallerySlides.forEach((slide, i) => {
            slide.addEventListener('click', () => updateCarousel(i));
        });

        // Auto slide every 6 seconds
        let autoSlideInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 6000);

        const carouselWrapper = document.querySelector('.spotlight-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            carouselWrapper.addEventListener('mouseleave', () => {
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(() => {
                    updateCarousel(currentIndex + 1);
                }, 6000);
            });
        }

        // Initialize carousel
        updateCarousel(0);
    }

    /* ----------------------------------------------------------------------
       7. ACTIVE NAVBAR HIGHLIGHT ON SCROLL
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Helper function to prevent XSS in modal output
    function escapeHtml(text) {
        return String(text).replace(/[&<>"']/g, function (m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

    /* ----------------------------------------------------------------------
       8. DUAL-LANGUAGE (KOREAN / ENGLISH) INITIALIZATION & MODAL
       ---------------------------------------------------------------------- */
    const langModal = document.getElementById('lang-modal');
    const btnConfirmLang = document.getElementById('btn-confirm-lang');
    const langCards = document.querySelectorAll('.lang-opt-card');
    const langBtns = document.querySelectorAll('.lang-switcher-btn');

    // Retrieve saved language or default to Korean ('ko')
    let savedLang = localStorage.getItem('nh_autoshop_lang') || 'ko';
    let selectedModalLang = savedLang;

    // Apply initial language (Korean default)
    if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
    }

    // If language selection modal exists
    if (langModal) {
        // Lock body scroll while welcome modal is active
        if (langModal.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        }

        // Select language option inside modal
        langCards.forEach(card => {
            card.addEventListener('click', () => {
                langCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedModalLang = card.getAttribute('data-lang');
                if (typeof setLanguage === 'function') {
                    setLanguage(selectedModalLang);
                }
            });
        });

        // Confirm button inside modal
        if (btnConfirmLang) {
            btnConfirmLang.addEventListener('click', () => {
                if (typeof setLanguage === 'function') {
                    setLanguage(selectedModalLang);
                }
                langModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // Header & Mobile Drawer Language Switcher Buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const chosenLang = btn.getAttribute('data-lang');
            if (typeof setLanguage === 'function') {
                setLanguage(chosenLang);
            }
        });
    });

});
