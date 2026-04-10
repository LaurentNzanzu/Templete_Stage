
AOS.init({
    duration: 1200,     
    once: true,          
    offset: 0,          
    delay: 100,          
    easing: 'ease-out'  
});

document.addEventListener('DOMContentLoaded', () => {

   
    window.addEventListener('load', () => {
        AOS.refresh();
    });

    
    const textElement = document.getElementById('typed-text');
    if (textElement) {
        const words = ["Developer", "Freelancer", "Designer", "Artist"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeToggle = document.getElementById('close-toggle');

    function toggleMenu() {
        if(sidebar && overlay) {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    if (menuToggle) menuToggle.onclick = toggleMenu;
    if (closeToggle) closeToggle.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;
});

const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = +stat.innerText; 
    stat.innerText = "0";

    const updateCount = () => {
        const count = +stat.innerText;
        const speed = target / 100; 

        if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(updateCount, 20); 
        } else {
            stat.innerText = target;
        }
    };

    updateCount();
});

document.addEventListener('DOMContentLoaded', function() {
  
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,    
    offset: 120    
  });

});