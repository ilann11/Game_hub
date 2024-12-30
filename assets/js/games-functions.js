/*
 * GAMES-FUNCTIONS.JS
 * =================
 * Fonctions essentielles pour l'affichage des jeux
 */

// Fonction pour filtrer les jeux
function filterGames(searchTerm) {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
    });
}

// Initialisation de la barre de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterGames(e.target.value);
        });
    }
});

// Objet de gestion des jeux
const GameFilters = {
    filterGames(filters) {
        if (!filters.search) return gamesData;
        const searchTerm = filters.search.toLowerCase();
        return gamesData.filter(game => (
            game.title.toLowerCase().includes(searchTerm) ||
            game.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
            game.platforms.some(p => p.toLowerCase().includes(searchTerm))
        ));
    },

    sortGames(games, sortBy) {
        const sortFunctions = {
            popularity: (a, b) => b.rating - a.rating,
            date: (a, b) => b.releaseYear - a.releaseYear,
            alpha: (a, b) => a.title.localeCompare(b.title),
            price: (a, b) => a.price - b.price
        };
        return sortFunctions[sortBy] ? [...games].sort(sortFunctions[sortBy]) : games;
    }
};
