import QuranRepo from '../repository/quran-repo.js';
const quranRepo = new QuranRepo();

//DOM Elements
const quranViewBtn = document.querySelector('#quran-view-button');
const quranNavBtn = document.querySelector('#quran-nav-button');

//Event Listeners
quranViewBtn.addEventListener('click', handleAppNavChange);
quranNavBtn.addEventListener('click', handleAppNavChange);

document.addEventListener("DOMContentLoaded", () => {
    window.handleAppNavChange = handleAppNavChange
    window.updateIndexPageUI =updateIndexPageUI;
    updateIndexPageUI();
});

async function handleAppNavChange(e) {
    if(e.target.classList.contains('chosen')) e.preventDefault();
}
function updateIndexPageUI() {
    switch (window.location.pathname) {
        case '/quran': {
            quranViewBtn.classList.add("chosen");
            quranNavBtn.classList.remove("chosen");
        } break;
        case '/navigation': {
            const input = document.querySelector('#page-search-number');
            input.style.background = 'var(--light-green)';
            input.style.color = 'white';
            input.style['border-color'] = 'grey';
        }
        default: {
            quranViewBtn.classList.remove("chosen");
            quranNavBtn.classList.add("chosen");
        }
    }
}