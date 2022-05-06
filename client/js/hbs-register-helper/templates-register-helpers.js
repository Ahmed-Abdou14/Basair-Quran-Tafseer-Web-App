export function loadSurahTable(surah) {
    const surahHeader = `
            <tr class="sura-name-header">
                <h1 class="head-title-viewer">
                    سورة ${surah.name} 
                </h1>
            </tr>
        `;

    let ayaatXSections = '';
    if(surah.hasOwnProperty('sections'))
        ayaatXSections = surah.sections.map(section => {
            const versesText = section.verses.map(vObj => ayaXVerseIdTemplate(vObj)).join('\n');
            return ayaatXTafsirRowTemplate(versesText, section.summary)
        }).join('\n');

    let surahXTafsir = '';
    if(surah.hasOwnProperty('verses'))
        surahXTafsir = surah.verses.map(verse => ayaatXTafsirRowTemplate(ayaXVerseIdTemplate(verse), verse.tafsir)).join('\n');

    if(ayaatXSections && surahXTafsir)
        if(surah.sections[0].verses[0].id < surah.verses[0].id)
            return `<table class="main-table-viewer">${surahHeader}\n${ayaatXSections}\n${surahXTafsir}</table>`;

    return `<table class="main-table-viewer">${surahHeader}\n${surahXTafsir}\n${ayaatXSections}</table>`;
}
function ayaatXTafsirRowTemplate(ayaat, tafsir) {
    return `
        <tr>
            <td class="summary-text-qesm">
                <p class="qesm-summary-title">${tafsir}</p>
                <ul class="aya-nav">
                        <li class="aya-nav-li"><a class="aya-nav-a" href="#">تصميم جرافيك</a></li>
                        <li class="aya-nav-li"><a class="aya-nav-a" href="#">فيديو</a></li>
                        <li class="aya-nav-li"><a class="aya-nav-a" target="_blank" href="https://everyayah.com/">تفسير</a></li>
                        <li class="aya-nav-li"><a class="aya-nav-a" href="#">بصائر</a></li>
                    </ul>
                </td>
            <td class="aya">
                ${ayaat}
            </td>
        </tr>
    `;
}
function ayaXVerseIdTemplate(verseObj) {
    return `${verseObj.text} (${verseObj.id.toLocaleString('ar-sa')}) `;
}
