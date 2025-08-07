// main.js

// Smooth-scroll to a section accounting for fixed header
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('header.container');
  const headerHeight = header ? header.offsetHeight : 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Wire up nav buttons in the inline header
function initNavScroll() {
  document.querySelectorAll('button[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-section');
      scrollToSection(targetId);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Initialize nav scroll for inline header buttons
  initNavScroll();

  // 2) Logo click returns to top (first section)
  const logoImg = document.querySelector('.logo img');
  if (logoImg) {
    logoImg.style.cursor = 'pointer';
    logoImg.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3) Hover effect on gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.04)';
      item.style.transition = 'transform 0.3s';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
    });
  });

  // 4) Contact form submission handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('شكراً! تم إرسال رسالتك.');
      contactForm.reset();
    });
  }

  // 5) Show Prev/Next under portfolio only if >20 works
  const portfolioNav = document.querySelector('#portfolio .section-nav');
  const gallery = document.querySelector('#portfolio .gallery');
  if (portfolioNav && gallery) {
    const works = document.querySelectorAll('#portfolio .gallery-item');
    if (works.length > 20) {
      portfolioNav.style.display = 'flex';
    }
    portfolioNav.addEventListener('click', e => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const scrollAmount = gallery.clientWidth;
      gallery.scrollBy({
        left: action === 'next-work' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  // 6) First work click redirects to its detail page
  const firstWork = document.querySelector('#portfolio .gallery-item:first-child');
  if (firstWork) {
    firstWork.style.cursor = 'pointer';
    firstWork.addEventListener('click', () => {
      window.location.href = 'work1.html';
    });
  }
});
