/**
 * Chu Thanh Duy Portfolio - Vanilla JavaScript
 * Features: Navigation, Category Filter, Modal, Scroll Reveal, Form Handling
 */

// Detailed Project Data extracted directly from CV
const projectsData = {
  'dry-goods': {
    title: 'Dry Goods Warehouse System',
    role: 'Full-Stack Developer',
    period: 'May 2026 - Present',
    tech: ['Java', 'JSP/Servlet', 'SQL Server', 'HTML5', 'CSS3', 'JavaScript', 'GitLab'],
    overview: 'A full-stack warehouse management web system designed to streamline inventory operations, import/export tracking, transaction logs, and role-based access control (RBAC).',
    keyContributions: [
      'Analyzed warehouse business requirements and designed complete end-to-end workflows for inventory control, import/export tracking, transaction records, and role-based permissions.',
      'Developed both frontend UI and backend Java JSP/Servlet modules integrated with SQL Server database.',
      'Created comprehensive project documentation including Software Requirements Specification (SRS), Software Design Description (SDD), use case diagrams, sequence diagrams, swimlane diagrams, screen flows, UI mockups, and database schemas.',
      'Collaborated effectively with team members via GitLab and conducted continuous system testing and debugging.'
    ]
  },
  'laptop-store': {
    title: 'Laptop Selling E-Commerce Website',
    role: 'Full-Stack Developer',
    period: 'Jan 2026 - April 2026',
    tech: ['Java', 'JSP/Servlet', 'SQL Server', 'HTML5', 'CSS3', 'JavaScript'],
    overview: 'An e-commerce web platform engineered with distinct user role permissions (Customer vs. Admin) to deliver a seamless shopping experience and administrative workflow.',
    keyContributions: [
      'Developed customer-facing modules including product catalog browsing, interactive shopping cart, order placement, order history tracking, and profile management.',
      'Built administrative module enabling full product catalog management (CRUD operations), order fulfillment management, order status updates, and admin user profiles.',
      'Designed SQL Server relational database tables and written optimized queries to support transactions and inventory management.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Set Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 1. Mobile Navigation Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Navbar Active Section Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 3. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Project Modal Window
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <h3 class="modal-detail-title" id="modal-title">${data.title}</h3>
      <span class="modal-detail-role">${data.role} | ${data.period}</span>
      
      <div class="modal-section">
        <h4>Overview</h4>
        <p>${data.overview}</p>
      </div>

      <div class="modal-section">
        <h4>Key Contributions</h4>
        <ul>
          ${data.keyContributions.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4>Technologies Used</h4>
        <div class="project-tech" style="margin-top: 0.5rem;">
          ${data.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Keyboard accessibility for modal (ESC key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // 6. Simple Form Handling (Frontend Demo Interaction)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you soon.';
      formStatus.className = 'form-status success';

      contactForm.reset();

      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 5000);
    });
  }
});
