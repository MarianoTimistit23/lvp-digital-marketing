document.addEventListener('DOMContentLoaded', function() {
    /**
     * Navbar
     */
    window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.querySelector(".js-header")?.classList.add('active');
        } else {
            document.querySelector(".js-header")?.classList.remove('active');
        }
    };
    
    /**
     * Animate on scroll (Intersection Observer API)
     */
    const faders = document.querySelectorAll('.js-animation-fade-in, .js-animation-fade-in-container');

    const options = {
        threshold: .5
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Normal fade-in animation
                if (entry.target.classList.contains('js-animation-fade-in')) {
                    entry.target.classList.add('js-animation-visible');
                    appearOnScroll.unobserve(entry.target);
                }

                // Staggered fade-in animation for container and children
                if (entry.target.classList.contains('js-animation-fade-in-container')) {
                    entry.target.classList.add('js-animation-visible');
                    const children = entry.target.querySelectorAll('.js-animation-fade-in-children');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('js-animation-visible');
                        }, index * 200); // Adjust the delay as needed (200ms here)
                    });
                    appearOnScroll.unobserve(entry.target);
                }
            }
        });
    }, options);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /**
     * Hamburger Menu Toggle
     */
    const hamburgerMenuToggle = document.querySelector('.header__hamburger-menu-container');
    const navMenu = document.querySelector('.header__nav-container-mobile ul');
    const body = document.querySelector('body');

    hamburgerMenuToggle?.addEventListener('click', () => {
        hamburgerMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Close menu and allow scroll on anchor link click
    const anchorLinks = navMenu.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the anchor element
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close the menu
                hamburgerMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    /**
     * Contact Form
     */
    const form = document.getElementById('js-contact-form');
    var submitButton = document.querySelector('.form-submit-btn');
    const loader = document.querySelector('.js-loader');
    var successMessage = document.querySelector('.success-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitButton.disabled = true;
        loader.style.display = 'flex';

        setTimeout(function() {
            loader.style.display = 'none';
            form.style.display = 'none';
            successMessage.style.display = 'flex';
        }, 1500);
    });

});