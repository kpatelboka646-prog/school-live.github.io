// ==========================================
// SNS School Balotra - Interactive JavaScript
// All Fixes Applied
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // MENU FUNCTIONALITY - STRETCHABLE
    // ==========================================

    const menuBtn = document.getElementById('menuBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    // Open Menu
    menuBtn.addEventListener('click', function() {
        menuOverlay.classList.add('active');

        // Disable body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    });

    // Close Menu - Cross Button
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', function() {
            menuOverlay.classList.remove('active');

            // Enable body scroll
            document.body.style.overflow = '';
            document.body.style.height = '';
        });
    }

    // Close menu on internal links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('http')) {
                setTimeout(() => {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                }, 200);
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
    });

    // ==========================================
    // NOTIFICATION BUTTON
    // ==========================================

    const notificationBtn = document.getElementById('notificationBtn');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            window.location.href = 'notifications.html';
        });
    }

    // ==========================================
    // SLIDER FUNCTIONALITY
    // ==========================================

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const underlineLinks = document.querySelectorAll('.underline-link');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        underlineLinks.forEach(link => link.classList.remove('active'));

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
        underlineLinks[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Interactive underlined text
    underlineLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // ==========================================
    // TOUCH SWIPE SUPPORT
    // ==========================================

    let touchStartX = 0;
    let touchEndX = 0;

    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        sliderWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Initialize
    showSlide(0);

});