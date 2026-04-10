AOS.init({
  duration: 1000, // Durée de l'animation en millisecondes (1s)
  once: true,     
  offset: 120,    
  easing: 'ease-out-back' 
});
// On récupère tous les liens qui pointent vers le haut
const backToHomeLinks = document.querySelectorAll('.service-link');

backToHomeLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 

    // On cible la section de destination (ici #hero)
    const target = document.querySelector('#hero');
    
    // On déclenche le défilement fluide "fait main"
    target.scrollIntoView({
      behavior: 'smooth', 
      block: 'start'      
    });
  });
});

