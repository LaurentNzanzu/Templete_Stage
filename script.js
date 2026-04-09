AOS.init({
  duration: 1000, // Durée de l'animation en millisecondes (1s)
  once: true,     // L'animation ne se joue qu'une seule fois
  offset: 120,    // Déclenche l'anim 120px avant que l'élément n'arrive
  easing: 'ease-out-back' // Courbe d'accélération fluide
});
// On récupère tous les liens qui pointent vers le haut
const backToHomeLinks = document.querySelectorAll('.service-link');

backToHomeLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // On empêche le saut brutal du navigateur

    // On cible la section de destination (ici #hero)
    const target = document.querySelector('#hero');
    
    // On déclenche le défilement fluide "fait main"
    target.scrollIntoView({
      behavior: 'smooth', // Le mouvement est fluide
      block: 'start'      // On s'arrête exactement au début de la section
    });
  });
});

