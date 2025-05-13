// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
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
    
    // Add animation when elements enter viewport
    const animateOnScroll = function() {
        // Elements to animate
        const elements = [
            ...document.querySelectorAll('.feature-content'),
            ...document.querySelectorAll('.step'),
            ...document.querySelectorAll('.download-option')
        ];
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.animation = 'fadeIn 0.6s ease forwards';
                    // Add slight delay for each successive element
                    element.style.animationDelay = '0.1s';
                }
            }
        });
    };
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for new elements entering viewport during scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animated counters for statistics (if added later)
    const initCounters = function() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Animation speed in milliseconds
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(initCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Implement optional features when needed
    
    // 1. Floating action button to scroll to top (optional)
    const createScrollTopButton = function() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'scroll-top-btn';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '99';
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.borderRadius = '50%';
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        button.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(button);
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
    };
    
    // Initialize scroll-to-top button
    createScrollTopButton();
    
    // Add download tracking (for demo purposes)
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // This would typically track actual downloads
            // For the demo, we'll just prevent default and show an alert
            e.preventDefault();
            
            // Get OS from button text
            const os = this.parentElement.querySelector('h3').textContent;
            
            // Show message
            alert(`Thank you for your interest in FileMergerPro for ${os}!\n\nThis is a demo landing page. Downloads would typically be available on the actual website.`);
        });
    });
});
