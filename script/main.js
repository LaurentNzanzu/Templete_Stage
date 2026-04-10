document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Typing Animation
  const typedTextElement = document.querySelector('.typed-text');
  if (typedTextElement) {
    const words = ['Designer', 'Developer', 'Creator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
      }

      const speed = isDeleting ? 100 : 150;
      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  // Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  // Intersection Observer for counters
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    counterObserver.observe(heroSection);
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // Testimonials Slider
  const sliderTrack = document.querySelector('.slider-track');
  const sliderContainer = document.querySelector('.slider-container');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (sliderTrack && sliderContainer && dotsContainer) {
    const slides = document.querySelectorAll('.testimonial-card');
    const slidesCount = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create dots
    for (let i = 0; i < slidesCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    function updateSlider() {
      const slideWidth = slides[0].offsetWidth + 20;
      sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetAutoSlide();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slidesCount;
      updateSlider();
    }
    
    function resetAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Initialize slider
    updateSlider();
    resetAutoSlide();
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', resetAutoSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      updateSlider();
    });
  }

  // Portfolio Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Scroll to Top Button
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});s