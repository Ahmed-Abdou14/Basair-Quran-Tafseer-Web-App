//Imports
import QuranRepo from "../repository/quran-repo.js";
const quranRepo = new QuranRepo();

//OnLoad
document.addEventListener("DOMContentLoaded", () => {
    window.handleClickedMehwarSection = handleClickedMehwarSection;
    window.handleSurahMahawerRequest = handleSurahMahawerRequest;
    window.handleMahawerSectionRequest = handleMahawerSectionRequest;
});

//Routing Handlers
async function handleSurahMahawerRequest(surahID) {
    window.location.href = `/mahawer?surahId=${surahID}`
}
async function handleClickedMehwarSection(suraId, aya) {
    const page = await quranRepo.getQuranPageBySurahAyaId(suraId, aya);
    window.location.href = `/${page.index}`
}

//Display handler
function handleMahawerSectionRequest(card) {
    card.classList.toggle('card-clicked-mehawer');
    const sibling = card.nextElementSibling;
    const height = sibling.scrollHeight;

    if (card.classList.contains('card-clicked-mehawer'))
        sibling.style.maxHeight = `${height}px`;
    else
        sibling.style.maxHeight = "0px";
}

