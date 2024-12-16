// Vérifie si un thème est déjà stocké dans le localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    document.querySelector('header').classList.add(currentTheme);
    document.querySelector('footer').classList.add(currentTheme);
}

// Sélectionne le bouton de basculement de thème
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
    // Basculer entre les classes 'dark-mode'
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');


});
