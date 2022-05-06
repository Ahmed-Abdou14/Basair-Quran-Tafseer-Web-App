//Imports
import QuranRepo from "../repository/quran-repo.js";
const quranRepo = new QuranRepo();

//My Helper Modules
import {add, subtract} from "./hbs-register-helper/logical-register-helpers.js";
import {loadSurahTable} from "./hbs-register-helper/templates-register-helpers.js";

//Custom Methods


//OnLoad
document.addEventListener("DOMContentLoaded", () => {
    window.handleQuranokPageRequest = handleQuranokPageRequest;
});

//HBS Templates
const quranokPageTemplate = `
        <header class="header-viewer">
            <i class="fa-solid fa-arrow-left arrow-viewer" onclick="handleQuranokPageRequest({{add quranokPage.index 1}})"></i>
            <h1 id="quran-page-index" class="head-title-viewer">
                (صفحة {{toArabicNumeral quranokPage.index}})
            </h1>
            <i class="fa-solid fa-arrow-right arrow-viewer" onclick="handleQuranokPageRequest({{subtract quranokPage.index 1}})"></i>
        </header>
        <main class="main-viewer">
            {{#each quranokPage.suwar as |surah|}}
                {{{loadSurahTable surah}}}
            {{/each}}
        </main>
    `;

//Handlers
async function handleQuranokPageRequest(pageIndex) {
    const quranokPage = await quranRepo.getQuranokPageObjByIndex(pageIndex);
    document.querySelector('#quran-view').innerHTML = loadQuranokPage(quranokPage);
    window.location.href = `#${quranokPage.juzArabicName}`
}

//HBS Compilers
function loadQuranokPage(quranokPage){
    document.cookie = `pageIndex=${quranokPage.index}`;
    return Handlebars.compile(quranokPageTemplate)({quranokPage}, {
        helpers: {
            loadSurahTable,
            add,
            subtract,
            toArabicNumeral: (n) => n.toLocaleString('ar-sa')
        }
    });
}
