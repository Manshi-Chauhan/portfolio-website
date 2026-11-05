/**
 * Manshi Chauhan Portfolio - script.js
 * Modern Interactive Behaviors & Dark Theme Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typewriter Effect
  initTypewriter();

  // 2. Navigation Bar & Mobile Drawer
  initNavigation();

  // 3. Scrollspy (Active Section Highlighting)
  initScrollspy();

  // 4. Project Filtering
  initProjectFiltering();

  // 5. Copy Email & Toast Notifications
  initCopyEmail();

  // 6. Back-to-Top Button
  initBackToTop();

  // 7. Interactive Spotlight Effect on Cards
  initCardSpotlight();

  // 8. Resume Button Handler
  initResumeDownload();
});

/* ==========================================================================
   1. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const roles = [
    'Python Developer 🐍',
    'B.Tech CSE (AIML) Student 🎓',
    'Web Developer 🌐',
    'AI & Tech Content Writer ✍️',
    'SIH 2026 Participant 🏆',
    'Problem Solver & Builder 🚀'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. Navigation Bar & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile hamburger toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }
}

/* ==========================================================================
   3. Scrollspy (Active Section Highlighting)
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Project Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Copy Email & Toast Notifications
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const email = 'manshichauhan923@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      showToast('Email address copied to clipboard!');
      
      // Temporary icon feedback
      const icon = copyBtn.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-check';
        setTimeout(() => {
          icon.className = 'fa-regular fa-copy';
        }, 2000);
      }
    } catch (err) {
      showToast('Failed to copy email. Please copy manually.');
    }
  });

  window.showToast = showToast;
  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   6. Back-to-Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. Interactive Spotlight Effect on Cards
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.project-card, .skill-category-card, .about-card, .cert-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   8. Resume Button Handler
   ========================================================================== */
function initResumeDownload() {
  const resumeBtn = document.getElementById('resumeBtn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', (e) => {
    // If a resume.pdf is later placed in the same folder, this will download it
    // For now, it scrolls smoothly to contact or opens email
    const resumePath = 'resume.pdf';
    
    // Check if user has an actual resume file; otherwise trigger contact prompt
    fetch(resumePath, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          const downloadLink = document.createElement('a');
          downloadLink.href = resumePath;
          downloadLink.download = 'Manshi_Chauhan_Resume.pdf';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          if (window.showToast) window.showToast('Downloading Manshi Chauhan Resume...');
        } else {
          // Smooth scroll to contact section
          e.preventDefault();
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          }
          if (window.showToast) {
            window.showToast('Please email manshichauhan923@gmail.com for the latest resume copy!');
          }
        }
      })
      .catch(() => {
        // Fallback smooth scroll to contact
        e.preventDefault();
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.showToast) {
          window.showToast('Please email manshichauhan923@gmail.com for the latest resume copy!');
        }
      });
  });
}
