/*
 * BACK-TO-TOP.JS
 * =============
 * Gestion optimisée du bouton "Retour en haut"
 */

(() => {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    const SCROLL_THRESHOLD = 300;
    let isScrolling = false;

    // Fonction pour vérifier la position du défilement
    const checkScroll = () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                backToTop.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
                isScrolling = false;
            });
        }
    };

    // Fonction pour le défilement fluide
    const scrollToTop = (e) => {
        e.preventDefault();
        const duration = 500;
        const start = window.scrollY;
        const startTime = performance.now();

        // Fonction d'atténuation (ease-in-out cubic)
        const easeInOutCubic = t => t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    // Ajout d'un écouteur d'événements passif pour de meilleures performances
    window.addEventListener('scroll', checkScroll, { passive: true });
    backToTop.addEventListener('click', scrollToTop);

    // Vérification initiale du défilement
    checkScroll();
})();
