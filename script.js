/* ========================================
   Dr. Driveway — Scripts
   ======================================== */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const header = document.querySelector('.header');
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (lastScrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll-triggered fade-in animations with stagger ---
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    var fadeEls = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
      var revealIndex = 0;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
              var delay = Math.min(revealIndex * 150, 600);
              revealIndex++;
              setTimeout(function () {
                entry.target.classList.add('visible');
              }, delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      fadeEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything
      fadeEls.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // --- Hero stat counter animation ---
    function animateCounter(el, target, suffix) {
      var isNumber = !isNaN(target);
      if (!isNumber) {
        el.textContent = target;
        el.classList.add('counted');
        return;
      }
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        var current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
          el.classList.add('counted');
        }
      }

      requestAnimationFrame(step);
    }

    var statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
      var statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var text = entry.target.textContent.trim();
              var numMatch = text.match(/^(\d+)/);
              if (numMatch) {
                var num = parseInt(numMatch[1], 10);
                var suffix = text.replace(numMatch[1], '');
                animateCounter(entry.target, num, suffix);
              } else {
                entry.target.classList.add('counted');
              }
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      statNumbers.forEach(function (el) {
        statsObserver.observe(el);
      });
    }
  }

  // --- Gallery lightbox ---
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    var galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- Contact form validation ---
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check
      var honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) {
        return;
      }

      var valid = true;

      // Name
      var name = form.querySelector('#name');
      var nameError = document.getElementById('nameError');
      if (!name.value.trim()) {
        name.classList.add('error');
        name.setAttribute('aria-invalid', 'true');
        name.setAttribute('aria-describedby', 'nameError');
        valid = false;
      } else {
        name.classList.remove('error');
        name.removeAttribute('aria-invalid');
        name.removeAttribute('aria-describedby');
      }

      // Phone
      var phone = form.querySelector('#phone');
      var phoneError = document.getElementById('phoneError');
      var phoneVal = phone.value.replace(/\D/g, '');
      if (phoneVal.length < 7) {
        phone.classList.add('error');
        phone.setAttribute('aria-invalid', 'true');
        phone.setAttribute('aria-describedby', 'phoneError');
        valid = false;
      } else {
        phone.classList.remove('error');
        phone.removeAttribute('aria-invalid');
        phone.removeAttribute('aria-describedby');
      }

      // Email
      var email = form.querySelector('#email');
      var emailError = document.getElementById('emailError');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        email.setAttribute('aria-describedby', 'emailError');
        valid = false;
      } else {
        email.classList.remove('error');
        email.removeAttribute('aria-invalid');
        email.removeAttribute('aria-describedby');
      }

      // Message
      var message = form.querySelector('#message');
      var messageError = document.getElementById('messageError');
      if (!message.value.trim()) {
        message.classList.add('error');
        message.setAttribute('aria-invalid', 'true');
        message.setAttribute('aria-describedby', 'messageError');
        valid = false;
      } else {
        message.classList.remove('error');
        message.removeAttribute('aria-invalid');
        message.removeAttribute('aria-describedby');
      }

      if (valid) {
        // Show success state
        form.style.display = 'none';
        formSuccess.classList.add('visible');
      }
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      });
    });
  }
})();
