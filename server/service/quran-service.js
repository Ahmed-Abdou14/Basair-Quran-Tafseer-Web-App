import QuranRepo from '../repository/quran-repo.js';
const quranRepo = new QuranRepo();

class QuranService{

    /*Pages*/
    async getQuranPages(req, res) {
        try {
            const pages = await quranRepo.getQuranPages(req.query.surahID, req.query.aya);
            res.status(200).json(pages);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getQuranPageByIndex(req, res) {
        try {
            const page = await quranRepo.getQuranPageByIndex(req.params.index);
            res.status(200).json(page);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getQuranokPageObjByIndex(req, res) {
        try {
            const page = await quranRepo.getQuranokPageObjByIndex(req.params.index);
            res.status(200).json(page);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*Ayaat*/
    async getSuwarAyaat(req, res) {
        try {
            const ayaat = await quranRepo.getSuwarAyaat();
            res.status(200).json(ayaat);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getSurahAyaatById(req, res) {
        try {
            const ayaat = await quranRepo.getSurahAyaatById(req.params.id);
            res.status(200).json(ayaat);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*Tafsir*/
    async getQuranTafsir(req, res) {
        try {
            const tafsir = await quranRepo.getQuranTafsir();
            res.status(200).json(tafsir);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getSurahTafsirById(req, res) {
        try {
            const tafsir = await quranRepo.getSurahTafsirById(req.params.index);
            res.status(200).json(tafsir);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    /*Mahawer*/
    async getSurahMahawerById(req, res) {
        try {
            const surahMahawer = await quranRepo.getSurahMahawerById(req.query.surahID);
            res.status(200).json(surahMahawer);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getSurahMahawerSectionsByAyaatRange(req, res) {
        try {
            const {surahID, startAya, endAya} = {
                surahID: Number(req.query.surahID),
                startAya: Number(req.query.startAya),
                endAya: Number(req.query.endAya)
            };
            const surahMahawer = await quranRepo.getSurahMahawerSectionsByAyaatRange(surahID, startAya, endAya);
            res.status(200).json(surahMahawer);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*Quarters*/
    async getQuranQuarters(req, res) {
        try {
            const quarters = await quranRepo.getQuranQuarters();
            res.status(200).json(quarters);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getQuranQuarterByIndex(req, res) {
        try {
            const quarter = await quranRepo.getQuranQuarterByIndex(req.params.index);
            res.status(200).json(quarter);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*Suwar*/
    async getQuranSuwar(req, res) {
        try {
            const suwar = await quranRepo.getQuranSuwar(req.query.embedJuz);
            res.status(200).json(suwar);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*Juz*/
    async getQuranJuzs(req, res) {
        try {
            const juzs = await quranRepo.getQuranJuzs();
            res.status(200).json(juzs);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getQuranJuzById(req, res) {
        try {
            const juz = await quranRepo.getQuranJuzById(req.params.juzID);
            res.status(200).json(juz);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new QuranService();