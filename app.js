// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const featureCards = document.querySelectorAll('.feature-card');
const resourceBtn = document.querySelector('.resource-btn');
const downloadInfo = document.getElementById('downloadInfo');
const sections = document.querySelectorAll('.section');

// Header scroll effect
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Smooth scroll to sections
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Navigation link click handler
function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.target.getAttribute('href').substring(1);
  smoothScrollTo(targetId);
  
  // Update active nav link
  navLinks.forEach(link => link.classList.remove('active'));
  e.target.classList.add('active');
}

// Feature card hover effects
function addFeatureCardEffects() {
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Resource download button handler
function handleResourceDownload() {
  if (downloadInfo.classList.contains('show')) {
    downloadInfo.classList.remove('show');
    resourceBtn.textContent = '詳細資料ダウンロード';
  } else {
    downloadInfo.classList.add('show');
    resourceBtn.textContent = '情報を閉じる';
    
    // Smooth scroll to the download info
    setTimeout(() => {
      downloadInfo.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  }
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Special handling for feature cards
        if (entry.target.classList.contains('features-grid')) {
          const cards = entry.target.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('slide-in-up');
            }, index * 100);
          });
        }
        
        // Special handling for application cards
        if (entry.target.classList.contains('applications-grid')) {
          const cards = entry.target.querySelectorAll('.application-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('slide-in-up');
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections and special elements
  sections.forEach(section => observer.observe(section));
  
  const specialElements = document.querySelectorAll('.features-grid, .applications-grid, .overview-content');
  specialElements.forEach(element => observer.observe(element));
}

// Active section highlighting in navigation
function updateActiveNavigation() {
  const scrollPosition = window.scrollY + header.offsetHeight + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize all functionality
function init() {
  // Event listeners
  window.addEventListener('scroll', throttle(() => {
    handleHeaderScroll();
    updateActiveNavigation();
  }, 10));
  
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  if (resourceBtn) {
    resourceBtn.addEventListener('click', handleResourceDownload);
  }
  
  // Setup animations and effects
  addFeatureCardEffects();
  setupScrollAnimations();
  
  // Initial calls
  handleHeaderScroll();
  updateActiveNavigation();
  
  // Add loading animation to hero section
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.classList.add('fade-in');
  }
}

// Enhanced feature card interactions
function enhanceFeatureCards() {
  featureCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add a subtle pulse effect on click
      this.style.transform = 'translateY(-2px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-4px) scale(1.02)';
      }, 100);
    });
  });
}

// Smooth page load animations
function pageLoadAnimations() {
  const elementsToAnimate = [
    { selector: '.hero__content', delay: 0 },
    { selector: '.overview-content', delay: 200 },
    { selector: '.section__title', delay: 100 }
  ];
  
  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, item.delay);
    });
  });
}

// Handle keyboard navigation
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // ESC key to close download info
    if (e.key === 'Escape' && downloadInfo.classList.contains('show')) {
      handleResourceDownload();
    }
  });
}

// Mobile menu handling (if needed for responsive design)
function setupMobileInteractions() {
  // Handle touch events for better mobile experience
  featureCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-2px) scale(1.01)';
    });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = 'translateY(0) scale(1)';
      }, 150);
    });
  });
}

// Error handling for missing elements
function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  init();
  enhanceFeatureCards();
  pageLoadAnimations();
  setupKeyboardNavigation();
  setupMobileInteractions();
});

// Handle page visibility change (for performance optimization)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause any animations or heavy operations
  } else {
    // Resume animations
    handleHeaderScroll();
    updateActiveNavigation();
  }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleHeaderScroll,
    smoothScrollTo,
    handleNavClick,
    handleResourceDownload
  };
}