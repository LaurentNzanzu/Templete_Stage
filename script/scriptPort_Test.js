document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });

  const testimonialSwiper = new Swiper('.testimonials-slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonials-slider .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        AOS.refresh();
      }
    }
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  let portfolioItems = document.querySelectorAll('.portfolio-item');
  
  const originalItems = Array.from(portfolioItems);
  
  originalItems.forEach((item, index) => {
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index * 100).toString());
    item.setAttribute('data-aos-duration', '600');
  });
  
  function filterPortfolio(category) {
    const filteredItems = originalItems.filter(item => {
      if (category === 'all') return true;
      return item.getAttribute('data-category') === category;
    });
    
    portfolioGrid.innerHTML = '';
    
    filteredItems.forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-aos', 'fade-up');
      clone.setAttribute('data-aos-delay', (index * 100).toString());
      clone.setAttribute('data-aos-duration', '600');
      clone.style.display = 'block';
      portfolioGrid.appendChild(clone);
    });
    
    initPortfolioHover();
    
    AOS.refresh();
  }
  
  function initPortfolioHover() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-overlay')?.classList.add('active');
      });
      card.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-overlay')?.classList.remove('active');
      });
    });
  }
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
      
      portfolioGrid.style.opacity = '0.5';
      setTimeout(() => {
        filterPortfolio(filterValue);
        portfolioGrid.style.opacity = '1';
      }, 200);
    });
  });
  
  initPortfolioHover();
  // Afficher tous les projets immédiatement au chargement
  filterPortfolio('all');
  
  // Add AOS animations to critic cards
  const criticCards = document.querySelectorAll('.critic-card');
  criticCards.forEach((card, index) => {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    card.setAttribute('data-aos-duration', '600');
  });
  document.querySelectorAll('.critic-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.critic-card').forEach(c => c.style.transform = 'translateY(0)');
      this.style.transform = 'translateY(-25px)';
    });
  });
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      testimonialSwiper.update();
      AOS.refresh();
    }, 250);
  });
});