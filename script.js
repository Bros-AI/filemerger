// FileMergerPro Landing Page Interactive Functions
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const faqItems = document.querySelectorAll('.faq-item');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                
                // Reset icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = navLinks ? navLinks.querySelectorAll('a') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                
                // Reset icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Feature Tabs Functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show based on the data-tab attribute
            const tabToShow = this.getAttribute('data-tab');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            document.getElementById(tabToShow).classList.add('active');
        });
    });
    
    // FAQ Accordion Functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            
            // Update icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
            
            // Close other items (uncomment to make it work like an accordion)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //         const otherIcon = otherItem.querySelector('.faq-toggle i');
            //         otherIcon.classList.remove('fa-minus');
            //         otherIcon.classList.add('fa-plus');
            //     }
            // });
        });
    });
    
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the target's position with offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button visibility
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation when elements enter viewport
    const animateOnScroll = function() {
        // Elements to animate
        const elements = [
            ...document.querySelectorAll('.feature-content'),
            ...document.querySelectorAll('.step'),
            ...document.querySelectorAll('.download-option'),
            ...document.querySelectorAll('.faq-item'),
            ...document.querySelectorAll('.emoji-feature')
        ];
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 50) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            }
        });
    };
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for new elements entering viewport during scroll
    window.addEventListener('scroll', animateOnScroll);

    // Heartbeat animation
    const heart = document.querySelector('.heart');
    if (heart) {
        // Start animation after a short delay
        setTimeout(() => {
            heart.classList.add('beating');
        }, 1000);
    }
    
    // Add download tracking
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only track the event without preventing default
            if (typeof gtag === 'function') {
                gtag('event', 'download', {
                    'event_category': 'FileMergerPro',
                    'event_label': 'Windows Download'
                });
            }
            
            // Show download started message
            const downloadOption = this.closest('.download-option');
            const originalText = this.textContent;
            
            this.textContent = "Download Started...";
            this.classList.add('downloading');
            
            // Reset the button text after a delay (we don't prevent the download)
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('downloading');
            }, 3000);
        });
    });
    
    // Add "copy to clipboard" functionality for code snippets
    // This would be used if you add code examples to your landing page
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';
        
        // Add copy button to parent pre element
        block.parentNode.classList.add('code-container');
        block.parentNode.appendChild(copyButton);
        
        // Add click event
        copyButton.addEventListener('click', () => {
            // Copy text to clipboard
            navigator.clipboard.writeText(block.textContent)
                .then(() => {
                    // Show success 
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    });
    
    // Add emoji animation and interaction
    const largeEmojis = document.querySelectorAll('.emoji-large');
    largeEmojis.forEach(emoji => {
        emoji.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.3)';
            this.style.filter = 'drop-shadow(0 10px 25px rgba(65, 164, 245, 0.5))';
        });

        emoji.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    });

    // Random emoji animations
    const featureEmojis = document.querySelectorAll('.emoji-feature');
    featureEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                const animations = ['spin', 'bounce', 'wobble'];
                const randomAnim = animations[Math.floor(Math.random() * animations.length)];
                this.style.animation = `${randomAnim} 1s ease`;
            }, 10);
        });
    });
    
    // Define the animations in CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
        }
        @keyframes wobble {
            0%, 100% { transform: translateX(0%); }
            15% { transform: translateX(-15%) rotate(-5deg); }
            30% { transform: translateX(10%) rotate(3deg); }
            45% { transform: translateX(-10%) rotate(-3deg); }
            60% { transform: translateX(5%) rotate(2deg); }
            75% { transform: translateX(-5%) rotate(-1deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Check for dark mode preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.add("light-theme");
    }
    
    // Add version release date
    const releaseDate = "May 10, 2023"; // Replace with actual date
    const versionLabels = document.querySelectorAll('.version');
    versionLabels.forEach(label => {
        label.setAttribute('title', `Released on ${releaseDate}`);
    });
});
