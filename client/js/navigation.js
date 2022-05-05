import {areSameJuz} from './hbs-register-helper/logical-register-helpers.js'

import QuranRepo from '../repository/quran-repo.js';
const quranRepo = new QuranRepo();

document.addEventListener("DOMContentLoaded", () => {
    window.handleNavToggle = handleNavToggle;
    window.handleSurahRequest = handleSurahRequest;
    window.handleClickedQuarterRequest = handleClickedQuarterRequest;
    window.handlePageSearch = handlePageSearch;
});


//HBS string templates
const juzsSliderTemplate = `
    {{#each juzs as |j|}}
            <section class="card juz-card">
                <section class="card-title">
                    <h3 class="english-juz-number">{{j.name.english}}</h3>
                    <h3 class="arabic-juz-number">{{j.name.arabic}}</h3>
                </section>
                <hr>
                <section class="card-content">
                    <ul class="hizb-list">
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 1, quarter: 4})">3/4</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 1, quarter: 3})">1/2</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 1, quarter: 2})">1/4</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 1, quarter: 1})">الحزب الاول</li>
                    </ul>
                    <ul class="hizb-list">
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 2, quarter: 4})">3/4</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 2, quarter: 3})">1/2</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 2, quarter: 2})">1/4</li>
                        <li id="{{j.index}}" onclick="handleClickedQuarterRequest({juz: {{j.index}}, hizb: 2, quarter: 1})">الحزب الثاني</li>
                    </ul>
                </section>
            </section>
        {{/each}}
`;
const suwarSliderTemplate = `
    {{#each suwar as |surah|}}
        {{#if (areSameJuz ../suwar @index)}}
            <section class="card juz-header">
                <p>{{surah.juz.name.english}}</p>
                <p>{{surah.juz.name.arabic}}</p>
            </section>
        {{/if}}
        <section class="card surah-card" id="surah-card" onclick="handleSurahRequest({{surah.id}})">
            <p id="{{surah.id}}" class="surah-card-number">{{surah.id}}</p>
            <section class="surah-card-names">
                <p >{{surah.englishName}}</p>
                <a href="#" class="icon-container" onclick="handleSurahMahawerRequest({{surah.id}})">
                    <i class="fa-solid fa-folder-tree mahawer-icon"></i>
                </a>
                <p>{{surah.name}}</p>
            </section>
        </section>
    {{/each}}
`;

//Toggle controls
async function handleNavToggle(toggle) {
    const cardSlideContainer = document.querySelector('#quran-nav-cards');
    cardSlideContainer.innerHTML = toggle.checked ?
        Handlebars.compile(juzsSliderTemplate)({juzs: await quranRepo.getQuranJuzs()}):
        Handlebars.compile(suwarSliderTemplate)(
    {suwar: await quranRepo.getQuranSuwarWithJuzEmbedded()},
    {
                helpers: {
                    areSameJuz
                }
            }
        );

    updateNavUI(toggle);
}
function updateNavUI(toggle) {
    const input = document.querySelector('#page-search-number');
    if (toggle.checked) {
        input.style.background = 'var(--light-green)';
        input.style.color = 'white';
        input.style['border-color'] = 'grey';
    } else {
        input.style.background = 'var(--lighter-green)';
        input.style.color = 'var(--basaer-green)';
        input.style.border = '1px dashed var(--basaer-green)';
    }
}

//Page Search Controls
async function handlePageSearch() {
    const index = document.querySelector('#page-search-number').value;
    window.location.pathname = `/${index}`
}

//Routing request handlers
async function handleSurahRequest(id) {
    const page = await quranRepo.getQuranPageBySurahId(id);
    window.location.pathname = `/${page.index}`
}
async function handleClickedQuarterRequest(customJuz) {
    const quarterIndex = 8 * customJuz.juz + 4 * customJuz['hizb'] + customJuz['quarter'] - 12;
    const quarterObj = await quranRepo.getQuranQuarterByIndex(quarterIndex);
    console.log(JSON.stringify(quarterObj))
    const page = await quranRepo.getQuranPageBySurahAyaId(quarterObj.sura, quarterObj.aya);
    window.location.pathname = `/${page.index}`
}