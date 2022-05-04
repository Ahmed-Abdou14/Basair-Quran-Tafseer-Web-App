export default class QuranRepo {

    /*Pages*/
    async getQuranPages() {
        const response = await fetch('/api/pages')
        return await response.json();
    }
    async getQuranPageByIndex(index) {
        const response = await fetch(`/api/pages/${index}`)
        return await response.json();
    }
    async getQuranPageBySurahId(surahId) {
        const response = await fetch(`/api/pages?surahID=${surahId}`);
        return await response.json()
    }
    async getQuranPageBySurahAyaId(surahID, aya) {
        const response = await fetch(`/api/pages?surahID=${surahID}&aya=${aya}`)
        return await response.json()
    }
    async getQuranokPageObjByIndex(index){
        const response = await fetch(`/api/quranokPage/${index}`)
        return await response.json()
    }

    /*Ayaat*/
    async getSurahAyaat() {
        const response = await fetch('/api/ayaat')
        return await response.json()
    }
    async getSurahAyaatById(id) {
        const response = await fetch(`/api/ayaat/${id}`)
        return await response.json()
    }

    /*Tafseer*/
    async getQuranTafsir() {
        const response = await fetch('/api/tafsir')
        return await response.json()
    }
    async getSurahTafsirById(index) {
        const response = await fetch(`api/tafsir/${index}`)
        return await response.json()
    }

    /*Mahawer*/
    async getSurahAndMahawerById(surahID) {
        const response = await fetch(`/api/mahawer?surahID=${surahID}`);
        return response.json();
    }
    async getSurahMahawerSectionsByAyaatRange(surahID, startAya, endAya) {
        const response = await fetch(`/api/mahawer/sections?surahID=${surahID}&startAya=${startAya}&endAya=${endAya}`);
        return response.json();
    }
    /*Quarters*/
    async getQuranQuarters() {
        const response = await fetch('/api/quarters')
        return await response.json()
    }
    async getQuranQuarterByIndex(index) {
        const response = await fetch(`/api/quarters/${index}`)
        return await response.json()
    }

    /*Suwar*/
    async getQuranSuwar() {
        const response = await fetch('/api/suwar')
        return await response.json()
    }
    async getQuranSuwarWithJuzEmbedded() {
        const response = await fetch('/api/suwar?embedJuz=true')
        return await response.json()
    }

    /*Juzs*/
    async getQuranJuzs() {
        const response = await fetch('/api/juzs')
        return await response.json()
    }
    async getQuranJuzById(juzID) {
        const response = await fetch(`/api/juzs/${juzID}`)
        return await response.json()
    }

}
