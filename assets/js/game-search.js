/*
 * GAME-IU.JS
 * =============
 * Interface utilisateur 
 * 
 */

// Cache des éléments DOM fréquemment utilisés
const DOM = {
    searchInput: document.getElementById('searchInput'), // Champ de recherche
    sortSelect: document.getElementById('sortSelect'), // Sélecteur de tri
    gamesContainer: document.querySelector('.games-grid'), // Conteneur pour les cartes de jeux
    gameTemplate: document.getElementById('game-card-template') // Modèle pour une carte de jeu
};

// Gestionnaire d'interface 
const UI = {
    currentFilters: { search: '' }, // Filtres actuels (recherche)
    currentSort: 'popularity', // Tri actuel par défaut
    searchTimeout: null, // Timeout pour la recherche avec debounce

    /**
     * Crée une carte de jeu basée sur le modèle HTML
     */
    createGameCard(game) {
        const card = DOM.gameTemplate.content.cloneNode(true);
        const img = card.querySelector('img');
        img.src = game.image;
        img.alt = game.title;
        img.loading = 'lazy';
        img.onerror = () => img.src = 'https://via.placeholder.com/300x200?text=Image+Non+Disponible';

        card.querySelector('h2').textContent = game.title;
        card.querySelector('.rating-value').textContent = game.rating;
        card.querySelector('.game-genre').textContent = game.genre.join(', ');
        card.querySelector('.game-year').textContent = game.releaseYear;
        card.querySelector('.game-platform').textContent = game.platforms.join(', ');
        card.querySelector('.game-price').textContent = `${game.price.toFixed(2)} €`;

        card.querySelector('.details-btn').dataset.game = game.title;
        return card;
    },

    /**
     * Met à jour l'affichage des jeux après filtrage et tri
     */
    updateGamesDisplay() {
        requestAnimationFrame(() => {
            const filteredGames = GameFilters.sortGames(
                GameFilters.filterGames(this.currentFilters),
                this.currentSort
            );
            
            DOM.gamesContainer.innerHTML = '';
            if (filteredGames.length === 0) {
                DOM.gamesContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h2>Aucun jeu trouvé</h2>
                        <p>Vous êtes nul, vous ne savez pas faire une recherche</p>
                    </div>`;
            } else {
                const fragment = document.createDocumentFragment();
                filteredGames.forEach(game => fragment.appendChild(this.createGameCard(game)));
                DOM.gamesContainer.appendChild(fragment);
            }
        });
    },

    /**
     * Fonction pour la recherche
     */
    debounceSearch(func, wait) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => func.call(this), wait);
    },

    /**
     * Gère le clic sur le bouton de détails d'un jeu
     */
    handleGameClick(e) {
        const btn = e.target.closest('.details-btn');
        if (!btn) return;

        const pageUrls = {
            "Super Mario Bros": "./Pages/super-mario.html",
            "The Legend of Zelda": "./Pages/zelda.html",
            "Tetris": "./Pages/tetris.html",
            "Pac-Man": "./Pages/pac-man.html",
            "Donkey Kong Country": "./Pages/donkey-kong-country.html",
            "Street Fighter II": "./Pages/street-fighter-2.html",
            "Resident Evil": "./Pages/resident-evil.html",
            "Tomb Raider": "./Pages/tomb-raider.html", 
            "Final Fantasy VII": "./Pages/final-fantasy-7.html",
            "Sonic the Hedgehog": "./Pages/sonic.html",
            "Pokemon Red/Blue": "./Pages/pokemon.html",
            "Metal Gear Solid": "./Pages/metal-gear-solid.html"
        };

        const url = pageUrls[btn.dataset.game];
        if (url) {
            window.location.href = url;
        } else {
            console.warn(`Page non trouvée pour le jeu: ${btn.dataset.game}`);
            // Afficher un message d'erreur à l'utilisateur
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `Désolé, la page pour "${btn.dataset.game}" n'est pas disponible pour le moment.`;
            btn.parentNode.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 3000); // Message disparaît après 3 secondes
        }
    }
};

/**
 * Initialisation de l'interface utilisateur
 */
document.addEventListener('DOMContentLoaded', () => {
    DOM.gamesContainer.addEventListener('click', UI.handleGameClick.bind(UI));
    DOM.searchInput.addEventListener('input', (e) => {
        UI.currentFilters.search = e.target.value;
        UI.debounceSearch(UI.updateGamesDisplay, 300);
    });
    DOM.sortSelect.addEventListener('change', (e) => {
        UI.currentSort = e.target.value;
        UI.updateGamesDisplay();
    });

    UI.updateGamesDisplay();
});
