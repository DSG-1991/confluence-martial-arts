/* ============================================
   Confluence Martial Arts — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // --- Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const img = galleryItems[index].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }

    galleryItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function() { navigateLightbox(-1); });
    lightboxNext.addEventListener('click', function() { navigateLightbox(1); });

    // Close lightbox on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build mailto link as a fallback
        const subject = encodeURIComponent('Confluence Martial Arts Enquiry');
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Phone: ' + document.getElementById('phone').value.trim() + '\n\n' +
            message
        );
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#2d8a4e';
        submitBtn.style.borderColor = '#2d8a4e';
        
        setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
        }, 3000);
        
        // Open email client
        window.location.href = 'mailto:cbabernethy@outlook.com?subject=' + subject + '&body=' + body;
        
        contactForm.reset();
    });

    // --- Smooth scroll for anchor links (fallback for older browsers) ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
