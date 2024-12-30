/*
 * THEME.JS
 * =================
 */

(() => {
    // Fonction pour définir le thème
    function setTheme(theme) {
        if (theme === 'dark-mode') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }

    // Vérifie si un thème est déjà stocké dans le localStorage
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(currentTheme);

    // Sélectionne le bouton de basculement de thème
    const toggleButton = document.getElementById('toggle-theme');

    // Ajoute l'écouteur d'événement pour le changement de thème
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
            setTheme(newTheme);
        });
    }
})();
