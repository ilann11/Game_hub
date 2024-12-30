/*
 * MENU.JS
 * =============
 * Menu de navigation
 * 
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navbarUl = navbar.querySelector('ul');

    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        navbarUl.classList.toggle('active');
        
        // Mise à jour de l'attribut aria-expanded
        const isExpanded = navbar.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove('active');
            navbarUl.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}); 